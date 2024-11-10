export { };

declare global {
  namespace Jamfluencer {
    interface Notification {
      id: string;
      message: string;
      type: 'error' | 'info';
    }
  }

  namespace JamfluencerApi {
    interface User {
      created_at: string;
      email_verified_at: string;
      email: string;
      has_spotify: boolean;
      id: number;
      name: string;
      updated_at: string;
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

    export type CatalogSearchResponse = {
      tracks?: JamfluencerApi.CatalogTrack[];
      artists?: JamfluencerApi.CatalogArtist[];
    } | [];

    export interface CatalogTrack {
      created_at: string;
      id: string;
      name: string;
      playlists: CatalogPlaylist[];
      updated_at: string;
      artists: Array<Omit<CatalogArtist, 'tracks'> & {
        pivot: CatalogTrackArtistPivot;
      }>;
      url: string;
      album: CatalogAlbum;
    }

    export interface CatalogArtist {
      created_at: string;
      id: string;
      link: string | null;
      name: string;
      tracks: Array<Omit<CatalogTrack, 'artists'> & {
        pivot: CatalogTrackArtistPivot;
      }>;
      updated_at: string;
      uri: string;
    }

    export interface CatalogTrackArtistPivot {
      artist_id: string;
      track_id: string;
    }

    export interface CatalogTrackAlbumPivot {
      album_id: string;
      track_id: string;
    }

    export interface CatalogAlbum {
      created_at: string;
      id: string;
      images: CatalogImage[];
      link: string | null;
      name: string;
      pivot: CatalogTrackAlbumPivot;
      updated_at: string;
      uri: string;
    }

    export interface CatalogImage {
      created_at: string;
      height: number;
      id: number;
      related_id: string;
      related_type: string;
      updated_at: string;
      url: string;
      width: number;
    }

    export interface CatalogPlaylist {
      created_at: string;
      id: string;
      name: string;
      snapshot: string;
      updated_at: string;
      url: string;
      pivot: {
        added_by: string;
        created_at: string;
        playlist_id: string;
        track_id: string;
        updated_at: string;
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
