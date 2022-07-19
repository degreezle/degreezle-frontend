import { Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CastMember, Movie, SolutionResponse, StartPuzzle } from 'src/models';
import { PuzzleService } from '../services/puzzle-service.service';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnChanges {

  @Input() token: string | null = null;
  puzzle: StartPuzzle | null = null;
  puzzleSequence: number[] = [];
  possibleEndings: number[] = [];
  solved = false;
  loadedSolution: any[] = [];
  solvedSolution: SolutionResponse | null = null;
  @ViewChild('scroll', { read: ElementRef }) public scroll: ElementRef | undefined;

  constructor(public puzzleService: PuzzleService, public route: ActivatedRoute) {
    puzzleService.getStartPuzzle();
    puzzleService.puzzle$.subscribe(puzzle => {
      if (puzzle.id) {
        this.puzzle = puzzle;
        this.puzzleSequence = [this.puzzle.start_movie.id];
        puzzleService.getMovieCrew(this.puzzle.end_movie.id).subscribe((movies: CastMember[]) => this.possibleEndings = movies.map(movie => movie.id))
      }
    });
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.token && this.token) {
      this.loadedSolution = (await this.puzzleService.getSolution(this.token).toPromise()).solution;
    }
  }

  add(id: number) {
    this.puzzleSequence.push(id);
    this.solved = this.hasFoundSolution();
    if (this.solved && this.puzzle) {
      this.puzzleService.postSolution(this.puzzle.id, [...this.puzzleSequence, this.puzzle.end_movie.id]).subscribe(
        (response: SolutionResponse) => this.solvedSolution = response
      );
    } 
    if (this.scroll) {
      this.scroll.nativeElement.scrollTop = this.scroll?.nativeElement.scrollHeight;
    }
  }

  hasFoundSolution() {
    return this.puzzleSequence.length > 0 && this.possibleEndings.includes(this.puzzleSequence[this.puzzleSequence.length - 1])
  }

  showMovieSelector(index: number) {
    if (!this.solved) {
      return index % 2 === 0;
    } else {
      return index % 2 === 0 && index !== this.puzzleSequence.length - 1;
    }
  }

  showCastMemberSelector(index: number) {
    if (!this.solved) {
      return index % 2 !== 0;
    } else {
      return index % 2 !== 0 && index !== this.puzzleSequence.length - 1;
    }
  }

  

}
