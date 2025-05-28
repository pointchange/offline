<script lang="ts" setup>
    import { h, ref, type Component } from 'vue';
    import { Home20Regular, MusicNote120Regular } from "@vicons/fluent"
    import { NIcon } from 'naive-ui';
    import { RouterLink } from 'vue-router';
    import { useNavStore } from '@/stores/nav';
    const navStore = useNavStore()
    function renderIcon(icon: Component) {
        return () => h(NIcon, null, { default: () => h(icon) })
    }
    const inverted = ref(false);
    const menuOptions = ref([
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
            icon: renderIcon(Home20Regular)
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
            icon: renderIcon(MusicNote120Regular)
        },
    ]);
</script>
<template>
    <n-layout-sider position="absolute" bordered show-trigger collapse-mode="width" :collapsed-width="64" :width="150"
        :native-scrollbar="false" :inverted="inverted" style="max-height: 320px">
        <n-menu v-model:value="navStore.nav" default-value="home" :inverted="inverted" :collapsed-width="64"
            :collapsed-icon-size="22" :options="menuOptions" />
    </n-layout-sider>
</template>
<style scoped></style>