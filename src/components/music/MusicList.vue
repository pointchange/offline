<script lang="ts" setup>
    import { NEl, useThemeVars } from 'naive-ui';
    import MusicListItem from './MusicListItem.vue';
    import { useMusicStore } from '@/stores/music';
    import { ref, watch } from 'vue';
    import { useSettingStore } from '@/stores/setting';
    const { value: { primaryColor } } = useThemeVars();

    const settingStore = useSettingStore();
    const rgba = ref('');
    watch(() => primaryColor, () => {
        rgba.value = settingStore.setRgbColor(primaryColor, 0.2);
    }, { immediate: true })
    const musicStore = useMusicStore();
</script>
<template>
    <NEl tag="ul" class="ul" :style="{
        '--p-color': rgba
    }">
        <MusicListItem v-for="item in musicStore.filterList" :key="item.name" :item="item">
        </MusicListItem>
    </NEl>

</template>
<style scoped>

    ul {
        margin: 0;
        padding: 0;
    }
</style>