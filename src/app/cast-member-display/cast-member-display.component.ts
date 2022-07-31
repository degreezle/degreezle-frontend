import { Component, Input, OnInit } from '@angular/core';
import { CastMember } from 'src/models';

@Component({
  selector: 'app-cast-member-display',
  templateUrl: './cast-member-display.component.html',
  styleUrls: ['./cast-member-display.component.scss']
})
export class CastMemberDisplayComponent implements OnInit {

  @Input() item: CastMember | null | undefined = null;

  touchedAlready = false;

  constructor() { }

  ngOnInit(): void {
  }

  touched() {
    if (this.touchedAlready && this.item) {
      window.open(
        "https://themoviedb.org/person/" + this.item.id , "_blank"
      );
      this.touchedAlready = false;
    } else {
      this.touchedAlready = true;
    }
  }

  clicked() {
    if (this.item) {
      window.open(
        "https://thepersondb.org/movie/" + this.item.id , "_blank"
      );
    }
  }

}
