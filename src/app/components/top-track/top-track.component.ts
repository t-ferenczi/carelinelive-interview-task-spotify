import {Component, Input, OnInit} from '@angular/core';
import {getTrackFeature, SimpleTrack} from "../../services/spotify/models/simple-playlist";
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
            if (
                (this.minMax === 'max' && getTrackFeature(top, this.feature) < getTrackFeature(current, this.feature))
                || (this.minMax === 'min' && getTrackFeature(top, this.feature) > getTrackFeature(current, this.feature))) {
                return current;
            } else {
                return top;
            }
        });
    }
}
