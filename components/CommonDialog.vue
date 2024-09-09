<script setup lang="ts">
const isOpen = defineModel<boolean>({ required: true });

function closeDialog() {
  isOpen.value = false;
}

onKeyStroke('Escape', closeDialog);
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed top-0 left-0 size-full bg-black/65 z-10"
      :class="{ hidden: !isOpen }"
      @click.self="closeDialog"
    >
      <slot />
    </div>
  </Teleport>
</template>
