<script setup lang="ts">
useHead({ title: 'jamfluencer.app' });

const songs = [
  {
    bg: '/images/bg.jpg',
    album: '/images/album2.jpg',
    title: 'Nothing New',
    artist: 'The Strike',
  },
  {
    bg: '/images/bg2.jpg',
    album: '/images/album.jpg',
    title: 'Shy',
    artist: 'Saint Blonde',
  },
];

const bgArt = ref(songs[0].bg);
const albumArt = ref(songs[0].album);
const currentSong = ref({ title: songs[0].title, artist: songs[0].artist });

const bgFrom = ref<HTMLImageElement | null>(null);
const bgTo = ref<HTMLImageElement | null>(null);

async function switchSongs(nextSong: any) {
  albumArt.value = nextSong.album;
  currentSong.value = {
    title: nextSong.title,
    artist: nextSong.artist,
  };

  const bgFromEl = bgFrom.value!;
  const bgToEl = bgTo.value!;

  bgToEl.src = nextSong.bg;

  bgFromEl.classList.add('fade-out');
  bgToEl.classList.add('fade-in');

  await new Promise<void>((resolve) => {
    bgToEl.addEventListener('animationend', () => {
      bgFromEl.src = nextSong.bg;
      bgFromEl.classList.remove('fade-out');
      bgToEl.classList.remove('fade-in');
      resolve();
    });
  });
}

function onCurrentClick(e: MouseEvent) {
  e.preventDefault();

  const nextSong = songs.find((s) => s.title !== currentSong.value.title)!;

  switchSongs(nextSong);
}
</script>

<template>
  <div class="h-screen" tabindex="0">
    <div id="background" class="fixed top-0 left-0 w-full h-full">
      <div class="w-full h-full">
        <img
          ref="bgFrom"
          class="absolute w-full h-full object-cover"
          :src="bgArt"
          alt="background"
        />
        <img
          ref="bgTo"
          class="absolute w-full h-full object-cover"
          src=""
          alt="background"
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
    <div
      id="main"
      class="fixed left-0 bottom-0 w-full p-12 z-10"
      @click="onCurrentClick"
    >
      <div class="flex items-end">
        <div id="current" class="flex-auto flex gap-6 items-end">
          <img class="w-32 h-32 rounded" :src="albumArt" alt="current" />
          <div class="flex flex-col gap-1">
            <div class="text-4xl font-bold">{{ currentSong.title }}</div>
            <div>{{ currentSong.artist }}</div>
          </div>
        </div>
        <ul id="extra" class="flex-shrink-0 flex flex-col gap-4 items-end">
          <li>queue</li>
          <li>recent</li>
          <li>about</li>
        </ul>
      </div>
    </div>
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
