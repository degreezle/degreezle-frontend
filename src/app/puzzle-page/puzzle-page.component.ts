import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-puzzle-page',
  templateUrl: './puzzle-page.component.html',
  styleUrls: ['./puzzle-page.component.scss']
})
export class PuzzlePageComponent implements OnInit {

  token: string | null = null;

  constructor(public route: ActivatedRoute) { }

  ngOnInit(): void {
    console.log(this.route);
    this.route.paramMap.subscribe(paramMap => {this.token = paramMap.get('token'); console.log(paramMap)}) 
  }

}
