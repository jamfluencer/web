<script setup lang="ts">
const props = defineProps<{
  active: boolean;
}>();

const wrapped = useWrapped2024();

function onChannelActive() {}

function onChannelInactive() {}

watch(
  () => props.active,
  (active) => {
    if (active) {
      onChannelActive();
    } else {
      onChannelInactive();
    }
  }
);
</script>

<template>
  <div v-if="wrapped?.jam" class="p-6">
    <p class="text-center text-2xl">
      Our
      <strong class="font-extrabold">{{ wrapped.jam.contributors }}</strong>
      contributors added<br />
      <strong class="text-6xl font-extrabold">
        {{ new Intl.NumberFormat().format(wrapped.jam.tracks) }} </strong
      ><br />
      tracks this year!
    </p>
    <p class="text-center text-pretty mt-6">
      That's a total of
      {{ wrapped.jam.duration }} of music!
    </p>
  </div>
</template>
