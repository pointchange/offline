<script lang="ts" setup>
    import { useMusicStore } from '@/stores/music';
    import { ref, useTemplateRef } from 'vue';
    import { useRouter } from 'vue-router';
    import { deleteFileSuffix } from '@/utils/music';

    const props = defineProps(['lessthen1024']);
    const musicStore = useMusicStore();
    const isDragover = ref(false);
    const router = useRouter();
    const showMenu = ref(false);
    const mainRef = useTemplateRef('mainRef');

    function clear() {
        musicStore.audio.pause();
        musicStore.destory();
        musicStore.clear();
        musicStore.$reset();
        musicStore.init();
    }
    function playHandle(file: F) {
        musicStore.playHandle(file);
        if (props.lessthen1024) {
            router.push('/music/musicLayoutView');
        }
    }
    function dropHandle(ev: DragEvent) {
        if (!ev.dataTransfer) return;
        const files = ev.dataTransfer.items;
        const reg = new RegExp('audio', 'ig');
        const filesArr: File[] = [];
        for (let i = 0; i < files.length; i++) {
            if (files[i].kind === "file" && reg.test(files[i].type)) {
                const file = files[i].getAsFile();
                if (!file) return;
                filesArr.push(file)
            }
        }
        musicStore.list = musicStore.add(filesArr, musicStore.list);
        isDragover.value = false;
    }
    function switchMenu() {
        showMenu.value = !showMenu.value
    }

</script>
<template>
    <section :class="{
        'drag-active': isDragover
    }" @dragleave.prevent="isDragover = false" @dragover.prevent="isDragover = true" @drop.prevent="dropHandle"
        class="music-list">
        <header class="header">
            <div class="menu-container">
                <button @click="switchMenu" class="button clear-input menu">···</button>
                <Transition name="menu">
                    <ul v-show="showMenu" @click="switchMenu" class="list menu-list">
                        <li @click="clear"><a href="javascript:;">清除列表</a></li>
                        <li v-show="lessthen1024" @click="musicStore.addList"><a href="javascript:;">添加音频文件</a></li>
                    </ul>
                </Transition>
                <div @click="switchMenu" v-show="showMenu" class="modal"></div>
            </div>
            <input placeholder="搜 索" class="input" v-model.lazy="musicStore.keyword" type="text">
            <button @click="musicStore.keyword = ''" class="button clear-input">X</button>
        </header>
        <main ref="mainRef">
            <ul class="list">
                <li v-for="(item, index) in musicStore.filterList" :key="item.name"
                    :class="{ 'list-li-active': musicStore.currentIndex === index }" @click="playHandle(item)">
                    <a href="javascript:;">{{ deleteFileSuffix(item.name) }}</a>
                </li>
            </ul>
        </main>
    </section>
</template>
<style scoped>
    .music-list {
        position: relative;
        padding: 0 var(--pc-gap-normal);
        height: 100%;
        width: 100%;
        overflow-y: scroll;
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

    .clear-input {
        border-radius: 0.4rem;
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
        .music-list {
            height: 100%;
        }
    }

</style>