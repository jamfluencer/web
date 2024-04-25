<script setup lang="ts">
useHead({ title: 'jamfluencer.app' });

const songs = [
  {
    id: '1',
    bg: '/images/bg.jpg',
    album: '/images/album2.jpg',
    title: 'Nothing New',
    artist: 'The Strike',
  },
  {
    id: '2',
    bg: '/images/bg2.jpg',
    album: '/images/album.jpg',
    title: 'Shy',
    artist: 'Saint Blonde',
  },
];

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

const bgArt = ref(songs[0].bg);
const albumArt = ref(songs[0].album);
const currentSong = ref({ title: songs[0].title, artist: songs[0].artist });

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
</script>

<template>
  <div class="h-screen" tabindex="0">
    <div id="background" class="fixed top-0 left-0 w-full h-full">
      <div class="w-full h-full">
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
      <div class="absolute top-0 left-0 w-full h-full bg-black opacity-45" />
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
          <img class="w-32 h-32 rounded" :src="albumArt" alt="current" />
          <div class="flex flex-col gap-1">
            <div class="text-4xl font-bold">{{ currentSong.title }}</div>
            <div>{{ currentSong.artist }}</div>
          </div>
        </div>
        <ul id="navigation" class="flex-shrink-0 flex flex-col gap-4 items-end">
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
  <!-- TODO: Make these a single SongListDrawer or sumthin -->
  <AppQueueDrawer v-model="isQueueDrawerOpen" />
  <AppRecentDrawer v-model="isRecentDrawerOpen" />
  <AppAboutDrawer v-model="isAboutDrawerOpen" />
  <AppPlaylistDrawer v-model="isPlaylistDrawerOpen" />
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
