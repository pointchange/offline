<script lang="ts" setup>
    import { routesTotal } from '@/router';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    function toView() {
        router.push('music');
    }
</script>
<template>
    <div class="home-view">
        <header>Offline……</header>
        <div class="count">
            <p>统计组件</p>
            <h1 class="h1">{{ routesTotal }}</h1>
        </div>
        <div class="border-b"></div>
        <div class="card">
            <div @click="toView" class="card-item">
                <span>音乐</span>
                <audio controls></audio>
            </div>
        </div>
    </div>
</template>
<style scoped>
    .home-view {
        padding: 0 var(--pc-gap-small);
        display: grid;
        gap: var(--pc-gap-small);
    }

    audio {
        display: block;
    }

    .count {
        border-bottom: 1px solid var(--pc-border-color);
    }

    .h1 {
        font-size: 1.5rem;
    }

    header {
        font-size: 2rem;
    }

    .card-item {
        padding: var(--pc-gap-normal) 0;
        display: flex;
        flex-direction: column;
        width: 300px;
        gap: var(--pc-gap-small);
        border: 1px solid var(--pc-border-color);
    }

    .card-item span {
        margin-left: var(--pc-gap-normal);
    }

    audio {
        pointer-events: none;
    }
</style>