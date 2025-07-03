<script lang="ts" setup>
    import FirstMusic from '@/components/music/FirstMusic.vue';
    import { useMusicStore } from '@/stores/music';
    import { dropAudio } from '@/utils/drop';
    import { computed, ref } from 'vue';
    const musicStore = useMusicStore();
    const accept = computed(() => musicStore.encode.map(v => '.' + v).join(', '))
    const isDrag = ref(false);
    function dropHandle(e: DragEvent) {
        const arr = dropAudio(e);
        if (arr) {
            musicStore.list = musicStore.add(arr, musicStore.list);
            isDrag.value = false;
        }
    }
    function changeHandle(e: Event) {
        const input = e.target as HTMLInputElement;
        const files = input.files;
        if (files && files.length > 0) {
            musicStore.list = musicStore.add([...files], musicStore.list);
        }
    }
</script>
<template>
    <div class="music-view" :class="{
        'drag-active': isDrag
    }" @dragleave.prevent="isDrag = false" @dragover.prevent="isDrag = true" @drop.prevent="dropHandle">
        <FirstMusic v-if="musicStore.total > 0" />
        <div v-else class="df-c-c empty ">
            <p>tip: 添加音频文件</p>
            <button class="empty-button big-btn" @click="() => musicStore.addList()">打开文件夹</button>
            <label class="empty-button big-btn">
                <input @change="changeHandle" multiple type="file" :accept="accept" />
                打开音频文件
            </label>
        </div>
    </div>
</template>
<style scoped>
    .music-view {
        width: 100%;
        height: 100%;
    }

    .empty {
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: var(--pc-gap-normal);
    }

    .empty p {
        color: var(--pc-theme-fs-tint-color);
    }

    .empty-button {
        padding: 1rem 2rem;
        font-size: 2rem;
        border: 1px solid var(--pc-border-color);
        border-radius: 1rem;
    }

    .empty-button:hover {
        background-color: var(--pc-hover-color);
    }

    [type="file"] {
        display: none;
    }

    .drag-active {
        opacity: 0.6;
    }

    @media screen and (max-width:480px) {
        .empty-button {
            font-size: 1.4rem;
        }
    }
</style>