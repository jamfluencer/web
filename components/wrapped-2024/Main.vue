<script lang="ts" setup>
import gsap from 'gsap';

const wrapped = useWrapped2024();
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

const loadingWrapped = ref(true);
const loader = ref<HTMLDivElement | null>(null);
const router = useRouter();
async function getWrapped() {
  const wrappedId = router.currentRoute.value.params.uuid as string;
  const cachedWrappedKey = `wrapped2024_${wrappedId}`;
  const cachedWrapped = localStorage.getItem(cachedWrappedKey);

  try {
    if (cachedWrapped) {
      wrapped.value = JSON.parse(cachedWrapped);
    } else {
      wrapped.value = await useJamfluencerApi().getWrapped2024(wrappedId);
      localStorage.setItem(cachedWrappedKey, JSON.stringify(wrapped.value));
    }

    await gsap.to(loader.value, {
      duration: 0.5,
      opacity: 0,
      ease: 'power2.out',
    });
    loader.value?.remove();
  } catch (error) {
    if (error) {
      console.error(error);
      router.replace('/');
    }
  } finally {
    // loadingWrapped.value = false;
  }
}

onMounted(getWrapped);
</script>

<template>
  <div class="bg-black w-full h-screen flex items-center justify-center">
    <div
      v-if="loadingWrapped"
      ref="loader"
      class="absolute top-0 left-0 w-full h-full bg-black text-white z-10 flex items-center justify-center"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 -960 960 960"
        fill="currentColor"
        class="w-[10vw] lg:w-[5vw] animate-spin"
      >
        <path
          d="M480-80q-82 0-155-31.5t-127.5-86Q143-252 111.5-325T80-480q0-83 31.5-155.5t86-127Q252-817 325-848.5T480-880q17 0 28.5 11.5T520-840q0 17-11.5 28.5T480-800q-133 0-226.5 93.5T160-480q0 133 93.5 226.5T480-160q133 0 226.5-93.5T800-480q0-17 11.5-28.5T840-520q17 0 28.5 11.5T880-480q0 82-31.5 155t-86 127.5q-54.5 54.5-127 86T480-80Z"
        />
      </svg>
    </div>
    <div
      class="relative w-[90vw] lg:w-[50vw]"
      :style="{ aspectRatio: '1.4563' }"
    >
      <div
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center pl-[6%] pr-[25.8%] pt-[8.2%] pb-[6.8%]"
      >
        <div
          id="channel-1"
          class="w-full h-full bg-blue-600 flex items-center justify-center"
          :class="{ hidden: tvChannel !== 1 }"
        >
          <div>
            <div class="text-center text-[3.06vw]/[1] lg:text-[1.7vw]/[1]">
              2024 Jamfluencer
            </div>
            <div class="flex">
              <div
                :id="`wrapped-letter-${index}`"
                v-for="(letter, index) in titleLetters"
                :key="index"
                class="text-[7.2vw]/[1] lg:text-[4vw]/[1]"
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
        <div
          id="channel-4"
          class="w-full h-full bg-neutral-100 flex items-center justify-center"
          :class="{ hidden: tvChannel !== 4 }"
        >
          <Wrapped2024Channel4 :active="tvChannel === 4" />
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
