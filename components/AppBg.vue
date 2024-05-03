<script setup lang="ts">
defineProps<{
  isOffAir: boolean;
}>();

const currentlyPlaying = useCurrentlyPlaying();

const OFF_AIR_BG = '/images/test_pattern.png';

const bgArt = computed(
  () => currentlyPlaying.value?.album.images[0].url ?? OFF_AIR_BG
);
const bgFrom = ref<HTMLImageElement | null>(null);
const bgTo = ref<HTMLImageElement | null>(null);

watch(currentlyPlaying, onTrackChange, { immediate: true });

async function onTrackChange(nextTrack: JamfluencerApi.Track | undefined) {
  if (!nextTrack) return;
  if (!bgFrom.value || !bgTo.value) return;

  const bgFromEl = bgFrom.value;
  const bgToEl = bgTo.value;

  bgToEl.src = nextTrack.album.images[0].url;

  bgFromEl.classList.add('fade-out');
  bgToEl.classList.add('fade-in');

  await new Promise<void>((resolve) => {
    bgToEl.addEventListener('animationend', () => {
      bgFromEl.src = nextTrack.album.images[0].url;
      bgFromEl.classList.remove('fade-out');
      bgToEl.classList.remove('fade-in');
      resolve();
    });
  });
}
</script>

<template>
  <div id="background" class="fixed top-0 left-0 w-full h-full">
    <div v-if="isOffAir" class="w-full h-full">
      <img
        class="absolute w-full h-full object-cover"
        :src="OFF_AIR_BG"
        alt=""
      />
    </div>
    <div v-else class="w-full h-full blur-md scale-105">
      <img
        ref="bgFrom"
        class="absolute w-full h-full object-cover"
        :src="bgArt"
        alt=""
      />
      <img
        ref="bgTo"
        class="absolute w-full h-full object-cover"
        src=""
        alt=""
        style="opacity: 0"
      />
    </div>
    <div
      class="absolute top-0 left-0 w-full h-full bg-black"
      :class="{
        'opacity-45': !isOffAir,
        'opacity-85': isOffAir,
      }"
    />
  </div>
</template>

<style>
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}

.fade-in {
  animation: fadeIn 1s;
}

.fade-out {
  animation: fadeOut 1s;
}
</style>
