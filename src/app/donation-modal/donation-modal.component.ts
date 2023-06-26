import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-donation-modal',
  templateUrl: './donation-modal.component.html',
  styleUrls: ['./donation-modal.component.scss']
})
export class DonationModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DonationModalComponent>, public localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  get numberOfPuzzlesSolved() {
    return Object.keys(this.localStorageService.solutions).length;
  }

<<<<<<< HEAD
  openKofi() {
    window.open(
      "https://ko-fi.com/filminthegaps", "_blank"
    );
=======
  donate() {
    window.location.href = 'https://ko-fi.com/filminthegaps';
>>>>>>> 8c6ff80c345da84e7404a27d540803165d17f262
  }
}
