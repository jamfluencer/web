<script setup lang="ts">
const isOpen = defineModel<boolean>({ required: true });

defineProps<{
  title: string;
  tracks: Jamfluencer.Track[];
}>();
</script>

<template>
  <CommonDrawer v-model="isOpen">
    <template #title>{{ title }}</template>
    <ol class="flex flex-col gap-4">
      <li
        v-for="track in tracks"
        :key="track.id"
        class="flex gap-4 items-center"
      >
        <img
          class="w-16 h-16 rounded"
          :src="track.album"
          :alt="`${track.album} cover`"
        />
        <div class="flex flex-col gap">
          <UserTag :user="track.addedBy" class="mb-1" small />
          <div class="font-bold text-sm">{{ track.title }}</div>
          <div class="text-xs">{{ track.artist }}</div>
        </div>
      </li>
    </ol>
  </CommonDrawer>
</template>
