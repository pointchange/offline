<script lang="ts" setup>
  import { onMounted } from 'vue';
  import Header from './components/Header.vue';
  // import Music from './components/music/Music.vue';
  import Nav from './components/Nav.vue';
  import { useSettingStore } from './stores/setting';
  import { useMusicStore } from './stores/music';
  const setting = useSettingStore();
  // function keepAliveHandle() {
  //   return settingStore.musicSetting.destoryComponent ? '' : 'MusicView'
  // }
  const musicStore = useMusicStore();
  onMounted(() => {
    musicStore.init();
    setting.init();
  })
</script>
<template>
  <div class="home ">
    <header class="df-sb-c header">
      <Header></Header>
    </header>
    <main class="main">
      <Nav></Nav>
      <article>
        <section class="section">
          <RouterView v-slot="{ Component }">
            <KeepAlive include="MusicView">
              <component :is="Component" />
            </KeepAlive>
          </RouterView>
        </section>
      </article>
    </main>
    <!-- <Music></Music> -->
  </div>
</template>
<style scoped>
  .home {
    height: 100%;
  }

  .main {
    display: flex;
  }

  article {
    flex: 1;
  }

  .header {
    border-bottom: 1px solid var(--pc-border-color);
  }

  .section {
    height: calc(100vh - 54px);
  }


  footer {
    /* border: 1px solid #eee; */
  }
</style>