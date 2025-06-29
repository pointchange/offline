<script lang="ts" setup>
    import LryricBox from '@/components/music/LryricBox.vue';
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
            <div><button @click="router.go(-1)" class="button preView">
                    &lt;
                </button>
            </div>
            <div class="header-center">
                <p>{{ musicStore.musicMetadata.title }}</p>
                <p>{{ musicStore.musicMetadata.artist }}</p>
            </div>
        </header>
        <main @click="switchImgLyric = !switchImgLyric">
            <section v-show="!switchImgLyric" class="img">
                <img :src="musicStore.getImageURL" :alt="musicStore.musicMetadata.artist">
            </section>
            <section v-show="switchImgLyric" class="music-lyric">
                <LryricBox />
            </section>
        </main>
        <footer>
            <div class="footer-top">
                <button @click="musicStore.addList" class="button">打开文件夹</button>
                <button @click="musicStore.addList" class="button">
                    <RouterLink to="/music">词</RouterLink>
                </button>
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
                    <button class="button">
                        <RouterLink to="/music">列表</RouterLink>
                    </button>
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
        width: 100%;
        height: 100%;
    }

    header {
        display: grid;
        grid-template-columns: 1fr auto 1fr;
        align-items: center;
    }

    header p {
        margin: 0;
        text-align: center;
    }

    header p:last-child {
        color: var(--pc-theme-fs-tint-color)
    }

    .preView {
        padding: 0.1rem 0.6rem;
        font-size: 1.6rem;
    }

    .music-lyric {
        width: 100%;
        height: 100%;
    }

    main {
        position: relative;
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow: hidden;
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

    .footer-top {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .footer-center .time {
        font-size: 14px;
        color: var(--pc-theme-fs-tint-color)
    }
</style>