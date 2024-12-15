<script setup lang="ts">
const props = defineProps<{
  active: boolean;
  scale: number;
}>();

const wrapped = useWrapped2024();

let tl = gsap.timeline();
let tickerTl = gsap.timeline();

const startAnimation = async () => {
  tl.from('#ch2_num', {
    rotate: -360,
    scale: 0,
    delay: 0.5,
    duration: 1,
  }).to('#ch2_num', {
    rotate: -5,
    keyframes: [
      { rotate: 5, scaleX: 1.05, scaleY: 0.95, duration: 1 },
      { rotate: -5, scaleX: 0.95, scaleY: 1.05, duration: 1 },
    ],
    repeat: -1,
    yoyo: true,
  });

  tickerTl.to('#ch2_ticker', {
    left: 'calc(0px - 100%)',
    duration: 6,
    ease: 'none',
    repeat: -1,
    onComplete: () => {
      gsap.set('#ch2_ticker', { left: '100%' });
    },
  });
};

const resetAnimation = () => {
  const els = ['#ch2_ticker', '#ch2_num'];
  [tl, tickerTl].forEach((i) => i.kill());
  gsap.set(els, { clearProps: 'all' });
  tl = gsap.timeline();
};

function onChannelActive() {
  startAnimation();
}

function onChannelInactive() {
  resetAnimation();
}

watch(
  () => props.active,
  (active) => {
    if (active) {
      onChannelActive();
    } else {
      onChannelInactive();
    }
  }
);
</script>

<template>
  <div
    v-if="wrapped?.jam"
    ref="tvContainer"
    class="h-full w-full relative overflow-hidden bg-cover"
    :style="{ backgroundImage: `url('/images/wrapped2024/news.jpg')` }"
  >
    <div
      class="absolute top-[10%] right-[3%] w-[39%] h-[36.5%] flex flex-col justify-center items-center"
    >
      <div :style="{ fontSize: `${scale * 1}rem` }">
        <strong class="font-extrabold">{{ wrapped.jam.contributors }}</strong>
        contributors added
      </div>
      <div id="ch2_num">
        <strong class="font-extrabold" :style="{ fontSize: `${scale * 3}rem` }">
          {{ new Intl.NumberFormat().format(wrapped.jam.tracks) }}
        </strong>
      </div>
      <div :style="{ fontSize: `${scale * 1}rem` }">tracks this year!</div>
    </div>
    <div
      class="h-[7%] w-full absolute bottom-[6%] left-0 bg-neutral-700 text-white flex justify-center items-center"
    >
      <div
        id="ch2_ticker"
        class="absolute left-full whitespace-nowrap"
        :style="{ fontSize: `${scale * 1}rem` }"
      >
        <span class="text-red-400 font-extrabold">BREAKING:</span>
        <!-- {{ wrapped.jam.duration }} of solid hits! -->
        {{ scale }}
      </div>
    </div>
  </div>
</template>
