<script lang="ts" setup>
    import { routesTotal } from '@/router';
    import { useSettingStore } from '@/stores/setting';
    import { useRouter } from 'vue-router';
    const settingStore = useSettingStore();
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
        <article class="card-container">
            <section @click="toView" class="card">
                <span>音乐</span>
                <div class="card-content">
                    <audio :class="{
                        'audio-dark-theme': settingStore.isDarktheme
                    }" controls></audio>
                </div>
            </section>
        </article>
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
        pointer-events: none;
    }

    .audio-dark-theme {
        opacity: 0.5;
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

    .card {
        padding: var(--pc-gap-large);
        display: flex;
        flex-direction: column;
        width: 350px;
        gap: var(--pc-gap-small);
        border: 1px solid var(--pc-border-color);
    }

    .card-content {
        display: grid;
        justify-content: center;
    }

    @media screen and (max-width:480px) {
        .card {
            width: 100%;
            justify-content: center;
        }
    }




</style>