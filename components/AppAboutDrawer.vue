<script setup lang="ts">
const isOpen = defineModel<boolean>({ required: true });
</script>

<template>
  <CommonDrawer v-model="isOpen">
    <template #title>About</template>
    <p>Jamfluencer.app is...</p>
  </CommonDrawer>
</template>
