export const useJamfluencerApi = () => {
  const config = useRuntimeConfig();
  const GOOGLE_REDIRECT_URI = `${window.location.origin}/auth/google/callback`;

  const getGoogleAuthUrl = () => {
    const request = useFetch<{ url: string }>('auth/google', {
      query: { redirect: GOOGLE_REDIRECT_URI },
      baseURL: config.public.jamfluencerApiBaseUrl,
      immediate: false,
    });

    return {
      data: request.data,
      execute: request.execute,
      isPending: computed(() => request.status.value === 'pending'),
    };
  };

  const getGoogleAuthToken = (code: string) => {
    const request = useFetch<{ token: string }>('auth/google', {
      method: 'POST',
      body: { code, redirect: GOOGLE_REDIRECT_URI },
      baseURL: config.public.jamfluencerApiBaseUrl,
      immediate: false,
    });

    return {
      data: request.data,
      execute: request.execute,
      isPending: computed(() => request.status.value === 'pending'),
    };
  };

  const getSpotifyAuthUrl = () => {
    const request = useFetch<{ url: string }>('v1/spotify/auth', {
      headers: { Authorization: `Bearer ${useCookie('token').value}` },
      baseURL: config.public.jamfluencerApiBaseUrl,
      immediate: false,
    });

    return {
      data: request.data,
      execute: request.execute,
      isPending: computed(() => request.status.value === 'pending'),
    };
  };

  const storeSpotifyToken = (code: string) => {
    const request = useFetch<{ token: string }>('v1/spotify/auth', {
      method: 'POST',
      body: { code },
      headers: { Authorization: `Bearer ${useCookie('token').value}` },
      baseURL: config.public.jamfluencerApiBaseUrl,
      immediate: false,
    });

    return {
      data: request.data,
      execute: request.execute,
      isPending: computed(() => request.status.value === 'pending'),
    };
  };

  return {
    getGoogleAuthUrl,
    getGoogleAuthToken,
    getSpotifyAuthUrl,
    storeSpotifyToken,
  };
};
