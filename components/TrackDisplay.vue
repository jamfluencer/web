<script setup lang="ts">
defineProps<{
  track: Jamfluencer.Track;
}>();
</script>

<template>
  <div class="flex-auto flex gap-6 items-end">
    <img class="w-32 h-32 rounded" :src="track.album" alt="current" />
    <div class="flex flex-col gap-1">
      <UserTag :user="track.addedBy" class="mb-2" />
      <div class="text-4xl font-bold">
        {{ track.title }}
      </div>
      <div>
        {{ track.artist }}
      </div>
    </div>
  </div>
</template>
