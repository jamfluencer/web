export {};

declare global {
  namespace Jamfluencer {
    interface Track {
      id: string;
      bg: string;
      album: string;
      title: string;
      artist: string;
      addedBy: string;
    }

    interface Playlist {
      name: string;
      tracks: Track[];
    }
  }
}
