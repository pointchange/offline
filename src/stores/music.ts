import { createDiscreteApi } from 'naive-ui';
import { defineStore } from 'pinia'

export const useMusicStore = defineStore('music', {
    state: () => ({
        musicMetadata: {
            url: '',
            name: '',
        },
        isMuted: false,
        list: [] as FileSystemFileHandle[],
        isShowMusicComponent: false
    }),
    actions: {
        async playHandle(name: string) {
            const audio = this.list.find(v => v.name === name);
            if (!audio) {
                const { message } = createDiscreteApi(['message'])
                message.info('播放出错')
                return;
            }
            this.musicMetadata.url = URL.createObjectURL(await audio.getFile())
            this.musicMetadata.name = audio.name;
        }
    }
})