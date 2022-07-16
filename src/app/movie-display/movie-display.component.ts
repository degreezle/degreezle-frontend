import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/models';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.scss']
})
export class MovieDisplayComponent implements OnInit {

  @Input() item: Movie | null | undefined = null;

  constructor() { }

  ngOnInit(): void {
  }

}
