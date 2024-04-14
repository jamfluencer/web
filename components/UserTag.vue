<script setup lang="ts">
defineProps<{
  user: string;
}>();
</script>

<template>
  <span class="text-xs leading-relaxed bg-orange-700 px-1">
    {{ user }}
  </span>
</template>
