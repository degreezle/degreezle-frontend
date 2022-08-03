import { Component, Inject, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolutionMetrics, StartPuzzle } from 'src/models';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-solution-metrics-modal',
  templateUrl: './solution-metrics-modal.component.html',
  styleUrls: ['./solution-metrics-modal.component.scss']
})
export class SolutionMetricsModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      token: string,
      puzzle: StartPuzzle,
      solutionMetrics: SolutionMetrics
    },
    private clipboard: Clipboard,
    public localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  get numberOfPuzzlesSolved() {
    return Object.keys(this.localStorageService.solutions).length;
  }

  get averageStepCount() {
    return Math.floor(Object.values(this.localStorageService.solutions).map(x => x.length - 1).reduce((a, b) => a + b, 0) / this.numberOfPuzzlesSolved)
  }

  copySolution() {
    this.clipboard.copy(`i solved today's https://filminthega.ps connecting ${this.data.puzzle.start_movie.title} to ${this.data.puzzle.end_movie.title} in ${this.data.solutionMetrics.num_steps} steps, check it out: https://filminthega.ps/solution/${this.data.token}`)
  }

  openTwitterLink() {
    window.open(`https://twitter.com/intent/tweet?text=i solved today's https://filminthega.ps connecting ${this.data.puzzle.start_movie.title} to ${this.data.puzzle.end_movie.title} in ${this.data.solutionMetrics.num_steps} steps, check it out: https://filminthega.ps/solution/${this.data.token}`)
  }

}
