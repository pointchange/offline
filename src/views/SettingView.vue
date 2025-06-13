<script lang="ts" setup>
    import {
        useSettingStore, DARKZHCN,
        LIGHTZHCN, FOLLOWSYSTEMZHCN, DARK, LIGHT, FOLLOWSYSTEM
    } from '@/stores/setting';

    const setting = useSettingStore();
    const themeRadios = [
        {
            name: DARKZHCN,
            value: DARK,
            handle: () => setting.setTheme(true),
        },
        {
            name: LIGHTZHCN,
            value: LIGHT,
            handle: () => setting.setTheme(false),
        },
        {
            name: FOLLOWSYSTEMZHCN,
            value: FOLLOWSYSTEM,
            handle: setting.setFollowSystem,
        },
    ]
</script>
<template>
    <div class="setting">
        <ul class="list">
            <li class="list-item ">
                <label v-for="item in themeRadios">
                    <input :checked="setting.themeValue === item.value" @change="item.handle" type="radio" name="theme"
                        :value="item.value">
                    <span>{{ item.name }}</span>
                </label>
                <!-- <label>
                    <input :checked="setting.themeValue === DARK" @change="() => setting.setTheme(true)" type="radio"
                        name="theme" :value="DARK">
                    <span>{{ DARKZHCN }}</span>
                </label>
                <label>
                    <input :checked="setting.themeValue === LIGHT" @change="() => setting.setTheme(false)" type="radio"
                        name="theme" :value="LIGHT">
                    <span>{{ LIGHTZHCN }}</span>
                </label>
                <label>
                    <input :checked="setting.themeValue === FOLLOWSYSTEM" @change="() => setting.setFollowSystem()"
                        type="radio" name="theme" :value="FOLLOWSYSTEM">
                    <span>{{ FOLLOWSYSTEMZHCN }}</span>
                </label> -->
            </li>
        </ul>
    </div>
</template>
<style scoped>
    .setting {
        padding: var(--pc-gap-normal);
    }

    .list-item {
        display: flex;
        gap: var(--pc-gap-normal);
    }
</style>