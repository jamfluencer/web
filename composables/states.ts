export const useUser = () => useState<JamfluencerApi.User>('user');
export const useCurrentlyPlaying = () =>
  useState<JamfluencerApi.Track | undefined>('currentlyPlaying', () => ({
    name: 'karma',
    album: {
      images: [
        {
          url: 'https://i.scdn.co/image/ab67616d0000b2731868f0819dbb1e4a624dace3',
          width: 640,
          height: 640,
        },
        {
          url: 'https://i.scdn.co/image/ab67616d00001e021868f0819dbb1e4a624dace3',
          width: 300,
          height: 300,
        },
        {
          url: 'https://i.scdn.co/image/ab67616d000048511868f0819dbb1e4a624dace3',
          width: 64,
          height: 64,
        },
      ],
      id: '0nbH8z2iSYXnFE62X1iwYO',
      name: 'BREAK THE CURSE',
    },
    artists: [
      {
        id: '6Bllzm0olEwqGwPujaLiuA',
        name: 'Arlie',
      },
    ],
    id: '2LmxI4LAzOqlLdYHeUn2vZ',
    added_by: 'prince_of_space',
  }));
export const usePlaylist = () => useState<JamfluencerApi.Playlist>('playlist');
export const useQueue = () => useState<JamfluencerApi.Queue>('queue');
export const useRecentlyPlayed = () =>
  useState<JamfluencerApi.RecentlyPlayed>('recentlyPlayed');
export const useIsOffAir = () => computed(() => !useCurrentlyPlaying().value);
