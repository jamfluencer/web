export const useJamfluencerApi = () => {
  const baseUrl = 'https://api.jamfluencer.app';
  const getUrl = (route: string) => `${baseUrl}/${route}`;

  const {
    data: googleAuthUrl,
    error: googleAuthUrlError,
    status: getGoogleAuthUrlStatus,
    execute: getGoogleAuthUrl,
  } = useFetch<JamfluencerApi.GetGoogleAuthResponse>(getUrl('auth/google'), {
    immediate: false,
  });

  return {
    googleAuthUrl: {
      data: googleAuthUrl,
      error: googleAuthUrlError,
      isPending: computed(() => getGoogleAuthUrlStatus.value === 'pending'),
      get: getGoogleAuthUrl,
    },
  };
};
