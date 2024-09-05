export const useJamfluencerV2Api = () => {
  const config = useRuntimeConfig();
  const authHeader = { Authorization: `Bearer ${useCookie('token').value}` };

  const startJam = async (body: JamfluencerV2Api.StartJamBody) => {
    return await $fetch<JamfluencerApi.Track>(
      '/v2/jam/start',
      {
        method: 'POST',
        baseURL: config.public.jamfluencerApiBaseUrl,
        headers: authHeader,
        body,
      }
    );
  };

  return {
    startJam,
  };
};
