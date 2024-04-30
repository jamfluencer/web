<script setup lang="ts">
const route = useRoute();
const appConfig = useAppConfig();

useHead({
  title: computed(() =>
    [route.meta.title, appConfig.title].filter(Boolean).join(' - ')
  ),
});
</script>

<template>
  <div>
    <NuxtPage />
  </div>
</template>
