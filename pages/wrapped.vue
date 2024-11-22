<script setup lang="ts">
import gsap from 'gsap';

const titleLetters = 'WRAPPED!'.split('');

onMounted(() => {
  let tl = gsap.timeline();

  tl.from(
    titleLetters.map((_, index) => `#wrapped-letter-${index}`),
    {
      duration: 0.5,
      x: 0,
      y: -100,
      opacity: 0,
      ease: 'bounce.out',
      stagger: 0.2,
      delay: 0.5,
    }
  );
});
</script>

<template>
  <div class="h-screen w-full flex items-center justify-center cursor-default">
    <div class="flex">
      <div
        :id="`wrapped-letter-${index}`"
        v-for="(letter, index) in titleLetters"
        :key="index"
        class="font-wrapped text-8xl"
      >
        {{ letter }}
      </div>
    </div>
  </div>
</template>
