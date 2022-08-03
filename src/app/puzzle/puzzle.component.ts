import { ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { CastMember, SolutionResponse, StartPuzzle, SolutionMetrics } from 'src/models';
import { PuzzleService } from '../services/puzzle-service.service';
import { SolutionMetricsModalComponent } from '../solution-metrics-modal/solution-metrics-modal.component';
import { LocalStorageService } from '../services/local-storage.service';
import { Location } from '@angular/common';

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
  solutionMetrics: SolutionMetrics | null = null;
  loading = true;
  error = false;
  @ViewChild('afterEndMovie') public afterEndMovie: ElementRef | undefined;
  @Output() stepCountChanged: EventEmitter<number> = new EventEmitter<number>();
  @Output() solvedPuzzle: EventEmitter<boolean> = new EventEmitter<boolean>();


  constructor(
    public puzzleService: PuzzleService,
    public route: ActivatedRoute,
    public dialog: MatDialog,
    public localStorageService: LocalStorageService,
    public location: Location,
    private cdref: ChangeDetectorRef,
  ) {
    puzzleService.puzzle$.subscribe(
      puzzle => {
        if (puzzle.id) {
          this.puzzle = puzzle;

          if (this.localStorageService.hasSolved(puzzle.id)) {
            this.solvedPuzzle.emit(true);
            this.token = this.localStorageService.getSolution(puzzle.id).token;
          }
        }

        if (this.token) {
          this.solvedPuzzle.emit(true);
          this.loadSolution(this.token);
        } else if (puzzle.id) {
          this.loadGameInfo(puzzle)
        }

      },
      () => {
        this.error = true;
        this.loading = false;
      }
    );

  }

  async ngOnChanges(changes: SimpleChanges) {
    if (changes.token && this.token) {
      this.loadSolution(this.token);
    }
    if (changes.puzzleId) {
      this.loading = true;
      this.puzzleService.getStartPuzzle(this.puzzleId);
    }
  }

  loadGameInfo(puzzle: StartPuzzle) {
    this.puzzleSequence = [puzzle.start_movie.id];
    this.puzzleService.getMovieCrew(puzzle.end_movie.id).subscribe(
      (movies: CastMember[]) => {
        this.possibleEndings = movies.map(movie => movie.id);
        this.loading = false;
      },
      () => {
        this.error = true;
        this.loading = false;
      }
    )
  }

  loadSolution(token: string) {
    this.puzzleService.getSolution(token).subscribe(
      solution => {
        this.loadedSolution = solution.solution;
        this.loading = false;
      },
      () => {
        this.error = true;
        this.loading = false;
      }
    )
    this.puzzleService.getSolutionMetrics(token).subscribe(
      solutionMetrics => {
        this.solutionMetrics = solutionMetrics;
      },
      () => {
        this.error = true;
        this.loading = false;
      }
    );
  }

  async add(id: number) {
    this.puzzleSequence.push(id);
    this.stepCountChanged.emit(this.puzzleSequence.length);
    this.solved = this.hasFoundSolution();
    this.postSolutionAndShowModal();
    this.scrollToEnd();
  }

  async postSolutionAndShowModal() {
    if (this.solved && this.puzzle) {
      this.solvedPuzzle.emit(true);
      await this.postSolutionAndGetMetrics();
      this.calculateAndStoreSolutionMetrics();
      this.showSolutionMetrics();
      this.changeURL();
    }
  }

  changeURL() {
    if (this.solvedSolution) {
      this.location.replaceState("/solution/" + this.solvedSolution.token);
    }
  }

  calculateAndStoreSolutionMetrics() {
    if (this.puzzle && this.solvedSolution) {
      this.localStorageService.addSolution(
        this.puzzle,
        this.solvedSolution
      );
      if (this.puzzle.local_datetime) {
        this.localStorageService.addToStreak(this.puzzle.local_datetime)
      }
    }
  }

  async postSolutionAndGetMetrics() {
    if (this.puzzle) {
      this.solvedSolution = await this.puzzleService.postSolution(
        this.puzzle.id, [...this.puzzleSequence, this.puzzle.end_movie.id]
      ).toPromise()
      this.solutionMetrics = await this.puzzleService.getSolutionMetrics(this.solvedSolution.token).toPromise();
    }
  }

  scrollToEnd() {
    setTimeout(() => {
      if (this.afterEndMovie) {
        this.afterEndMovie.nativeElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 300);
  }

  showSolutionMetrics() {
    this.dialog.open(SolutionMetricsModalComponent, {
      backdropClass: 'modal-backdrop',
      closeOnNavigation: true,
      restoreFocus: false,
      autoFocus: true,
      minWidth: 200,
      maxWidth: 500,
      data: {
        token: this.solvedSolution?.token ?? this.token,
        puzzle: this.puzzle,
        solutionMetrics: this.solutionMetrics,
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

  reset() {
    if (this.puzzle) {
      this.puzzleSequence = [];
      // so angular gets rid of all rendered components
      this.cdref.detectChanges();
      this.puzzleSequence = [this.puzzle.start_movie.id];
      this.stepCountChanged.emit(1);
    }
  }
}
