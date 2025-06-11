<script lang="ts" setup>
    import { useMusicStore } from '@/stores/music';
    import { computed, ref, useTemplateRef } from 'vue';
    enum PlayMode {
        Order,
        Random,
        Repeat,
        Reversed
    }
    enum PlayModeString {
        Order = '顺序',
        Random = '随机',
        Repeat = '重复',
        Reversed = '反转'
    }
    const audioRef = useTemplateRef('audioRef');
    const musicStore = useMusicStore();
    const isMuted = ref(false);
    const isPlaying = ref(false);
    const OrderString = computed(() => {
        switch (musicStore.music.order) {
            case PlayMode.Random:
                return PlayModeString.Random;
            case PlayMode.Repeat:
                return PlayModeString.Repeat;
            case PlayMode.Reversed:
                return PlayModeString.Reversed;
            default:
                return PlayModeString.Order;
        }
    });
    const playString = computed(() => isPlaying.value ? '暂停' : "播放")
    function timeFormat(time: number) {
        function isUnitsDigit(n: number) {
            return n < 10 ? '0' + n : n
        }
        let hour = isUnitsDigit(Math.floor(time / 3600));
        let min = isUnitsDigit(Math.floor(time / 60) % 60);
        let second = isUnitsDigit(Math.floor(time % 60));
        return (+hour > 0 ? `${hour}:` : '') + `${min}:${second}`;
    }
    function timeupdateHandle(e: Event) {
        const audio = e.target as HTMLAudioElement;
        musicStore.music.currentTime = audio.currentTime;

    }
    function canplayHandle(e: Event) {
        const audio = e.target as HTMLAudioElement;
        audio.play();
        musicStore.music.duration = audio.duration;
        isPlaying.value = true;
    }
    function errorHandle() {

    }
    function nextAndPre() {
        if (!audioRef.value) return;
        musicStore.endedHandle(audioRef.value);
    }
    function progressChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (!audioRef.value) return;
        audioRef.value.currentTime = +target.value
    }
    function volumnChange(e: Event) {
        const target = e.target as HTMLInputElement;
        if (!audioRef.value) return;
        const value = +target.value;
        audioRef.value.volume = value;
        isMuted.value = value === 0;
    }
    let recordPreVolumn = 1;
    function volumnClick() {
        isMuted.value = !isMuted.value;
        if (isMuted.value) {
            recordPreVolumn = musicStore.music.volumn;
            musicStore.music.volumn = 0;
        } else {
            musicStore.music.volumn = recordPreVolumn;
        }

    }
    function playHandle() {
        if (musicStore.musicMetadata.url === '') return;
        if (!audioRef.value) return;
        isPlaying.value = !isPlaying.value;
        isPlaying.value ? audioRef.value.play() : audioRef.value.pause();
    }
</script>
<template>
    <div :class="{
        deactive: musicStore.total === 0
    }" class="music-controls">
        <audio controls @ended="(e: Event) => musicStore.endedHandle(e.target as HTMLAudioElement)"
            @timeupdate="timeupdateHandle" :muted="isMuted" ref="audioRef" @canplay="canplayHandle"
            :src="musicStore.musicMetadata.url" @error="errorHandle"></audio>
        <div>
            <input class="progress" @input="progressChange" :value="musicStore.music.currentTime" :min="0" step="any"
                :max="musicStore.music.duration" type="range" name="progress">
        </div>
        <div class="df-sb-c">
            <span>{{ musicStore.musicMetadata.name }}</span>
            <div class="df-c-c gap">
                <span>{{ timeFormat(musicStore.music.currentTime) }} / {{ timeFormat(musicStore.music.duration)
                }}</span>
                <input @input="volumnChange" v-model="musicStore.music.volumn" :min="0" :max="1" step="0.05"
                    type="range" name="volumn">
                <button :class="{
                    volumn: isMuted
                }" @click="volumnClick" class="button ">音量</button>
                <button @click="musicStore.addList" class="button">打开文件夹</button>
                <button @click="musicStore.setPlayOrder" class="button">{{ OrderString }}</button>
                <button @click="nextAndPre" class="button">上一首</button>
                <button @click="nextAndPre" class="button">下一首</button>
                <button @click="playHandle" class="button">{{ playString }}</button>
            </div>
        </div>

    </div>
</template>
<style scoped>
    .music-controls {
        position: fixed;
        bottom: 0;
        padding: 0 0.4rem;
        width: 100vw;
        background-color: var(--pc-white);
    }

    .deactive {
        pointer-events: none;
    }

    .progress {
        width: 100%;
    }

    audio {
        display: none;
    }

    .gap {
        gap: 0.4rem;
    }

    .volumn {
        background-color: var(--pc-border-color);
    }

</style>