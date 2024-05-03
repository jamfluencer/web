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
</script>

<template>
  <div
    class="flex flex-col gap-6 h-screen w-full items-center justify-center px-6"
  >
    <div class="text-center flex flex-col gap-2">
      <div class="text-lg">Jamfluencer Admin</div>
      <div class="text-sm">Logged in as: {{ user.email }}</div>
    </div>
    <div
      class="p-6 bg-black rounded-lg w-full max-w-xs flex flex-col gap-6 outline outline-4 outline-offset-4"
    >
      <div>
        <button
          v-if="!user.has_spotify"
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
      <div class="flex flex-col gap-1">
        <label for="spotifyId" class="text-sm">Current Playlist ID</label>
        <input
          id="spotifyId"
          type="text"
          class="block bg-white text-black rounded px-2 py-1"
        />
      </div>
      <div class="flex items-end justify-between mt-4">
        <button @click="logout" class="hover:underline">Logout</button>
        <button @click="null" class="hover:underline">Save</button>
      </div>
    </div>
    <button @click="navigateTo('/')" class="hover:underline">Back home</button>
  </div>
</template>
