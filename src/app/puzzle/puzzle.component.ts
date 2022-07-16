import { Component, OnInit } from '@angular/core';
import { StartPuzzle } from 'src/models';
import { PuzzleService } from '../services/puzzle-service.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit {

  puzzle: StartPuzzle | null = null;

  puzzleSequence: number[] = [];

  constructor(public puzzleService: PuzzleService) {
    puzzleService.getStartPuzzle();
    puzzleService.puzzle$.subscribe(puzzle => {
      this.puzzle = puzzle;
      this.puzzleSequence = [this.puzzle.start_movie.id];
    });
  }

  ngOnInit(): void {
  }

}