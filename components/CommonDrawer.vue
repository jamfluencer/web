<script setup lang="ts">
import { vOnClickOutside } from '@vueuse/components';

const isOpen = defineModel<boolean>({ required: true });

function closeDrawer() {
  isOpen.value = false;
}

onKeyStroke('Escape', closeDrawer);
</script>

<template>
  <Teleport to="body">
    <div
      class="fixed top-0 right-0 h-screen w-96 bg-black z-50 transition-transform"
      :class="{
        'translate-x-0': isOpen,
        'translate-x-full': !isOpen,
      }"
      v-on-click-outside="closeDrawer"
    >
      <div class="flex flex-col gap-4 p-8 h-full w-full">
        <div class="flex-shrink-0 text-2xl font-bold">
          <slot name="title">Title</slot>
        </div>
        <div class="flex-auto relative overflow-auto">
          <slot>
            <p>Content</p>
          </slot>
        </div>
      </div>
    </div>
  </Teleport>
</template>
