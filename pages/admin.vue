<script setup lang="ts"></script>

<template>
  <div
    class="flex flex-col gap-6 h-screen w-full items-center justify-center px-6"
  >
    <div class="text-center">Jamfluencer Admin</div>
    <div
      class="p-6 bg-black rounded-lg w-full max-w-xs flex flex-col gap-6 outline outline-4 outline-offset-4"
    >
      <div>
        <button
          @click="null"
          class="bg-green-500 hover:bg-green-400 text-black rounded px-4 py-2 transition-colors block w-full"
        >
          Authorize Spotify
        </button>
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
        <button @click="navigateTo('/login')" class="hover:underline">
          Logout
        </button>
        <button @click="null" class="hover:underline">Save</button>
      </div>
    </div>
  </div>
</template>
