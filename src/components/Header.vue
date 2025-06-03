<script lang="ts" setup>
    import { NLayoutHeader, NFlex, NButton, NIcon, NPopover, useOsTheme } from 'naive-ui';
    import { useSettingStore } from '@/stores/setting';
    import Github from './icon/Github.vue';
    import { Settings20Regular } from "@vicons/fluent"
    import { watch } from 'vue';
    import { DARK } from '@/utils/setting/const';
    import { useRouter } from 'vue-router';
    import { useNavStore } from '@/stores/nav';
    const router = useRouter();
    const navStore = useNavStore();
    const settingStore = useSettingStore();
    const osTheme = useOsTheme()
    watch([() => settingStore.isFollowSystem, osTheme], ([v1, v2]) => {
        if (v1) {
            settingStore.isDarktheme = v2 === DARK;
        }
    })
    function toSetting() {
        navStore.nav = 'setting';
        router.push('/setting');
    }
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
                <n-button @click="() => settingStore.setTheme()" quaternary>
                    {{ settingStore.themeText }}
                </n-button>
                <n-popover trigger="hover">
                    <template #trigger>
                        <n-button quaternary @click="toSetting">
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