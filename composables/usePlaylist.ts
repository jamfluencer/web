interface Track {
  id: string;
  artist: string;
  song: string;
  album: string;
  image: string;
  addedBy: string;
}

interface Playlist {
  name: string;
  image: string;
  tracks: Track[];
}

export const cachedPlaylist = ref<Playlist>();

export const usePlaylist = () => {
  const { data: playlist, pending: isPlaylistPending } = useFetch<Playlist>(
    'http://192.168.1.245:8888/playlist/5REttHsnZVG6OewRx6XHfC'
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
