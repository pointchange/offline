<script lang="ts" setup>
    import { useMusicStore } from '@/stores/music';
    import { onMounted, onUnmounted, ref } from 'vue';
    import Range from '../other/Range.vue';
    import FirstMusicList from './FirstMusicList.vue';
    import FirstMusicLyric from './FirstMusicLyric.vue';
    const musicStore = useMusicStore();
    const lessthen1024 = ref(false);

    let observer: ResizeObserver;
    onMounted(() => {
        observer = new ResizeObserver((entries) => {
            for (const entry of entries) {
                if (entry.contentRect) {
                    lessthen1024.value = entry.contentRect.width < 1024;
                }
            }
        });
        observer.observe(document.body);
    })
    onUnmounted(() => {
        observer.unobserve(document.body);
    })

</script>
<template>
    <div class="music">
        <FirstMusicList :lessthen1024="lessthen1024"></FirstMusicList>
        <FirstMusicLyric></FirstMusicLyric>
        <section class="music-singer">
            <div class="img">
                <img :src="musicStore.getImageURL" :alt="musicStore.musicMetadata.artist">
            </div>
            <p>{{ musicStore.musicMetadata.title }}</p>
            <p>{{ musicStore.musicMetadata.artist }}</p>
        </section>
        <footer class="music-bottom">
            <!-- <Music /> -->
            <div class="progress-container">
                <div>{{ musicStore.timeFormat(musicStore.music.currentTime) }} </div>
                <!-- <input class="progress"
                    @input="(e: Event) => musicStore.progressChange(+(e.target as HTMLInputElement).value)"
                    :value="musicStore.music.currentTime" :min="0" step="any" :max="musicStore.music.duration"
                    type="range" name="progress"> @change="(value) => {
                musicStore.progressChange(value as number)
                }" -->

                <Range :r="14" active-color="var(--pc-theme-primary)" slider-thumb-color="var(--pc-theme-primary)"
                    bg-color="var(--pc-border-color)" tooltip-border-color="var(--pc-border-color)"
                    tooltip-color="var(--pc-theme-color)" color="var(--pc-theme-fs-color)"
                    :format="v => musicStore.timeFormat(v as number)" step="any" @change="(value) => {
                        musicStore.progressChange(value as number)
                    }" class="progress" :value="musicStore.music.currentTime" :min="0"
                    :max="musicStore.music.duration" />
                <div>
                    {{
                        musicStore.timeFormat(musicStore.music.duration)
                    }}
                </div>
            </div>
            <div class="controls">
                <div class="controls-left">
                    <button @click="musicStore.playBtnHandle" class="button">{{ musicStore.playString }}</button>
                    <button @click="musicStore.endedHandle" class="button">上一首</button>
                    <button @click="musicStore.endedHandle" class="button">下一首</button>
                    <button :class="{
                        'muted-volumn': musicStore.isMuted
                    }" @click="musicStore.volumnClick" class="button ">音量</button>
                    <!-- <input @input="(e: Event) => musicStore.volumnChange(+(e.target as HTMLInputElement).value)"
                        v-model="musicStore.music.volumn" :min="0" :max="1" step="0.05" type="range" name="volumn"> -->
                    <Range :r="14" :format="v => Math.round(+v * 100 * 100) / 100 + '%'"
                        active-color="var(--pc-theme-primary)" slider-thumb-color="var(--pc-theme-primary)"
                        bg-color="var(--pc-border-color)" tooltip-border-color="var(--pc-border-color)"
                        tooltip-color="var(--pc-theme-color)" color="var(--pc-theme-fs-color)" @change="(value) => {
                            musicStore.volumnChange(value as number)
                        }" v-model="musicStore.music.volumn" :min="0" :max="1" :step="0.05" />
                </div>
                <div>
                    <button @click="musicStore.addList" class="button">打开文件夹</button>
                    <button @click="musicStore.setPlayOrder" class="button">{{ musicStore.OrderString }}</button>
                </div>
            </div>
        </footer>
    </div>
</template>
<style scoped>
    .music {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: 90% 10%;
        height: 100%;
    }

    .music-bottom {
        grid-column-start: span 3;
    }

    .progress-container {
        display: flex;
        justify-content: space-evenly;
        align-items: center;
    }

    .progress-container .progress {
        flex: 1;
    }

    .progress-container div {
        margin: 0 var(--pc-gap-normal);

    }

    .music-bottom {
        padding-top: var(--pc-gap-normal);
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    .music-bottom .controls {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: var(--pc-gap-small);
    }

    .controls-left {
        display: flex;
        align-items: center;
    }

    .music-singer {
        padding: var(--pc-gap-large);
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: var(--pc-gap-normal);
    }


    .music-singer .img {
        max-width: 500px;
        max-height: 500px;
        min-width: 200px;
        min-height: 200px;
        border-radius: 1rem;
        overflow: hidden;
    }

    .music-singer .img img {
        width: 100%;
        height: 100%;
        object-fit: contain;
    }

    .music-singer p {
        letter-spacing: 0.1rem;
    }


    .muted-volumn {
        opacity: 0.6;
    }

    @media screen and (max-width:1024px) {
        .music {
            display: block;
        }

        .music-singer,
        .music-bottom {
            display: none;
        }
    }



</style>