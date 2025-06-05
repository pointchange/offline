<script lang="ts" setup>
    import { NText, NSpace } from 'naive-ui';
    import CR from './icon/CR.vue';
</script>
<template>
    <n-space>
        <CR></CR>
        <n-text>
            2025
        </n-text>
        <n-text class="a" tag="a" href="https://github.com/pointchange" target="_blank">
            pointchange
        </n-text>
    </n-space>
</template>
<style scoped>
    .a {
        text-decoration: none;
    }
</style>