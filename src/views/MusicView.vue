<script lang="ts" setup>
  import { getFiles } from '@/utils/file/fileHandle';
  import { TYPES } from '@/utils/music/const';
  import { DeleteFileSuffix } from '@/utils/music/format';
  import { useMusicStore } from '@/stores/music';
  const musicStore = useMusicStore();
  async function openDirectoryHandle() {
    try {
      const directory = await window.showDirectoryPicker();
      const files = await getFiles(directory);
      const songFiles = [];
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        const bool = TYPES.some(v => new RegExp(v, 'ig').test(item[1].name)) && item[1].kind === 'file';
        if (bool) {
          songFiles.push(item[1]);
        }
      }
      if (songFiles.length > 0) {
        musicStore.list.push(...songFiles)
      }
    } catch (error) { }
  }
</script>
<template>
  <div>
    <n-button @click="openDirectoryHandle">打开文件夹</n-button>
    <n-list hoverable clickable>
      <n-list-item @click="() => musicStore.playHandle(item.name)" v-for="item in musicStore.list" :key="item.name">
        {{ DeleteFileSuffix(item.name) }}
      </n-list-item>
    </n-list>
  </div>
</template>
