<script lang="ts" setup>
    import { NLayout, NLayoutContent, NList, NListItem, } from 'naive-ui';
    import Theme from '../components/Setting/Theme.vue';
    import Color from '../components/Setting/Color.vue';
    import MusicSetting from '@/components/Setting/MusicSetting.vue';
    import Copyright from '@/components/Copyright.vue';

</script>
<template>
    <n-layout>
        <n-layout-content>
            <n-list hoverable>
                <n-list-item>
                    <Theme />
                </n-list-item>
                <n-list-item>
                    <Color />
                </n-list-item>
                <n-list-item>
                    <MusicSetting />
                </n-list-item>
                <template #footer>
                    <Copyright />
                </template>
            </n-list>

        </n-layout-content>
    </n-layout>
</template>
<style scoped></style>