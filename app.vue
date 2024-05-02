<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();

useHead({
  title: computed(() =>
    [route.meta.title, appConfig.title].filter(Boolean).join(' - ')
  ),
});

const user = useUser();

if (isAuthenticated()) {
  await callOnce(async () => {
    user.value = await useJamfluencerApi().getUser();
  });
}
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
