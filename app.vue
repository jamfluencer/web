<script setup lang="ts">
const nowPlaying = ref();

const playlist = ref({
  images: [
    {
      url: 'https://mosaic.scdn.co/640/ab67616d00001e022deb0d919a11d1ef5e12daaeab67616d00001e02d3fc12aa287df2d8709d059eab67616d00001e02d8da4ee4b3d7c0ff6dc65c9eab67616d00001e02e628d1ea3438f1aa105ce9c6',
    },
    {
      url: 'https://mosaic.scdn.co/300/ab67616d00001e022deb0d919a11d1ef5e12daaeab67616d00001e02d3fc12aa287df2d8709d059eab67616d00001e02d8da4ee4b3d7c0ff6dc65c9eab67616d00001e02e628d1ea3438f1aa105ce9c6',
    },
    {
      url: 'https://mosaic.scdn.co/60/ab67616d00001e022deb0d919a11d1ef5e12daaeab67616d00001e02d3fc12aa287df2d8709d059eab67616d00001e02d8da4ee4b3d7c0ff6dc65c9eab67616d00001e02e628d1ea3438f1aa105ce9c6',
    },
  ],
  tracks: {
    items: [
      {
        track: {
          artists: [
            {
              name: 'Discovery',
            },
          ],
          album: {
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d0000b273d3fc12aa287df2d8709d059e',
                width: 640,
                height: 640,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00001e02d3fc12aa287df2d8709d059e',
                width: 300,
                height: 300,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00004851d3fc12aa287df2d8709d059e',
                width: 64,
                height: 64,
              },
            ],
            name: 'LP (Deluxe Edition)',
          },
          name: 'I Want You Back',
          id: '0tGcgjkOB9lpCzFCeCTw7c',
        },
        added_by: {
          id: 'prince_of_space',
        },
      },
      {
        track: {
          artists: [
            {
              name: 'Anri',
            },
          ],
          album: {
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d0000b2732deb0d919a11d1ef5e12daae',
                width: 640,
                height: 640,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00001e022deb0d919a11d1ef5e12daae',
                width: 300,
                height: 300,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d000048512deb0d919a11d1ef5e12daae',
                width: 64,
                height: 64,
              },
            ],
            name: 'Bi・Ki・Ni',
          },
          name: 'Good Bye Boogie Dance',
          id: '5LZja1KAke25BqjsidAcsq',
        },
        added_by: {
          id: 'prince_of_space',
        },
      },
      {
        track: {
          artists: [
            {
              name: 'Stephen Walking',
            },
          ],
          album: {
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d0000b273d8da4ee4b3d7c0ff6dc65c9e',
                width: 640,
                height: 640,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00001e02d8da4ee4b3d7c0ff6dc65c9e',
                width: 300,
                height: 300,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00004851d8da4ee4b3d7c0ff6dc65c9e',
                width: 64,
                height: 64,
              },
            ],
            name: 'Glide',
          },
          name: 'Glide',
          id: '7F0DDqZ6SdIUEMuo8eRlmv',
        },
        added_by: {
          id: 'prince_of_space',
        },
      },
      {
        track: {
          artists: [
            {
              name: 'War',
            },
            {
              name: 'Saxsquatch',
            },
            {
              name: 'Stephen Walking',
            },
          ],
          album: {
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d0000b273e628d1ea3438f1aa105ce9c6',
                width: 640,
                height: 640,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00001e02e628d1ea3438f1aa105ce9c6',
                width: 300,
                height: 300,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00004851e628d1ea3438f1aa105ce9c6',
                width: 64,
                height: 64,
              },
            ],
            name: "Why Can't We Be Friends? (Saxsquatch & Stephen Walking Remix)",
          },
          name: "Why Can't We Be Friends? - Saxsquatch & Stephen Walking Remix",
          id: '6bk2iAxBYVCfFDb7fEVRzP',
        },
        added_by: {
          id: 'prince_of_space',
        },
      },
      {
        track: {
          artists: [
            {
              name: 'The Jackson 5',
            },
          ],
          album: {
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d0000b2738c4693bcc43c775189d447ec',
                width: 640,
                height: 640,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00001e028c4693bcc43c775189d447ec',
                width: 300,
                height: 300,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d000048518c4693bcc43c775189d447ec',
                width: 64,
                height: 64,
              },
            ],
            name: 'The Definitive Collection',
          },
          name: 'ABC',
          id: '2VCUcIPY3i6pv9Nu9Vg6k3',
        },
        added_by: {
          id: 'prince_of_space',
        },
      },
      {
        track: {
          artists: [
            {
              name: 'The Night Game',
            },
            {
              name: 'Droid Bishop',
            },
          ],
          album: {
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d0000b27330418a3122973d3bddab4d42',
                width: 640,
                height: 640,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00001e0230418a3122973d3bddab4d42',
                width: 300,
                height: 300,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d0000485130418a3122973d3bddab4d42',
                width: 64,
                height: 64,
              },
            ],
            name: 'I Feel Like Dancing - The Remixes',
          },
          name: 'I Feel Like Dancing (Droid Bishop Remix)',
          id: '4naItd7B1R2NJydlpTHtMm',
        },
        added_by: {
          id: 'prince_of_space',
        },
      },
      {
        track: {
          artists: [
            {
              name: 'Elderbrook',
            },
          ],
          album: {
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d0000b273831b912a5f9a12446dd9d4cc',
                width: 640,
                height: 640,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00001e02831b912a5f9a12446dd9d4cc',
                width: 300,
                height: 300,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00004851831b912a5f9a12446dd9d4cc',
                width: 64,
                height: 64,
              },
            ],
            name: 'My House',
          },
          name: 'My House',
          id: '69cOm540NYGkZpL4Jx2mUx',
        },
        added_by: {
          id: 'prince_of_space',
        },
      },
      {
        track: {
          artists: [
            {
              name: 'Dwellings',
            },
          ],
          album: {
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d0000b27384d49745f1aaec7bafb19232',
                width: 640,
                height: 640,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00001e0284d49745f1aaec7bafb19232',
                width: 300,
                height: 300,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d0000485184d49745f1aaec7bafb19232',
                width: 64,
                height: 64,
              },
            ],
            name: 'Pick Up Before You Go',
          },
          name: 'Pick Up Before You Go',
          id: '3fhcFTnVfJE818TlVi2295',
        },
        added_by: {
          id: 'prince_of_space',
        },
      },
      {
        track: {
          artists: [
            {
              name: 'David Maxim Micic',
            },
          ],
          album: {
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d0000b273200c40b07c4c65af45a43696',
                width: 640,
                height: 640,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00001e02200c40b07c4c65af45a43696',
                width: 300,
                height: 300,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00004851200c40b07c4c65af45a43696',
                width: 64,
                height: 64,
              },
            ],
            name: 'Who Bit The Moon',
          },
          name: 'Living Room',
          id: '3i7mgkkVYOJzKYJUoXw6l6',
        },
        added_by: {
          id: 'prince_of_space',
        },
      },
      {
        track: {
          artists: [
            {
              name: 'The Strike',
            },
          ],
          album: {
            images: [
              {
                url: 'https://i.scdn.co/image/ab67616d0000b2730ad9b58c5c2c6a204ee8cc75',
                width: 640,
                height: 640,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d00001e020ad9b58c5c2c6a204ee8cc75',
                width: 300,
                height: 300,
              },
              {
                url: 'https://i.scdn.co/image/ab67616d000048510ad9b58c5c2c6a204ee8cc75',
                width: 64,
                height: 64,
              },
            ],
            name: 'The Lost Years',
          },
          name: 'Nothing New',
          id: '3FvlayEQ7rHflEnZCt1zdH',
        },
        added_by: {
          id: 'prince_of_space',
        },
      },
    ],
  },
  name: 'INFLCR Radio Week 4 (19/04/2024)',
});

const playlistTracks = computed(() => {
  return playlist.value.tracks.items.map((item) => {
    return {
      id: item.track.id,
      artist: item.track.artists.map((artist) => artist.name).join(', '),
      song: item.track.name,
      album: item.track.album.name,
      image: item.track.album.images[2].url,
    };
  });
});

function onWsMessage(event: string) {
  nowPlaying.value = JSON.parse(event);
}
</script>

<template>
  <div class="container px-6 py-12 min-h-screen text-white">
    <header class="text-center flex flex-col gap-2">
      <h1 class="text-5xl font-bold">
        <NuxtLink to="/"
          >Influencer <span class="text-primary">Radio</span></NuxtLink
        >
      </h1>
      <p class="text-xl">A good tagline goes here.</p>
    </header>
    <main class="flex flex-col gap-12 py-12 max-w-96 mx-auto">
      <section class="flex flex-col gap-4">
        <h2 class="font-bold">Now playing</h2>
        <div v-if="!nowPlaying" class="now-playing-card flex flex-col gap-4">
          <div class="rounded-lg overflow-hidden">
            <div class="w-full max-w-96 aspect-square bg-slate-800"></div>
          </div>
          <div>
            <div class="text-2xl font-bold">Loading...</div>
          </div>
        </div>
        <div v-else class="now-playing-card flex flex-col gap-4">
          <div class="rounded-lg overflow-hidden">
            <img
              :src="nowPlaying.image"
              :alt="`${nowPlaying.album} cover art`"
              class="w-full max-w-96 aspect-square"
            />
          </div>
          <div>
            <div class="text-2xl font-bold">{{ nowPlaying.song }}</div>
            <div>{{ nowPlaying.artist }}</div>
          </div>
        </div>
      </section>
      <section class="flex flex-col gap-4">
        <h2>Playlist</h2>
        <ul class="flex flex-col gap-4">
          <li v-for="track in playlistTracks" :key="track.id">
            <div class="flex items-center gap-4">
              <div class="rounded overflow-hidden flex-shrink-0">
                <img :src="track.image" alt="album cover" />
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
              </div>
            </div>
          </li>
        </ul>
      </section>
    </main>
    <footer></footer>
  </div>
  <WebSocketHandler @message="onWsMessage" />
</template>
