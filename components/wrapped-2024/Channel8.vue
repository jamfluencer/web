<script setup lang="ts">
const wrapped = useWrapped2024();
</script>

<template>
  <div v-if="wrapped">
    <p>Channel 8: Kudos</p>
    <p>Kudos you gave: ???</p>
    <p>
      Track w/ most kudos: {{ wrapped.social.track.details.name }} ({{
        wrapped.social.track.kudos
      }})
    </p>
    <p>
      Top contributor by kudos:
      {{ wrapped.social.contributor.details }} ({{
        wrapped.social.contributor.kudos
      }})
    </p>
    <p>
      Playlist w/ most: {{ wrapped.social.playlist.details.name }} ({{
        wrapped.social.playlist.kudos
      }})
    </p>
  </div>
</template>
