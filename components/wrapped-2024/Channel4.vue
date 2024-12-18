<script setup lang="ts">
const props = defineProps<{
  active: boolean;
}>();

const wrapped = useWrapped2024();

const stats = ref([
  {
    id: 1,
    text: 'Total Playlists',
    value: computed(() => wrapped.value?.playlists.count),
  },
  {
    id: 2,
    text: 'Average Tracks Per Playlist',
    value: computed(() => wrapped.value?.playlists.tracks.mean),
  },
  {
    id: 3,
    text: 'Most Tracks in a Playlist',
    value: computed(() => wrapped.value?.playlists.tracks.maximum),
  },
  {
    id: 4,
    text: 'Least Tracks in a Playlist',
    value: computed(() => wrapped.value?.playlists.tracks.minimum),
  },
]);

let tlCover = gsap.timeline();
let tlScroll = gsap.timeline();

const startAnimation = async () => {
  tlCover.to('#ch4_cover', {
    rotateY: 180,
    duration: 3,
    ease: 'sine.inOut',
    repeat: -1,
    yoyo: true,
  });

  tlScroll.fromTo(
    '.ch4_scroll-list',
    {
      y: '0%',
    },
    {
      y: '-54%',
      duration: 10,
      ease: 'none',
      repeat: -1,
    }
  );
};

const resetAnimation = () => {
  const els = ['#ch4_cover', '#ch4_scroll-list'];
  [tlCover, tlScroll].forEach((i) => i.kill());
  gsap.set(els, { clearProps: 'all' });
  tlCover = gsap.timeline();
  tlScroll = gsap.timeline();
};

function onChannelActive() {
  startAnimation();
}

function onChannelInactive() {
  resetAnimation();
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
  <div
    v-if="wrapped?.jam"
    class="h-full w-full relative overflow-hidden bg-[url('/images/wrapped2024/now.jpg')] bg-[length:100%_100%]"
  >
    <div
      class="absolute top-[3%] left-0 w-full flex align-center justify-center"
    >
      <img
        id="ch4_cover"
        src="/images/wrapped2024/now_cover.jpg"
        alt="Now"
        class="block aspect-square w-[17%]"
        :style="{ boxShadow: '0 0 20px 10px rgba(255, 255, 255, 0.5)' }"
      />
    </div>
    <div class="absolute left-0 top-[28%] w-full h-[48%] flex justify-center">
      <div class="w-[80%] overflow-hidden text-center relative">
        <div class="ch4_scroll-list flex flex-col gap-[4vw]">
          <template v-for="_ in 2">
            <div
              v-for="stat in stats"
              :key="stat.id"
              class="flex flex-col gap-2"
            >
              <div class="text-[2.5vw]/[1] lg:text-[1.5vw]/[1]">
                {{ stat.text }}
              </div>
              <div class="text-[2.5vw]/[1] lg:text-[1.5vw]/[1]">
                {{ stat.value }}
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
