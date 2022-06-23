import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Movie, CastMember } from '../../models';
import { castMembers, movies } from '../../data';

@Component({
  selector: 'app-experiment4',
  templateUrl: './experiment4.component.html',
  styleUrls: ['./experiment4.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class Experiment4Component implements OnInit {

  chosen = false;

  castMembers: CastMember[] = castMembers;

  movies: Movie[] = movies;

  ngOnInit(): void {

  }

}
