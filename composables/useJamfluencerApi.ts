export const useJamfluencerApi = () => {
  const config = useRuntimeConfig();
  const GOOGLE_REDIRECT_URI = `${window.location.origin}/auth/google/callback`;
  const authHeader = { Authorization: `Bearer ${useCookie('token').value}` };

  const getUser = async () => {
    return await $fetch<JamfluencerApi.User>(
      'https://api.jamfluencer.app/v1/me',
      { headers: authHeader }
    );
  };

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
      headers: authHeader,
      baseURL: config.public.jamfluencerApiBaseUrl,
      immediate: false,
    });

    return {
      data: request.data,
      execute: request.execute,
      isPending: computed(() => request.status.value === 'pending'),
    };
  };

  const storeSpotifyToken = (code: string, onResponse?: () => void) => {
    const request = useFetch('v1/spotify/auth', {
      method: 'POST',
      body: { code },
      headers: authHeader,
      baseURL: config.public.jamfluencerApiBaseUrl,
      immediate: false,
      onResponse,
    });

    return {
      data: request.data,
      execute: request.execute,
      isPending: computed(() => request.status.value === 'pending'),
      isSuccess: computed(() => request.status.value === 'success'),
    };
  };

  return {
    getUser,
    getGoogleAuthUrl,
    getGoogleAuthToken,
    getSpotifyAuthUrl,
    storeSpotifyToken,
  };
};
