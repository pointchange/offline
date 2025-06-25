<script lang="ts" setup>
    import FirstMusic from '@/components/music/FirstMusic.vue';
    import { useMusicStore } from '@/stores/music';

    const musicStore = useMusicStore();
</script>
<template>
    <FirstMusic v-if="musicStore.total > 0" />
    <div v-else class="df-c-c empty ">
        <p>tip: 添加音频文件</p>
        <button class="empty-button big-btn" @click="() => musicStore.addList()">打开文件夹</button>
    </div>
</template>
<style scoped>
    .empty {
        height: 100%;
        flex-direction: column;
    }

    .empty p {
        opacity: 0.8;
    }

    .empty-button {
        padding: 1rem 2rem;
        font-size: 2rem;
        border: 1px solid var(--pc-border-color);
        border-radius: 1rem;
    }

    .empty-button:hover {
        background-color: var(--pc-hover-color);
    }

    @media screen and (max-width:480px) {
        .empty-button {
            font-size: 1.4rem;
        }
    }
</style>