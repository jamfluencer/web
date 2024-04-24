<script setup lang="ts">
const isOpen = defineModel<boolean>({ required: true });

const songs = [
  {
    id: '1',
    bg: '/images/bg.jpg',
    album: '/images/album2.jpg',
    title: 'Nothing New',
    artist: 'The Strike',
  },
  {
    id: '2',
    bg: '/images/bg2.jpg',
    album: '/images/album.jpg',
    title: 'Shy',
    artist: 'Saint Blonde',
  },
];
</script>

<template>
  <CommonDrawer v-model="isOpen">
    <template #title>Recently played</template>
    <ol class="flex flex-col gap-4">
      <li v-for="song in songs" :key="song.id" class="flex gap-4 items-center">
        <img
          class="w-16 h-16 rounded"
          :src="song.album"
          :alt="`${song.album} cover`"
        />
        <div class="flex flex-col gap-1">
          <div class="font-bold">{{ song.title }}</div>
          <div class="text-sm">{{ song.artist }}</div>
        </div>
      </li>
    </ol>
  </CommonDrawer>
</template>
