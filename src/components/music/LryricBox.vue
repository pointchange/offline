<script lang="ts" setup>
    import { useMusicStore } from '@/stores/music';
    import { ref, useTemplateRef } from 'vue';

    const musicStore = useMusicStore();
    const lyricRef = useTemplateRef("lyricRef");
    const isStopScroll = ref(false);
    const lineHeight = ref(0);
    const y = ref(0);

    function countHeight() {
        if (isStopScroll.value) return y.value;
        if (!musicStore.hasLrc) return 0;
        if (!lyricRef.value) return 0;
        const height = lyricRef.value.getBoundingClientRect().height;
        lineHeight.value = height / musicStore.getLrcTotal;
        const { index } = musicStore.activeLrc;
        y.value = -lineHeight.value * index - lineHeight.value / 2;
        return y.value
    }
    function activeClass(text: string, i: number) {
        if (isStopScroll.value) return false;
        const { texts, index } = musicStore.activeLrc;
        return index === i && texts.some(v => v === text);
    }
    let t = 0;
    const moveTime = ref('00:00');
    let currentTime = 0;
    function getIndex() {
        const i = Math.abs(y.value) / lineHeight.value;
        const index = Math.min(musicStore.getLrcTotal - 1, Math.max(0, Math.ceil(i)));
        currentTime = musicStore.lrc[index].time;
        moveTime.value = musicStore.timeFormat(currentTime);
    }
    function mousedownHandler(e: MouseEvent) {
        isStopScroll.value = true;
        const mousedownY = e.clientY;
        const offset = y.value;
        clearTimeout(t);
        getIndex();
        document.onmousemove = e => {
            y.value = offset + (e.clientY - mousedownY);
            getIndex();

        }
        document.onmouseup = e => {
            e.preventDefault();
            t = setTimeout(() => {
                isStopScroll.value = false;
                if (t) {
                    clearTimeout(t);
                    t = 0;
                }
            }, 3000);
            document.onmousemove = null;
            document.onmouseup = null;
        }
    }
    function play() {
        musicStore.audio.currentTime = currentTime;
        isStopScroll.value = false;
    }
</script>
<template>
    <div class="music-lyric">
        <div class="lyric" @mousedown.prevent="mousedownHandler">
            <section :class="{
                'lyric-container-animate': isStopScroll
            }" v-show="musicStore.hasLrc" ref="lyricRef" class="lyric-container" :style="{
                transform: `translateY(${countHeight()}px)`
            }">
                <p v-for="(item, index) in musicStore.lrc" :class="{
                    'lyric-active': activeClass(item.text, index)
                }">{{ item.text }}</p>
            </section>
            <div v-show="!musicStore.hasLrc" class="df-c-c empty-lrc">
                <p>暂无歌词</p>
            </div>
        </div>
        <div v-show="musicStore.hasLrc && isStopScroll" class="middle-line" :style="{ height: lineHeight + 'px' }">
            <button @click="play" class="button">开始</button>
            <div></div>
            <span>{{ moveTime }}</span>
        </div>
    </div>
</template>
<style scoped>
    .middle-line {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        z-index: 20;
    }

    .middle-line div {
        flex: 1;
        height: 1px;
        background: linear-gradient(to right, var(--pc-theme-fs-color) 0 2%, transparent 20% 80%, var(--pc-theme-fs-color) 98% 100%);
    }

    .lyric {
        position: absolute;
        top: 48%;
        width: 100%;
    }

    .lyric-container {
        color: var(--pc-theme-fs-tint-color);
        transition: transform 0.8s ease, opacity 0.8s ease;
    }

    .lyric-container-animate {
        transition: none;
        user-select: none;
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