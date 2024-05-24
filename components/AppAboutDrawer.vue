<script setup lang="ts">
const isOpen = defineModel<boolean>({ required: true });
</script>

<template>
  <CommonDrawer v-model="isOpen">
    <template #title>About</template>
    <div class="flex flex-col gap-4">
      <p>
        <span class="text-primary">jamfluencer.app</span> is a companion app for
        the weekly Influencer Jam.
      </p>
      <p>
        While the Jam is in progress, throw this in a window nearby for a fun,
        visual accompaniment while you enjoy the choices of your colleagues.
      </p>
      <p>
        We hope to add more features in the future, so check back each week!
      </p>
      <p>jamfluencer.app is a project by Ryan and Marshall.</p>
      <p>All track metadata provided by Spotify.</p>
      <a
        href="https://www.spotify.com"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="/assets/images/spotify_logo_with_text.svg"
          alt="Spotify Logo"
          class="w-full max-w-[10rem]"
        />
      </a>
    </div>
  </CommonDrawer>
</template>
