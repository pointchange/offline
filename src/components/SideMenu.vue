<script lang="ts" setup>
    import { h, ref, watch, type Component, type RendererElement, type RendererNode, type VNode } from 'vue';
    import { Home20Regular, MusicNote120Regular, Settings20Regular } from "@vicons/fluent"
    import { NIcon, NMenu, NBadge, } from 'naive-ui';
    import { RouterLink } from 'vue-router';
    import { useNavStore } from '@/stores/nav';
    import { useSettingStore } from '@/stores/setting';
    const navStore = useNavStore();
    const settingStore = useSettingStore();
    function renderIcon(icon: Component) {
        return () => h(NIcon, null, { default: () => h(icon) })
    }
    function renderBadge() {
        return () => h(NBadge, { value: "live" })
    }
    interface MenuOptions {
        label: () => VNode<RendererNode, RendererElement, { [key: string]: any; }>
        key: string
        icon: () => VNode<RendererNode, RendererElement, { [key: string]: any; }>
        extra: (() => VNode<RendererNode, RendererElement, { [key: string]: any; }>) | undefined
    }
    const menuOptions = ref<MenuOptions[]>([
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            path: '/'
                        }
                    },
                    { default: () => '主页' }
                ),
            key: 'home',
            icon: renderIcon(Home20Regular),
            extra: undefined,
        },
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: 'music',
                        }
                    },
                    { default: () => '音乐' }
                ),
            key: 'music',
            icon: renderIcon(MusicNote120Regular),
            extra: renderBadge(),
        },
        {
            label: () =>
                h(
                    RouterLink,
                    {
                        to: {
                            name: 'setting',
                        }
                    },
                    { default: () => '设置' }
                ),
            key: 'setting',
            icon: renderIcon(Settings20Regular),
            extra: undefined,
        },
    ]);
    watch(() => settingStore.musicSetting.destoryComponent, (value) => {
        const item = menuOptions.value.find(item => item.key === 'music')
        if (item) {
            if (value) {
                item.extra = undefined;
            } else {
                item.extra = renderBadge();
            }
        }
    })
</script>
<template>
    <n-menu v-model:value="navStore.nav" :collapsed-icon-size="22" :options="menuOptions" />
</template>
<style scoped></style>