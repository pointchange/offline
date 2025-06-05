import { openDirectory } from '@/utils/file/fileHandle';
import { TYPES } from '@/utils/music/const';
import { defineStore } from 'pinia'
export const useMusicStore = defineStore('music', {
    state: () => ({
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
        encode: TYPES
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
            const list = await openDirectory();
            const len = list.length;
            if (len > 0) {
                this.add(list);
                this.currentIndex += len;
            }
        }
    },
})