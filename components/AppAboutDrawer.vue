<script setup lang="ts">
const isOpen = defineModel<boolean>({ required: true });
</script>

<template>
  <CommonDrawer v-model="isOpen">
    <template #title>About</template>
    <p>
      <span class="text-primary">jamfluencer.app</span> is a companion app for
      the weekly Influencer Jam.
    </p>
    <p class="mt-4">
      While the Jam is in progress, throw this in a window nearby for a fun,
      visual accompaniment while you enjoy the choices of your colleagues.
    </p>
    <p class="mt-4">
      We hope to add more features in the future, so check back each week!
    </p>
    <p class="mt-4">jamfluencer.app is a project by Ryan and Marshall.</p>
  </CommonDrawer>
</template>
