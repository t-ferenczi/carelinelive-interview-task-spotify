import {Component, Input, OnChanges} from '@angular/core';
import {getTrackFeature, SimpleTrack} from '../../services/spotify/models/simple-playlist';
import {featureScale, numerableFeature} from "../../services/spotify/models/audio-features";

@Component({
    selector: 'app-track-card',
    templateUrl: './track-card.component.html',
    styleUrls: ['./track-card.component.scss']
})
export class TrackCardComponent implements OnChanges {
    @Input() track!: SimpleTrack;
    @Input() highlightFeature?: numerableFeature;
    normalizedFeature?: number;

    ngOnChanges() {
        if (this.highlightFeature) {
            let total = (featureScale[this.highlightFeature]['max'] - featureScale[this.highlightFeature]['min']);
            let partial = getTrackFeature(this.track, this.highlightFeature);
            if (featureScale[this.highlightFeature].negative) {
                // hack to do the maths right for the loudness feature
                partial = partial + total;
            }
            this.normalizedFeature = Math.round((partial / total) * 100);
        }
    }
}
