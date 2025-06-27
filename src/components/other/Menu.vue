<script lang="ts" setup>
    import { ref } from 'vue';

    const showMenu = ref(false);
    function switchMenu() {
        showMenu.value = !showMenu.value
    }
</script>
<template>
    <div class="menu-container">
        <div @click="switchMenu">
            <slot name="button"></slot>
        </div>
        <Transition name="menu">
            <div v-show="showMenu" @click="switchMenu" class="menu-list">
                <slot name="content"></slot>
            </div>
        </Transition>
        <div @click="switchMenu" v-show="showMenu" class="modal"></div>
    </div>
</template>
<style scoped>
    .menu {
        font-weight: bolder;
        letter-spacing: 0.1rem;
    }

    .menu-container {
        position: relative;
    }

    .menu-list {
        margin-top: var(--pc-gap-small);
        position: fixed;
        z-index: 10;
        display: grid;
        background-color: var(--pc-theme-color);
        box-shadow: 0 0 0.4rem var(--pc-border-color);
        border: 1px solid var(--pc-border-color);
    }

    .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        z-index: 9;
    }

    .menu-enter-active,
    .menu-leave-active {
        transform-origin: top left;
        transition: transform 0.2s ease, opacity 0.2s ease;
    }

    .menu-enter-from,
    .menu-leave-to {
        opacity: 0;
        transform: scale(0)
    }
</style>