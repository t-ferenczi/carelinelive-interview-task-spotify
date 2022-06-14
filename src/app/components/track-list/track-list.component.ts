import {Component, Input, OnChanges} from '@angular/core';
import {featureScale, numerableFeature} from "../../services/spotify/models/audio-features";
import {getTrackFeature, SimplePlaylist} from "../../services/spotify/models/simple-playlist";

@Component({
    selector: 'app-track-list',
    templateUrl: './track-list.component.html',
    styleUrls: ['./track-list.component.scss']
})
export class TrackListComponent implements OnChanges {

    @Input() playlist!: SimplePlaylist;

    sortOptions = Object.keys(featureScale);
    sortBy: numerableFeature = 'popularity';

    constructor() {
    }

    ngOnChanges() {
        this.sortTracks();
    }

    sortTracks() {
        this.playlist.tracks.items.sort(
            (a, b) => (getTrackFeature(b, this.sortBy) - getTrackFeature(a, this.sortBy)));
    }
}
