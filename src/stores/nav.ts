import { defineStore } from 'pinia'

export const useNavStore = defineStore('nav', {
    state: () => ({
        nav: 'home'
    }),

})