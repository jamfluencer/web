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
    label: 'Your Contribution Duration',
    value: wrapped.value?.you.jam.tracks.duration.percentage + '%'
  },
  {
    key: 'participation',
    label: 'Your Jam Participation',
    value: wrapped.value?.you.jam.participation + '%'
  }
]);

const mostAppreciated = computed(() => {
  const mostAppreciated = wrapped.value?.you.social.tracks['most-appreciated'];
  return {
    name: mostAppreciated?.details.name,
    artists: mostAppreciated?.details.artists.map(a => a.name).join(', '),
    kudos: mostAppreciated?.kudos
  };
});
</script>

<template>
  <div v-if="wrapped" class="w-full h-full p-[6%]">
    <div class="w-full h-full flex flex-col justify-center">
      <div class="text-center mb-[3%] text-[4.8vw] lg:text-[3vw] leading-none font-extrabold">YOU</div>
      <template v-for="stat, index in stats" :key="stat.key">
        <div :style="{ marginTop: index > 0 ? '4%': 0 }">
          <div class="text-[2vw] lg:text-[1.25vw] leading-none">{{ stat.label }}</div>
        </div>
        <div class="mt-[1.5%] h-[10%] bg-white/90 flex items-center pl-[1%] text-neutral-800" :style="{ width: stat.value }">
          <span class="text-[2vw]/[1] lg:text-[1.25vw]/[1]">{{ stat.value }}</span>
        </div>
      </template>
      <div class="mt-[4%]">
        <div class="text-[2vw] lg:text-[1.25vw] leading-none">Your Most Appreciated Track ❤️</div>
      </div>
      <div class="mt-[1.5%]">
        <div class="text-[2vw]/[1] lg:text-[1.25vw]/[1]">
          {{ mostAppreciated.name }} by {{ mostAppreciated.artists }} ({{ mostAppreciated.kudos }} kudos)
        </div>
      </div>
    </div>
  </div>
</template>
