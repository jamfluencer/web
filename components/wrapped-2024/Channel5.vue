<script setup lang="ts">
const props = defineProps<{
  active: boolean;
}>();

const wrapped = useWrapped2024();

const item1 = ref<HTMLElement | null>(null);
const item2 = ref<HTMLElement | null>(null);

const swapItems = () => {
  if (!item1.value || !item2.value) return;
  if (item1.value.style.display === 'none') {
    item1.value.style.display = 'flex';
    item2.value.style.display = 'none';
  } else {
    item1.value.style.display = 'none';
    item2.value.style.display = 'flex';
  }
  countdown.value = 6;
};

const { pause: pauseSwap, resume: resumeSwap } = useIntervalFn(
  swapItems,
  6000,
  {
    immediate: false,
  }
);

const countdown = ref(5);

const { pause: pauseCountdown, resume: resumeCountdown } = useIntervalFn(
  () => {
    if (countdown.value > 0) countdown.value -= 1;
  },
  1000,
  {
    immediate: false,
  }
);

function onChannelActive() {
  resumeSwap();
  resumeCountdown();
}

function onChannelInactive() {
  pauseSwap();
  pauseCountdown();
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
    v-if="wrapped"
    class="h-full w-full relative overflow-hidden bg-cover"
    :style="{ backgroundImage: `url('/images/wrapped2024/jsn.gif')` }"
  >
    <div class="absolute top-[8%] left-[8%] w-[32%] h-[62%] overflow-hidden">
      <div
        class="absolute top-0 left-0 w-full h-full bg-neutral-200 blur-[1px]"
      ></div>

      <div
        ref="item1"
        class="z-10 relative text-neutral-700 flex flex-col h-full"
      >
        <div
          class="bg-yellow-600 text-neutral-200 px-[6%] py-[1%] text-[2vw] lg:text-[1.25vw] flex-grow-0 flex-shrink-0 tracking-wider"
        >
          J-202401
        </div>
        <div class="flex-auto px-[6%] py-[4%]">
          <div class="text-pretty">
            <div class="text-[1.5vw] lg:text-[1vw] mb-[4%]">
              The shortest track contributed to a Jam:
            </div>
            <div class="font-bold text-[1.875vw] lg:text-[1.125vw]">
              <a
                :href="wrapped.tracks.duration.minimum.url"
                target="_blank"
                class="hover:underline"
                >{{ wrapped.tracks.duration.minimum.name }}</a
              >
            </div>
            <div class="text-[1.5vw] lg:text-[0.875vw] mt-[4%]">
              An absolute hit at just
              {{ wrapped.tracks.duration.minimum.duration }}!
            </div>
          </div>
        </div>
        <div
          class="flex-none font-bold px-[6%] leading-none flex items-center justify-end gap-[2%]"
        >
          <span class="text-[1.5vw]/[1] lg:text-[0.875vw]/[1]"
            >Retail value:</span
          ><span class="text-[1.75vw]/[1] lg:text-[1vw]/[1]">$Inf</span>
        </div>
        <div
          class="flex-none font-bold px-[6%] pb-[4%] leading-none mt-[4%] flex items-center justify-end gap-[2%]"
        >
          <span class="text-[1.5vw]/[1] lg:text-[0.875vw]/[1]">JSN price:</span
          ><span class="text-[1.75vw]/[1] lg:text-[1vw]/[1]">$NaN</span>
        </div>
      </div>

      <div
        ref="item2"
        class="z-10 relative text-neutral-700 flex flex-col h-full"
        :style="{ display: 'none' }"
      >
        <div
          class="bg-yellow-600 text-neutral-200 px-[6%] py-[1%] text-[2vw] lg:text-[1.25vw] flex-grow-0 flex-shrink-0 tracking-wider"
        >
          J-202402
        </div>
        <div class="flex-auto px-[6%] py-[4%]">
          <div class="text-pretty">
            <div class="text-[1.5vw] lg:text-[1vw] mb-[4%]">
              The most frequently contributed track to the Jam:
            </div>
            <div class="font-bold text-[2vw] lg:text-[1.125vw]">
              <a
                class="hover:underline"
                :href="wrapped.tracks.occurrence.details.url"
                target="_blank"
                >{{ wrapped.tracks.occurrence.details.name }}</a
              >
            </div>
            <div class="text-[1.5vw] lg:text-[0.875vw] mt-[4%]">
              People love this one - act fast!
            </div>
          </div>
        </div>
        <div
          class="flex-none font-bold px-[6%] leading-none flex items-center justify-end gap-[2%]"
        >
          <span class="text-[1.5vw]/[1] lg:text-[0.875vw]/[1]"
            >Retail value:</span
          ><span class="text-[1.75vw]/[1] lg:text-[1vw]/[1]">$Inf</span>
        </div>
        <div
          class="flex-none font-bold px-[6%] pb-[4%] leading-none mt-[4%] flex items-center justify-end gap-[2%]"
        >
          <span class="text-[1.5vw]/[1] lg:text-[0.875vw]/[1]">JSN price:</span
          ><span class="text-[1.75vw]/[1] lg:text-[1vw]/[1]">$NaN</span>
        </div>
      </div>
    </div>
    <div
      class="absolute bottom-[8%] left-[8%] w-[62%] h-[18%] overflow-hidden blur-[0.5px]"
    >
      <div
        class="absolute top-0 left-0 w-full h-full bg-neutral-200 blur-[1px]"
      ></div>
      <div class="relative h-full">
        <div
          class="relative h-[40%] text-neutral-700 px-[3%] flex items-center"
        >
          <div class="text-[2vw] lg:text-[1.125vw] mr-auto">
            Tracks ordered:
            {{ new Intl.NumberFormat().format(wrapped.tracks.count) }}
          </div>
          <div class="text-[2vw] lg:text-[1.125vw]">0:0{{ countdown }}</div>
        </div>
        <div
          v-if="wrapped"
          class="h-[60%] bg-[url('/images/wrapped2024/jsn_logo.png')] bg-[length:100%_100%]"
        ></div>
      </div>
    </div>
  </div>
</template>
