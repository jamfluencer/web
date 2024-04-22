<script setup lang="ts">
import gsap from 'gsap';

defineProps<{
  size?: number | string;
}>();

const lid = ref<SVGPathElement | null>(null);
const jar = ref<SVGPathElement | null>(null);
const svg = ref<SVGSVGElement | null>(null);

onMounted(() => {
  const lidPath = lid.value;
  const jarPath = jar.value;
  const svgEl = svg.value;

  if (!lidPath || !jarPath) return;

  let tl = gsap.timeline();
  tl.fromTo(lidPath, { y: -2 }, { y: 1, duration: 0.35 })
    .to(svgEl, { scale: 1.2, duration: 0.15 })
    .to(svgEl, { scale: 1, duration: 0.15 });
  // gsap.fromTo(lidPath, { y: -2 }, { y: 0.25, duration: 0.25 });
});
</script>
<template>
  <svg
    ref="svg"
    class="overflow-visible"
    :width="size ?? 24"
    :height="size ?? 24"
    viewBox="0 0 12.7 12.7"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      ref="lid"
      style="fill: currentColor"
      d="M1.588 1.852s0-1.587 1.587-1.587h6.35s1.587 0 1.587 1.587c0 1.588 0 0 0 0s0 .794-.793.794H2.38s-.793 0-.793-.794z"
    />
    <path
      ref="jar"
      style="fill: currentColor"
      d="M2.381 3.175v1.058s-.794 0-.794.794v5.292s0 .794.794.794h7.938s.793 0 .793-.794V5.027s0-.794-.793-.794V3.175Z"
    />
  </svg>
</template>
