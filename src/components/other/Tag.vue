<script lang="ts" setup>
    interface Tag {
        size?: 'small' | 'normal' | 'large',
        color?: string
    }
    withDefaults(defineProps<Tag>(), {
        size: 'small',
        color: '#000'
    })
</script>
<template>
    <span :class="[size]" :style="{
        '--color': color,
    }" class="tag">
        <slot></slot>
    </span>

</template>
<style scoped>
    .tag {
        padding: 0.4rem;
        font-size: 12px;
        border: 2px solid var(--color);
        border-radius: 0.4rem;
        color: var(--color);
    }

    .small {
        padding: 0.1rem 0.2rem;
        font-size: 12px;
        border-radius: 0.3rem;
    }

    .normal {
        padding: 0.4rem;
        font-size: 12px;
    }

    .large {
        padding: 0.6rem;
        font-size: 16px;
    }
</style>