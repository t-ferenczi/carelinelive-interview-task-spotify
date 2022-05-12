import { Component, Input } from '@angular/core';
import { SimpleTrack } from '../../services/spotify/models/simple-playlist';

@Component({
    selector: 'app-track-card',
    templateUrl: './track-card.component.html',
    styleUrls: ['./track-card.component.scss']
})
export class TrackCardComponent {
    @Input() track!: SimpleTrack;
}
