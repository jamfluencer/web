<script setup lang="ts">
useHead({ title: 'Influencer Radio' });
</script>

<template>
  <div class="container px-6 py-12 min-h-screen text-white">
    <header class="text-center flex flex-col gap-2 mb-12">
      <h1 class="text-5xl font-bold">
        <NuxtLink to="/">
          Influencer <span class="text-primary">Radio</span>
        </NuxtLink>
      </h1>
      <p class="text-xl">A good tagline goes here.</p>
    </header>
    <main class="flex flex-col gap-12 max-w-96 mx-auto">
      <CurrentlyPlaying />
      <PlaylistTracks />
    </main>
    <footer></footer>
  </div>
</template>
