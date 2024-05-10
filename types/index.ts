export {};

declare global {
  namespace Jamfluencer {}

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

    interface Playlist {
      name: string;
      id: string;
      images: Image[];
      tracks: Track[];
    }

    type Queue = Track[];

    type RecentlyPlayed = Track[];

    export interface Track {
      name: string;
      album: Album;
      artists: Artist[];
      id: string;
      added_by: string;
    }

    export interface Album {
      images: Image[];
      id: string;
      name: string;
    }

    export interface Image {
      url: string;
      width: number;
      height: number;
    }

    export interface Artist {
      id: string;
      name: string;
    }
  }
}
