export default defineNuxtRouteMiddleware(async (to) => {
  if (!isAuthenticated()) {
    const intended = useCookie('intended');
    intended.value = to.fullPath;

    return navigateTo('/login', { replace: true });
  }
});
