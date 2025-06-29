<script lang="ts" setup>
    import { useMusicStore } from '@/stores/music';
    import { useTemplateRef } from 'vue';

    const musicStore = useMusicStore();
    const lyricRef = useTemplateRef("lyricRef");

    function countHeight() {
        if (!musicStore.hasLrc) return 0;
        if (!lyricRef.value) return;
        const height = lyricRef.value.getBoundingClientRect().height;
        const lineHeight = height / musicStore.getLrcTotal;
        const { index } = musicStore.activeLrc;
        return -lineHeight * index - lineHeight / 2;
    }
    function activeClass(text: string) {
        const { texts } = musicStore.activeLrc;
        return texts.some(v => v === text);
    }
</script>
<template>
    <div class="lyric">
        <section v-show="musicStore.hasLrc" ref="lyricRef" class="lyric-container" :style="{
            transform: `translateY(${countHeight()}px)`
        }">
            <p v-for="item in musicStore.lrc" :class="{
                'lyric-active': activeClass(item.text)
            }">{{ item.text }}</p>
        </section>
        <div v-show="!musicStore.hasLrc" class="df-c-c empty-lrc">
            <p>暂无歌词</p>
        </div>
    </div>
</template>
<style scoped>
    .lyric {
        position: absolute;
        top: 48%;
        width: 100%;
    }

    .lyric-container {
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

    .empty-lrc {
        height: 100%;
    }
</style>