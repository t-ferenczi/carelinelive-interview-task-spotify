export interface SpotifyPlaylist {
    collaborative: boolean;
    description: string;
    external_urls: ExternalUrls;
    followers: {
        href: string;
        total: number;
    };
    href: string;
    id: string;
    images: Image[];
    name: string;
    owner: {
        display_name: string;
        external_urls: ExternalUrls;
        href: string;
        id: string;
        type: string;
        uri: string;
    };
    primary_color: any;
    public: boolean;
    snapshot_id: string;
    tracks: Tracks;
    type: string;
    uri: string;
}

export interface Image {
    width: number;
    height: number;
    url: string;
}

export interface ExternalUrls {
    spotify: string;
}

export interface Tracks {
    href: string;
    items: Item[];
    limit: number;
    next: any;
    offset: number;
    previous: any;
    total: number;
}

export interface Item {
    added_at: string;
    added_by: AddedBy;
    is_local: boolean;
    track: Track;
    video_thumbnail: VideoThumbnail;
}

export interface AddedBy {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    type: string;
    uri: string;
}

export interface Track {
    album: Album;
    artists: Artist[];
    available_markets: string[];
    disc_number: number;
    duration_ms: number;
    episode: boolean;
    explicit: boolean;
    external_ids: ExternalIds;
    external_urls: ExternalUrls;
    href: string;
    id: string;
    is_local: boolean;
    name: string;
    popularity: number;
    preview_url: string;
    track: boolean;
    track_number: number;
    type: string;
    uri: string;
}

export interface Album {
    album_type: string;
    artists: Artist[];
    available_markets: string[];
    external_urls: ExternalUrls;
    href: string;
    id: string;
    images: Image[];
    name: string;
    release_date: string;
    release_date_precision: string;
    total_tracks: number;
    type: string;
    uri: string;
}

export interface Artist {
    external_urls: ExternalUrls;
    href: string;
    id: string;
    name: string;
    type: string;
    uri: string;
}

export interface ExternalIds {
    isrc: string;
}

export interface VideoThumbnail {
    url: any;
}
