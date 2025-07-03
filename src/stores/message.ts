import { defineStore } from 'pinia'
import { reactive } from 'vue'
type Type = 'success' | 'warn' | 'error' | 'info'

interface Msg {
    text?: string,
    type?: Type
}

export const useMessageStore = defineStore('msg', () => {
    const list = reactive<Msg[]>([]);
    function add(msg: Msg) {
        list.unshift(msg)
    }
    return {
        list, add
    }
})