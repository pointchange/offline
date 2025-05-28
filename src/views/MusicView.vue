<script lang="ts" setup>
  import { reactive, ref } from 'vue';

  const url = ref('');
  const list = reactive<any[]>([]);
  async function openDirectory() {
    try {
      const directory = await window.showDirectoryPicker();
      console.log(directory)
      const files = await directory.entries();
      console.log(files);
      for (const file of files) {
        const f = await file[1].getFile()
        list.push({
          id: crypto.randomUUID(),
          name: f.name,
          stream: f,
        });
      }
    } catch (error) { }
  }
  function canplayHandle(e: Event) {
    (e.target as HTMLAudioElement).play()
  }
  function playHandle(id: string) {
    const audio = list.find(v => v.id === id);
    url.value = URL.createObjectURL(audio.stream)
  }
</script>
<template>
  <div>
    <audio class="audio" controls :src="url" @canplay="canplayHandle"></audio>
    <n-button @click="openDirectory">打开文件夹</n-button>
    <ul>
      <li @click="playHandle(item.id)" v-for="item in list" :key="item.id">{{ item.name }}</li>
    </ul>
  </div>
</template>
<style scoped>
  .audio {
    width: 100%;

  }
</style>