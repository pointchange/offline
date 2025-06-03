<script lang="ts" setup>
    import { useSettingStore } from '@/stores/setting';
    import { DARK, DARKZHCN, FOLLOWSYSTEM, FOLLOWSYSTEMZHCN, LIGHT, LIGHTZHCN } from '@/utils/setting/const';
    import { NRadio, NRadioGroup, NSpace, useOsTheme, } from 'naive-ui';
    const settingStore = useSettingStore();

    const themeRadio = [
        {
            value: LIGHT,
            label: LIGHTZHCN
        },
        {
            value: DARK,
            label: DARKZHCN
        },
        {
            value: FOLLOWSYSTEM,
            label: FOLLOWSYSTEMZHCN
        }
    ];
    function setTheme(value: string) {
        switch (value) {
            case LIGHT:
                settingStore.isDarktheme = false;
                break;
            case DARK:
                settingStore.isDarktheme = true;
                break;
            default:
                settingStore.isDarktheme = useOsTheme().value === DARK;
                settingStore.isFollowSystem = true;
                break;
        }
    }

</script>
<template>
    <n-radio-group @update:value="setTheme" v-model:value="settingStore.themeZhCN" name="themeRadiogroup">
        <n-space>
            <n-radio v-for="item in themeRadio" :key="item.value" :value="item.value">
                {{ item.label }}
            </n-radio>
        </n-space>
    </n-radio-group>
</template>
<style scoped></style>