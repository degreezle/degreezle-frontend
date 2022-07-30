import { Injectable } from '@angular/core';
import { StorageV1_0_0 } from 'src/models';

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
    let data: StorageV1_0_0 = {version: this.version};
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

  public addSolution(puzzleId: number, token: string, length: number) {
    let solutions = this.getData().solutions || {};
    solutions[puzzleId] = {
      token: token, 
      length: length
    };
    this.setData('solutions', solutions);
  }

  public get solutions() {
    return this.getData().solutions || {};
  }

  public hasSolved(puzzleId: number) {
    return Boolean(this.solutions[puzzleId]);
  }

  public getSolution(puzzleId: number) {
    return this.solutions[puzzleId];
  }
}
