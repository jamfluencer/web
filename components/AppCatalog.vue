<script setup lang="ts">
const isOpen = defineModel<boolean>({required: true});

const searchTerm = ref('');

const results = ref<JamfluencerApi.CatalogSearchResponse>();

const searchCatalog = async () => {
  results.value = await useJamfluencerApi().searchCatalog(searchTerm.value);
  console.log(results.value, results);
};

const appCatalog = ref();
const {activate: trapFocus, deactivate: releaseFocus} = useFocusTrap(
    appCatalog,
    {allowOutsideClick: true}
);

watch(isOpen, async (val) => {
  if (val) {
    await new Promise((resolve) => setTimeout(resolve, 0));
    trapFocus();
  } else {
    releaseFocus();
  }
});
</script>

<template>
  <CommonDialog v-model="isOpen">
    <div
        class="flex justify-center h-full"
        :class="{
        'items-center': !results || Array.isArray(results),
        'items-start': !Array.isArray(results) && results,
      }"
    >
      <div
          ref="appCatalog"
          class="flex flex-col gap-4 h-full w-full max-w-[36rem] p-6"
      >
        <div class="text-center flex-shrink-0">
          Want to know if a track or artist has been played in a Jam before?
        </div>
        <search class="flex justify-center flex-shrink-0">
          <form class="relative w-5/6" @submit.prevent="searchCatalog">
            <div
                class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
            >
              <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
              >
                <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>
            <input
                v-model="searchTerm"
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                placeholder="Enter search terms"
                required
            />
            <button
                type="submit"
                class="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Search
            </button>
          </form>
        </search>
        <div v-if="Array.isArray(results)" class="flex-shrink-0">
          All clear! This hasn't appeared in the Jam!
        </div>
        <div
            v-else-if="results"
            ref="resultsElement"
            class="flex-auto relative"
        >
          <div
              v-if="results.tracks"
              class="absolute top-0 left-0 size-full overflow-auto flex flex-col gap-2"
          >
            <h3 class="capitalize">Tracks</h3>
            <ul class="flex flex-col gap-4">
              <li v-for="track in results.tracks">
                <div class="flex gap-4 items-center bg-slate-800 rounded p-1">
                  <img
                      class="w-16 h-16 rounded"
                      src="https://i.scdn.co/image/ab67616d0000b2732042af06357dd5ab2220e33f"
                      :alt="`${track.name} cover`"
                  />
                  <div class="flex flex-col overflow-hidden">
                    <div class="font-bold text-sm truncate">
                      {{ track.name }}
                    </div>
                    <div class="text-xs truncate">
                      {{ track.artists.map((a) => a.name).join(', ') }}
                    </div>
                    <div class="flex flex-row gap-2" v-for="playlist in track.playlists" :key="playlist.id">
                      <UserTag :user="playlist.pivot.added_by" small/>
                      <div class="text-xs opacity-75 leading-loose"><a :href="playlist.url">{{ playlist.name}}</a></div>
                    </div>
                  </div>
                </div>
              </li>
            </ul>
          </div>

          <!-- <div v-if="results.artists?.length">
            <h3 class="capitalize">Artists</h3>
            <ul class="list-image-none">
              <li v-for="artist in results.artists" :key="artist.id">
                <a :href="artist.uri">{{ artist.name }}</a> appears in
                <span v-for="track in artist.tracks" :key="track.id">
                  <span v-for="playlist in track.playlists">
                    {{ playlist.name }}
                  </span>
                </span>
              </li>
            </ul>
          </div> -->
        </div>
      </div>
    </div>
  </CommonDialog>
</template>
