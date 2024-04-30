export default defineNuxtRouteMiddleware(async (to) => {
  const code = to.query.code;

  if (typeof code !== 'string' || code.length < 1) {
    return navigateTo('/login', { replace: true });
  }

  try {
    const getAuthToken = useJamfluencerApi().getGoogleAuthToken(code);
    await getAuthToken.execute();

    if (!getAuthToken.data.value?.token) throw new Error('Invalid token');

    const token = useCookie<string>('token', { maxAge: 24 * 60 * 60 });
    token.value = getAuthToken.data.value.token;

    const intended = useCookie('intended');
    const redirect = intended.value;
    intended.value = undefined;

    return navigateTo(redirect || '/admin', { replace: true });
  } catch (error) {
    console.error(error);
    return navigateTo('/login', { replace: true });
  }
});
