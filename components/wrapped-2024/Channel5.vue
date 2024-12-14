<script setup lang="ts">
const wrapped = useWrapped2024();
</script>

<template>
  <div v-if="wrapped">
    <p>Channel 5: Tracks</p>
    <p>Total tracks: {{ wrapped.tracks.count }}</p>
    <p>
      Shortest: {{ wrapped.tracks.duration.minimum.name }} ({{
        wrapped.tracks.duration.minimum.duration
      }})
    </p>
    <p>Most frequent: {{ wrapped.tracks.occurrence.details.name }}</p>
  </div>
</template>
