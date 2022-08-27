import { Injectable } from '@angular/core';
import { SolutionResponse, StartPuzzle, StorageV1_0_0 } from 'src/models';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  version = 'v1.0.0'

  checkVersion() {
    if (!this.isCorrectVersion) {
      this.clear();
      this.creataData();
    }
  }

  get isCorrectVersion() {
    let data: any = this.getData();
    return data && 'version' in data && data['version'] === this.version;
  }

  getData(): StorageV1_0_0 {
    let data = localStorage.getItem('data');
    return data ? JSON.parse(data) : {};
  }

  clear() {
    localStorage.clear();
  }

  creataData() {
    let data: StorageV1_0_0 = { version: this.version };
    localStorage.setItem('data', JSON.stringify(data));
  }

  setData(key: keyof StorageV1_0_0, value: any) {
    let data: any = this.getData();
    data[key] = value;
    localStorage.setItem('data', JSON.stringify(data));
  }

  public get hasSeenInstructions() {
    this.checkVersion();
    let data: StorageV1_0_0 = this.getData();
    return Boolean(data.seen_instructions);
  }

  public setSeenInstructions() {
    this.setData('seen_instructions', true);
  }

  public addSolution(puzzle: StartPuzzle, solution: SolutionResponse) {
    let solutions = this.getData().solutions ?? {};
    solutions[puzzle.id] = {
      token: solution.token,
      length: solution.solution.length
    };
    this.setData('solutions', solutions);
  }

  public addToStreak(todays_date_string: string) {
    let currentStreak = this.getData().current_streak ?? 0;
    let maxStreak = this.getData().max_streak ?? 0;
    // Reset or increase streak
    if (this.shouldResetStreak(todays_date_string)) {
      currentStreak = 1;
    } else {
      currentStreak += 1;
    }
    // Check current streak is the max
    maxStreak = Math.max(currentStreak, maxStreak);
    // Store all
    this.setData('current_streak', currentStreak);
    this.setData('max_streak', maxStreak);
    this.setData('last_solution_date', todays_date_string);
  }

  public shouldResetStreak(todays_date_string: string) {
    let lastSolutionDateString = this.getData().last_solution_date;

    if (lastSolutionDateString) {
      let lastSolutionDate = new Date(lastSolutionDateString);
      let yesterday = new Date(todays_date_string);
      yesterday.setDate(yesterday.getDate() - 1); // yesterday = today - 1
      return yesterday.toDateString() !== lastSolutionDate.toDateString();
    } else {
      return true;
    }
  }

  public get solutions() {
    return this.getData().solutions ?? {};
  }

  public hasSolved(puzzleId: number) {
    return Boolean(this.solutions[puzzleId]);
  }

  public isOwnToken(puzzleId: number, token: string | null) {
    return this.solutions[puzzleId].token === token;
  }

  public getSolution(puzzleId: number) {
    return this.solutions[puzzleId];
  }

  public get currentStreak() {
    return this.getData().current_streak ?? 0;
  }

  public get maxStreak() {
    return this.getData().max_streak ?? 0;
  }
}
