<script setup lang="ts">
const props = withDefaults(defineProps<{
  heartHeight?: string[];
  heartSize?: string;
}>(), {
  heartHeight: () => ['8rem', '10rem'],
  heartSize: '24px',
});

const emit = defineEmits<{
  (e: 'animationEnded'): void;
}>();

const heart = ref<HTMLElement | null>(null);

const leftPosition = ref(0);

async function animateHeart() {
  if (!heart.value) return;

  const animation = heart.value.animate(
    [
      { transform: 'translateY(0)', opacity: 1 },
      { transform: `translateY(-${props.heartHeight[0]})`, opacity: 1 },
      { transform: `translateY(-${props.heartHeight[1]})`, opacity: 0 },
    ],
    {
      duration: 1000,
      easing: 'ease-out',
    }
  );

  await animation.finished;
  emit('animationEnded');
}

function generateLeftPosition() {
  leftPosition.value = Math.floor(Math.random() * 70) + 10;
}

onBeforeMount(() => {
  generateLeftPosition();
});

onMounted(() => {
  animateHeart();
});
</script>

<template>
  <svg
    ref="heart"
    :style="{
      left: `${leftPosition}%`,
    }"
    xmlns="http://www.w3.org/2000/svg"
    :height="heartSize"
    viewBox="0 -960 960 960"
    :width="heartSize"
    fill="red"
  >
    <path
      d="m480-120-58-52q-101-91-167-157T150-447.5Q111-500 95.5-544T80-634q0-94 63-157t157-63q52 0 99 22t81 62q34-40 81-62t99-22q94 0 157 63t63 157q0 46-15.5 90T810-447.5Q771-395 705-329T538-172l-58 52Z"
    />
  </svg>
</template>
