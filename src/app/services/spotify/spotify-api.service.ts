import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { bufferCount, EMPTY, expand, from, map, mergeMap, Observable, of, reduce, switchMap, tap } from 'rxjs';
import { CLIENT_ID, CLIENT_SECRET } from '../../../environments/credentials';
import { AudioFeatures, AudioFeaturesResponse } from './models/audio-features';
import { createSimplePlaylist, SimplePlaylist } from './models/simple-playlist';
import { Image, Item, SpotifyPlaylist } from './models/spotify-playlist';

interface SpotifyTokenResponseBody {
    access_token: string;
    token_type: string;
    expires_in: number;
}

interface PlaylistTracksResponse {
    href: string;
    next: string;
    items: Item[];
}

@Injectable({
    providedIn: 'root'
})
export class SpotifyApiService {

    constructor(
        private http: HttpClient
    ) {
    }

    getToken(): Observable<string> {
        const body = new HttpParams({
            fromObject: {
                grant_type: 'client_credentials',
            }
        });

        return this.http.post<SpotifyTokenResponseBody>('https://accounts.spotify.com/api/token', body.toString(), {
            headers: {
                'Authorization': 'Basic ' + btoa(`${CLIENT_ID}:${CLIENT_SECRET}`),
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        }).pipe(
            tap(response => console.log('Got access token:', response)),
            map(response => response.access_token)
        );
    }

    playlist(id: string, token: string): Observable<SimplePlaylist> {
        const requestOptions = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };

        return this.http.get<SpotifyPlaylist>(`https://api.spotify.com/v1/playlists/${id}`, requestOptions).pipe(
            switchMap(playlist => {
                if (!playlist.tracks.next) {
                    // No more tracks to load so we can just return the playlist
                    return of(playlist);
                }

                // Make separate requests for each page of tracks
                // Could be more efficient by skipping the first page as it's already in the playlist response, but I'm lazy
                return this.http.get<PlaylistTracksResponse>(playlist.tracks.href, requestOptions).pipe(
                    expand(playlist => playlist.next ? this.http.get<PlaylistTracksResponse>(playlist.next, requestOptions) : EMPTY),
                    reduce((acc: Item[], playlist: PlaylistTracksResponse) => acc.concat(playlist.items), []),
                    map(items => {
                        // Replace the playlist's tracks with the full list
                        playlist.tracks.items = items;
                        return playlist;
                    }),
                );
            }),
            switchMap(playlist => {
                const ids = playlist.tracks.items.filter(track => track.track).map(track => track.track.id);

                return this.trackAudioFeatures(ids, token).pipe(
                    map((features) => createSimplePlaylist(playlist, features))
                );
            })
        );
    }

    trackAudioFeatures(ids: string[], token: string): Observable<AudioFeatures[]> {
        return from(ids).pipe(
            bufferCount(100),
            mergeMap(ids => this.http.get<AudioFeaturesResponse>(`https://api.spotify.com/v1/audio-features`, {
                params: {
                    ids: ids.join(',')
                },
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            })),
            reduce((acc: AudioFeatures[], response: AudioFeaturesResponse) => acc.concat(response.audio_features), [])
        );
    }

    searchPlaylists(query: string, token: string): Observable<PlaylistSearchResult[]> {
        return this.http.get<{ playlists: { items: SpotifyPlaylist[] } }>('https://api.spotify.com/v1/search', {
            params: {
                q: query,
                type: 'playlist',
            },
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        }).pipe(map(response => response.playlists.items.map(playlist => ({
            id: playlist.id,
            name: playlist.name,
            description: playlist.name,
            images: playlist.images,
        }))));
    }
}

export interface PlaylistSearchResult {
    id: string;
    name: string;
    description: string;
    images: Image[];
}
