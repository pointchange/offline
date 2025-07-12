<script lang="ts" setup>
    import { useSettingStore } from '@/stores/setting';

    const setting = useSettingStore();
    function switchFoldNav() {
        setting.foldNav = !setting.foldNav
    }
</script>
<template>
    <Transition name="nav">
        <aside v-show="setting.foldNav" class="border-r aside dg-c">
            <nav class="nav">
                <ul class="list">
                    <li>
                        <RouterLink activeClass="a-active" to="/">首页</RouterLink>
                    </li>
                    <li>
                        <RouterLink activeClass="a-active" to="/music">音乐</RouterLink>
                    </li>
                    <li>
                        <RouterLink activeClass="a-active" to="/analyse">分析</RouterLink>
                    </li>
                    <li>
                        <RouterLink activeClass="a-active" to="/setting">设置</RouterLink>
                    </li>
                </ul>
            </nav>

        </aside>
    </Transition>
    <Transition name="modal">
        <div v-show="setting.foldNav" @click="switchFoldNav" class="modal"></div>
    </Transition>

</template>
<style scoped>
    aside {
        border-right: 1px solid var(--pc-border-color);
    }

    .nav {
        background-color: var(--pc-theme-color);
    }

    .modal {
        display: none;
    }

    @media screen and (max-width:480px) {
        aside {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 10;
            height: 100%;
        }

        .nav {
            padding: 1rem 0;
        }

        .modal {
            position: fixed;
            left: 0;
            top: 0;
            z-index: 9;
            display: block;
            width: 100vw;
            height: 100vh;
            background-color: rgba(0, 0, 0, 0.4);
        }
    }

    a {
        border-right: 2px solid transparent;
    }

    .a-active {
        border-color: var(--pc-theme-primary);
    }

    .nav-enter-active,
    .nav-leave-active {
        transition: transform 0.2s ease;
    }

    .nav-enter-from,
    .nav-leave-to {
        transform: translate(-100%);
    }

    .modal-enter-active,
    .modal-leave-active {
        transition: opacity 0.4s ease;
    }

    .modal-enter-from,
    .modal-leave-to {
        opacity: 0;
    }
</style>