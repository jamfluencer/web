<script setup lang="ts">
const props = defineProps<{
  active: boolean;
}>();

const video = ref<HTMLVideoElement | null>(null);

function onChannelActive() {
  video.value?.play();
}

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
  <video
    ref="video"
    src="~/assets/wrapped2024/dump_cakes.mp4"
    class="w-full h-full object-cover"
    loop
  />
</template>
