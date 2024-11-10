export const useUser = () => useState<JamfluencerApi.User | undefined>('user');

export const useCurrentlyPlaying = () =>
  useState<JamfluencerApi.Track | null | undefined>('currentlyPlaying');

export const usePlaylist = () =>
  useState<JamfluencerApi.Playlist | null | undefined>('playlist');

export const useQueue = () =>
  useState<JamfluencerApi.Queue | null | undefined>('queue');

export const useRecentlyPlayed = () =>
  useState<JamfluencerApi.RecentlyPlayed | null | undefined>('recentlyPlayed');

export const useIsOffAir = () => computed(() => !useCurrentlyPlaying().value);

export const useNotifications = () => useState<Jamfluencer.Notification[]>('notifications', () => []);

export function addNotification(message: string, type: 'error' | 'info' = 'info') {
  const notifications = useNotifications();
  notifications.value.push({
    id: crypto.randomUUID(),
    message,
    type,
  });
}
