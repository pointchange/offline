import { defineStore } from 'pinia'
enum PlayMode {
    Order,
    Random,
    Repeat,
    Reversed
}

export const useMusicStore = defineStore('music', {
    state: () => ({
        music: {
            order: PlayMode.Order,
            currentTime: 0,
            duration: 0,
            volumn: 1,

        },
        musicMetadata: {
            url: '',
            name: '',
        },
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
        }
    },

    actions: {
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
            if (file instanceof FileSystemFileHandle) {
                this.musicMetadata.url = URL.createObjectURL(await file.getFile());
            } else {
                this.musicMetadata.url = URL.createObjectURL(file);
            }
            this.musicMetadata.name = file.name;
            const name = file.name;
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
            const index = this.list.findIndex(v => v.name === this.musicMetadata.name);
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
            const index = this.list.findIndex(v => v.name === this.musicMetadata.name);
            let file: F;
            if (index === 0) {
                file = this.list[this.total - 1];
            } else {
                file = this.list[index - 1]
            }
            this.playHandle(file);
        },
        setRepeat(audio: HTMLAudioElement) {
            if (!audio) return;
            audio.currentTime = 0;
            audio.play();
        },
        endedHandle(audio: HTMLAudioElement) {
            switch (this.music.order) {
                case PlayMode.Random:
                    this.setRandom()
                    break;
                case PlayMode.Repeat:
                    this.setRepeat(audio)
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
        setPlaybackRate() {

        },
    },
})