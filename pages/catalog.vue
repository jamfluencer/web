<script setup lang="ts">
definePageMeta({
	title: 'Catalog',
});

const searchTerm = ref('');

const results = ref();

const searchCatalog = async () => {
	results.value = await useJamfluencerApi().searchCatalog(searchTerm.value);
};
</script>

<template>
	<div
		class="flex flex-col gap-6 h-screen w-full items-center justify-center px-6"
	>
		<div class="text-center flex flex-col gap-2">
			<div>
				Want to know if a track, album, or artist has been played in a Jam before? Search here!
			</div>
			<search class="flex justify-center">
				<div class="relative w-5/6">
					<div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
						<svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true"
							 xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
							<path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
								  stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
						</svg>
					</div>
					<input v-model="searchTerm" type="search" id="default-search"
						   class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
						   placeholder="Enter search terms" required/>
					<button @click="searchCatalog" type="submit"
							class="text-white absolute end-2.5 bottom-2.5 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
						Search
					</button>
				</div>
			</search>
			<div v-if="results && results.length === 0">All clear! This hasn't appeared in the Jam!</div>
			<div v-else-if="results">
				<div v-if="results.tracks&&results.tracks.length">
					<h3 class="capitalize">Tracks</h3>
					<ul class="list-image-none">
						<li v-for="track in results.tracks"><a :href=track.url>{{ track.name }}</a> appears in <span
							v-for="playlist in track.playlists">{{ playlist.name }} </span></li>
					</ul>
				</div>
				<div v-if="results.albums&&results.albums.length">
					<h3 class="capitalize">Albums</h3>
					<ul class="list-image-none">
						<li v-for="album in results.albums"><a :href=album.url>{{ album.name }}</a> appears in <span
							v-for="playlist in album.playlists">{{ playlist.name }} </span></li>
					</ul>
				</div>
				<div v-if="results.artists&&results.artists.length">
					<h3 class="capitalize">Artists</h3>
					<ul class="list-image-none">
						<li v-for="artist in results.artists"><a :href=artist.url>{{ artist.name }}</a> appears in <span
							v-for="playlist in artist.playlists">{{ playlist.name }} </span></li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<style scoped>

</style>