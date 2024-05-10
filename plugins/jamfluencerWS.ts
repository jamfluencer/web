export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const currentlyPlaying = useCurrentlyPlaying();
  const playlist = usePlaylist();
  const queue = useQueue();

  const ws = new WebSocket(config.public.jamfluencerWsUrl);

  async function getData() {
    playlist.value = await useJamfluencerApi().getPlaylist();
    const queueRes = await useJamfluencerApi().getQueue();
    queue.value = queueRes.queue.map((track) => {
      return {
        ...track,
        added_by:
          playlist.value.tracks.find(
            (pt: JamfluencerApi.Track) => pt.id === track.id
          )?.added_by ?? '',
      };
    });
    currentlyPlaying.value = queueRes.currently_playing;
    currentlyPlaying.value.added_by =
      playlist.value.tracks.find(
        (pt: JamfluencerApi.Track) => pt.id === currentlyPlaying.value!.id
      )?.added_by ?? '';
  }

  function clearData() {
    playlist.value.tracks = [];
    queue.value = [];
    currentlyPlaying.value = undefined;
  }

  ws.addEventListener('open', () => {
    ws.send(
      JSON.stringify({
        event: 'pusher:subscribe',
        data: {
          channel: 'jam',
        },
      })
    );
  });

  ws.addEventListener('message', async (event) => {
    const data = JSON.parse(event.data) as {
      channel: string;
      event: string;
      data: any;
    };
    if (data.channel === 'jam') {
      if (data.event === 'jam.status') {
        getData();
      }
      if (data.event === 'jam.start') {
        getData();
      }
      if (data.event === 'jam.end') {
        clearData();
      }
      if (data.event === 'jam.update') {
        getData();
      }
    }
  });
});
