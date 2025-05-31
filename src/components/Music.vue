<script lang="ts" setup>
    import { DeleteFileSuffix, getFileSuffix } from '@/utils/music/format';
    import {
        Speaker220Regular, SpeakerMute20Regular, Play20Filled, Pause20Filled, Next20Filled, Previous20Filled, TextBulletListLtr20Filled, ArrowRepeatAll20Regular,
        ArrowClockwise20Filled,
        ArrowRepeatAll20Filled, ChevronUp20Filled, ChevronDown20Filled
    } from '@vicons/fluent'
    import { computed, reactive, ref, shallowRef, triggerRef, useTemplateRef, watch } from 'vue';
    import Random from './icon/Random.vue';
    import Reverse from './icon/Reverse.vue';
    import { useMusicStore } from '@/stores/music';
    const musicStore = useMusicStore();
    enum BtnList {
        Play = 'play',
        Next = 'next',
        Previous = 'Previous',
        Voice = 'Voice',
        Order = 'Order'
    }
    enum PlayMode {
        Order,
        Random,
        Repeat,
        Reversed
    }
    const music = reactive({
        currentTime: 0,
        duration: 0,
        order: PlayMode.Order
    });
    const isPlaying = ref(false);
    const isMuted = ref(false);
    const audioRef = useTemplateRef('audioRef');
    const total = computed(() => musicStore.list.length);
    const duration = computed(() => timeFormat(music.duration));
    const name = computed(() => DeleteFileSuffix(musicStore.musicMetadata.name));
    const voice = ref(1);
    const isCurrentTimeChanging = ref(true);
    interface ChangeBtnListIcon {
        mark: string | number
        oldIcon: any
        newIcon: any
        depend: boolean
    }
    function changeBtnListIcon(object: ChangeBtnListIcon) {
        const index = btnList.value.findIndex(v => v.name === object.mark)
        btnList.value[index].icon = object.depend ? object.newIcon : object.oldIcon;
        triggerRef(btnList);
    }

    function setSoundIcon() {
        changeBtnListIcon({
            mark: BtnList.Voice,
            oldIcon: Speaker220Regular,
            newIcon: SpeakerMute20Regular,
            depend: isMuted.value
        })
    }
    function setSound() {
        isMuted.value = !isMuted.value
        voice.value = isMuted.value ? 0 : 1;
        setSoundIcon()
    }
    function setPlayIcon() {
        changeBtnListIcon({
            mark: BtnList.Play,
            oldIcon: Play20Filled,
            newIcon: Pause20Filled,
            depend: isPlaying.value
        })
    }
    function setPlay() {
        isPlaying.value = !isPlaying.value
        if (!audioRef.value) return;
        if (isPlaying.value) {
            audioRef.value.play();
        } else {
            audioRef.value.pause();
        }
        setPlayIcon()
    }
    function setNext() {
        isPlaying.value = false;
        const index = musicStore.list.findIndex(v => v.name === musicStore.musicMetadata.name);
        let name = '';
        if (index === 0) {
            name = musicStore.list[total.value - 1].name
        } else if (index === total.value - 1) {
            name = musicStore.list[0].name
        } else {
            name = musicStore.list[index + 1].name
        }
        musicStore.playHandle(name);
    }
    function setPrevious() {
        isPlaying.value = false;
        const index = musicStore.list.findIndex(v => v.name === musicStore.musicMetadata.name);
        let name = '';
        if (index === 0) {
            name = musicStore.list[total.value - 1].name
        } else if (index === total.value - 1) {
            name = musicStore.list[0].name
        } else {
            name = musicStore.list[index - 1].name
        }
        musicStore.playHandle(name);
    }
    function timeFormat(time: number) {
        function isUnitsDigit(n: number) {
            return n < 10 ? '0' + n : n
        }
        let hour = isUnitsDigit(Math.floor(time / 3600));
        let min = isUnitsDigit(Math.floor(time / 60) % 60);
        let second = isUnitsDigit(Math.floor(time % 60));
        return (+hour > 0 ? `${hour}:` : '') + `${min}:${second}`;
    }
    function canplayHandle(e: Event) {
        const audio = e.target as HTMLAudioElement;
        music.duration = audio.duration;
        audio.play();
        isPlaying.value = true;
        setPlayIcon()
    }
    function errorHandle(e: Event) {
        console.log(e);
    }
    function timeupdateHandle(e: Event) {
        const audio = e.target as HTMLAudioElement;
        if (isCurrentTimeChanging.value) {
            music.currentTime = audio.currentTime;
        }
    }
    function updataVolumeHandle(value: number) {
        if (!audioRef.value) return;
        audioRef.value.volume = value;
        isMuted.value = value === 0;
    }
    function dragendHandle() {
        isCurrentTimeChanging.value = true
        if (!audioRef.value) return;
        audioRef.value.currentTime = music.currentTime
    }

    watch(isMuted, () => {
        setSoundIcon()
    })
    function setRepeat() {
        if (!audioRef.value) return;
        audioRef.value.currentTime = 0;
        audioRef.value.play();
    }
    function setRandom() {
        const index = Math.floor(Math.random() * total.value)
        const name = musicStore.list[index].name;
        musicStore.playHandle(name);
    }
    function endedHandle() {
        switch (music.order) {
            case PlayMode.Random:
                setRandom()
                break;
            case PlayMode.Repeat:
                setRepeat()
                break;
            case PlayMode.Reversed:
                setPrevious()
                break;
            default:
                setNext()
                break;
        }
    }
    function setPlayOrder() {
        const total = Object.keys(PlayMode).length / 2;
        music.order++;
        if (music.order > total - 1) {
            music.order = 0;
        }
        const index = btnList.value.findIndex(v => v.name === BtnList.Order)
        btnList.value[index].icon = (() => {
            switch (music.order) {
                case PlayMode.Random:
                    return Random;
                case PlayMode.Repeat:
                    return ArrowClockwise20Filled;
                case PlayMode.Reversed:
                    return Reverse;
                default:
                    return ArrowRepeatAll20Filled;
            }
        })()
        triggerRef(btnList);
    }


    const btnList = shallowRef([
        {
            name: BtnList.Voice,
            icon: Speaker220Regular,
            handle: setSound
        },
        {
            name: BtnList.Order,
            icon: ArrowRepeatAll20Regular,
            handle: setPlayOrder
        },
        {
            name: BtnList.Previous,
            icon: Previous20Filled,
            handle: endedHandle
        },
        {
            name: BtnList.Next,
            icon: Next20Filled,
            handle: endedHandle
        },
        {
            name: BtnList.Play,
            icon: Play20Filled,
            handle: setPlay
        }
    ])
</script>
<template>
    <audio @ended="endedHandle" @timeupdate="timeupdateHandle" :muted="isMuted" ref="audioRef" @canplay="canplayHandle"
        :src="musicStore.musicMetadata.url" @error="errorHandle"></audio>
    <Teleport to="body">
        <n-card class="music-card" size="small">
            <div class="lock" @click="">
                <n-button quaternary>
                    <template #icon>
                        <n-icon v-show="!musicStore.isShowMusicComponent" :component="ChevronUp20Filled"></n-icon>
                        <n-icon v-show="musicStore.isShowMusicComponent" :component="ChevronDown20Filled"></n-icon>
                    </template>
                </n-button>
            </div>
            <template #header>
                <n-slider @dragstart="isCurrentTimeChanging = false" @dragend="dragendHandle"
                    @update:value="(value: number) => music.currentTime = value"
                    :format-tooltip="(value: number) => timeFormat(value)" :value="music.currentTime" :min="0"
                    :max="music.duration" :step="0.01" />
            </template>
            <n-space align="center" justify="space-between">
                <n-text>{{ name }}</n-text>
                <n-space align="center">
                    <n-space>
                        <n-text>{{ timeFormat(music.currentTime) }}</n-text>
                        <n-text>/</n-text>
                        <n-text>{{ duration }}</n-text>
                    </n-space>
                    <n-slider :min="0" :max="1" @update:value="updataVolumeHandle" class="music-voice"
                        v-model:value="voice" :step="0.1" reverse />
                    <n-button v-for="item in btnList" :key="item.name" @click="item.handle" quaternary circle>
                        <template #icon>
                            <n-icon :component="item.icon"></n-icon>
                        </template>
                    </n-button>
                </n-space>
            </n-space>
        </n-card>
    </Teleport>
</template>
<style scoped>
    audio {
        display: none;
    }

    .music-card {
        position: fixed;
        bottom: 0;
    }

    .music-voice {
        width: 100px;
    }

    .lock {
        position: absolute;
        top: -2rem;
        right: 1rem;
    }
</style>