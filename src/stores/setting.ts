const DARKZHCN = '黑夜';
const LIGHTZHCN = '白天';
const FOLLOWSYSTEMZHCN = '跟随系统'

const DARK = 'dark';
const LIGHT = 'light';
const FOLLOWSYSTEM = 'followSystem'
import { defineStore } from 'pinia'
export {
  DARKZHCN,
  LIGHTZHCN, FOLLOWSYSTEMZHCN, DARK, LIGHT, FOLLOWSYSTEM,
}
export const useSettingStore = defineStore('setting', {
  state: () => ({
    themeValue: LIGHT,
    isDarktheme: false,
    isFollowSystem: false,
    foldNav: true,
    color: '72, 61, 139'
  }),
  getters: {
    themeText(state) {
      return state.isDarktheme ? LIGHTZHCN : DARKZHCN;
    },
    theme(state) {
      return null;
    }
  },
  actions: {
    init() {
      this.classOperation();
    },
    classOperation() {
      let html = document.querySelector('html');
      if (this.isDarktheme) {
        html?.classList.add('dark')
        html?.classList.remove('light');
      } else {
        html?.classList.remove('dark');
        html?.classList.add('light')
      }
      html = null;
    },
    setTheme(bool: boolean) {
      this.isDarktheme = bool;
      this.classOperation();
    },
    setFollowSystem() {
      this.isDarktheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
      let html = document.querySelector('html');
      html?.classList.remove('dark');
      html?.classList.remove('light');
      html = null;
    },
    setRgbColor(color: string, transparency = 1) {
      const num = color.slice(1).toUpperCase();
      const r = parseInt(num.slice(0, 2), 16);
      const g = parseInt(num.slice(2, 4), 16);
      const b = parseInt(num.slice(4, 6), 16);
      return `rgb(${r}, ${g}, ${b},${transparency})`;
    },
    setThemeColor(v: string) {
      this.color = v;
      const cs = v.match(/(\d+)/g);
      if (cs) {
        document.documentElement.style.setProperty('--pc-rgb', cs.join(','));
      }
    }
  }
})
