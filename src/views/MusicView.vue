<script lang="ts" setup>
    import Music from '@/components/music/Music.vue';
    import { useMusicStore } from '@/stores/music';
    const musicStore = useMusicStore();
    // const arr = randomColor(musicStore.encodeTotal)
    // let colors = arr.reduce((pre, v, i) => ({ ...pre, ...{ [musicStore.encode[i].toUpperCase()]: v } }), {});
    function clear() {
        musicStore.audio.pause();
        musicStore.destory();
        musicStore.clear();
        musicStore.$reset();
        musicStore.init();
    }
    // function randomColor(n: number) {
    //     function randomNumber() {
    //         return parseInt('' + Math.random() * 255)
    //     }
    //     function mergeRgba() {
    //         return `rgb(${randomNumber()},${randomNumber()},${randomNumber()})`
    //     }
    //     return Array(n).fill('').map(_ => mergeRgba());
    // }
    // function getSuffix(name: string) {
    //     return musicStore.getFileSuffix(name).toUpperCase();
    // }

</script>
<template>
    <div class="music-list" v-if="musicStore.total > 0">
        <header class="header">
            <Music />
            <div class="header-bottom">
                <div class="df-sb-c">
                    <input placeholder="搜 索" class="input" v-model.lazy="musicStore.keyword" type="text">
                    <button @click="musicStore.keyword = ''" class="button clear-input">X</button>
                </div>
                <div>
                    <button @click="clear" class="button">清除列表</button>
                </div>
            </div>
        </header>
        <main>
            <ul class="list">
                <li v-for="item in musicStore.filterList" :key="item.name" :data-name="item.name"
                    @click="() => musicStore.playHandle(item)">
                    <a href="javascript:;">{{ musicStore.DeleteFileSuffix(item.name) }}</a>
                </li>
            </ul>
        </main>
    </div>
    <div v-else class="empty df-c-c">
        <button class="empty-button big-btn" @click="() => musicStore.addList()">打开文件夹</button>
    </div>
</template>
<style scoped>
    .music-list {
        padding: 0 var(--pc-gap-normal);
        height: 100%;
        overflow-y: scroll;
    }

    .tag {
        /* text-shadow: 0 0 2px #000; */
    }

    .clear-input {
        margin: 0 var(--pc-gap-normal);
        border-radius: 0.4rem;
    }

    .header {
        padding: 1rem;
        position: sticky;
        top: 0;
        display: grid;
        gap: var(--pc-gap-small);
        background-color: var(--pc-theme-color);
        border-bottom: 1px solid var(--pc-border-color);
    }

    .header-bottom {
        display: grid;
        gap: var(--pc-gap-small);
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

    .empty {
        height: 100%;
    }

    .empty-button {
        padding: 1rem 2rem;
        font-size: 2rem;
        border: 1px solid var(--pc-border-color);
        border-radius: 1rem;
    }

    @media screen and (max-width:480px) {
        .empty-button {
            font-size: 1.4rem;
        }
    }

    .empty-button:hover {
        background-color: var(--pc-hover-color);
    }
</style>