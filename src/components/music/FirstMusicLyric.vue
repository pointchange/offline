<script lang="ts" setup>
    import { useMusicStore } from '@/stores/music';
    import { deleteFileSuffix, getFileSuffix } from '@/utils/music';
    import { computed, reactive, ref } from 'vue';
    import Tag from '../other/Tag.vue';
    import Dialog from '../other/Dialog.vue';
    import Menu from '../other/Menu.vue';
    import LryricBox from './LryricBox.vue';

    const musicStore = useMusicStore();
    const isLyricDragover = ref(false);
    const showLrcMenu = ref(false);
    const showLrc = ref(false);
    const dialogOption = reactive({
        show: false,
        content: '您确定要清除列表吗？',
        confirmHandle: () => { }
    })
    const accept = computed(() => musicStore.lrcEncode.map(v => '.' + v).join(','))
    function changeHandle(e: Event) {
        const input = e.target as HTMLInputElement;
        const files = input.files;
        if (files && files.length > 0) {
            musicStore.lrcList = musicStore.addLrc([...files], musicStore.lrcList);
        }
    }


    function dropLyricHandle(ev: DragEvent) {
        if (!ev.dataTransfer) return;
        const files = ev.dataTransfer.items;
        const lrcArr: File[] = [];
        for (let i = 0; i < files.length; i++) {
            const f = files[i].getAsFile();
            if (f && (getFileSuffix(f.name).toLowerCase() === 'lrc')) {
                lrcArr.push(f);
            }
        }
        musicStore.lrcList = musicStore.addLrc(lrcArr, musicStore.lrcList);
        isLyricDragover.value = false;
    }
    function openLrcMenu() {
        showLrcMenu.value = !showLrcMenu.value;
    }

    function clearLrc() {
        dialogOption.show = true;
        dialogOption.confirmHandle = () => {
            musicStore.lrcList.clear();
        }
    }
    function deleteLrc(name: string) {
        dialogOption.show = true;
        dialogOption.content = `您确定要移除" ${name} " ？`
        dialogOption.confirmHandle = () => {
            musicStore.lrcList.delete(name)
        }
    }

    function switchShowLrc() {
        showLrc.value = !showLrc.value;
    }
    function lrcItemClickHandle(name: string) {
        musicStore.appointFile(name);
        switchShowLrc()
    }
</script>
<template>
    <section :class="{
        'drag-active': isLyricDragover
    }" @dragleave.prevent="isLyricDragover = false" @dragover.prevent="isLyricDragover = true"
        @drop.prevent="dropLyricHandle" class="music-lyric">
        <header>
            <Menu>
                <template #content>
                    <ul class="list ">
                        <li @click="clearLrc"><a href="javascript:;">清除全部歌词</a></li>
                        <li @click="musicStore.addLrcList"><a href="javascript:;">打开文件夹</a></li>
                    </ul>
                </template>
                <template #button>
                    <button @click="openLrcMenu" class="button menu">···</button>
                </template>
            </Menu>
            <button v-show="musicStore.hasLrcListTotal" @click="switchShowLrc" class="button">词</button>
        </header>
        <div class="lyric-box" v-if="musicStore.hasLrcListTotal">
            <LryricBox v-show="showLrc"></LryricBox>

            <ul v-show="!showLrc" class="list">
                <li @click.right.prevent="deleteLrc(value[0])" @click="lrcItemClickHandle(value[0])"
                    v-for="value in musicStore.lrcList" :key="value[0]">
                    <a href="javascript:;">{{
                        deleteFileSuffix(value[0]) }} </a>
                    <Tag size="small" color="var(--pc-theme-primary)">LRC</Tag>
                </li>
            </ul>
        </div>
        <div class="empty " v-else>
            <p>tip: 添加LRC文件 </p>
            <button class="button" @click="musicStore.addLrcList">打开文件夹</button>
            <label class="button">
                <input @change="changeHandle" multiple type="file" :accept="accept" />
                打开LRC文件
            </label>
        </div>
    </section>
    <Dialog :confirm-handle="dialogOption.confirmHandle" v-model="dialogOption.show">
        <template #header>{{ dialogOption.content }}</template>
    </Dialog>
</template>
<style scoped>
    [type="file"] {
        display: none;
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

    header {
        position: absolute;
        top: 0;
        padding: var(--pc-gap-small);
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
    }

    header .button {
        border-radius: 0.4rem;
        padding: var(--pc-gap-small);
    }

    .list li {
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 1px solid var(--pc-border-color);
    }

    main {
        padding-bottom: 1rem;
    }

    .menu {
        font-weight: bolder;
        letter-spacing: 0.1rem;
    }

    .lyric-box {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .empty {
        display: flex;
        flex-direction: column;
        gap: var(--pc-gap-normal);
    }

    .empty p {
        color: var(--pc-theme-fs-tint-color);
    }

    .empty .button {
        font-size: 1.2rem;
        border-radius: var(--pc-gap-small);
        outline: 1px solid var(--pc-border-color);
    }

    .empty-lrc {
        height: 100%;
    }

    .lrc-menu {
        position: absolute;
        top: var(--pc-gap-small);
        right: var(--pc-gap-small);
    }

    .lrc-menu button {
        padding: var(--pc-gap-small);
        font-weight: 400;
        border-radius: 0.4rem;
    }

    .drag-active {
        opacity: 0.6;
    }

    @media screen and (max-width:1024px) {
        .music-lyric {
            display: none;
        }
    }


</style>