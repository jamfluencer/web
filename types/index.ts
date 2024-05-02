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
    }
  }
}
