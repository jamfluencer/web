<script setup lang="ts">
const props = defineProps<{
  active: boolean;
}>();

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
  <div class="text-[4vw]/[1]">2</div>
</template>
