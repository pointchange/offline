<script lang="ts" setup>
  import { onMounted } from 'vue';
  import Header from './components/Header.vue';
  import Nav from './components/Nav.vue';
  import { useSettingStore } from './stores/setting';
  import { useMusicStore } from './stores/music';
  // import Message from './components/other/Message.vue';
  import { useMessageStore } from './stores/message';
  const setting = useSettingStore();
  // function keepAliveHandle() {
  //   return settingStore.musicSetting.destoryComponent ? '' : 'MusicView'
  // }
  const musicStore = useMusicStore();
  onMounted(() => {
    musicStore.init();
    setting.init();
  })
  const messageStore = useMessageStore();
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
  <!-- <Teleport to="body">
    <div class="msg">
      <Message />
    </div>
  </Teleport> -->
</template>
<style scoped>
  .msg {
    position: fixed;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
  }

  .home {
    height: 100%;
    overflow: hidden;
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

  .header {
    border-bottom: 1px solid var(--pc-border-color);
  }

  .section {
    height: calc(100vh - 54px);
  }
</style>