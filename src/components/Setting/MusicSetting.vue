<script lang="ts" setup>
    import { useSettingStore } from '@/stores/setting';
    import { NSpace, NSwitch, NText } from 'naive-ui';
    const settingStore = useSettingStore();
</script>
<template>
    <n-space vertical>
        <n-space>
            <n-switch v-model:value="settingStore.musicSetting.destoryComponent" />
            <n-text>销毁音乐页面</n-text>
        </n-space>
        <n-space>
            <n-switch v-model:value="settingStore.musicSetting.showMusicBtn" />
            <n-text>隐藏/显示音乐页面按钮</n-text>
        </n-space>
    </n-space>
</template>
<style scoped></style>