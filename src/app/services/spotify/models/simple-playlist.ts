import {AudioFeatures, numerableFeature, numerableFeatureProperty, numerableTrackProperty} from './audio-features';
import { Image, SpotifyPlaylist } from './spotify-playlist';

export interface SimplePlaylist {
    id: string;
    name: string;
    description: string;

    owner: {
        name: string;
    };

    images: Image[];

    tracks: {
        total: number;
        items: SimpleTrack[];
    };
}

export interface SimpleTrack {
    id: string;
    artists: string[];
    album: {
        id: string;
        name: string;
        image: Image;
        release_date: string;
    };
    name: string;
    popularity: number;
    duration_ms: number;

    features: AudioFeatures | undefined;
}

export function createSimplePlaylist(playlist: SpotifyPlaylist, features: AudioFeatures[]): SimplePlaylist {
    return {
        id: playlist.id,
        name: playlist.name,
        description: playlist.description,
        images: playlist.images,
        owner: {
            name: playlist.owner.display_name
        },
        tracks: {
            total: playlist.tracks.total,
            items: playlist.tracks.items.filter(item => item?.track).map(item => ({
                id: item.track.id,
                album: {
                    id: item.track.album.id,
                    name: item.track.album.name,
                    image: item.track.album.images?.[0],
                    release_date: item.track.album.release_date,
                },
                artists: item.track.artists.map(artist => artist.name),
                duration_ms: item.track.duration_ms,
                name: item.track.name,
                popularity: item.track.popularity,
                features: features.find(feature => feature?.id === item.track.id)
            })),
        },
    };
}

export function getTrackFeature(track: SimpleTrack, property: numerableFeature): number {
    if (property in track) {
        return track[property as numerableTrackProperty];
    } else if (track.features && property in track.features) {
        return track.features[property as numerableFeatureProperty];
    } else {
        return 0;
    }
}
