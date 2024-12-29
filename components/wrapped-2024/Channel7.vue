<script setup lang="ts">
const wrapped = useWrapped2024();

const stats = computed(() => [
  {
    key: 'tracks.count',
    label: 'Your Contribution',
    value: wrapped.value?.you.jam.tracks.count.percentage + '%'
  },
  {
    key: 'tracks.duration',
    label: 'Duration',
    value: wrapped.value?.you.jam.tracks.duration.percentage + '%'
  },
  {
    key: 'participation',
    label: 'Jam Participation',
    value: wrapped.value?.you.jam.participation + '%'
  }
]);
</script>

<template>
  <div v-if="wrapped" class="w-full h-full p-[6%]">
    <div class="w-full h-full flex flex-col">
      <template v-for="stat, index in stats" :key="stat.key">
        <div :style="{ marginTop: index > 0 ? '6%': 0 }">{{ stat.label }}</div>
        <div class="h-[10%] bg-white/90 flex items-center pl-[1%] text-neutral-800" :style="{ width: stat.value }">
          {{ stat.value }}
        </div>
      </template>
      <!-- <div class="h-[10%] w-[80%] bg-white/90 flex items-center pl-[1%] text-neutral-800" :style="{ width: wrapped.you.jam.tracks.duration.percentage + '%' }">
        {{ wrapped.you.jam.tracks.duration.percentage }}%
      </div>
      <div class="h-[10%] w-[85%] bg-white/90 flex items-center pl-[1%] text-neutral-800" :style="{ width: wrapped.you.jam.participation + '%' }">
        {{ wrapped.you.jam.participation }}%
      </div> -->
    </div>
    <!-- <p>Channel 7: You</p>
    <p>Your Contribution: {{ wrapped.you.jam.tracks.count.percentage }}%</p>
    <p>Duration: {{ wrapped.you.jam.tracks.duration.percentage }}%</p>
    <p>Jam Participation: {{ wrapped.you.jam.participation }}%</p>
    <p>
      Most Appreciated Track:
      {{ wrapped.you.social.tracks['most-appreciated'].details.name }}
      ({{ wrapped.you.social.tracks['most-appreciated'].kudos }} kudos)
    </p> -->
  </div>
</template>
