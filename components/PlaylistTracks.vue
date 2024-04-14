<script setup lang="ts">
const { playlist, isPlaylistPending } = usePlaylist();
</script>

<template>
  <section class="flex flex-col gap-4">
    <h2>Playlist</h2>
    <div v-if="isPlaylistPending">Loading...</div>
    <div v-else-if="!playlist">Nothing to show</div>
    <ul v-else class="flex flex-col gap-4">
      <li v-for="track in playlist.tracks" :key="track.id">
        <div class="flex items-center gap-4">
          <div class="rounded overflow-hidden flex-shrink-0">
            <img
              class="w-16 aspect-square"
              :src="track.image"
              alt="album cover"
            />
          </div>
          <div class="flex flex-col gap-1 overflow-hidden">
            <div class="text-sm truncate" :title="track.song">
              {{ track.song }}
            </div>
            <div
              class="text-xs text-white text-opacity-70 truncate"
              :title="track.artist"
            >
              {{ track.artist }}
            </div>
            <div>
              <UserTag :user="getUser(track.addedBy)" />
            </div>
          </div>
        </div>
      </li>
    </ul>
  </section>
</template>
