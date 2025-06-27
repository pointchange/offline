<script lang="ts" setup>
    const show = defineModel<boolean>({ required: true })

    interface Dialog {
        cancel?: string,
        confirm?: string,
        cancelHandle?: () => void,
        confirmHandle?: () => void,
    }
    const props = withDefaults(defineProps<Dialog>(), {
        cancel: '取消',
        confirm: '确认'
    })
    function clickHandle() {
        show.value = !show.value
    }
    function cancelClick() {
        if (props.cancelHandle) {
            props.cancelHandle();
        }
        clickHandle()
    }
    function confirmClick() {
        if (props.confirmHandle) {
            props.confirmHandle();
        }
        clickHandle()
    }
</script>
<template>
    <Teleport to="body">
        <div v-if="show" class="dialog">
            <div @click="clickHandle" class="modal"></div>
            <div class="card">
                <header>
                    <slot name="header">Title</slot>
                </header>
                <main>
                    <slot name="main"></slot>
                </main>
                <footer>
                    <button class="button" @click="cancelClick">{{ cancel }}</button>
                    <button class="button" @click="confirmClick">{{ confirm }}</button>
                </footer>
            </div>
        </div>
    </Teleport>
</template>
<style scoped>
    .dialog {
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100vw;
        height: 100vh;
    }

    .dialog .modal {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
        z-index: -1;
    }

    .dialog .card {
        padding: 1rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 0.4rem;
        min-width: 10%;
        min-height: 10%;
        outline: 1px solid var(--pc-border-color);
        border-radius: 0.4rem;
        background-color: var(--pc-theme-color);
    }

    .dialog footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    @media screen and (max-width:480px) {
        .dialog .card {
            min-width: 80%;
        }
    }

</style>