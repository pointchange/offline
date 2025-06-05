<script setup lang="ts">
  import { NConfigProvider, NGlobalStyle, NLayout, NLayoutContent, NLayoutSider } from 'naive-ui';
  import Header from './components/Header.vue';
  import SideMenu from './components/SideMenu.vue';
  import Music from './components/music/Music.vue';
  import { useSettingStore } from './stores/setting';
  import { AnimationTime } from './utils/app/const';
  import { ref } from 'vue';
  const settingStore = useSettingStore();

  function keepAliveHandle() {
    return settingStore.musicSetting.destoryComponent ? '' : 'MusicView'
  }
  const isCollapsed = ref(false);
  function collapsedHandle(collapsed: boolean) {
    console.log(collapsed);
  } 
</script>

<template>
  <n-config-provider :theme-overrides="settingStore.themeOverrides" :theme="settingStore.theme" class="pc-container">
    <n-global-style />
    <n-layout bordered position="absolute">
      <Header></Header>
      <n-layout position="absolute" style="top:35px; " has-sider>
        <n-layout-sider @update:collapsed="(collapsed: boolean) => isCollapsed = collapsed" class="n-layout-sider-class"
          :class="{ 'n-layout-content-bottom': settingStore.musicSetting.showComponent }" position="absolute" bordered
          show-trigger collapse-mode="transform" :collapsed-width="0" :width="150" :native-scrollbar="false">
          <SideMenu></SideMenu>
        </n-layout-sider>
        <n-layout-content class="n-layout-content-class " :class="{
          'n-layout-content-bottom': settingStore.musicSetting.showComponent,
          'n-layout-content-left': !isCollapsed
        }" position="absolute" content-style="padding: 16px;">
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

  .n-layout-sider-class {
    max-height: 100%;
    transition: color .3s var(--n-bezier), border-color .3s var(--n-bezier), min-width .3s var(--n-bezier), max-width .3s var(--n-bezier), transform .3s var(--n-bezier), background-color .3s var(--n-bezier), bottom v-bind('AnimationTime');
  }

  .n-layout-content-bottom {
    bottom: 90px;
  }

  .n-layout-content-class {
    transition: box-shadow .3s var(--n-bezier), background-color .3s var(--n-bezier), color .3s var(--n-bezier), left .3s var(--n-bezier);
  }

  .n-layout-content-left {
    left: 150px;

  }
</style>
