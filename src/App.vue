<script setup lang="ts">
  import { NConfigProvider, NGlobalStyle, NLayout, NLayoutContent, type GlobalThemeOverrides } from 'naive-ui';
  import Header from './components/Header.vue';
  import HomeSide from './components/HomeSide.vue';
  import Music from './components/music/Music.vue';
  import { useSettingStore } from './stores/setting';
  const themeStore = useSettingStore();
  // const themeOverrides: GlobalThemeOverrides = {
  //   common: {
  //     primaryColor: '#FF0000'
  //   },
  //   Button: {
  //     textColor: '#FF0000'
  //   }
  // }:theme-overrides="themeOverrides"
  function keepAliveHandle() {
    return themeStore.musicSetting.destoryComponent ? '' : 'MusicView'
  }
</script>

<template>
  <n-config-provider :theme="themeStore.theme" class="pc-container">
    <n-global-style />
    <!-- <div > -->
    <n-layout bordered position="absolute">
      <Header></Header>
      <n-layout position="absolute" style="top:35px; " has-sider>
        <HomeSide></HomeSide>
        <n-layout-content position="absolute" style="left:150px; bottom: 90px;" content-style="padding: 24px;">
          <RouterView v-slot="{ Component }">
            <KeepAlive :include="keepAliveHandle()">
              <component :is="Component" />
            </KeepAlive>
          </RouterView>
        </n-layout-content>
      </n-layout>
      <!-- <n-layout-footer></n-layout-footer> -->
    </n-layout>
    <!-- </div> -->
    <Music />
  </n-config-provider>
</template>

<style scoped>
  .pc-container {
    position: relative;
    height: 100%;
  }
</style>
