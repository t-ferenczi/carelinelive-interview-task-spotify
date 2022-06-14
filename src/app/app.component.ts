import { Component } from '@angular/core';
import {BehaviorSubject, combineLatestWith, Subject, switchMap} from 'rxjs';
import { SpotifyApiService } from './services/spotify/spotify-api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    token$ = this.spotify.getToken();
    playlistChange$: BehaviorSubject<string> = new BehaviorSubject<string>('0UA4PppdcKIKojVy5iSVoD');

    // https://open.spotify.com/playlist/0UA4PppdcKIKojVy5iSVoD
    playlist$ = this.token$.pipe(
        combineLatestWith(this.playlistChange$), switchMap(([token, playlistId]) => this.spotify.playlist(playlistId, token))
    );

    search$ = this.token$.pipe(
        switchMap(token => this.spotify.searchPlaylists('test', token))
    );

    constructor(
        private spotify: SpotifyApiService,
    ) {
    }

    loadPlaylist(id: string) {
        this.playlistChange$.next(id);
    }
}
