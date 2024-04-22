<script setup lang="ts">
import {
  cachedPlaylist,
  cachedQueue,
  type Queue,
} from '@/composables/usePlaylist';
import { FastAverageColor } from 'fast-average-color';

const nowPlaying = ref();
const isOffAir = ref(true);

const socket = new WebSocket('ws://192.168.1.245:8080');
socket.onmessage = function ({ data }: MessageEvent<string>) {
  const { currentlyPlaying, queue } = JSON.parse(data) as Queue;

  cachedQueue.value = queue;

  if (currentlyPlaying === null) {
    isOffAir.value = true;
  } else {
    isOffAir.value = false;
    nowPlaying.value = currentlyPlaying;

    const fac = new FastAverageColor();
    fac
      .getColorAsync(nowPlaying.value.image, {
        algorithm: 'simple',
        mode: 'precision',
      })
      .then((color) => {
        document.body.style.backgroundColor = color.rgba;
      })
      .catch((e) => {
        console.log(e);
      });
  }
};

watchEffect(() => {
  cachedQueue.value = cachedQueue.value.map((track) => {
    const currentSongInPlaylist = cachedPlaylist.value?.tracks.find(
      (playlistTrack) => playlistTrack.id === track.id
    );
    if (!currentSongInPlaylist) return track;
    return {
      ...track,
      addedBy: currentSongInPlaylist.addedBy,
    };
  });
});

watchEffect(() => {
  const currentSongInPlaylist = cachedPlaylist.value?.tracks.filter(
    (track) => track.id === nowPlaying.value?.id
  )?.[0];
  if (!currentSongInPlaylist) return;
  nowPlaying.value.addedBy = currentSongInPlaylist.addedBy;
});

const jammed = ref(false);
</script>

<template>
  <div>
    <OffAir v-if="isOffAir" />
    <section v-else class="flex flex-col gap-4">
      <h2 class="font-bold">Now playing</h2>
      <div v-if="!nowPlaying" class="now-playing-card flex flex-col gap-4">
        <div class="rounded-lg overflow-hidden">
          <div class="w-full max-w-96 aspect-square bg-slate-800"></div>
        </div>
        <div>
          <div class="text-2xl font-bold">Loading...</div>
        </div>
      </div>
      <div v-else class="now-playing-card flex flex-col gap-4">
        <div class="rounded-lg overflow-hidden">
          <div class="w-full max-w-96 aspect-square relative">
            <NuxtImg
              :src="nowPlaying.image"
              :alt="`${nowPlaying.album} cover art`"
              class="w-full h-full"
              loading="lazy"
            />
            <div
              class="absolute top-0 left-0 w-full h-full flex items-center justify-center cursor-pointer"
              @click="jammed = !jammed"
            >
              <IconJar v-if="jammed" class="text-red-800" size="96" />
            </div>
          </div>
        </div>
        <div class="overflow-hidden">
          <div class="text-2xl font-bold truncate" :title="nowPlaying.song">
            {{ nowPlaying.song }}
          </div>
          <div class="truncate" :title="nowPlaying.artist">
            {{ nowPlaying.artist }}
          </div>
          <div v-if="nowPlaying.addedBy">
            <UserTag :user="getUser(nowPlaying.addedBy)" />
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
