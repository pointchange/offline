<script lang="ts" setup>
  import Header from './components/Header.vue';
  import Music from './components/music/Music.vue';
  import Nav from './components/Nav.vue';

  // function keepAliveHandle() {
  //   return settingStore.musicSetting.destoryComponent ? '' : 'MusicView'
  // }
</script>
<template>
  <div class="home dg-r">
    <header class="df-sb-c header">
      <Header></Header>
    </header>
    <main class="dg-c">
      <aside class="border-r aside">
        <nav>
          <Nav></Nav>
        </nav>
      </aside>
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
    <Music></Music>
  </div>
</template>
<style scoped>
  .home {
    height: 100%;
  }

  .header {
    position: sticky;
    top: 0;

    border-bottom: 1px solid var(--pc-border-color);
  }

  .aside {
    height: 100%;
  }

  .section {
    height: calc(100vh - 44px);
    overflow-y: scroll;
  }


  footer {
    /* border: 1px solid #eee; */
  }
</style>