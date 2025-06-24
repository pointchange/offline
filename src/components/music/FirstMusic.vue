<script lang="ts" setup>
    import { useMusicStore } from '@/stores/music';
    import { computed, onMounted, onUnmounted, onUpdated, ref, useTemplateRef, watch } from 'vue';
    import Range from '../other/Range.vue';
    import { useRouter } from 'vue-router';
    const musicStore = useMusicStore();
    const showMenu = ref(false);
    const showLrcMenu = ref(false);
    const lessthen1024 = ref(false);
    const router = useRouter();
    const lyricRef = useTemplateRef("lyricRef");

    const lrcHeight = ref(0);
    const lrcLineHeight = computed(() => {
        if (musicStore.hasLrc) {
            return lrcHeight.value / musicStore.getLrcTotal;
        } else {
            return 0;
        }
    });

    function openLrcMenu() {
        showLrcMenu.value = !showLrcMenu.value;
    }
    function clearLrc() {
        musicStore.lrcList = [];
    }
    function clear() {
        musicStore.audio.pause();
        musicStore.destory();
        musicStore.clear();
        musicStore.$reset();
        musicStore.init();
    }

    function switchMenu() {
        showMenu.value = !showMenu.value
    }

    function countHeight() {
        if (!musicStore.hasLrc) return 0;
        const { index } = musicStore.activeLrc;
        return -lrcLineHeight.value * index - lrcLineHeight.value / 2;
    }
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
    onUpdated(() => {
        if (musicStore.hasLrc) {
            if (!lyricRef.value) return;
            lrcHeight.value = lyricRef.value.getBoundingClientRect().height;
        }
    })
    function playHandle(file: F) {
        musicStore.playHandle(file);
        if (lessthen1024.value) {
            router.push('/music/musicLayoutView');
        }
    }
</script>
<template>
    <div class="music">
        <section class="music-list">
            <header class="header">
                <div class="menu-container">
                    <button @click="switchMenu" class="button clear-input menu">···</button>
                    <Transition name="menu">
                        <ul v-show="showMenu" @click="switchMenu" class="list menu-list">
                            <li @click="clear"><a href="javascript:;">清除列表</a></li>
                        </ul>
                    </Transition>
                    <div @click="switchMenu" v-show="showMenu" class="modal"></div>
                </div>
                <input placeholder="搜 索" class="input" v-model.lazy="musicStore.keyword" type="text">
                <button @click="musicStore.keyword = ''" class="button clear-input">X</button>
            </header>
            <main>
                <ul class="list">
                    <li v-for="(item, index) in musicStore.filterList" :key="item.name"
                        :class="{ 'list-li-active': musicStore.currentIndex === index }" @click="playHandle(item)">
                        <a href="javascript:;">{{ musicStore.DeleteFileSuffix(item.name) }}</a>
                    </li>
                </ul>
            </main>
        </section>
        <section class="music-lyric">
            <div class="menu-container lrc-menu">
                <button @click="openLrcMenu" class="button clear-input menu">词</button>
                <Transition name="menu">
                    <ul v-show="showLrcMenu" @click="openLrcMenu" class="list menu-list">
                        <li @click="clearLrc"><a href="javascript:;">清除全部歌词</a></li>
                        <li @click="musicStore.addLrc"><a href="javascript:;">打开文件夹</a></li>
                    </ul>
                </Transition>
                <div @click="openLrcMenu" v-show="showLrcMenu" class="modal"></div>
            </div>
            <div v-show="musicStore.hasLrcListTotal">
                <div v-active="{ name: 'lyric-active', index: musicStore.activeLrc.index, count: musicStore.activeLrc.texts }"
                    ref="lyricRef" class="lyric-container" v-show="musicStore.hasLrc" :style="{
                        transform: `translateY(${countHeight()}px)`
                    }">
                    <p v-for="item in musicStore.lrc">{{ item.text }}</p>
                </div>
                <div v-show="!musicStore.hasLrc" class="df-c-c">
                    <p>暂无歌词</p>
                </div>
            </div>
            <div class="empty " v-show="!musicStore.hasLrcListTotal">
                <p>tip: 添加LRC文件 </p>
                <button class="button open-directory" @click="musicStore.addLrc">打开文件夹</button>
            </div>

            <button style="position: fixed; top: 0; z-index: 10;" class="button"
                @click="() => musicStore.lrc = []">清空lrc</button>
        </section>
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

    .music-list {
        padding: 0 var(--pc-gap-normal);
        overflow-y: scroll;
    }

    .music-lyric {
        padding: var(--pc-gap-large);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        overflow: hidden;
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

    .clear-input {
        border-radius: 0.4rem;
    }

    .menu {
        font-weight: bolder;
        letter-spacing: 0.1rem;
    }

    .menu-container {
        position: relative;
    }

    .menu-list {
        margin-top: var(--pc-gap-small);
        position: fixed;
        z-index: 10;
        display: grid;
        background-color: var(--pc-theme-color);
        box-shadow: 0 0 0.4rem var(--pc-border-color);
        border: 1px solid var(--pc-border-color);
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .header {
        padding: 1rem;
        position: sticky;
        top: 0;
        display: flex;
        align-items: center;
        gap: var(--pc-gap-normal);
        background-color: var(--pc-theme-color);
        border-bottom: 1px solid var(--pc-border-color);
    }

    main {
        padding-bottom: 1rem;
    }

    .input:focus {
        outline-width: 2px;
        outline-color: var(--pc-theme-primary);
        caret-color: var(--pc-theme-fs-color)
    }

    .input {
        padding: 0.6rem;
        width: 100%;
        border: none;
        outline: 1px solid var(--pc-border-color);
        border-radius: 0.6rem;
        background-color: var(--pc-theme-color);
    }

    .list li {
        border-bottom: 1px solid var(--pc-border-color);
    }

    .list-li-active {
        background-color: var(--pc-hover-color);
    }

    .muted-volumn {
        opacity: 0.6;
    }

    .lyric-container {
        position: absolute;
        top: 48%;
        opacity: 0.9;
        transition: transform 0.8s ease, opacity 0.8s ease;
    }

    .lyric-container p {
        text-align: center;
    }

    .lyric-active {
        opacity: 1;
        font-weight: 900;
        color: var(--pc-theme-primary);
    }

    .empty {
        flex-direction: column;
    }

    .empty p {
        opacity: 0.8;
    }

    .empty .open-directory {
        font-size: 1.2rem;
        border-radius: var(--pc-gap-small);
    }

    .lrc-menu {
        position: absolute;
        top: var(--pc-gap-small);
        right: var(--pc-gap-small);
    }

    .lrc-menu button {
        padding: var(--pc-gap-small);
        font-weight: 400;
    }

    .menu-enter-active,
    .menu-leave-active {
        transform-origin: top left;
        transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .menu-enter-from,
    .menu-leave-to {
        opacity: 0;
        transform: scale(0)
    }


    @media screen and (max-width:1024px) {
        .music {
            display: block;
        }

        .music-list {
            height: 100%;
        }

        .music-singer,
        .music-lyric,
        .music-bottom {
            display: none;
        }
    }



</style>