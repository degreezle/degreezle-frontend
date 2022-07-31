import { Component, Inject, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Metrics, SolutionResponse, StartPuzzle } from 'src/models';
import { LocalStorageService } from '../services/local-storage.service';

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
    private clipboard: Clipboard, 
    public localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  copySolution() {
    this.clipboard.copy(`https://twitter.com/intent/tweet?text=i solved today's filminthega.ps connecting ${this.data.puzzle.start_movie.title} to ${this.data.puzzle.end_movie.title} in ${this.data.solution.solution.length - 1} steps, check it out: https://filminthega.ps/solution/${this.data.solution?.token}`)
  }

  openTwitterLink() {
    window.open(`https://twitter.com/intent/tweet?text=i solved today's filminthega.ps connecting ${this.data.puzzle.start_movie.title} to ${this.data.puzzle.end_movie.title} in ${this.data.solution.solution.length - 1} steps, check it out: https://filminthega.ps/solution/${this.data.solution?.token}`)
  }

}
