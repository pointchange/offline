<script lang="ts" setup>
    import { useMusicStore } from '@/stores/music';
    import { getFileSuffix } from '@/utils/music';
    import { computed, onUpdated, ref, useTemplateRef } from 'vue';

    const musicStore = useMusicStore();
    const isLyricDragover = ref(false);
    const lyricRef = useTemplateRef("lyricRef");
    const lrcHeight = ref(0);
    const showLrcMenu = ref(false);

    const lrcLineHeight = computed(() => {
        if (musicStore.hasLrc) {
            return lrcHeight.value / musicStore.getLrcTotal;
        } else {
            return 0;
        }
    });
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
        musicStore.lrcList = musicStore.addLrc(musicStore.lrcList, lrcArr);
        isLyricDragover.value = false;
    }
    onUpdated(() => {
        if (musicStore.hasLrc) {
            if (!lyricRef.value) return;
            lrcHeight.value = lyricRef.value.getBoundingClientRect().height;
        }
    })
    function countHeight() {
        if (!musicStore.hasLrc) return 0;
        const { index } = musicStore.activeLrc;
        return -lrcLineHeight.value * index - lrcLineHeight.value / 2;
    }
    function openLrcMenu() {
        showLrcMenu.value = !showLrcMenu.value;
    }

    function clearLrc() {
        musicStore.lrcList.clear();
    }
</script>
<template>
    <section :class="{
        'drag-active': isLyricDragover
    }" @dragleave.prevent="isLyricDragover = false" @dragover.prevent="isLyricDragover = true"
        @drop.prevent="dropLyricHandle" class="music-lyric">
        <div class="menu-container lrc-menu">
            <button @click="openLrcMenu" class="button clear-input menu">词</button>
            <Transition name="menu">
                <ul v-show="showLrcMenu" @click="openLrcMenu" class="list menu-list">
                    <li @click="clearLrc"><a href="javascript:;">清除全部歌词</a></li>
                    <li @click="musicStore.addLrcList"><a href="javascript:;">打开文件夹</a></li>
                    <li style="display: none;" @click="musicStore.appointFile"><a href="javascript:;">打开指定的文件匹配歌曲</a>
                    </li>
                </ul>
            </Transition>
            <div @click="openLrcMenu" v-show="showLrcMenu" class="modal"></div>
        </div>
        <div class="lyric-box" v-show="musicStore.hasLrcListTotal">
            <div v-active="{ name: 'lyric-active', index: musicStore.activeLrc.index, count: musicStore.activeLrc.texts }"
                ref="lyricRef" class="lyric-container" v-show="musicStore.hasLrc" :style="{
                    transform: `translateY(${countHeight()}px)`
                }">
                <p v-for="item in musicStore.lrc">{{ item.text }}</p>
            </div>
            <div v-show="!musicStore.hasLrc" class="df-c-c empty-lrc">
                <p>暂无歌词</p>
            </div>
        </div>
        <div class="empty " v-show="!musicStore.hasLrcListTotal">
            <p>tip: 添加LRC文件 </p>
            <button class="button open-directory" @click="musicStore.addLrcList">打开文件夹</button>
        </div>
    </section>
</template>
<style scoped>
    .music-lyric {
        padding: var(--pc-gap-large);
        position: relative;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        overflow: hidden;
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

    .lyric-box {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .lyric-container {
        position: absolute;
        top: 48%;
        width: 100%;
        color: var(--pc-theme-fs-tint-color);
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
        .music-lyric {
            display: none;
        }
    }


</style>