<script lang="ts" setup>
  import { NLayout, NLayoutContent, NSpace, NInput, NButton, NIcon, NLayoutHeader, NScrollbar, NEmpty, NFloatButton, } from 'naive-ui';

  import { useMusicStore } from '@/stores/music';
  import { onMounted, useTemplateRef, } from 'vue';
  import { Cursor24Regular, Delete20Regular } from '@vicons/fluent';
  import { openDirectory } from '@/utils/file/fileHandle';
  import { createDiscreteApi } from 'naive-ui';
  import MusicList from '@/components/music/MusicList.vue';
  import { useSettingStore } from '@/stores/setting';
  const musicStore = useMusicStore();
  const settingStore = useSettingStore();
  const musicListRef = useTemplateRef('musicListRef');
  const nscrollbarRef = useTemplateRef('nscrollbarRef')
  const nLayoutContentRef = useTemplateRef('nLayoutContentRef')
  async function openDirectoryHandle() {
    const list = await openDirectory();
    if (list.length > 0) {
      musicStore.list.push(...list)
    }
  }
  function getSong() {
    if (!musicListRef.value) return;
    const height = parseFloat(window.getComputedStyle(musicListRef.value.$el).height) / musicStore.total;
    if (!nscrollbarRef.value) return;
    if (!nLayoutContentRef.value) return;
    const currentPageListCount = nLayoutContentRef.value.$el.clientHeight / height;
    const middle = currentPageListCount / 2 * height - height / 2;
    const top = height * musicStore.currentIndex - middle;
    nscrollbarRef.value.scrollTo({ top, behavior: "smooth" });
  }

  function clear() {
    const { dialog, message } = createDiscreteApi(['dialog', 'message'])
    dialog.warning({
      title: '清空操作',
      content: '您确定要清空列表？',
      positiveText: '确定',
      negativeText: '取消',
      onPositiveClick: () => {
        musicStore.clear()
        message.success('清空操作成功')
      },
      onNegativeClick: () => {
        message.error('取消了')
      }
    })
  }
  const operateList = [
    {
      name: 'delete',
      icon: Delete20Regular,
      handle: clear
    },

  ]
  onMounted(() => {
    settingStore.musicSetting.showComponent = true;
  })
</script>
<template>
  <div class="list-container">
    <n-layout v-if="musicStore.total > 0" position="absolute">
      <n-layout-header>
        <n-space vertical>
          <n-input v-model:value.lazy="musicStore.keyword" type="text" placeholder="搜 索" clearable />
          <n-button v-for="item in operateList" :key="item.name" @click="item.handle" quaternary circle>
            <template #icon>
              <n-icon :component="item.icon"></n-icon>
            </template>
          </n-button>
        </n-space>
        <n-layout-content ref="nLayoutContentRef" position="absolute" style="top: 78px ">
          <n-scrollbar ref="nscrollbarRef">
            <MusicList ref="musicListRef"></MusicList>
          </n-scrollbar>
        </n-layout-content>
      </n-layout-header>
    </n-layout>

    <n-empty v-else description="你什么也找不到">
      <template #extra>
        <n-button @click="openDirectoryHandle">打开文件夹</n-button>
      </template>
    </n-empty>
    <div class="other">
      <n-float-button @click="getSong" type="primary">
        <n-icon>
          <Cursor24Regular />
        </n-icon>
      </n-float-button>
    </div>
  </div>
</template>
<style scoped>
  .list-container {
    position: relative;
    width: 100%;
    height: 100%;
  }

  .other {
    position: fixed;
    bottom: 10rem;
    right: 8rem;
  }

</style>
