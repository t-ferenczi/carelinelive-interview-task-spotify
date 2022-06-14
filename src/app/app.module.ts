import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlaylistAnalysisComponent } from './components/playlist-analysis/playlist-analysis.component';
import { TrackCardComponent } from './components/track-card/track-card.component';
import { TopTrackComponent } from './components/top-track/top-track.component';
import {MatListModule} from "@angular/material/list";
import {MatButtonModule} from "@angular/material/button";
import {FormsModule} from "@angular/forms";
import { TrackListComponent } from './components/track-list/track-list.component';

@NgModule({
    declarations: [
        AppComponent,
        TrackCardComponent,
        PlaylistAnalysisComponent,
        TopTrackComponent,
        TrackListComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatListModule,
        MatButtonModule,
        FormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
