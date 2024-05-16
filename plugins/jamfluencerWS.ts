import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export default defineNuxtPlugin(() => {
  const pusher = Pusher;

  const config = useRuntimeConfig();
  const playlist = usePlaylist();
  const currentlyPlaying = useCurrentlyPlaying();
  const queue = useQueue();

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

  const echo = new Echo({
    broadcaster: 'reverb',
    key: config.public.jamfluencerWsKey,
    wsHost: config.public.jamfluencerWsUrl,
  });

  const channelJam = echo.channel('jam');

  channelJam.subscribed(getData);

  channelJam.listen('.jam.status', () => {
    console.log('jam.status');
  });

  channelJam.listen('.jam.update', () => {
    console.log('jam.updated');
  });
});
