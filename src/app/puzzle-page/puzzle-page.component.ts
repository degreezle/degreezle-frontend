import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InstructionsModalComponent } from '../instructions-modal/instructions-modal.component';
import { PuzzleComponent } from '../puzzle/puzzle.component';
import { LocalStorageService } from '../services/local-storage.service';
import { DonationModalComponent } from '../donation-modal/donation-modal.component';
import { DateFilterFn, MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { PuzzleService } from '../services/puzzle-service.service';
import { HistoricalPuzzle } from 'src/models';

@Component({
  selector: 'app-puzzle-page',
  templateUrl: './puzzle-page.component.html',
  styleUrls: ['./puzzle-page.component.scss']
})
export class PuzzlePageComponent implements OnInit {

  token: string | null = null;
  puzzleId: string | null = null;
  solvedPuzzle: Number | null = null;
  solved = false;
  darkMode = false;
  stepCount = 1;
  historicalPuzzles: HistoricalPuzzle[] = [];

  @ViewChild(PuzzleComponent) puzzle: PuzzleComponent | undefined;

  get puzzleDate(): Date | null {
    console.log(this.solvedPuzzle, this.puzzleId, 'anyyyy')
    const puzzle = this.historicalPuzzles.find(puzzle => puzzle.id === (this.solvedPuzzle ?? Number(this.puzzleId)));
    if (puzzle) {
      console.log('yesss', new Date(puzzle.datetime))
      return new Date(puzzle.datetime)
    }
    return null;
  }


  constructor(public route: ActivatedRoute, public dialog: MatDialog, public puzzleService: PuzzleService, public localStorageService: LocalStorageService) { }

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe(paramMap => {
      this.token = paramMap.get('token');
      this.puzzleId = paramMap.get('puzzleId');
    });
    if (!this.localStorageService.hasSeenInstructions) {
      this.showInstructions();
      this.localStorageService.setSeenInstructions();
    } else if (!this.localStorageService.hasSeenDonationPopUp) {
      this.askForDonation();
      this.localStorageService.setSeenDonationPopUp();
    }
    this.historicalPuzzles = await this.puzzleService.getHistoricalPuzzles().toPromise();
  }

  showInstructions() {
    this.dialog.open(InstructionsModalComponent, {
      backdropClass: 'modal-backdrop',
      closeOnNavigation: true,
      maxWidth: 500,
    });
  }

  askForDonation() {
    this.dialog.open(DonationModalComponent, {
      backdropClass: 'modal-backdrop',
      closeOnNavigation: true,
      maxWidth: 500,
    });
  }

  openKofi() {
    window.open(
      "https://ko-fi.com/filminthegaps", "_blank"
    );
  }

  reset() {
    this.puzzle?.reset();
  }

  showSolutionMetrics() {
    this.puzzle?.showSolutionMetrics();
  }

  selectPuzzle(dateRef: string) {
    const clickedPuzzle = this.historicalPuzzles.find(puzzle => new Date(puzzle.datetime).toDateString() === new Date(dateRef).toDateString())
    if (clickedPuzzle) {
      window.open(`/archive/${clickedPuzzle.id}`);
    }
  }

  dateFilter: DateFilterFn<Date | null> = (date: Date | null) => {
    if (date) {
      return this.historicalPuzzles.map((puzzle) => new Date(puzzle.datetime).toDateString()).includes(date.toDateString());
    }
    return false;
  };

  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    // Only highligh dates inside the month view.
    if (view === 'month') {
      // Highlight if it is a historical puzzle
      var highlight: boolean = this.historicalPuzzles.map((puzzle) => new Date(puzzle.datetime).toDateString()).includes(cellDate.toDateString());
      const puzzle = this.historicalPuzzles.find(puzzle => new Date(puzzle.datetime).toDateString() === cellDate.toDateString())
      // And if they have not been solved in this client
      if (puzzle) {
        highlight = highlight && !Object.keys(this.localStorageService.solutions).map(id => Number(id)).includes(puzzle.id)
      } else {
        highlight = false
      }

      return highlight ? 'solved-puzzle' : '';
    }

    else if (view === 'multi-year') {
      // Highlight if it is a historical puzzle
      var highlight: boolean = this.historicalPuzzles.map((puzzle) => new Date(puzzle.datetime).getFullYear()).includes(cellDate.getFullYear());
      const puzzles = this.historicalPuzzles.filter(puzzle => new Date(puzzle.datetime).getFullYear() === cellDate.getFullYear())
      // And if they have not been solved in this client
      if (puzzles.length) {
        highlight = highlight && puzzles.some(puzzle => !Object.keys(this.localStorageService.solutions).map(id => Number(id)).includes(puzzle.id))
      } else {
        highlight = false
      }

      return highlight ? 'solved-puzzle' : '';
    }

    else if (view === 'year') {
      // Highlight if it is a historical puzzle
      var highlight: boolean = this.historicalPuzzles.map((puzzle) => new Date(puzzle.datetime).toDateString().slice(4, 7) + new Date(puzzle.datetime).toDateString().slice(11)).includes(cellDate.toDateString().slice(4, 7) + cellDate.toDateString().slice(11));
      const puzzles = this.historicalPuzzles.filter(puzzle => new Date(puzzle.datetime).toDateString().slice(4, 7) + new Date(puzzle.datetime).toDateString().slice(11) === cellDate.toDateString().slice(4, 7) + cellDate.toDateString().slice(11))
      // And if they have not been solved in this client
      if (puzzles.length) {
        highlight = highlight && puzzles.some(puzzle => {
          return !Object.keys(this.localStorageService.solutions).map(id => Number(id)).includes(puzzle.id)

        })
      } else {
        highlight = false
      }

      return highlight ? 'solved-puzzle' : '';
    }

    return '';
  };

}
