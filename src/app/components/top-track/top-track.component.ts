import {Component, Input, OnInit} from '@angular/core';
import {SimpleTrack} from "../../services/spotify/models/simple-playlist";
import {numerableFeature} from "../../services/spotify/models/audio-features";

@Component({
    selector: 'app-top-track',
    templateUrl: './top-track.component.html',
    styleUrls: ['./top-track.component.scss']
})
export class TopTrackComponent implements OnInit {

    @Input() tracks!: SimpleTrack[];
    @Input() feature!: numerableFeature;
    @Input() minMax!: 'min' | 'max';
    topTrack: SimpleTrack | undefined;

    constructor() {
    }

    ngOnInit(): void {
        this.topTrack = this.tracks.reduce((top, current) => {
            // finding the track with the minimum or maximum value of the selected feature
            if (current.features && top.features) {
                if (
                    (this.minMax === 'max' && top.features[this.feature] < current.features[this.feature])
                    || (this.minMax === 'min' && top.features[this.feature] > current.features[this.feature])) {
                    return current;
                } else {
                    return top;
                }
            } else {
                return top;
            }
        });
    }
}
