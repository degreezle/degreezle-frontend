import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators';
import { ENDPOINTS, HOST } from 'src/constants';
import { CastMember, Movie, SolutionResponse, StartPuzzle } from 'src/models';

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
    }
  });

  constructor(private http: HttpClient) { }

  fetchStartPuzzle(): Observable<StartPuzzle> {
    return this.http.get<StartPuzzle>(HOST + ENDPOINTS.init)
      .pipe(
        tap((puzzle: StartPuzzle) => this.puzzle$.next(puzzle)),
      );
  }

  public getStartPuzzle(force?: boolean) {
    if (this.puzzle$.getValue().id === 0 || force) {
      this.fetchStartPuzzle().pipe(take(1)).subscribe();
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
}
