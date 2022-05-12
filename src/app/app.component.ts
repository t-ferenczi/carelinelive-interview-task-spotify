import { Component } from '@angular/core';
import { switchMap } from 'rxjs';
import { SpotifyApiService } from './services/spotify/spotify-api.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    token$ = this.spotify.getToken();

    // https://open.spotify.com/playlist/0UA4PppdcKIKojVy5iSVoD
    playlist$ = this.token$.pipe(
        switchMap(token => this.spotify.playlist('0UA4PppdcKIKojVy5iSVoD', token))
    );

    search$ = this.token$.pipe(
        switchMap(token => this.spotify.searchPlaylists('test', token))
    );

    constructor(
        private spotify: SpotifyApiService,
    ) {
    }
}
