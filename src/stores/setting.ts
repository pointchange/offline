import { LIGHT, DARK, LIGHTZHCN, DARKZHCN } from '@/utils/setting/const';
import { darkTheme, type GlobalThemeOverrides } from 'naive-ui';
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('setting', {
  state: () => ({
    themeZhCN: LIGHT,
    isDarktheme: false,
    isFollowSystem: false,
    color: '#18a058',
    isMusicKeepAlive: true,
    musicSetting: {
      destoryComponent: false,
      showComponent: false,
      showMusicBtn: true,
    },
    themeOverrides: {} as GlobalThemeOverrides
  }),
  getters: {
    themeText(state) {
      return state.isDarktheme ? LIGHTZHCN : DARKZHCN;
    },
    theme(state) {
      return state.isDarktheme ? darkTheme : null;
    }
  },
  actions: {
    setTheme() {
      this.isDarktheme = !this.isDarktheme;
      this.themeZhCN = this.isDarktheme ? DARK : LIGHT
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
