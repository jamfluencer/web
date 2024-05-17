export default function useJam() {
  const playlist = usePlaylist();
  const currentlyPlaying = useCurrentlyPlaying();
  const queue = useQueue();

  function trackWithAddedBy(track: JamfluencerApi.Track): JamfluencerApi.Track {
    return {
      ...track,
      added_by:
        playlist.value?.tracks.find((pt) => pt.id === track.id)?.added_by ??
        'Unknown',
    };
  }

  async function getPlaylist() {
    try {
      playlist.value = await useJamfluencerApi().getPlaylist();
    } catch (error) {
      playlist.value = null;
    }
  }

  async function getQueue() {
    try {
      const data = await useJamfluencerApi().getQueue();
      queue.value = data.queue.map(trackWithAddedBy);
      currentlyPlaying.value = trackWithAddedBy(data.currently_playing);
    } catch (error) {
      queue.value = null;
      currentlyPlaying.value = null;
    }
  }

  function end() {
    queue.value = null;
    currentlyPlaying.value = null;
  }

  return {
    getPlaylist,
    getQueue,
    end,
  };
}
