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

    namespace Wrapped2024 {
      export interface Wrapped {
        jam: WrappedJam;
        playlists: Playlists;
        tracks: WrappedTracks;
        you: You;
        social: WrappedSocial;
      }

      export interface WrappedJam {
        playlists: number;
        tracks: number;
        duration: string;
        contributors: number;
      }

      export interface Playlists {
        count: number;
        tracks: PlaylistsTracks;
        duration: PlaylistsDuration;
      }

      export interface PlaylistsDuration {
        mean: string;
        maximum: string;
        minimum: string;
      }

      export interface PlaylistsTracks {
        mean: number;
        maximum: number;
        minimum: number;
      }

      export interface WrappedSocial {
        track: Track;
        contributor: Contributor;
        playlist: Playlist;
      }

      export interface Contributor {
        details: string;
        kudos: number;
      }

      export interface Playlist {
        details: PlaylistDetails;
        kudos: number;
      }

      export interface PlaylistDetails {
        name: string;
        url: string;
      }

      export interface Track {
        details: TrackDetails;
        kudos: number;
      }

      export interface TrackDetails {
        id: string;
        created_at: string;
        updated_at: string;
        name: string;
        url: string;
        duration: string;
        kudos_count: number;
        album: Album;
        albums: Album[];
        artists: Artist[];
      }

      export interface Album {
        id: string;
        name: string;
        uri: string;
        created_at: string;
        updated_at: string;
        link: string;
        pivot: AlbumPivot;
        images: Image[];
      }

      export interface Image {
        id: number;
        url: string;
        width: number;
        height: number;
        related_type: RelatedType;
        related_id: string;
        created_at: string;
        updated_at: string;
      }

      export enum RelatedType {
        AppPlaybackAlbum = "App\\Playback\\Album",
      }

      export interface AlbumPivot {
        track_id: string;
        album_id: string;
      }

      export interface Artist {
        id: string;
        name: string;
        uri: string;
        created_at: string;
        updated_at: string;
        link: string;
        pivot: ArtistPivot;
      }

      export interface ArtistPivot {
        track_id: string;
        artist_id: string;
      }

      export interface WrappedTracks {
        count: number;
        duration: PurpleDuration;
        occurrence: Occurrence;
      }

      export interface PurpleDuration {
        mean: string;
        maximum: Imum;
        minimum: Imum;
      }

      export interface Imum {
        name: string;
        url: string;
        duration: string;
      }

      export interface Occurrence {
        details: PlaylistDetails;
        playlists: PlaylistDetails[];
      }

      export interface You {
        social: YouSocial;
        jam: YouJam;
      }

      export interface YouJam {
        tracks: JamTracks;
        participation: number;
      }

      export interface JamTracks {
        count: Count;
        duration: FluffyDuration;
      }

      export interface Count {
        percentage: number;
        total: number;
      }

      export interface FluffyDuration {
        percentage: number;
        total: string;
      }

      export interface YouSocial {
        kudos: number;
        tracks: SocialTracks;
      }

      export interface SocialTracks {
        "most-appreciated": Track;
        mean: number;
      }

    }

  }

  namespace JamfluencerV2Api {
    interface StartJamBody {
      jam: string;
      playlist: string;
    }
  }
}
