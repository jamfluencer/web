export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();

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
    console.log('Message from server:');
    console.log(event.data);
  });
});
