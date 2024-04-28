<script setup lang="ts">
defineProps<{
  user: string;
  small?: boolean;
}>();
</script>

<template>
  <div>
    <span
      class="bg-white text-black font-extrabold"
      :class="{
        'text-sm px-2 py-1': !small,
        'text-xs px-1': small,
      }"
    >
      {{ user }}
    </span>
  </div>
</template>
