<script setup lang="ts">
const offAirBg = '/images/test_pattern.png';

const isQueueDrawerOpen = ref(false);
const isRecentDrawerOpen = ref(false);
const isAboutDrawerOpen = ref(false);
const isPlaylistDrawerOpen = ref(false);

const navigation = [
  { text: 'queue', action: () => (isQueueDrawerOpen.value = true) },
  { text: 'recent', action: () => (isRecentDrawerOpen.value = true) },
  { text: 'playlist', action: () => (isPlaylistDrawerOpen.value = true) },
  { text: 'about', action: () => (isAboutDrawerOpen.value = true) },
];

const bgArt = ref(mockTracks[0].bg);
const albumArt = ref(mockTracks[0].album);
const currentSong = ref({
  title: mockTracks[0].title,
  artist: mockTracks[0].artist,
  addedBy: mockTracks[0].addedBy,
});

const bgFrom = ref<HTMLImageElement | null>(null);
const bgTo = ref<HTMLImageElement | null>(null);

// async function switchSongs(nextSong: any) {
//   albumArt.value = nextSong.album;
//   currentSong.value = {
//     title: nextSong.title,
//     artist: nextSong.artist,
//   };

//   const bgFromEl = bgFrom.value!;
//   const bgToEl = bgTo.value!;

//   bgToEl.src = nextSong.bg;

//   bgFromEl.classList.add('fade-out');
//   bgToEl.classList.add('fade-in');

//   await new Promise<void>((resolve) => {
//     bgToEl.addEventListener('animationend', () => {
//       bgFromEl.src = nextSong.bg;
//       bgFromEl.classList.remove('fade-out');
//       bgToEl.classList.remove('fade-in');
//       resolve();
//     });
//   });
// }

const isOffAir = ref(false);
</script>

<template>
  <div class="h-screen" tabindex="0">
    <div id="background" class="fixed top-0 left-0 w-full h-full">
      <div v-if="isOffAir" class="w-full h-full">
        <img
          class="absolute w-full h-full object-cover"
          :src="offAirBg"
          alt=""
        />
      </div>
      <div v-else class="w-full h-full">
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
    <div id="header" class="fixed left-0 top-0 px-12 py-6 z-10">
      <div class="group cursor-pointer">
        <span class="group-hover:text-primary transition-colors"
          >jamfluencer</span
        >.app
      </div>
    </div>
    <div id="main" class="fixed left-0 bottom-0 w-full p-12 z-10">
      <div class="flex items-end">
        <div id="current" class="flex-auto flex gap-6 items-end">
          <img
            v-if="!isOffAir"
            class="w-32 h-32 rounded"
            :src="albumArt"
            alt="current"
          />
          <div class="flex flex-col gap-1">
            <UserTag :user="currentSong.addedBy" class="mb-2" />
            <div class="text-4xl font-bold">
              {{ isOffAir ? 'OFF AIR' : currentSong.title }}
            </div>
            <div>
              {{ isOffAir ? 'Check back on Friday!' : currentSong.artist }}
            </div>
          </div>
        </div>
        <ul
          v-if="!isOffAir"
          id="navigation"
          class="flex-shrink-0 flex flex-col gap-4 items-end"
        >
          <li v-for="(item, index) in navigation" :key="index">
            <button
              class="hover:underline focus:underline underline-offset-8"
              @click="item.action"
            >
              {{ item.text }}
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <CommonTrackDrawer
    v-model="isQueueDrawerOpen"
    title="Up next"
    :tracks="mockTracks"
  />
  <CommonTrackDrawer
    v-model="isRecentDrawerOpen"
    title="Recently played"
    :tracks="mockTracks"
  />
  <CommonTrackDrawer
    v-model="isPlaylistDrawerOpen"
    title="Playlist"
    :tracks="mockTracks"
  />
  <AppAboutDrawer v-model="isAboutDrawerOpen" />
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
