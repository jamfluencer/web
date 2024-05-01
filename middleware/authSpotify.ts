export default defineNuxtRouteMiddleware(async (to) => {
  const code = to.query.code;

  if (typeof code !== 'string' || code.length < 1) {
    return navigateTo('/admin', { replace: true });
  }

  try {
    const storeSpotifyAuth = useJamfluencerApi().storeSpotifyToken(code);
    await storeSpotifyAuth.execute();
    console.log(storeSpotifyAuth.data.value);
  } catch (error) {
    console.error(error);
  } finally {
    return navigateTo('/admin', { replace: true });
  }
});
