export interface Track {
  id: string;
  artist: string;
  song: string;
  album: string;
  image: string;
  addedBy?: string;
}

export interface Playlist {
  name: string;
  image: string;
  tracks: Track[];
}

export interface Queue {
  currentlyPlaying: Track | null;
  queue: Track[];
}

export const cachedPlaylist = ref<Playlist>();

export const cachedQueue = ref<Track[]>([]);

export const usePlaylist = () => {
  const runtimeConfig = useRuntimeConfig();
  const { data: playlist, pending: isPlaylistPending } = useFetch<Playlist>(
    `http://192.168.1.245:8888/playlist/${runtimeConfig.public.playlistId}`
  );

  watch(playlist, (val) => {
    if (!val) return;
    cachedPlaylist.value = val;
  });

  return {
    playlist,
    isPlaylistPending,
  };
};
