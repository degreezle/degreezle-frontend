import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Movie, CastMember } from '../../models';
import { castMembers, movies } from '../../data';

// import Swiper core and required modules
import SwiperCore, { EffectCards } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCards]);

@Component({
  selector: 'app-experiment3',
  templateUrl: './experiment3.component.html',
  styleUrls: ['./experiment3.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Experiment3Component implements OnInit {

  chosen = false;

  castMembers: CastMember[] = castMembers;

  movies: Movie[] = movies;

  taps = 0;


  onSlideChange() {
    this.taps = 0;
  }

  tapped() {
    this.taps += 1;
  }

  confirm() {
    this.taps = 0;
  }

  ngOnInit(): void {

  }

}
