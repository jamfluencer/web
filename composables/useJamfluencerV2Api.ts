export const useJamfluencerV2Api = () => {
  const config = useRuntimeConfig();
  const authHeader = { Authorization: `Bearer ${useCookie('token').value}` };

  const startJam = async (body: JamfluencerV2Api.StartJamBody) => {
    const errorBaseMessage = 'Failed to start Jam';
    try {
      const response = await $fetch<JamfluencerApi.Track>(
        '/v2/jam/start',
        {
          method: 'POST',
          baseURL: config.public.jamfluencerApiBaseUrl,
          headers: authHeader,
          body,
          onResponseError: (error) => {
            const messageArr = [errorBaseMessage];
            const errorMessage = error.response._data?.error?.message as string | undefined;
            if (errorMessage) messageArr.push(errorMessage);
            addNotification(messageArr.join(': '), 'error');
          },
        }
      );
      addNotification('Jam started!');
      return response;
    } catch (error) {
      console.error(errorBaseMessage, error);
    }
  };

  return {
    startJam,
  };
};
