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
