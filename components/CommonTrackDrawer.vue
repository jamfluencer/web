<script setup lang="ts">
const isOpen = defineModel<boolean>({ required: true });

defineProps<{
  title: string;
  tracks: JamfluencerApi.Track[] | null | undefined;
}>();
</script>

<template>
  <CommonDrawer v-model="isOpen">
    <template #title>{{ title }}</template>
    <ol
      v-if="tracks"
      class="flex flex-col gap-4 absolute top-0 left-0 w-full h-full"
    >
      <li
        v-for="track in tracks"
        :key="track.id"
        class="flex gap-4 items-center"
      >
        <img
          class="w-16 h-16 rounded"
          :src="track.album.images[1].url"
          :alt="`${track.album.name} cover`"
        />
        <div class="flex flex-col overflow-hidden">
          <div class="font-bold text-sm truncate">{{ track.name }}</div>
          <div class="text-xs truncate">
            {{ track.artists.map((a) => a.name).join(', ') }}
          </div>
          <UserTag :user="track.added_by" small />
        </div>
      </li>
    </ol>
    <div v-else>
      {{ `No data :(` }}
    </div>
  </CommonDrawer>
</template>
