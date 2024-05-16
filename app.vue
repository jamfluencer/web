<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();

useHead({
  title: computed(() =>
    [route.meta.title, appConfig.title].filter(Boolean).join(' - ')
  ),
});

const user = useUser();

async function setUser() {
  try {
    user.value = await useJamfluencerApi().getUser();
  } catch (error) {
    console.error(error);
  }
}

if (isAuthenticated()) callOnce(setUser);
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
