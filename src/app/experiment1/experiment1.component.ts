import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-experiment1',
  templateUrl: './experiment1.component.html',
  styleUrls: ['./experiment1.component.scss']
})
export class Experiment1Component implements OnInit {

  chosen = false;

  castMembers = [
    {
      id: 1,
      name: 'Jackie van Beek',
      img_path: 'cast1.jpg'
    },
    {
      id: 2,
      name: 'Damon Herriman',
      img_path: 'cast2.jpg'
    },
    {
      id: 3,
      name: 'Jemaine Clement',
      img_path: 'cast3.jpg'
    },
    {
      id: 4,
      name: 'Chelsie Preston Crayford',
      img_path: 'cast4.jpg'
    },
    {
      id: 5,
      name: 'Byron Coll',
      img_path: 'cast5.jpg'
    }
  ];

  movies = [
    {
      id: 1,
      name: 'Nude Tuesday',
      img_path: 'movie1.jpg'
    },
    {
      id: 2,
      name: 'Once Upon a Time… in Hollywood',
      img_path: 'movie3.jpg'
    },
    {
      id: 3,
      name: 'Mortal Kombat',
      img_path: 'movie4.jpg'
    },
    {
      id: 4,
      name: 'Mindhunter',
      img_path: 'movie5.jpg'
    },
    {
      id: 5,
      name: 'Scorpion',
      img_path: 'movie6.jpg'
    }
  ];

  ngOnInit(): void {

  }

}
