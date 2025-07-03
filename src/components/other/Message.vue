<script lang="ts" setup>
    import { reactive } from 'vue';
    enum MessageType {
        'success' = 'success',
        'warn' = 'warn',
        'error' = 'error',
        'info' = 'info',
    }
    const list = reactive<Map<string, Msg>>(new Map());
    function add(msg: Msg) {
        const id = crypto.randomUUID();
        const defaultMsg = {
            text: '',
            type: MessageType.info,
            delay: 0,
            duration: 3000,
            close: false,
            stop: false
        };
        const m = { ...defaultMsg, ...msg };
        list.set(id, m);

        const d = m.duration;
        const t = setTimeout(() => {
            const data = list.get(id);
            if (data?.stop) {
                clearTimeout(t);
                return;
            };
            closeHandle(id);
            clearTimeout(t)
        }, d);
    }
    function closeHandle(id: string) {
        list.delete(id);
    }
    function onBeforeLeaveHandle(el: Element) {
        if (list.size === 0) {
            (el as HTMLLIElement).style.position = 'relative';
        }
    }
    function mouseenter(id: string) {
        const data = list.get(id);
        list.set(id, { ...data, stop: true })
    }
    function mouseleave(id: string) {
        const data = list.get(id);
        if (!data) return;
        list.set(id, { ...data, stop: false })
        const t = setTimeout(() => {
            closeHandle(id);
            clearTimeout(t)
        }, data.duration);
    }
    function switchType(type: Type | undefined) {
        switch (type) {
            case MessageType.success:
                return MessageType.success;
            case MessageType.error:
                return MessageType.error;
            case MessageType.warn:
                return MessageType.warn;
            default:
                return MessageType.info;
        }
    }
    defineExpose({
        add,
    })
</script>
<template>
    <TransitionGroup name="msg" class="msg" tag="ul" @before-leave="onBeforeLeaveHandle">
        <li :class="[switchType(item[1].type)]" v-for="item in list" :key="item[0]" @mouseenter="mouseenter(item[0])"
            @mouseleave="mouseleave(item[0])">
            <a href="javascript:;">{{ item[1].text }}</a>
            <button v-if="item[1].close" @click="closeHandle(item[0])" class="button">X</button>
        </li>
    </TransitionGroup>
</template>
<style scoped>
    .success {
        background-color: var(--pc-success-color);
    }

    .success a {
        color: rgb(34, 139, 34);
    }

    .info {
        background-color: var(--pc-theme-color);
    }

    .warn {
        background-color: var(--pc-warn-color);
    }

    .warn a {
        color: rgb(255, 140, 0);
    }

    .error {
        background-color: var(--pc-error-color);
    }

    .error a {
        color: rgb(220, 20, 60);
    }

    ul {
        margin: 0;
        padding: 0;
    }

    li {
        padding: 1rem;
        margin-top: 1rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 350px;
        list-style: none;
        box-shadow: 0 0 6px var(--pc-border-color);
        outline: 1px solid var(--pc-border-color);
    }

    .msg {
        position: fixed;
        left: 50%;
        transform: translateX(-50%);
        top: 1rem;
        margin: 0 auto;
        z-index: 20;
    }


    .msg-move,
    .msg-enter-active,
    .msg-leave-active {
        transition: transform 0.5s, opacity 0.5s;
    }

    .msg-leave-active {
        position: absolute;
    }

    .msg-enter-from,
    .msg-leave-to {
        transform: translateY(-100%);
        opacity: 0;
    }
</style>