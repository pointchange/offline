<script lang="ts" setup>
    import { useMusicStore } from '@/stores/music';
    const musicStore = useMusicStore();
    function clear() {
        musicStore.clear();
        musicStore.$reset();
    }
</script>
<template>
    <div class="music-list" v-if="musicStore.total > 0">
        <header class="header">
            <div class="df-sb-c">
                <input class="input" v-model="musicStore.keyword" type="text">
                <button @click="musicStore.keyword = ''" class="button">X</button>
            </div>
            <div>
                <button @click="clear" class="button">清除列表</button>
            </div>
        </header>
        <main>
            <ul class="list">
                <li v-for="item in musicStore.filterList" :key="item.name" :data-name="item.name"
                    @click="() => musicStore.playHandle(item)">
                    <a>{{ item.name }}</a>
                </li>
            </ul>
        </main>
    </div>
    <div v-else class="empty df-c-c">
        <button class="button big-btn" @click="() => musicStore.addList()">打开文件夹</button>
    </div>
</template>
<style scoped>
    .music-list {
        height: 100%;
    }

    .header {
        position: sticky;
        top: 0;
        background-color: var(--pc-white);
    }

    main {
        margin-bottom: 80px;
    }

    .input:focus {
        outline-color: var(--pc-primary-color);
    }

    .input {
        margin-right: 1rem;
        padding: 0.4rem;
        width: 100%;
        border: none;
        outline: 1px solid var(--pc-border-color);
        border-radius: 0.4rem;
    }

    .empty {
        height: 100%;
    }

    .big-btn {
        padding: 1rem 2rem;
        font-size: 2rem;
    }
</style>