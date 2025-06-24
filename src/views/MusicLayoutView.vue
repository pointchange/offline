<script lang="ts" setup>
    import Range from '@/components/other/Range.vue';
    import { useMusicStore } from '@/stores/music';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    const router = useRouter();
    const musicStore = useMusicStore();
    const switchImgLyric = ref(false);
</script>
<template>
    <div class="layout">
        <header>
            <div><button @click="router.go(-1)" class="button">&lt;</button></div>
            <div class="header-center">
                <p>{{ musicStore.musicMetadata.title }}</p>
                <p>{{ musicStore.musicMetadata.artist }}</p>
            </div>
            <div><button class="button">分享 </button></div>
        </header>
        <main @click="">
            <section v-show="!switchImgLyric" class="img">
                <img :src="musicStore.getImageURL" :alt="musicStore.musicMetadata.artist">
            </section>
            <section v-show="switchImgLyric" class="music-lyric">
                <div v-if="musicStore.lrc"></div>
                <div v-else class="empty df-c-c">

                    暂无歌词
                </div>
            </section>
        </main>
        <footer>
            <div class="footer-top">
                <button @click="musicStore.addList" class="button">打开文件夹</button>

            </div>
            <div class="footer-center">
                <Range :r="14" active-color="var(--pc-theme-primary)" slider-thumb-color="var(--pc-theme-primary)"
                    bg-color="var(--pc-border-color)" tooltip-border-color="var(--pc-border-color)"
                    tooltip-color="var(--pc-theme-color)" color="var(--pc-theme-fs-color)"
                    :format="v => musicStore.timeFormat(v as number)" step="any" @change="(value) => {
                        musicStore.progressChange(value as number)
                    }" class="progress" :value="musicStore.music.currentTime" :min="0"
                    :max="musicStore.music.duration" />
                <div class="time df-sb-c">
                    <div>{{ musicStore.timeFormat(musicStore.music.currentTime) }} </div>
                    <div>
                        {{ musicStore.timeFormat(musicStore.music.duration) }}
                    </div>
                </div>
            </div>
            <div class="footer-bottom df-sb-c">
                <div>
                    <button @click="musicStore.setPlayOrder" class="button">{{ musicStore.OrderString }}</button>
                </div>
                <div>
                    <button @click="musicStore.endedHandle" class="button">上一首</button>
                    <button @click="musicStore.playBtnHandle" class="button">{{ musicStore.playString }}</button>
                    <button @click="musicStore.endedHandle" class="button">下一首</button>
                </div>
                <div>
                    <button @click="" class="button">列表</button>
                </div>
            </div>
        </footer>
    </div>
</template>
<style scoped>
    .layout {
        padding: var(--pc-gap-normal);
        display: flex;
        flex-direction: column;
        height: 100%;
    }

    header {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    header p {
        margin: 0;
        text-align: center;
    }

    header p:last-child {
        color: var(--pc-theme-fs-tint-color)
    }

    main {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    main .img {
        width: 80%;
        border-radius: var(--pc-gap-normal);
        overflow: hidden;
    }

    main .img img {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }

    footer {
        display: flex;
        flex-direction: column;
        gap: var(--pc-gap-normal)
    }

    .footer-center .time {
        font-size: 14px;
        color: var(--pc-theme-fs-tint-color)
    }
</style>