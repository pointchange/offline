import { defineStore } from 'pinia'
enum PlayMode {
    Order,
    Random,
    Repeat,
    Reversed
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
        // music: {
        //     url: '',
        //     name: '',
        // },
        isMuted: false,
        list: [] as F[],
        isShowMusicComponent: false,
        keyword: '',
        currentIndex: 0,
        oldIndex: 0,
        encode: ['mp3', 'mp4a', 'flac', 'ogg',],
        isPlaying: false
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
        }
    },

    actions: {
        init() {
            this.audio.onended = this.endedHandle;
            this.audio.ontimeupdate = (e: Event) => {
                const audio = e.target as HTMLAudioElement;
                this.music.currentTime = audio.currentTime;
            }
            this.audio.oncanplay = (e: Event) => {
                const audio = e.target as HTMLAudioElement;
                audio.play();
                this.music.duration = audio.duration;
                this.music.playing = true;
            }
            this.audio.onerror = (e) => {
                console.log(e);
            }
        },
        destory() {
            this.audio.onended = null;
            this.audio.ontimeupdate = null;
            this.audio.oncanplay = null;
            this.audio.onerror = null;
        },
        async openDirectory() {
            const songFiles: FileSystemFileHandle[] = [];
            try {
                const directory = await window.showDirectoryPicker();
                const list = [];
                const files = await directory.entries();
                for await (const item of files) {
                    list.push(item);
                }
                for (let i = 0; i < list.length; i++) {
                    const item = list[i];
                    const bool = this.encode.some(v => new RegExp(v, 'ig').test(item[1].name)) && item[1].kind === 'file';
                    if (bool) {
                        songFiles.push(item[1]);
                    }
                }
                return songFiles

            } catch (error) { return songFiles }
        },
        async playHandle(file: F) {
            const name = file.name;
            if (name === this.music.name) return;

            this.music.name = name;

            if (file instanceof FileSystemFileHandle) {
                const f = await file.getFile();
                console.log(f);
                this.audio.src = URL.createObjectURL(f);
            } else {
                this.audio.src = URL.createObjectURL(file);
            }

            this.oldIndex = this.currentIndex;
            this.currentIndex = this.list.findIndex(v => v.name === name);
        },
        clear() {
            this.list = []
        },
        add(list: F[]) {
            this.list.unshift(...list)
        },
        async addList() {
            const list = await this.openDirectory();
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
            this.audio.currentTime = value
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
        }
    },
})