<script setup lang="ts">
const isQueueDrawerOpen = ref(false);
const isRecentDrawerOpen = ref(false);
const isAboutDrawerOpen = ref(false);
const isPlaylistDrawerOpen = ref(false);

const actions = [
  { text: 'queue', action: () => (isQueueDrawerOpen.value = true) },
  { text: 'recent', action: () => (isRecentDrawerOpen.value = true) },
  { text: 'playlist', action: () => (isPlaylistDrawerOpen.value = true) },
  { text: 'about', action: () => (isAboutDrawerOpen.value = true) },
];

const currentTrack = ref<Jamfluencer.Track>(mockTracks[0]);

const isOffAir = ref(false);
</script>

<template>
  <div class="h-screen" tabindex="0">
    <AppBg :current-track="currentTrack" :is-off-air="isOffAir" />
    <div id="header" class="fixed left-0 top-0 px-12 py-6 z-10">
      <div class="group cursor-pointer">
        <span class="group-hover:text-primary transition-colors"
          >jamfluencer</span
        >.app
      </div>
    </div>
    <div id="main" class="fixed left-0 bottom-0 w-full p-12 z-10">
      <div class="flex items-end">
        <template v-if="!isOffAir">
          <TrackDisplay :track="currentTrack" />
          <ul
            id="navigation"
            class="flex-shrink-0 flex flex-col gap-4 items-end"
          >
            <li v-for="(item, index) in actions" :key="index">
              <button
                class="hover:underline focus:underline underline-offset-8"
                @click="item.action"
              >
                {{ item.text }}
              </button>
            </li>
          </ul>
        </template>
        <template v-else>
          <div class="flex flex-col gap-1">
            <div class="text-4xl font-bold">OFF AIR</div>
            <div>Check back next Friday!</div>
          </div>
        </template>
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
