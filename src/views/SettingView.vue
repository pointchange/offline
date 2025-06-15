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
    ];
    const themeColors = [
        '72, 61, 139',
        '34, 139, 34',
        '220, 20, 60',
        '255, 140, 0',
    ];

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
            </li>
            <li class="list-item ">
                <button @click="setting.setThemeColor(name)" :class="{ 'button-active': setting.color === name }"
                    :style="{
                        backgroundColor: `rgb(${name})`,
                    }" v-for="name in themeColors" class="button">&nbsp;</button>
                <!-- <input type="color" @input="(e: Event) => setting.setThemeColor((e.target as HTMLInputElement).value)"> -->
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
        align-items: center;
        gap: var(--pc-gap-normal);
    }

    .button {
        width: 2rem;
        height: 2rem;
        border-radius: 0.4rem;
        opacity: 0.6;
    }

    .button-active {
        opacity: 1;
    }

    .button:hover {
        opacity: 1;
    }
</style>