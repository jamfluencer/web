<script setup lang="ts">
const props = defineProps<{
  active: boolean;
}>();

const wrapped = useWrapped2024();

const mostAppreciated = computed(() => {
  const mostAppreciated = wrapped.value?.social.track;
  return {
    name: mostAppreciated?.details.name,
    artists: mostAppreciated?.details.artists.map(a => a.name).join(', '),
    kudos: mostAppreciated?.kudos,
    art: mostAppreciated?.details.album.images.find(i => i.width === 64)?.url
  };
});

// const stats = computed(() => [
//   {
//     key: 'top.contributor',
//     label: 'Contributor with the Most Kudos',
//     value: wrapped.value?.social.contributor.details + ' (' + wrapped.value?.social.contributor.kudos + ')'
//   }
// ]);

const kudos = useKudos();
const timeout = ref<NodeJS.Timeout>();

function onKudosAnimationEnded() {
  kudos.value.stack.shift();
}

function kudosInterval() {
  timeout.value = setInterval(() => {
    kudos.value.stack.push(kudos.value.id);
    kudos.value.id += 1;
  }, 250);
}

function onChannelActive() {
  kudosInterval();
}

function onChannelInactive() {
  clearInterval(timeout.value);
  kudos.value.stack = [];
  kudos.value.id = 0;
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
  <div class="h-full w-full relative overflow-hidden bg-cover" :style="{ backgroundImage: `url(${mostAppreciated.art})` }">
    <div class="absolute top-0 left-0 w-full h-full bg-black/65"></div>
    <div ref="kudosSpawner" class="absolute bottom-0 left-0 w-full">
      <KudosIcon
        class="absolute top-0"
        v-for="kudo in kudos.stack"
        :key="kudo"
        :heart-height="['20vw', '32vw']"
        :heart-size="`${(kudo % 5) + 1.5}vw`"
        @animation-ended="onKudosAnimationEnded"
      />
    </div>
    <div class="absolute top-0 left-0 w-full h-full backdrop-blur-sm p-[6%] flex flex-col justify-center gap-[10%]">
      <div class="text-center text-[4.8vw] lg:text-[3vw] leading-none font-extrabold">❤️ KUDOS ❤️</div>
      <div class="space-y-2 text-center">
        <div class="text-[1.5vw] lg:text-[1vw] leading-none">Your Total Kudos</div>
        <div class="text-[4vw]/[1] lg:text-[3vw]/[1] font-extrabold">{{ wrapped?.you.social.kudos }}</div>
      </div>
      <div class="space-y-2 self-center">
        <div class="text-[1.5vw] lg:text-[1vw] leading-none text-center">Track with the Most Kudos</div>
        <div class="flex items-center gap-[5%]">
          <div class="flex-shrink-0 w-[4vw] lg:w-[3vw]">
            <img :src="mostAppreciated.art" class="w-full aspect-square mx-auto" />
          </div>
          <div class="flex-grow whitespace-nowrap">
            <div class="text-[2vw]/[1] lg:text-[1.25vw]/[1] font-extrabold">{{ mostAppreciated.name }}</div>
            <div class="text-[1.5vw] lg:text-[1vw]">by {{ mostAppreciated.artists }}</div>
          </div>
        </div>        
      </div>
      <div class="space-y-2 text-center">
        <div class="text-[1.5vw] lg:text-[1vw] leading-none">Most Kudos'd Contributor</div>
        <div class="text-[2vw]/[1] lg:text-[1.25vw]/[1] font-extrabold">{{ wrapped?.social.contributor.details }} ({{ wrapped?.social.contributor.kudos }})</div>
      </div>
    </div>
  </div>
</template>
