import { darkTheme } from 'naive-ui';
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    isDarktheme: false
  }),
  getters: {
    themeText(state) {
      return state.isDarktheme ? '白天' : '黑夜';
    },
    theme(state) {
      return state.isDarktheme ? darkTheme : null;
    }
  },
  actions: {
    setTheme() {
      this.isDarktheme = !this.isDarktheme;
    }
  }
})
