<script setup lang="ts">
const wrapped = useWrapped2024();
</script>

<template>
  <div v-if="wrapped">
    <p>Channel 7: You</p>
    <p>Your Contribution: {{ wrapped.you.jam.tracks.count.percentage }}%</p>
    <p>Duration: {{ wrapped.you.jam.tracks.duration.percentage }}%</p>
    <p>Jam Participation: {{ wrapped.you.jam.participation }}%</p>
    <p>
      Most Appreciated Track:
      {{ wrapped.you.social.tracks['most-appreciated'].details.name }}
      ({{ wrapped.you.social.tracks['most-appreciated'].kudos }} kudos)
    </p>
  </div>
</template>
