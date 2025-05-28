<script lang="ts" setup>
  import { routesTotal } from '@/router';
  import { useNavStore } from '@/stores/nav';
  import { useRouter } from 'vue-router';
  const router = useRouter()
  const navStore = useNavStore()
  function navigateToMusic() {
    navStore.nav = 'music';
    router.push('/music');
  }

</script>
<template>
  <div>
    <n-h1>Offline……</n-h1>
    <n-statistic label="离线组件">
      {{ routesTotal }}
    </n-statistic>
    <n-divider />
    <n-card title="音乐" @click="navigateToMusic">
      <audio class="audio" controls></audio>
    </n-card>
  </div>
</template>
<style scoped>
  .n-card {
    max-width: 350px;
  }

  .audio {
    pointer-events: none;
    color: var(--n-text-color);
  }
</style>
