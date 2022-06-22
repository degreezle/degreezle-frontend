import { Component, OnInit } from '@angular/core';
import { Movie, CastMember } from '../../models';
import { castMembers, movies } from '../../data';


@Component({
  selector: 'app-experiment1',
  templateUrl: './experiment1.component.html',
  styleUrls: ['./experiment1.component.scss']
})
export class Experiment1Component implements OnInit {

  chosen = false;

  castMembers: CastMember[] = castMembers;

  movies: Movie[] = movies;

  ngOnInit(): void {

  }

}
