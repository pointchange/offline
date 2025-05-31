<script setup lang="ts">

  import Header from './components/Header.vue';
  import HomeSide from './components/HomeSide.vue';
  import Music from './components/Music.vue';
  import { useSettingStore } from './stores/setting';
  const themeStore = useSettingStore();
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
            <KeepAlive include="MusicView">
              <component :is="Component" />
            </KeepAlive>
          </RouterView>
        </n-layout-content>
      </n-layout>
      <!-- <n-layout-footer></n-layout-footer> -->
      <Music />
    </n-layout>
    <!-- </div> -->

  </n-config-provider>
</template>

<style scoped>
  .pc-container {
    position: relative;
    height: 100%;
  }
</style>
