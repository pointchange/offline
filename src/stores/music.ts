import { defineStore } from 'pinia';
import { parseWebStream } from 'music-metadata';
import { getMusicCover, openDirectory, parseLrc } from '@/utils/music';

enum PlayMode {
    Order,
    Random,
    Repeat,
    Reversed
}
enum PlayModeString {
    Order = '顺序',
    Random = '随机',
    Repeat = '重复',
    Reversed = '反转'
}


interface ActiveLrc {
    index: number,
    texts: number
}
export const useMusicStore = defineStore('music', {
    state: () => ({
        audio: new Audio(),
        url: '',
        music: {
            order: PlayMode.Order,
            currentTime: 0,
            duration: 0,
            volumn: 1,
            playing: false,
            name: ''
        },
        musicMetadata: {
            artist: '',
            title: '',
            pic: false,
            bitrate: 0,
            duration: 0,
            lossless: false,
            sampleRate: 0
        },
        pictureUrl: '',
        isMuted: false,
        list: [] as F[],
        isShowMusicComponent: false,
        keyword: '',
        currentIndex: 0,
        oldIndex: 0,
        encode: ['mp3', 'mp4a', 'flac', 'ogg',],
        isPlaying: false,
        recordPreVolumn: 1,
        oldUrl: '',
        cover: '',

        lrc: [] as LRC[],
        lrcList: [] as F[],
        lrcEncode: ['lrc'],
        lrcIndex: 0,
        activeLrc: {
            index: 0,
            texts: 0,
        } as ActiveLrc
    }),
    getters: {
        filterList(state) {
            const { list, keyword } = state;
            if (keyword === '') {
                return list
            } else {
                return list.filter(v => new RegExp(keyword, 'ig').test(v.name));
            }
        },
        total(state) {
            return state.list.length;
        },
        encodeTotal(state) {
            return state.encode.length;
        },
        playString(state) {
            return state.music.playing ? '暂停' : "播放"
        },
        OrderString(state) {
            switch (state.music.order) {
                case PlayMode.Random:
                    return PlayModeString.Random;
                case PlayMode.Repeat:
                    return PlayModeString.Repeat;
                case PlayMode.Reversed:
                    return PlayModeString.Reversed;
                default:
                    return PlayModeString.Order;
            }
        },
        getImageURL(state) {
            return state.musicMetadata.pic ? state.pictureUrl : state.cover;
        },
        getLrcListTotal(state) {
            return state.lrcList.length;
        },
        hasLrcListTotal(state) {
            return state.lrcList.length > 0;
        },
        getLrcTotal(state) {
            return state.lrc.length;
        },
        hasLrc(state) {
            return state.lrc.length > 0
        },
    },

    actions: {
        async init() {
            this.audio.onended = this.endedHandle;
            this.audio.ontimeupdate = (e: Event) => {
                const audio = e.target as HTMLAudioElement;
                const t = audio.currentTime;
                this.music.currentTime = t;

                if (this.lrc.length === 0) return;
                this.activeLrc.texts = 0;
                let i = this.lrc.findIndex(v => v.time >= t);
                let index = i - 1;
                if (index < 0) return;
                this.activeLrc.index = index;
                this.activeLrc.texts++;

                let nextI = i + 1;
                while (nextI < this.getLrcTotal && this.lrc[i].time === this.lrc[nextI].time) {
                    this.activeLrc.texts++
                    nextI++;
                }
            }
            this.audio.oncanplay = (e: Event) => {
                const audio = e.target as HTMLAudioElement;
                if (audio.src === this.url && !this.music.playing) return;
                audio.play();
                this.url = audio.src;
                this.music.duration = audio.duration;
                this.music.playing = true;
            }
            this.audio.onerror = (e) => {
                // console.log(e);
            }
            this.cover = await getMusicCover();
        },
        destory() {
            this.audio.onended = null;
            this.audio.ontimeupdate = null;
            this.audio.oncanplay = null;
            this.audio.onerror = null;
        },
        async getSongInfo() {
            const response = await fetch(this.audio.src);
            const webStream = response.body;
            const metadata = await parseWebStream(webStream, 'audio/mpeg');

            // console.log(metadata);
            let { artist, title, picture } = metadata.common;
            let { bitrate, duration, sampleRate, lossless } = metadata.format;
            artist = artist || '';
            title = title || this.DeleteFileSuffix(this.music.name);
            bitrate = bitrate || 0;
            duration = duration || 0;
            sampleRate = sampleRate || 0;
            lossless = lossless ? true : false;
            let pic = false;
            if (picture) {
                pic = true;
                const blob = new Blob([picture[0].data.buffer], { type: picture[0].format })
                this.pictureUrl = URL.createObjectURL(blob)
            }
            this.musicMetadata = {
                artist, title, bitrate, duration, sampleRate, lossless, pic
            }
        },
        async playHandle(file: F) {
            const name = file.name;
            if (name === this.music.name) return;

            this.music.name = name;

            if (file instanceof FileSystemFileHandle) {
                const f = await file.getFile();
                this.audio.src = URL.createObjectURL(f);
            } else {
                this.audio.src = URL.createObjectURL(file);
            }
            await this.getSongInfo();
            const soneName = this.musicMetadata.title || this.DeleteFileSuffix(name);
            const reg = new RegExp(soneName, 'ig');
            const lrcItem = this.lrcList.find(v => reg.test(v.name));
            if (typeof lrcItem !== 'undefined' && lrcItem instanceof FileSystemFileHandle) {
                const lrcFile = await lrcItem.getFile();
                const contents = await lrcFile.text();
                this.lrc = parseLrc(contents);
            } else {
                this.lrc = [];
            }

            this.oldIndex = this.currentIndex;
            this.currentIndex = this.list.findIndex(v => v.name === name);
        },
        clear() {
            this.list = []
        },
        add(list: F[]) {
            const m1 = new Map();

            list.forEach(item => {
                const v = m1.get(item.name)
                if (typeof v === 'undefined') {
                    m1.set(item.name, item);
                }
            });
            let l = [] as F[];
            m1.forEach(v => {
                l.push(v);
            })
            if (this.total > 0) {
                const m1 = new Map();
                this.list.forEach(item => {
                    m1.set(item.name, item);
                });
                l.forEach(file => {
                    const v = m1.get(file.name)
                    if (typeof v === 'undefined') {
                        m1.set(file.name, file);
                    }
                });
                this.list = [...m1.values()];

            } else {
                this.list.unshift(...l)
            }
        },
        async addList() {
            const list = await openDirectory(this.encode);
            const len = list.length;
            if (len > 0) {
                this.add(list);
                this.currentIndex += len;
            }
        },
        setRandom() {
            const index = Math.floor(Math.random() * this.total)
            const file = this.list[index];
            this.playHandle(file);
        },
        setNext() {
            this.isPlaying = false;
            const index = this.list.findIndex(v => v.name === this.music.name);
            let file: F;
            if (index === this.total - 1) {
                file = this.list[0]
            } else {
                file = this.list[index + 1]
            }
            this.playHandle(file);
        },
        setPrevious() {
            this.isPlaying = false;
            const index = this.list.findIndex(v => v.name === this.music.name);
            let file: F;
            if (index === 0) {
                file = this.list[this.total - 1];
            } else {
                file = this.list[index - 1]
            }
            this.playHandle(file);
        },
        setRepeat() {
            this.audio.currentTime = 0;
            this.audio.play();
        },
        endedHandle() {
            switch (this.music.order) {
                case PlayMode.Random:
                    this.setRandom()
                    break;
                case PlayMode.Repeat:
                    this.setRepeat()
                    break;
                case PlayMode.Reversed:
                    this.setPrevious()
                    break;
                default:
                    this.setNext()
                    break;
            }
        },
        setPlayOrder() {
            const total = Object.keys(PlayMode).length / 2;
            this.music.order++;
            if (this.music.order > total - 1) {
                this.music.order = 0;
            }
        },
        progressChange(value: number) {
            this.audio.currentTime = value;
        },
        volumnChange(value: number) {
            this.audio.volume = value;
            this.isMuted = value === 0;
        },
        DeleteFileSuffix(name: string) {
            const nameArr = name.split('.');
            const len = nameArr.length - 1;
            return name.replace('.' + nameArr[len], '');
        },
        getFileSuffix(name: string) {
            const nameArr = name.split('.');
            const len = nameArr.length - 1;
            return nameArr[len];
        },
        timeFormat(time: number) {
            function isUnitsDigit(n: number) {
                return n < 10 ? '0' + n : n
            }
            let hour = isUnitsDigit(Math.floor(time / 3600));
            let min = isUnitsDigit(Math.floor(time / 60) % 60);
            let second = isUnitsDigit(Math.floor(time % 60));
            return (+hour > 0 ? `${hour}:` : '') + `${min}:${second}`;
        },
        playBtnHandle() {
            this.music.playing = !this.music.playing;
            this.music.playing ? this.audio.play() : this.audio.pause();
        },
        volumnClick() {
            this.isMuted = !this.isMuted
            this.audio.muted = this.isMuted
            if (this.isMuted) {
                this.recordPreVolumn = this.music.volumn;
                this.music.volumn = 0;
            } else {
                this.music.volumn = this.recordPreVolumn;
            }
        },
        async addLrc() {
            const directory = await openDirectory(this.lrcEncode);
            if (directory.length === 0) return;
            this.lrcList.push(...directory);
        }
    },
})