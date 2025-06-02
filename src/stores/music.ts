import { openDirectory } from '@/utils/file/fileHandle';
import { defineStore } from 'pinia'

export const useMusicStore = defineStore('music', {
    state: () => ({
        musicMetadata: {
            url: '',
            name: '',
        },
        isMuted: false,
        list: [] as FileSystemFileHandle[],
        isShowMusicComponent: false,
        keyword: '',
        currentIndex: 0,
        oldIndex: 0,
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
        async playHandle(file: FileSystemFileHandle) {
            this.oldIndex = this.currentIndex
            this.musicMetadata.url = URL.createObjectURL(await file.getFile())
            this.musicMetadata.name = file.name;

            const name = file.name;
            this.currentIndex = this.list.findIndex(v => v.name === name);
        },
        clear() {
            this.list = []
        },
        async addList() {
            const list = await openDirectory();
            const len = list.length;
            if (len > 0) {
                this.list.unshift(...list)
                this.currentIndex += len;
            }
        }
    },
})