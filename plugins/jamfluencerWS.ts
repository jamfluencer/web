import Echo from 'laravel-echo';
import Pusher from 'pusher-js';

export default defineNuxtPlugin(() => {
  const pusher = Pusher;
  const jam = useJam();
  const kudos = useKudos();

  const config = useRuntimeConfig();

  async function getData() {
    await jam.getPlaylist();
    await jam.getQueue();
  }

  const echo = new Echo({
    broadcaster: 'reverb',
    key: config.public.jamfluencerWsKey,
    wsHost: config.public.jamfluencerWsUrl,
  });

  const channelJam = echo.channel('jam');

  channelJam.subscribed(getData);

  channelJam.listen('.jam.start', getData);
  channelJam.listen('.jam.update', getData);
  channelJam.listen('.jam.end', jam.end);

  channelJam.listen('.kudos', () => {
    kudos.value.stack.push(kudos.value.id);
    kudos.value.id += 1;
  });
});
