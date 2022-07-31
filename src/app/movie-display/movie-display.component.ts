import { Component, Input, OnInit } from '@angular/core';
import { Movie } from 'src/models';

@Component({
  selector: 'app-movie-display',
  templateUrl: './movie-display.component.html',
  styleUrls: ['./movie-display.component.scss']
})
export class MovieDisplayComponent implements OnInit {

  @Input() item: Movie | null | undefined = null;

  touchedAlready = false;

  constructor() { }

  ngOnInit(): void {
  }

  touched() {
    if (this.touchedAlready && this.item) {
      window.open(
        "https://themoviedb.org/movie/" + this.item.id , "_blank"
      );
      this.touchedAlready = false;
    } else {
      this.touchedAlready = true;
    }
  }

  clicked() {
    if (this.item) {
      window.open(
        "https://themoviedb.org/movie/" + this.item.id , "_blank"
      );
    }
  }
}
