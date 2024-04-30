export default defineNuxtRouteMiddleware(async (to) => {
  const code = to.query.code;

  if (typeof code !== 'string' || code.length < 1) {
    return navigateTo('/login', { replace: true });
  }

  try {
    const response = await $fetch<{ token: string }>(
      'https://api.jamfluencer.app/auth/google',
      {
        method: 'POST',
        body: {
          code,
          redirect: window.location.origin + to.path,
        },
      }
    );

    const token = useCookie<string>('token', { maxAge: 24 * 60 * 60 });
    token.value = response.token;

    const intended = useCookie('intended');
    const redirect = intended.value;
    intended.value = undefined;

    return navigateTo(redirect || '/admin', { replace: true });
  } catch (error) {
    console.error(error);
    return navigateTo('/login', { replace: true });
  }
});
