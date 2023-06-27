import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GoogleTagManagerModule } from 'angular-google-tag-manager';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import { CastMemberSelectorComponent } from './cast-member-selector/cast-member-selector.component';
import { MovieSelectorComponent } from './movie-selector/movie-selector.component';
import { PuzzleComponent } from './puzzle/puzzle.component';
import { PuzzlePageComponent } from './puzzle-page/puzzle-page.component';
import { MovieDisplayComponent } from './movie-display/movie-display.component';
import { CastMemberDisplayComponent } from './cast-member-display/cast-member-display.component';
import { InstructionsModalComponent } from './instructions-modal/instructions-modal.component';
import { DonationModalComponent } from './donation-modal/donation-modal.component';

import { OurDataPageComponent } from './our-data-page/our-data-page.component';
import { SolutionMetricsModalComponent } from './solution-metrics-modal/solution-metrics-modal.component';
import { GTM_ID } from 'src/constants';
import { RedirectComponent } from './redirect/redirect.component';

@NgModule({
  declarations: [
    AppComponent,
    CastMemberSelectorComponent,
    MovieSelectorComponent,
    PuzzleComponent,
    PuzzlePageComponent,
    MovieDisplayComponent,
    CastMemberDisplayComponent,
    InstructionsModalComponent,
    DonationModalComponent,
    OurDataPageComponent,
    SolutionMetricsModalComponent,
    RedirectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatToolbarModule,
    SwiperModule,
    GoogleTagManagerModule.forRoot({
      id: GTM_ID,
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
