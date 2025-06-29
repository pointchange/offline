<script lang="ts" setup>
    import { ref, useTemplateRef } from 'vue';
    const model = defineModel<number>()
    interface Slider {
        min?: number,
        max?: number,
        step?: number | 'any',
        r?: number,
        height?: number,
        bgColor?: string,
        activeColor?: string,
        color?: string,
        sliderThumbColor?: string,
        tooltipColor?: string,
        tooltipBorderColor?: string,
        value?: number,
        format?: (v: string | number) => string | number,
        alwayShowTooltip?: boolean,

    }
    type Keyword = 'change' | 'input'
    const emit = defineEmits<{
        (e: Keyword, value: number | string): void
        (e: Keyword, value: number | string): void
    }>()
    const props = withDefaults(defineProps<Slider>(), {
        min: 0,
        max: 100,
        step: 1,
        r: 20,
        height: 4,
        bgColor: '#ddd',
        activeColor: '#000',
        color: '#000',
        sliderThumbColor: '#000',
        tooltipColor: '#fff',
        alwayShowTooltip: false,
        tooltipBorderColor: '#ddd'
        // value: 0
    });
    const lineRef = useTemplateRef('lineRef')
    const sliderThumbX = ref(0);
    const isAuto = ref(true);
    const isTransition = ref(true);
    const progressValue = ref(0);
    const autoChangeValue = ref(0);
    const showTooltip = ref(false);
    function fotmatTooltip() {
        const { format } = props;
        const n = isAuto.value ? autoChangeValue.value : progressValue.value;
        if (format) {
            return format(n);
        } else {
            return n;
        }
    }
    function move() {
        const { max, value } = props;
        let v = 0;
        if (value) {
            autoChangeValue.value = value
            v = value / max;
        } else {
            if (typeof model.value === 'number') {
                autoChangeValue.value = model.value
                v = model.value;
            }
        }
        if (!lineRef.value) return 0;
        const w = lineRef.value.getBoundingClientRect().width;
        const dx = w * v;
        return dx;
    }
    let recordX = 0;
    function downHandle() {
        if (props.value !== 0) {
            recordX = move();
        }
        isTransition.value = false;
        isAuto.value = false;
        showTooltip.value = true;
        const { step, min, max } = props;
        if (!lineRef.value) return 0;
        if (recordX) {
            sliderThumbX.value = recordX;
        }
        const moveHandle = (e: MouseEvent | TouchEvent) => {
            let clientX = e instanceof MouseEvent ? e.clientX : e.changedTouches[0].clientX;
            // const { clientX } = e;

            if (!lineRef.value) return;
            const line = lineRef.value.getBoundingClientRect();
            if (typeof step !== 'number') {
                sliderThumbX.value = clientX - line.left;
                sliderThumbX.value = Math.max(0, Math.min(sliderThumbX.value, line.width))
            } else {
                let cx = (clientX - line.left) / line.width;
                cx = Math.max(0, Math.min(cx, 1));
                cx = cx * (max - min) + min;
                cx = Math.round(cx / step) * step;
                cx = Math.max(min, Math.min(cx, max));
                let p = (cx - min) / (max - min);
                sliderThumbX.value = p * line.width;
            }
            progressValue.value = sliderThumbX.value / line.width * max;
            if (typeof model.value === 'number') {
                model.value = progressValue.value;
            }
            emit('input', progressValue.value);
        }
        const upHandle = () => {
            if (!lineRef.value) return;
            emit('change', progressValue.value);
            if (typeof model.value === 'number') {
                model.value = progressValue.value;
            }
            recordX = sliderThumbX.value;
            document.removeEventListener('mousemove', moveHandle)
            document.removeEventListener('mouseup', upHandle);
            document.removeEventListener('touchmove', moveHandle);
            document.removeEventListener('touchend', upHandle);
            showTooltip.value = false;
            isAuto.value = true;
            isTransition.value = true;
        }
        document.addEventListener('mousemove', moveHandle);
        document.addEventListener('mouseup', upHandle);
        document.addEventListener('touchmove', moveHandle);
        document.addEventListener('touchend', upHandle);
    }

    function clickHandle(e: MouseEvent) {
        const { clientX } = e;
        if (!lineRef.value) return;
        const line = lineRef.value.getBoundingClientRect();
        const { step, min, max } = props;
        if (typeof step !== 'number') {
            sliderThumbX.value = clientX - line.left;
            sliderThumbX.value = Math.max(0, Math.min(sliderThumbX.value, line.width))
        } else {
            let cx = (clientX - line.left) / line.width;
            cx = Math.max(0, Math.min(cx, 1));
            cx = cx * (max - min) + min;
            cx = Math.round(cx / step) * step;
            cx = Math.max(min, Math.min(cx, max));
            let p = (cx - min) / (max - min);
            sliderThumbX.value = p * line.width;
        }
        if (typeof model.value === 'number') {
            model.value = sliderThumbX.value / line.width * max;
        }
        emit('change', sliderThumbX.value / line.width * max);
    }
</script>
<template>
    <div @click="clickHandle" ref="rangeRef" @dragstart.prevent="" class="range" :style="{
        '--r': r + 'px',
        '--height': height + 'px',
        '--bg-color': bgColor,
        '--active-color': activeColor,
        '--color': color,
        '--sliderThumb-color': sliderThumbColor,
        '--tooltip-color': tooltipColor,
        '--tooltip-border-color': tooltipBorderColor,
    }">
        <div :class="{
            'active-transition': isTransition
        }" @dragstart.prevent.passive="" @touchstart.passive="downHandle" @mousedown="downHandle" class="slider-thumb"
            :style="{
                transform: `translateX(${isAuto ? move() : sliderThumbX}px)`,
            }">
            <div v-show="alwayShowTooltip || showTooltip" class="tooltip">{{ fotmatTooltip() }}
            </div>
        </div>
        <div @dragstart.prevent="" ref="lineRef" class="line">
            <div class="line-hide" :style="{
                transform: `translateX(${isAuto ? move() : sliderThumbX}px)`,
            }"></div>
        </div>
    </div>

</template>
<style scoped>
    .range {
        --r: 20px;
        --height: 4px;
        padding-right: calc(var(--r) / 2);
        position: relative;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .range:hover .slider-thumb {
        opacity: 1;
    }

    .line {
        position: relative;
        margin-left: calc(-1 * var(--r) / 2);
        min-width: 130px;
        min-height: var(--height);
        width: 100%;
        height: var(--height);
        background-color: var(--bg-color);
        border-radius: var(--height);
        z-index: -1;
        overflow: hidden;
    }

    .line-hide {
        position: absolute;
        top: 0;
        width: 100%;
        min-height: 100%;
        left: -100%;
        background-color: var(--active-color);
        transform: translateX(0);
    }

    .active-transition {
        transition: transform 0.1s linear;
    }

    .slider-thumb {
        position: relative;
        width: var(--r);
        height: var(--r);
        border-radius: 50%;
        background-color: var(--sliderThumb-color);
        outline: 2px solid transparent;
        transform: translateX(0px);
        cursor: grab;
        opacity: 0;
    }

    .tooltip {
        display: none;
        position: absolute;
        top: -50%;
        left: 50%;
        transform: translate(-50%, -100%);
        padding: 0.4rem;
        outline: 1px solid var(--tooltip-border-color);
        border-radius: 6px;
        color: var(--color);
        background-color: var(--tooltip-color);
    }


    .active-tooltip {
        opacity: 1;
    }

    .slider-thumb:hover {
        outline-color: var(--sliderThumb-color);
    }

    .slider-thumb:hover .tooltip {
        display: block !important;
    }

    .slider-thumb:active {
        cursor: grabbing;
        border-color: var(--pc-theme-primary);
    }

</style>