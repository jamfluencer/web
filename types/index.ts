export { };

declare global {
  namespace Jamfluencer { }

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
      link: string;
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

    export type CatalogSearchResponse = {
      tracks?: JamfluencerApi.CatalogTrack[];
      artists?: JamfluencerApi.CatalogArtist[];
    } | [];

    export interface CatalogTrack {
      created_at: Date;
      id: string;
      name: string;
      playlists: CatalogPlaylist[];
      updated_at: Date;
      artists: Array<Omit<CatalogArtist, 'tracks'> & {
        pivot: CatalogTrackArtistPivot;
      }>;
      url: string;
      album: Album
    }

    export interface CatalogArtist {
      created_at: Date;
      id: string;
      name: string;
      updated_at: Date;
      uri: string;
      tracks: Array<Omit<CatalogTrack, 'artists'> & {
        pivot: CatalogTrackArtistPivot;
      }>;
    }

    export interface CatalogTrackArtistPivot {
      artist_id: string;
      track_id: string;
    }

    export interface CatalogPlaylist {
      created_at: Date;
      id: string;
      name: string;
      snapshot: string;
      updated_at: Date;
      url: string;
      pivot: {
        added_by: string;
        created_at: Date;
        playlist_id: string;
        track_id: string;
        updated_at: Date;
      };
    }

  }

  namespace JamfluencerV2Api {
    interface StartJamBody {
      jam: string;
      playlist: string;
    }
  }
}
