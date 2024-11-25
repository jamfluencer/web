<script lang="ts" setup>
import gsap from 'gsap';

const tvPoweredOn = ref(false);
const tvPowerTransitioning = ref(false);
const tvChannel = ref(1);

let tl = gsap.timeline();

const titleLetters = 'Wrapped!'.split('');

async function animateTvPowerOn() {
  if (tvPoweredOn.value || tvPowerTransitioning.value) return;
  tvPoweredOn.value = true;
  tvPowerTransitioning.value = true;
  await tl
    .to('#tv-screen-top', {
      duration: 1.5,
      opacity: 0.2,
      ease: 'power2.out',
      delay: 0.5,
    })
    .from(
      titleLetters.map((_, index) => `#wrapped-letter-${index}`),
      {
        duration: 0.5,
        x: 0,
        y: '-1em',
        opacity: 0,
        ease: 'bounce.out',
        stagger: 0.1,
      }
    );
  tvPowerTransitioning.value = false;
}

async function animateTvPowerOff() {
  if (!tvPoweredOn.value || tvPowerTransitioning.value) return;
  tvPoweredOn.value = false;
  tvPowerTransitioning.value = true;
  await tl.to('#tv-screen-top', {
    duration: 0.5,
    opacity: 1,
    ease: 'power2.out',
  });
  tvChannel.value = 1;
  tvPowerTransitioning.value = false;
}

async function onRemoteClickPower() {
  if (tvPoweredOn.value) {
    await animateTvPowerOff();
  } else {
    await animateTvPowerOn();
  }
}
</script>

<template>
  <div class="bg-black w-full h-screen flex items-center justify-center">
    <div class="relative w-[50vw]" :style="{ aspectRatio: '1.4563' }">
      <div
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center pl-[6%] pr-[25.8%] pt-[8.2%] pb-[6.8%]"
      >
        <div
          id="channel-1"
          class="w-full h-full bg-blue-600 flex items-center justify-center"
          :class="{ hidden: tvChannel !== 1 }"
        >
          <div>
            <div class="text-center text-[1.7vw]/[1]">2024 Jamfluencer</div>
            <div class="flex">
              <div
                :id="`wrapped-letter-${index}`"
                v-for="(letter, index) in titleLetters"
                :key="index"
                class="text-[4vw]/[1]"
              >
                {{ letter }}
              </div>
            </div>
          </div>
        </div>
        <div
          id="channel-2"
          class="w-full h-full bg-red-700 flex items-center justify-center"
          :class="{ hidden: tvChannel !== 2 }"
        >
          <Wrapped2024Channel2 :active="tvChannel === 2" />
        </div>
        <div
          id="channel-3"
          class="w-full h-full bg-green-700 flex items-center justify-center"
          :class="{ hidden: tvChannel !== 3 }"
        >
          <Wrapped2024Channel3 :active="tvChannel === 3" />
        </div>
      </div>
      <img
        class="absolute top-0 left-0 w-full h-full mix-blend-overlay pointer-events-none"
        src="~/assets/wrapped2024/tv_screen.png"
      />
      <img
        id="tv-screen-top"
        class="absolute top-0 left-0 w-full h-full pointer-events-none"
        src="~/assets/wrapped2024/tv_screen.png"
      />
      <img
        class="absolute top-0 left-0 w-full h-full pointer-events-none"
        src="~/assets/wrapped2024/tv_frame.png"
      />
    </div>
    <Wrapped2024Remote
      v-model:channel="tvChannel"
      :powered-on="tvPoweredOn"
      @click:power="onRemoteClickPower"
    />
  </div>
</template>
