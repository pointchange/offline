<script lang="ts" setup>
    import { NSpace, NButton } from 'naive-ui';
    import { useSettingStore } from '@/stores/setting';
    type Type = 'success' | 'info' | 'warning' | 'error';
    const settingStore = useSettingStore();
    const PRIMARYCOLOR = "#18a058";
    const INFOCOLOR = "#2080f0";
    const WARNINGCOLOR = "#f0a020";
    const ERRORCOLOR = "#d03050";
    interface BtnsColor {
        type: Type
        color: string
    }
    const btnsColor: BtnsColor[] = [
        { type: 'success', color: PRIMARYCOLOR },
        { type: 'info', color: INFOCOLOR },
        { type: 'warning', color: WARNINGCOLOR },
        { type: 'error', color: ERRORCOLOR }
    ];
    function setColor(color: string) {
        settingStore.themeOverrides = {
            common: {
                primaryColor: color
            },
            Button: {
                textColor: color
            }
        }
    }
    function changeColor(color: string) {
        setColor(color);
    }
    function inputColor(e: Event) {
        const target = e.target as HTMLInputElement;
        setColor(target.value);
    }
</script>
<template>
    <n-space align="center">
        <n-button circle v-for="item in btnsColor" :key="item.type" :type="item.type"
            @click="changeColor(item.color)"></n-button>
        <input @change="inputColor" type="color" name="color">
    </n-space>
</template>
<style scoped></style>