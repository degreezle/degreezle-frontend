import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ENDPOINTS, HOST } from 'src/constants';
import { CastMember, Movie, SolutionResponse, StartPuzzle, SolutionMetrics } from 'src/models';
import { PuzzleMetrics } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class PuzzleService {

  puzzle$: BehaviorSubject<StartPuzzle> = new BehaviorSubject({
    id: 0,
    start_movie: {
      id: 0,
      poster_path: '',
      title: '',
    },
    end_movie: {
      id: 0,
      poster_path: '',
      title: '',
    },
  });

  constructor(private http: HttpClient) { }

  fetchStartPuzzle(puzzleId?: string | null): Observable<StartPuzzle> {
    return this.http.get<StartPuzzle>(HOST + ENDPOINTS.puzzle + (puzzleId ? puzzleId + '/' : ''))
      .pipe(
        tap((puzzle: StartPuzzle) => this.puzzle$.next(puzzle)),
      );
  }

  public getStartPuzzle(puzzleId?: string | null, force?: boolean) {
    if (this.puzzle$.getValue().id === 0 || this.puzzle$.getValue().id !== Number(puzzleId) || force) {
      this.fetchStartPuzzle(puzzleId).pipe(take(1)).subscribe();
    }
  }

  public getMovieCrew(id: number): Observable<CastMember[]> {
    return this.http.get<CastMember[]>(HOST + ENDPOINTS.movie + id + '/crew/');
  }

  public getPersonFilmography(id: number): Observable<Movie[]> {
    return this.http.get<Movie[]>(HOST + ENDPOINTS.person + id + '/filmography/');
  }

  public postSolution(puzzleId: number, sequence: number[]): Observable<SolutionResponse> {
    return this.http.post<SolutionResponse>(HOST + ENDPOINTS.solution, {
      solution: sequence,
      puzzle: puzzleId,
    });
  }

  public getSolution(token: string): Observable<SolutionResponse> {
    return this.http.get<SolutionResponse>(HOST + ENDPOINTS.solution + token + '/');
  }

  public getPuzzleMetrics(puzzleId?: string | null): Observable<PuzzleMetrics> {
    return this.http.get<PuzzleMetrics>(HOST + ENDPOINTS.puzzleMetrics + puzzleId + '/');
  }

  public getSolutionMetrics(token: string): Observable<SolutionMetrics> {
    return this.http.get<SolutionMetrics>(HOST + ENDPOINTS.solutionMetrics + token + '/');
  }
}
