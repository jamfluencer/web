<script setup lang="ts">
const { googleAuthUrl } = useJamfluencerApi();
</script>

<template>
  <div class="flex h-screen w-full items-center justify-center">
    <div
      class="p-6 bg-black rounded-lg w-full max-w-xs flex flex-col gap-6 outline outline-4 outline-offset-4"
    >
      <button
        class="bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2 transition-colors block w-full"
        :disabled="googleAuthUrl.isPending.value"
        @click="googleAuthUrl.get"
      >
        {{ googleAuthUrl.isPending.value ? '...' : 'Log in with Google' }}
      </button>
      <div class="flex items-end justify-center mt-4">
        <button @click="navigateTo('/')" class="hover:underline">
          Back home
        </button>
      </div>
    </div>
  </div>
</template>
