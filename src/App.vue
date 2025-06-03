<script setup lang="ts">
  import { NConfigProvider, NGlobalStyle, NLayout, NLayoutContent, NLayoutSider } from 'naive-ui';
  import Header from './components/Header.vue';
  import SideMenu from './components/SideMenu.vue';
  import Music from './components/music/Music.vue';
  import { useSettingStore } from './stores/setting';
  import { computed, ref, watch } from 'vue';
  import { AnimationTime } from './utils/app/const';
  const settingStore = useSettingStore();
  const inverted = ref(false);
  const changeSider = ref(false);
  // const delayChangeSider = computed(() => {
  //   setTimeout(() => {
  //     changeSider.value = settingStore.musicSetting.showComponent
  //   }, 500)
  // })
  // watch(() => settingStore.musicSetting.showComponent, (value) => {
  //   if (value) {
  //     changeSider.value = value
  //   } else {
  //     setTimeout(() => {
  //       changeSider.value = value
  //     }, 500);
  //   }

  // })

  function keepAliveHandle() {
    return settingStore.musicSetting.destoryComponent ? '' : 'MusicView'
  }
</script>

<template>
  <n-config-provider :theme-overrides="settingStore.themeOverrides" :theme="settingStore.theme" class="pc-container">
    <n-global-style />
    <n-layout bordered position="absolute">
      <Header></Header>
      <n-layout position="absolute" style="top:35px; " has-sider>
        <n-layout-sider class="n-layout-content-class"
          :class="{ 'n-layout-content-bottom': settingStore.musicSetting.showComponent }" position="absolute" bordered
          show-trigger collapse-mode="width" :collapsed-width="64" :width="150" :native-scrollbar="false">
          <SideMenu></SideMenu>
        </n-layout-sider>
        <n-layout-content :class="{ 'n-layout-content-bottom': settingStore.musicSetting.showComponent }"
          position="absolute" style="left:150px;" content-style="padding: 24px;">
          <RouterView v-slot="{ Component }">
            <KeepAlive :include="keepAliveHandle()">
              <component :is="Component" />
            </KeepAlive>
          </RouterView>
        </n-layout-content>
      </n-layout>
    </n-layout>
    <Music />
  </n-config-provider>
</template>

<style scoped>
  .pc-container {
    position: relative;
    height: 100%;
  }

  .n-layout-content-class {
    max-height: 100%;
    transition: color .3s var(--n-bezier), border-color .3s var(--n-bezier), min-width .3s var(--n-bezier), max-width .3s var(--n-bezier), transform .3s var(--n-bezier), background-color .3s var(--n-bezier), bottom v-bind('AnimationTime');
  }

  .n-layout-content-bottom {
    bottom: 90px;
  }
</style>
