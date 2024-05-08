<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();

useHead({
  title: computed(() =>
    [route.meta.title, appConfig.title].filter(Boolean).join(' - ')
  ),
});

const user = useUser();
const playlist = usePlaylist();

const WEEK_6_PLAYLIST_ID = '4VKwhS5StArri0Rz0eJZdE';

if (isAuthenticated()) {
  await callOnce(async () => {
    const jamApi = useJamfluencerApi();
    try {
      user.value = await jamApi.getUser();
      // playlist.value = await jamApi.getPlaylist(WEEK_6_PLAYLIST_ID);
    } catch (error) {
      console.error(error);
    }
  });
}
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
