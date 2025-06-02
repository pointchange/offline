<script lang="ts" setup>
    import { NLayoutHeader, NFlex, NButton, NIcon, NPopover } from 'naive-ui';
    import { useSettingStore } from '@/stores/setting';
    import Github from './icon/Github.vue';
    import { Settings20Regular } from "@vicons/fluent"
    const themeStore = useSettingStore();

</script>
<template>
    <n-layout-header class="header" position="absolute" bordered>
        <n-flex align="center" justify="space-between">
            <n-button tag="a" href="https://github.com/pointchange" target="_blank">
                <template #icon>
                    <n-icon>
                        <Github />
                    </n-icon>
                </template>
                <span>pointchange</span>
            </n-button>
            <n-flex align="center" justify="space-between">
                <n-button @click="() => themeStore.setTheme()" quaternary>
                    {{ themeStore.themeText }}
                </n-button>
                <n-popover trigger="hover">
                    <template #trigger>
                        <n-button quaternary>
                            <template #icon>
                                <n-icon>
                                    <Settings20Regular />
                                </n-icon>
                            </template>
                        </n-button>
                    </template>
                    <span>暂定</span>
                </n-popover>
            </n-flex>
        </n-flex>
    </n-layout-header>
</template>