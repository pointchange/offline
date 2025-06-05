<script lang="ts" setup>
    import { NEl } from 'naive-ui';
    import { useMusicStore } from '@/stores/music';
    import { DeleteFileSuffix } from '@/utils/music/format';
    interface Item {
        item: F
    }
    defineProps<Item>()
    const musicStore = useMusicStore();

</script>
<template>
    <n-el tag="li" class="li" :class="{
        active: musicStore.musicMetadata.name === item.name
    }" @click="() => musicStore.playHandle(item)">
        {{ DeleteFileSuffix(item.name) }}
    </n-el>
</template>
<style scoped>
    .li {
        list-style: none;
        padding: 1rem 0;
        border-bottom: 1px solid var(--border-color);
        border-radius: 4px;
    }

    .li:hover {
        background-color: var(--p-color);
        color: var(--primary-color);
        cursor: pointer;
    }

    .active {
        background-color: var(--p-color);
        color: var(--primary-color)
    }
</style>