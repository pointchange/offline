<script lang="ts" setup>
    import { useMusicStore } from '@/stores/music';
    import { useSettingStore } from '@/stores/setting';
    import { NSpace, NSwitch, NText, NDynamicTags } from 'naive-ui';
    const settingStore = useSettingStore();
    const musicStore = useMusicStore();
    //https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Audio_and_video_manipulation#%E9%9F%B3%E9%A2%91%E5%A4%84%E7%90%86
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
        <n-space vertical>
            <n-text tag="a" target="_blank"
                href="https://developer.mozilla.org/zh-CN/docs/Web/Media/Guides/Formats/Containers">简单来说：浏览器的编解码器支持，理论上无论什么格式的容器都能播放</n-text>
            <n-text>实际上得自己动手测试了……</n-text>
            <n-space align="center">
                <n-text>目前支持的音乐格式：</n-text>
                <n-dynamic-tags v-model:value="musicStore.encode" />
            </n-space>
        </n-space>
    </n-space>
</template>
<style scoped></style>