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

  focused() {
    setTimeout(() => {
      this.touchedAlready = true;
    }, 200);
    
  }

  leftFocus() {
    this.touchedAlready = false;
  }

}
