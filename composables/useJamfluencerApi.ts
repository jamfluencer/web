export const useJamfluencerApi = () => {
  const config = useRuntimeConfig();
  const GOOGLE_REDIRECT_URI = `${window.location.origin}/auth/google/callback`;
  const authHeader = { Authorization: `Bearer ${useCookie('token').value}` };

  const getUser = async () => {
    return await $fetch<JamfluencerApi.User>('/v1/me', {
      headers: authHeader,
      baseURL: config.public.jamfluencerApiBaseUrl,
    });
  };

  const getGoogleAuthUrl = () => {
    const request = useFetch<{ url: string }>('/auth/google', {
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
    const request = useFetch<{ token: string }>('/auth/google', {
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
    const request = useFetch<{ url: string }>('/v1/spotify/auth', {
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
    const request = useFetch('/v1/spotify/auth', {
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

  const getPlaylist = async () => {
    return await $fetch<JamfluencerApi.Playlist>(`/v1/jam/playlist`, {
      baseURL: config.public.jamfluencerApiBaseUrl,
    });
  };

  const getQueue = async () => {
    return await $fetch<{
      currently_playing: JamfluencerApi.Track;
      queue: JamfluencerApi.Queue;
    }>(`/v1/jam/queue`, {
      baseURL: config.public.jamfluencerApiBaseUrl,
    });
  };

  const startJam = async (id: string) => {
    const errorBaseMessage = 'Failed to start Jam (v1)';
    try {
      await $fetch<JamfluencerApi.Track>(
        `/v1/jam/start/spotify:playlist:${id}`,
        {
          method: 'PUT',
          baseURL: config.public.jamfluencerApiBaseUrl,
          headers: authHeader,
          onResponseError: (error) => {
            const messageArr = [errorBaseMessage];
            const errorMessage = error.response._data?.error?.message as string | undefined;
            if (errorMessage) messageArr.push(errorMessage);
            addNotification(messageArr.join(': '), 'error');
          },
        },
      );
      addNotification('Legacy Jam started!');
      return;
    } catch (error) {
      console.error(errorBaseMessage, error);
    }
  };

  const stopJam = async () => {
    const errorBaseMessage = 'Failed to stop Jam (v1)';
    try {
      await $fetch(`/v1/jam/stop`, {
        method: 'PUT',
        baseURL: config.public.jamfluencerApiBaseUrl,
        headers: authHeader,
        onResponseError: (error) => {
          const messageArr = [errorBaseMessage];
          const errorMessage = error.response._data?.error?.message as string | undefined;
          if (errorMessage) messageArr.push(errorMessage);
          addNotification(messageArr.join(': '), 'error');
        },
      });
      addNotification('Jam stopped');
      return;
    } catch (error) {
      console.error(errorBaseMessage, error);
    }
  };

  const searchCatalog = async (term: string) => {
    return await $fetch<JamfluencerApi.CatalogSearchResponse>('/v1/catalog/search?term=' + term, {
      method: 'GET',
      baseURL: config.public.jamfluencerApiBaseUrl
    })
  };

  const giveKudosCurrentTrack = async () => {
    return await $fetch('/v1/jam/kudos', {
      method: 'POST',
      baseURL: config.public.jamfluencerApiBaseUrl,
    });
  };

  const getWrapped2024 = async (uuid: string) => {
    return await $fetch<JamfluencerApi.Wrapped2024.Wrapped>('/v1/wrapped/' + uuid, {
      method: 'GET',
      baseURL: config.public.jamfluencerApiBaseUrl
    });
  };

  return {
    getUser,
    getGoogleAuthUrl,
    getGoogleAuthToken,
    getSpotifyAuthUrl,
    storeSpotifyToken,
    getPlaylist,
    getQueue,
    startJam,
    stopJam,
    searchCatalog,
    giveKudosCurrentTrack,
    getWrapped2024,
  };
};
