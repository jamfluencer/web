export const useUser = () => useState<JamfluencerApi.User>('user');
export const useCurrentlyPlaying = () => useState<JamfluencerApi.Track>('currentlyPlaying');
export const usePlaylist = () => useState<JamfluencerApi.Playlist>('playlist');
export const useQueue = () => useState<JamfluencerApi.Queue>('queue');
export const useRecentlyPlayed = () => useState<JamfluencerApi.RecentlyPlayed>('recentlyPlayed');
