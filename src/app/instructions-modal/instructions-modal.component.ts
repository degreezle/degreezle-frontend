import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-instructions-modal',
  templateUrl: './instructions-modal.component.html',
  styleUrls: ['./instructions-modal.component.scss']
})
export class InstructionsModalComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<InstructionsModalComponent>) { }

  ngOnInit(): void {
  }
}
