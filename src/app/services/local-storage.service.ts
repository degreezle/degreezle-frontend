import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  public get hasSeenInstructions() {
    let data = localStorage.getItem('seen-instructions');
    return data ? JSON.parse(data) : false;
  }

  public setSeenInstructions() {
    localStorage.setItem('seen-instructions', JSON.stringify(true));
  }

  public addSolution(puzzleId: number, token: string) {
    let solutions = localStorage.getItem('solutions');
    let solutionsDict = solutions ? JSON.parse(solutions) : {};
    solutionsDict[puzzleId] = token;
    localStorage.setItem('solutions', JSON.stringify(solutionsDict));
  }

  public get solutions() {
    let data = localStorage.getItem('solutions');
    return data ? JSON.parse(data) : {};
  }

  public hasSolved(puzzleId: number) {
    return Boolean(this.solutions[puzzleId]);
  }

  public getSolution(puzzleId: number) {
    return this.solutions[puzzleId];
  }
}
