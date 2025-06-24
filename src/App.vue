<script lang="ts" setup>
  import { onMounted } from 'vue';
  import Header from './components/Header.vue';
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
  </div>
</template>
<style scoped>
  .home {
    height: 100%;
  }

  .nav-enter-active,
  .nav-leave-active {
    transition: transform 0.4s ease;
  }

  .nav-enter-from,
  .nav-leave-to {
    transform: translate(-100%);
  }

  .main {
    display: flex;
  }

  article {
    flex: 1;
    width: 100%;
  }

  /* article {
    width: 100%;
  } */

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