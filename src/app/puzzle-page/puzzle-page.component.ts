import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { InstructionsModalComponent } from '../instructions-modal/instructions-modal.component';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-puzzle-page',
  templateUrl: './puzzle-page.component.html',
  styleUrls: ['./puzzle-page.component.scss']
})
export class PuzzlePageComponent implements OnInit {

  token: string | null = null;
  puzzleId: string | null = null;
  darkMode = false;

  constructor(public route: ActivatedRoute, public dialog: MatDialog, public localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.token = paramMap.get('token');
      this.puzzleId = paramMap.get('puzzleId');
    });
    if (!this.localStorageService.hasSeenInstructions) {
      this.showInstructions();
      this.localStorageService.setSeenInstructions();
    }
  }

  showInstructions() {
    this.dialog.open(InstructionsModalComponent, {
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
    
  }
}
