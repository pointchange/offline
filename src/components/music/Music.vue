<script lang="ts" setup>
    import { useMusicStore } from '@/stores/music';
    import { computed, ref } from 'vue';
    // enum PlayMode {
    //     Order,
    //     Random,
    //     Repeat,
    //     Reversed
    // }
    // enum PlayModeString {
    //     Order = '顺序',
    //     Random = '随机',
    //     Repeat = '重复',
    //     Reversed = '反转'
    // }
    const musicStore = useMusicStore();
    // const OrderString = computed(() => {
    //     switch (musicStore.music.order) {
    //         case PlayMode.Random:
    //             return PlayModeString.Random;
    //         case PlayMode.Repeat:
    //             return PlayModeString.Repeat;
    //         case PlayMode.Reversed:
    //             return PlayModeString.Reversed;
    //         default:
    //             return PlayModeString.Order;
    //     }
    // });
    // const playString = computed(() => musicStore.music.playing ? '暂停' : "播放")

    // let recordPreVolumn = 1;
    // function volumnClick() {
    //     musicStore.isMuted = !musicStore.isMuted
    //     musicStore.audio.muted = musicStore.isMuted
    //     if (musicStore.isMuted) {
    //         recordPreVolumn = musicStore.music.volumn;
    //         musicStore.music.volumn = 0;
    //     } else {
    //         musicStore.music.volumn = recordPreVolumn;
    //     }
    // }
    // function playHandle() {
    //     musicStore.music.playing = !musicStore.music.playing;
    //     musicStore.music.playing ? musicStore.audio.play() : musicStore.audio.pause();
    // }
</script>
<template>
    <div :class="{
        deactive: musicStore.total === 0
    }" class="music-controls">
        <!-- <h2>{{ musicStore.DeleteFileSuffix(musicStore.music.name) }}</h2> -->
        <div>
            <div class="time">{{ musicStore.timeFormat(musicStore.music.currentTime) }} / {{
                musicStore.timeFormat(musicStore.music.duration)
            }}</div>
            <input class="progress"
                @input="(e: Event) => musicStore.progressChange(+(e.target as HTMLInputElement).value)"
                :value="musicStore.music.currentTime" :min="0" step="any" :max="musicStore.music.duration" type="range"
                name="progress">
        </div>
        <div class="df-sb-c ">

            <div class="bottom-right">
                <input @input="(e: Event) => musicStore.volumnChange(+(e.target as HTMLInputElement).value)"
                    v-model="musicStore.music.volumn" :min="0" :max="1" step="0.05" type="range" name="volumn">
                <button :class="{
                    'muted-volumn': musicStore.isMuted
                }" @click="musicStore.volumnClick" class="button ">音量</button>
                <button @click="musicStore.addList" class="button">打开文件夹</button>
                <button @click="musicStore.setPlayOrder" class="button">{{ musicStore.OrderString }}</button>
                <button @click="musicStore.endedHandle" class="button">上一首</button>
                <button @click="musicStore.endedHandle" class="button">下一首</button>
                <button @click="musicStore.playBtnHandle" class="button">{{ musicStore.playString }}</button>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .music-controls {
        padding: var(--pc-gap-small);
        width: 100%;
    }

    .time {
        font-size: 12px;
    }

    .bottom-right {
        display: flex;
        gap: var(--pc-gap-small);
    }

    .deactive {
        pointer-events: none;
    }

    .progress {
        width: 100%;
    }

    .gap {
        gap: var(--pc-gap-small);
    }

    .muted-volumn {
        background-color: var(--pc-border-color);
    }

</style>