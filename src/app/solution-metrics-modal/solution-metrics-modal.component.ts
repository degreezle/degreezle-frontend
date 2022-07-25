import { Component, Inject, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Metrics, SolutionResponse, StartPuzzle } from 'src/models';

@Component({
  selector: 'app-solution-metrics-modal',
  templateUrl: './solution-metrics-modal.component.html',
  styleUrls: ['./solution-metrics-modal.component.scss']
})
export class SolutionMetricsModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      puzzle: StartPuzzle, 
      solution: SolutionResponse, 
      metrics: Metrics
    }, 
    private clipboard: Clipboard) { }

  ngOnInit(): void {
  }

  copySolution() {
    this.clipboard.copy("https://degreezle-test.firebaseapp.com/solution/" + this.data.solution?.token)
  }

}
