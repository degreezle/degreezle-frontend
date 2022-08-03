import { Component, Inject, OnInit } from '@angular/core';
import { Clipboard } from '@angular/cdk/clipboard';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { SolutionMetrics, StartPuzzle } from 'src/models';
import { LocalStorageService } from '../services/local-storage.service';

@Component({
  selector: 'app-solution-metrics-modal',
  templateUrl: './solution-metrics-modal.component.html',
  styleUrls: ['./solution-metrics-modal.component.scss']
})
export class SolutionMetricsModalComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: {
      token: string,
      puzzle: StartPuzzle,
      solutionMetrics: SolutionMetrics
    },
    private clipboard: Clipboard,
    public localStorageService: LocalStorageService) { }

  ngOnInit(): void {
  }

  get numberOfPuzzlesSolved() {
    return Object.keys(this.localStorageService.solutions).length;
  }

  get averageStepCount() {
    return Math.floor(Object.values(this.localStorageService.solutions).map(x => x.length - 1).reduce((a, b) => a + b, 0) / this.numberOfPuzzlesSolved);
  }

  digitToEmoji(digit: string) {
    let digit_map = new Map([
      ['0', '0️⃣'],
      ['1', '1️⃣'],
      ['2', '2️⃣'],
      ['3', '3️⃣'],
      ['4', '4️⃣'],
      ['5', '5️⃣'],
      ['6', '6️⃣'],
      ['7', '7️⃣'],
      ['8', '8️⃣'],
      ['9', '9️⃣'],
    ]);
    return digit_map.get(digit);
  }

  numberToEmoji(number: Number) {
    let number_parts = Array.from(String(number));
    let emoji_parts = number_parts.map(this.digitToEmoji);
    let emoji_string = emoji_parts.join();
    return emoji_string;
  }

  randomItem(array: Array<String>) {
    return array[Math.floor(Math.random() * array.length)];
  }
  solutionQualityEmoji(number: Number) {
    if (number > 50) {
      return this.randomItem(['🤯', '😳', '😱', '😵‍💫']);
    } else if (number > 20) {
      return this.randomItem(['🤷', '🙏', '🫥', '🦀']);
    } else if (number > 6) {
      return this.randomItem(['✨', '🏆', '🎉', '🤗']);
    } else {
      return this.randomItem(['👽', '🕵️‍♀️', '💅🏼', '💆🏽']);
    }
  }

  buildMessage() {
    let step_count = this.numberToEmoji(this.data.solutionMetrics.num_steps);
    let solution_emoji = this.solutionQualityEmoji(this.data.solutionMetrics.num_steps);
    return `i #filminthegaps between ${this.data.puzzle.start_movie.title} and ${this.data.puzzle.end_movie.title} in ${step_count} steps ${solution_emoji}. try it yourself at https://filminthega.ps or see my solution at https://filminthega.ps/solution/${this.data.token}`;
  }

  copySolution() {
    this.clipboard.copy(this.buildMessage());
  }

  openTwitterLink() {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(this.buildMessage())}`)
  }

}
