export interface AudioFeaturesResponse {
    audio_features: AudioFeatures[];
}

// https://developer.spotify.com/documentation/web-api/reference/#/operations/get-several-audio-features
export interface AudioFeatures {
    danceability: number;
    energy: number;
    key: number;
    loudness: number;
    mode: number;
    speechiness: number;
    acousticness: number;
    instrumentalness: number;
    liveness: number;
    valence: number;
    tempo: number; // BPM
    type: 'audio_features';
    id: string;
    uri: string;
    track_href: string;
    analysis_url: string;
    duration_ms: number;
    time_signature: number;
}

export type numerableFeature = 'danceability' | 'energy' | 'loudness' | 'valence';

type featureScaleValues = {
    min: number,
    max: number,
    negative?: boolean,
};

export const featureScale: Record<numerableFeature, featureScaleValues> = {
    danceability: {
        min: 0,
        max: 1,
    },
    energy: {
        min: 0,
        max: 1,
    },
    loudness: {
        min: -60,
        max: 0,
        negative: true,
    },
    valence: {
        min: 0,
        max: 1,
    }


}
