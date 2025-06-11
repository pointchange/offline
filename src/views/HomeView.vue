<script lang="ts" setup>
    import { useRouter } from 'vue-router';

    const router = useRouter();
    function toView() {
        router.push('music');
    }
</script>
<template>
    <div class="home-view">
        <header>Offline……</header>
        <hr>
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
        padding: 0 0.4rem;
    }

    header {
        font-size: 2rem;
    }

    .card-item {
        padding: 1rem 0;
        display: flex;
        flex-direction: column;
        width: 300px;
        gap: 0.4rem;
        border: 1px solid var(--pc-border-color);
    }

    .card-item span {
        margin-left: 1rem;
    }

    audio {
        pointer-events: none;
    }
</style>