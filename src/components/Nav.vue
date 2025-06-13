<script lang="ts" setup>
    import { useSettingStore } from '@/stores/setting';

    const setting = useSettingStore();

</script>
<template>
    <Transition name="nav">
        <aside v-show="setting.foldNav" class="border-r aside">
            <nav>
                <ul class="list">
                    <li>
                        <RouterLink activeClass="a-active" to="/">首页</RouterLink>
                    </li>
                    <li>
                        <RouterLink activeClass="a-active" to="/music">音乐</RouterLink>
                    </li>
                    <li>
                        <RouterLink activeClass="a-active" to="/setting">设置</RouterLink>
                    </li>
                </ul>
            </nav>
        </aside>
    </Transition>
</template>
<style scoped>
    aside {
        border-right: 1px solid var(--pc-border-color);
    }

    .a-active {
        background-color: var(--pc-hover-color);
    }

    .nav-enter-active,
    .nav-leave-active {
        transition: transform 0.4s ease;
    }

    .nav-enter-from,
    .nav-leave-to {
        transform: translate(-100%);
    }
</style>