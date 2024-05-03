<script setup lang="ts">
defineProps<{
  track: JamfluencerApi.Track | undefined;
}>();
</script>

<template>
  <div v-if="track" class="flex-auto flex gap-6 items-end">
    <img
      class="w-32 h-32 rounded"
      :src="track.album.images[0].url"
      alt="current"
    />
    <div class="flex flex-col gap-1">
      <div class="text-4xl font-bold">
        {{ track.name }}
      </div>
      <div>
        {{ track.artists.map((artist) => artist.name).join(', ') }}
      </div>
      <UserTag :user="track.added_by" />
    </div>
  </div>
</template>
