export default defineNuxtRouteMiddleware(async (to) => {
  const code = to.query.code;

  if (typeof code !== 'string' || code.length < 1) {
    return navigateTo('/admin', { replace: true });
  }

  try {
    const storeSpotifyAuth = useJamfluencerApi().storeSpotifyToken(code, () => {
      // TODO: Do something when the request is successful
    });
    await storeSpotifyAuth.execute();
  } catch (error) {
    console.error(error);
  } finally {
    return navigateTo('/admin', { replace: true });
  }
});
