<script setup lang="ts">
const props = defineProps<{
  track: JamfluencerApi.Track | null | undefined;
}>();

const kudosGiven = ref(false);

async function giveKudos() {
  if (kudosGiven.value) return;
  kudosGiven.value = true;
  try {
    await useJamfluencerApi().giveKudosCurrentTrack();
  } catch (error) {
    kudosGiven.value = false;
    console.error(error);
  }
}

watch(
  () => props.track,
  () => {
    kudosGiven.value = false;
  }
);

const kudos = useKudos();

function onKudosAnimationEnded() {
  kudos.value.stack.shift();
}
</script>

<template>
  <div v-if="track" class="flex-auto flex gap-6 items-end">
    <div class="relative">
      <div ref="kudosSpawner" class="absolute top-0 left-0 w-full -z-10">
        <KudosIcon
          class="absolute top-0"
          v-for="kudo in kudos.stack"
          :key="kudo"
          @animation-ended="onKudosAnimationEnded"
        />
      </div>
      <img
        class="w-32 h-32 rounded"
        :src="track.album.images[0].url"
        alt="current"
      />
      <div
        class="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity"
        :class="{
          'cursor-pointer': !kudosGiven,
          'opacity-100': kudosGiven,
        }"
        @click="giveKudos"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="48"
          viewBox="0 -960 960 960"
          width="48"
          :fill="kudosGiven ? 'red' : '#fff'"
        >
          <path
            d="M720-120H280v-520l280-280 50 50q7 7 11.5 19t4.5 23v14l-44 174h258q32 0 56 24t24 56v80q0 7-2 15t-4 15L794-168q-9 20-30 34t-44 14Zm-360-80h360l120-280v-80H480l54-220-174 174v406Zm0-406v406-406Zm-80-34v80H160v360h120v80H80v-520h200Z"
          />
        </svg>
      </div>
    </div>
    <div class="flex flex-col gap-1">
      <div class="text-4xl font-bold">
        {{ track.name }}
      </div>
      <div>
        {{ track.artists.map((artist) => artist.name).join(', ') }}
      </div>
      <UserTag :user="track.added_by" />
    </div>
  </div>
</template>
