import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CastMember, Metrics, SolutionResponse, StartPuzzle } from 'src/models';
import { PuzzleService } from '../services/puzzle-service.service';
import { SolutionMetricsModalComponent } from '../solution-metrics-modal/solution-metrics-modal.component';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnChanges {

  @Input() token: string | null = null;
  @Input() puzzleId: string | null = null;
  puzzle: StartPuzzle | null = null;
  puzzleSequence: number[] = [];
  possibleEndings: number[] = [];
  solved = false;
  loadedSolution: any[] = [];
  solvedSolution: SolutionResponse | null = null;
  metrics: Metrics | null = null;
  loading = true;
  @ViewChild('afterEndMovie') public afterEndMovie: ElementRef | undefined;

  constructor(public puzzleService: PuzzleService, public route: ActivatedRoute, public dialog: MatDialog) {
    puzzleService.puzzle$.subscribe(
      puzzle => {
        if (puzzle.id) {
          this.puzzle = puzzle;
          this.puzzleSequence = [this.puzzle.start_movie.id];
          puzzleService.getMovieCrew(this.puzzle.end_movie.id).subscribe(
            (movies: CastMember[]) => {
              this.possibleEndings = movies.map(movie => movie.id);
              this.loading = false;
            }, 
            () => {
              this.loading = false;
            }
          )
        }
      }, 
      () => {
        this.loading = false;
      }
    );
    
  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.token && this.token) {
      this.loadedSolution = (await this.puzzleService.getSolution(this.token).toPromise()).solution;
      this.loading = false;
    }
    if (changes.puzzleId) {
      this.loading = true;
      this.puzzleService.getStartPuzzle(this.puzzleId);
    }
  }

  async add(id: number) {
    this.puzzleSequence.push(id);
    this.solved = this.hasFoundSolution();
    if (this.solved && this.puzzle) {
      this.solvedSolution = await this.puzzleService.postSolution(this.puzzle.id, [...this.puzzleSequence, this.puzzle.end_movie.id]).toPromise() 
      this.metrics = await this.puzzleService.getMetrics().toPromise();
      this.showCongratulations();
    } 
    this.scrollToEnd();
  }

  scrollToEnd() {
    setTimeout(() => {   
      if (this.afterEndMovie) {                    
      this.afterEndMovie.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }

  showCongratulations() {
    this.dialog.open(SolutionMetricsModalComponent, {
      backdropClass: 'modal-backdrop', 
      closeOnNavigation: true, 
      restoreFocus: false, 
      autoFocus: true,
      maxWidth: 500, 
      data: {
        puzzle: this.puzzle, 
        solution: this.solvedSolution, 
        metrics: this.metrics,
      }
    });
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
