<script setup lang="ts">
definePageMeta({
  title: 'Admin',
  middleware: 'auth',
});

const user = useUser();

const logout = () => {
  const token = useCookie('token');
  token.value = undefined;
  navigateTo('/login');
};

const getSpotifyAuthUrl = useJamfluencerApi().getSpotifyAuthUrl();

const onClickAuthSpotify = async () => {
  await getSpotifyAuthUrl.execute();
  if (!getSpotifyAuthUrl.data.value) return;
  window.location.href = getSpotifyAuthUrl.data.value.url;
};

const date = ref(
  new Date().toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })
);

const playlistUrl = ref('');
const playlistId = computed(() => {
  // match the id from this: https://open.spotify.com/playlist/1N99pr8GldqK5twnOduUtv?si=d580f54397c64040
  const match = playlistUrl.value.match(/playlist\/(.*)\?/);
  return match ? match[1] : '';
});

const jamUrl = ref('');

const onClickStartJam = async () => {
  await useJamfluencerApi().startJam({
    date: date.value,
    playlistId: playlistId.value,
    jamUrl: jamUrl.value,
  });
};

const onClickStopJam = async () => {
  await useJamfluencerApi().stopJam();
};
</script>

<template>
  <div
    class="flex flex-col gap-6 h-screen w-full items-center justify-center px-6"
  >
    <div class="text-center flex flex-col gap-2">
      <div class="text-lg">Jamfluencer Admin</div>
      <div class="text-sm">Logged in as: {{ user?.email }}</div>
    </div>
    <div
      class="p-6 bg-black rounded-lg w-full max-w-xs flex flex-col gap-6 outline outline-4 outline-offset-4"
    >
      <div>
        <button
          v-if="!user?.has_spotify"
          class="bg-green-500 hover:bg-green-400 text-black rounded px-4 py-2 transition-colors block w-full"
          @click="onClickAuthSpotify"
        >
          Authorize Spotify
        </button>
        <div
          v-else
          class="border-2 border-green-500 text-green-500 rounded-lg px-4 py-2 transition-colors block w-full text-center"
        >
          Spotify Connected
        </div>
      </div>
      <div class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label for="date" class="text-sm">Date</label>
          <input
            v-model="date"
            id="date"
            type="text"
            class="block bg-white text-black rounded px-2 py-1"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="playlistUrl" class="text-sm">Playlist URL</label>
          <input
            v-model="playlistUrl"
            id="playlistUrl"
            type="text"
            class="block bg-white text-black rounded px-2 py-1"
          />
        </div>
        <div class="flex flex-col gap-1">
          <label for="jamUrl" class="text-sm">Jam URL</label>
          <input
            v-model="jamUrl"
            id="jamUrl"
            type="text"
            class="block bg-white text-black rounded px-2 py-1"
          />
        </div>
      </div>
      <div>
        <button
          class="bg-primary bg-opacity-75 hover:bg-opacity-100 text-black text-lg rounded px-4 py-4 transition-colors block w-full"
          @click="onClickStartJam"
        >
          Start the Jam
        </button>
      </div>
      <div>
        <button
          class="bg-primary bg-opacity-75 hover:bg-opacity-100 text-black text-lg rounded px-4 py-4 transition-colors block w-full"
          @click="onClickStopJam"
        >
          Stop the Jam
        </button>
      </div>
      <div class="flex items-end justify-center mt-4">
        <button @click="logout" class="hover:underline">Logout</button>
        <!-- <button @click="null" class="hover:underline">Save</button> -->
      </div>
    </div>
    <button @click="navigateTo('/')" class="hover:underline">Back home</button>
  </div>
</template>
