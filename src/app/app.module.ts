import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SwiperModule } from 'swiper/angular';
import { HttpClientModule } from '@angular/common/http';
import { Experiment1Component } from './experiment1/experiment1.component';
import { Experiment2Component } from './experiment2/experiment2.component';
import { Experiment3Component } from './experiment3/experiment3.component';
import { CastMemberSelectorComponent } from './cast-member-selector/cast-member-selector.component';
import { MovieSelectorComponent } from './movie-selector/movie-selector.component';
import { Experiment4Component } from './experiment4/experiment4.component';
import { PuzzleComponent } from './puzzle/puzzle.component';

@NgModule({
  declarations: [
    AppComponent,
    Experiment1Component,
    Experiment2Component,
    Experiment3Component,
    CastMemberSelectorComponent,
    MovieSelectorComponent,
    Experiment4Component,
    PuzzleComponent,
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
    SwiperModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
