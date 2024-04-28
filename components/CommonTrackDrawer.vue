<script setup lang="ts">
const isOpen = defineModel<boolean>({ required: true });

defineProps<{
  title: string;
  songs: Jamfluencer.Track[];
}>();
</script>

<template>
  <CommonDrawer v-model="isOpen">
    <template #title>{{ title }}</template>
    <ol class="flex flex-col gap-4">
      <li v-for="song in songs" :key="song.id" class="flex gap-4 items-center">
        <img
          class="w-16 h-16 rounded"
          :src="song.album"
          :alt="`${song.album} cover`"
        />
        <div class="flex flex-col gap">
          <UserTag :user="song.addedBy" class="mb-1" small />
          <div class="font-bold text-sm">{{ song.title }}</div>
          <div class="text-xs">{{ song.artist }}</div>
        </div>
      </li>
    </ol>
  </CommonDrawer>
</template>
