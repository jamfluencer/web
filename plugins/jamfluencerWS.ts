export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  // const currentlyPlaying = useCurrentlyPlaying();

  const ws = new WebSocket(config.public.jamfluencerWsUrl);

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

  ws.addEventListener('message', (event) => {
    const data = JSON.parse(event.data) as { channel: string; event: string; data: any };
    if (data.channel === 'jam') {
      console.log(data.data);
    }
  });
});
