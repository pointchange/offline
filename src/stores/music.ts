import { defineStore } from 'pinia';
import { parseWebStream } from 'music-metadata';
import { deleteFileSuffix, getMusicCover, openDirectory, parseLrc } from '@/utils/music';
import { useSettingStore } from './setting';
import { message } from '@/utils/msg';

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
        imageURL: {
            musiclightCover: '',
            musicDarkCover: '',
        },

        lrc: [] as LRC[],
        lrcList: new Map<string, F>(),
        lrcEncode: ['lrc'],
        lrcIndex: 0,
        activeLrc: {
            index: 0,
            texts: [],
        } as ActiveLrc,
        userSelect: false,
        userSelectTime: 0,
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
            const settingStore = useSettingStore();
            const { musicDarkCover, musiclightCover } = state.imageURL;
            return state.musicMetadata.pic ? state.pictureUrl : (settingStore.isDarktheme ? musicDarkCover : musiclightCover);
        },
        getLrcListTotal(state) {
            return state.lrcList.size;
        },
        hasLrcListTotal(state) {
            return state.lrcList.size > 0;
        },
        getLrcTotal(state) {
            return state.lrc.length;
        },
        hasLrc(state) {
            return state.lrc.length > 0
        },
    },

    actions: {
        init() {
            this.audio.onended = this.endedHandle;
            this.audio.ontimeupdate = (e: Event) => {
                const audio = e.target as HTMLAudioElement;
                const t = audio.currentTime;
                this.music.currentTime = t;

                if (this.lrc.length === 0) return;
                this.activeLrc.texts = [];
                let i = this.lrc.findIndex(v => v.time >= t);
                let index = i - 1;
                if (index < 0) return;
                this.activeLrc.index = index;
                this.activeLrc.texts.push(this.lrc[index].text);

                let nextI = i + 1;
                while (nextI < this.getLrcTotal && this.lrc[i].time === this.lrc[nextI].time) {
                    this.activeLrc.texts.push(this.lrc[nextI - 1].text);
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
            getMusicCover().then(v => {
                this.imageURL.musiclightCover = v;
            })
            getMusicCover(true).then(v => {
                this.imageURL.musicDarkCover = v;
            })
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
            title = title || deleteFileSuffix(this.music.name);
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

            this.oldIndex = this.currentIndex;
            this.currentIndex = this.list.findIndex(v => v.name === name);

            if (this.userSelect) {
                this.userSelect = false;
                return;
            }
            const soneName1 = this.musicMetadata.title;
            const soneName2 = deleteFileSuffix(name);
            const reg1 = new RegExp(soneName1.replaceAll(' ', ''), 'ig');
            const reg2 = new RegExp(soneName2.replaceAll(' ', ''), 'ig');
            let lrcItem: F | any = undefined;
            this.lrcList.forEach((value, key) => {
                const k = key.replaceAll(' ', '');
                const bool1 = soneName1 !== '' && reg1.test(k)
                const bool2 = soneName2 !== '' && reg2.test(k)
                if (bool1 || bool2) {
                    lrcItem = value;
                }
            })
            // let lrcItem = this.lrcList.keys().find(v => (soneName1 !== '' && reg1.test(v.name)) ||
            //     (soneName2 !== '' && reg2.test(v.name))
            // );
            // const lrcItem = this.lrcList.get(soneName1) || this.lrcList.get(soneName2);
            if (typeof lrcItem === 'undefined') {
                this.lrc = [];
            }
            if (typeof lrcItem !== 'undefined' && lrcItem instanceof FileSystemFileHandle) {
                const lrcFile = await lrcItem.getFile();
                const contents = await lrcFile.text();
                this.lrc = parseLrc(contents);
            }
            if (typeof lrcItem !== 'undefined' && lrcItem instanceof File) {
                const reader = new FileReader();
                reader.readAsText(lrcItem);
                reader.onload = () => {
                    this.lrc = parseLrc(reader.result as string)
                }
            }

        },
        clear() {
            this.list = []
        },
        /**
         * get unique array  
         * @param list new array
         * @param list2 old array
         * @returns array
         */
        add(list: F[], list2: F[]) {
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
            let arr = [] as F[];
            if (this.total > 0) {
                const m1 = new Map();
                list2.forEach(item => {
                    m1.set(item.name, item);
                });
                const m2 = new Map();
                l.forEach(file => {
                    const v = m1.get(file.name)
                    if (typeof v === 'undefined') {
                        m2.set(file.name, file);
                    }
                });
                arr = [...m2.values(), ...m1.values()];

            } else {
                arr.push(...l)
            }
            return arr;
        },
        async addList() {
            const list = await openDirectory(this.encode);
            if (list.length === 0) {
                message().add({
                    type: 'warn',
                    text: '没有发现音频文件'
                })
                return;
            }
            const arr = this.add(list, this.list);
            if (arr.length !== this.list.length) {
                this.list = arr;
                this.currentIndex += arr.length;
            } else {
                message().add({
                    type: 'warn',
                    text: '没有发现新音频文件，或许列表里有'
                })
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
        addLrc(array: F[], list: Map<string, F>) {
            let m = new Map<string, F>();
            if (list.size !== 0) {
                list.forEach((value, key) => {
                    m.set(key, value);
                })
            }
            for (let i = 0; i < array.length; i++) {
                const item = array[i];
                const key = m.get(item.name);
                if (typeof key === 'undefined') {
                    m.set(item.name, item);
                }
            }
            return m;
        },
        async addLrcList() {
            const directory = await openDirectory(this.lrcEncode);
            if (directory.length === 0) {
                message().add({
                    type: 'warn',
                    text: '没有发现LRC文件'
                })
                return;
            }
            this.lrcList = this.addLrc(directory, this.lrcList);
        },
        async appointFile(filename: string) {
            this.userSelect = true;
            const lrcItem = this.lrcList.get(filename);

            if (!lrcItem) return;
            if (lrcItem instanceof FileSystemFileHandle) {
                const lrcFile = await lrcItem.getFile();
                const contents = await lrcFile.text();
                this.lrc = parseLrc(contents);
            }
            if (lrcItem instanceof File) {
                const reader = new FileReader();
                reader.readAsText(lrcItem);
                reader.onload = () => {
                    this.lrc = parseLrc(reader.result as string)
                }
            }
        }
    },
})