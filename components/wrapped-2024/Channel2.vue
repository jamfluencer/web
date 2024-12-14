<script setup lang="ts">
//
// CHANNEL 2: OVERALL STATS
//

const props = defineProps<{
  active: boolean;
}>();

const wrapped = useWrapped2024();

// let tl = gsap.timeline();

// const startAnimation = async () => {};

// const resetAnimation = () => {
//   const scenes = ['#ch2_scene1', '#ch2_scene2'];
//   tl.kill();
//   gsap.set(scenes, { clearProps: 'all' });
//   tl = gsap.timeline();
// };

function onChannelActive() {
  // startAnimation();
}

function onChannelInactive() {
  // resetAnimation();
}

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
  <div v-if="wrapped?.jam" class="h-full w-full relative overflow-hidden">
    <div
      class="h-full w-full absolute top-0 left-0 p-6 flex flex-col justify-center"
    >
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
        That's a total of {{ wrapped.jam.duration }} of music!
      </p>
    </div>
  </div>
</template>
