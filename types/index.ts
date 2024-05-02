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

  namespace JamfluencerApi {
    interface User {
      id: number;
      email: string;
      email_verified_at: Date;
      created_at: Date;
      updated_at: Date;
      name: string;
      has_spotify: boolean;
    }

    interface Track {
      id: string;
      name: string;
      album: Album;
      artists: Artist[];
      explicit: boolean | 'unknown';
      playable: boolean;
      duration: number | null;
      uri: string;
    }

    type Album = unknown;
    type Artist = unknown;
  }
}
