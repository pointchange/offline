import { darkTheme } from 'naive-ui';
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    isDarktheme: false,
    isMusicKeepAlive: true,
    musicSetting: {
      destoryComponent: false,
      showComponent: false
    }
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
    },
    setRgbColor(color: string, transparency = 1) {
      const num = color.slice(1).toUpperCase();
      const r = parseInt(num.slice(0, 2), 16);
      const g = parseInt(num.slice(2, 4), 16);
      const b = parseInt(num.slice(4, 6), 16);
      return `rgb(${r}, ${g}, ${b},${transparency})`;
    }
  }
})
