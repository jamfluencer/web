<script setup lang="ts">
definePageMeta({
  title: 'Login',
  middleware: () => {
    if (isAuthenticated()) return navigateTo('/admin', { replace: true });
  },
});

const getGoogleAuthUrl = useJamfluencerApi().getGoogleAuthUrl();

const onClickLogin = async () => {
  await getGoogleAuthUrl.execute();
  if (getGoogleAuthUrl.data.value) {
    window.location.href = getGoogleAuthUrl.data.value.url;
  }
};
</script>

<template>
  <div
    class="flex flex-col gap-6 h-screen w-full items-center justify-center px-6"
  >
    <div
      class="p-6 bg-black rounded-lg w-full max-w-xs flex flex-col gap-6 outline outline-4 outline-offset-4"
    >
      <button
        class="bg-red-500 hover:bg-red-400 text-white rounded px-4 py-2 transition-colors block w-full"
        :disabled="getGoogleAuthUrl.isPending.value"
        @click="onClickLogin"
      >
        {{ getGoogleAuthUrl.isPending.value ? '...' : 'Log in with Google' }}
      </button>
    </div>
    <button @click="navigateTo('/')" class="hover:underline">Back home</button>
  </div>
</template>
