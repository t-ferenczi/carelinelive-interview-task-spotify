import { Component, Input } from '@angular/core';
import { SimplePlaylist } from '../../services/spotify/models/simple-playlist';

@Component({
    selector: 'app-playlist-analysis',
    templateUrl: './playlist-analysis.component.html',
    styleUrls: ['./playlist-analysis.component.scss']
})
export class PlaylistAnalysisComponent {
    private _playlist!: SimplePlaylist;

    @Input() set playlist(value: SimplePlaylist) {
        this._playlist = value;
    }

    get playlist(): SimplePlaylist {
        return this._playlist;
    }
}
