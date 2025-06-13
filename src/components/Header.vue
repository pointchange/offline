<script lang="ts" setup>
    import { useSettingStore, LIGHT, DARK } from '@/stores/setting';

    const setting = useSettingStore();
    function setTheme() {
        setting.isDarktheme = !setting.isDarktheme;
        setting.themeValue = setting.isDarktheme ? DARK : LIGHT;
        setting.setTheme(setting.isDarktheme);
    }
</script>
<template>
    <div class="df-c-c">
        <a @click="setting.foldNav = !setting.foldNav" class="a" href="javascript:;">菜单</a>
        <a class="a" target="_blank" href="https://github.com/pointchange/">GitHub</a>
    </div>
    <div>
        <a @click="setTheme" class="a" href="javascript:;">{{ setting.themeText }}</a>
        <RouterLink class="a" to="/setting">设置</RouterLink>
    </div>
</template>
<style scoped>
    .a {
        padding: var(--pc-gap-normal);
        display: inline-block;
    }

    .a:hover {
        background-color: var(--pc-hover-color);
    }
</style>