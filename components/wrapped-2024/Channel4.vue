<script setup lang="ts">
const wrapped = useWrapped2024();
</script>

<template>
  <div v-if="wrapped">
    <p>Channel 4: Playlists</p>
    <p>Total: {{ wrapped.playlists.count }}</p>
    <p>Avg Tracks: {{ wrapped.playlists.tracks.mean }}</p>
    <p>Most packed: {{ wrapped.playlists.tracks.maximum }}</p>
    <p>Minimalist: {{ wrapped.playlists.tracks.minimum }}</p>
  </div>
</template>
