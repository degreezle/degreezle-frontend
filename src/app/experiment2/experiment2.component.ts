import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Movie, CastMember } from '../../models';
import { castMembers, movies } from '../../data';

// import Swiper core and required modules
import SwiperCore, { EffectCards } from "swiper";

// install Swiper modules
SwiperCore.use([EffectCards]);

@Component({
  selector: 'app-experiment2',
  templateUrl: './experiment2.component.html',
  styleUrls: ['./experiment2.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Experiment2Component implements OnInit {

  chosen = false;

  castMembers: CastMember[] = castMembers;

  movies: Movie[] = movies;

  ngOnInit(): void {

  }

}
