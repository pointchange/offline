<script lang="ts" setup>
    import { useMusicStore } from '@/stores/music';
    import { ref, useTemplateRef } from 'vue';
    import { useRouter } from 'vue-router';
    import { deleteFileSuffix } from '@/utils/music';
    import Dialog from '../other/Dialog.vue';
    import Menu from '../other/Menu.vue';
    import { dropAudio } from '@/utils/drop';

    const props = defineProps(['lessthen1024']);
    const musicStore = useMusicStore();
    const isDragover = ref(false);
    const router = useRouter();
    const showMenu = ref(false);
    const showDialog = ref(false);

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
            router.push('/music/musicMobileLayoutView');
        }
    }
    function dropHandle(ev: DragEvent) {
        // if (!ev.dataTransfer) return;
        // const files = ev.dataTransfer.items;
        // const reg = new RegExp('audio', 'ig');
        // const filesArr: File[] = [];
        // for (let i = 0; i < files.length; i++) {
        //     if (files[i].kind === "file" && reg.test(files[i].type)) {
        //         const file = files[i].getAsFile();
        //         if (!file) return;
        //         filesArr.push(file)
        //     }
        // }
        const filesArr = dropAudio(ev);
        if (filesArr) {
            musicStore.list = musicStore.add(filesArr, musicStore.list);
            isDragover.value = false;
        }
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
            <Menu>
                <template #content>
                    <ul class="list ">
                        <li @click="showDialog = !showDialog"><a href="javascript:;">清除列表</a></li>
                        <li v-show="lessthen1024" @click="musicStore.addList"><a href="javascript:;">添加音频文件</a></li>
                    </ul>
                </template>
                <template #button>
                    <button @click="switchMenu" class="button clear-input menu">···</button>
                </template>
            </Menu>
            <input :placeholder="`搜 索 ${musicStore.total} 首`" class="input" v-model.lazy="musicStore.keyword"
                type="text">
            <button @click="musicStore.keyword = ''" class="button clear-input">X</button>
        </header>
        <main>
            <ul class="list">
                <li v-for="(item, index) in musicStore.filterList" :key="item.name"
                    :class="{ 'list-li-active': musicStore.currentIndex === index }" @click="playHandle(item)">
                    <a href="javascript:;">{{ deleteFileSuffix(item.name) }}</a>
                </li>
            </ul>
        </main>
    </section>
    <Dialog v-model="showDialog" :confirm-handle="clear">
        <template #header>您确定要清除列表吗？</template>
    </Dialog>
</template>
<style scoped>
    .music-list {
        position: relative;
        padding: 0 var(--pc-gap-normal);
        height: 100%;
        width: 100%;
        overflow-y: scroll;
        scrollbar-width: thin;
        scrollbar-color: var(--pc-theme-primary) var(--pc-theme-tint-color);
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

    .menu {
        font-weight: bolder;
        letter-spacing: 0.1rem;
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

    .drag-active {
        opacity: 0.6;
    }

    @media screen and (max-width:1024px) {
        .music-list {
            height: 100%;
            scrollbar-color: auto;
        }
    }

</style>