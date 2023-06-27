import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InstructionsModalComponent } from '../instructions-modal/instructions-modal.component';
import { PuzzleComponent } from '../puzzle/puzzle.component';
import { LocalStorageService } from '../services/local-storage.service';
import { DonationModalComponent } from '../donation-modal/donation-modal.component';

@Component({
  selector: 'app-puzzle-page',
  templateUrl: './puzzle-page.component.html',
  styleUrls: ['./puzzle-page.component.scss']
})
export class PuzzlePageComponent implements OnInit {

  token: string | null = null;
  puzzleId: string | null = null;
  solved = false;
  darkMode = false;
  stepCount = 1;

  @ViewChild(PuzzleComponent) puzzle: PuzzleComponent | undefined;


  constructor(public route: ActivatedRoute, public dialog: MatDialog, public localStorageService: LocalStorageService) { }

  ngOnInit(): void {
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

}
