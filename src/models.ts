/**
 * Cast member model
 */
export interface CastMember {
  profile_path: string;
  id: number;
  name: string;
}

/**
 * Movie model
 */
export interface Movie {
  poster_path: string;
  id: number;
  title: string;
}

/**
 * StartPuzzle model
 */
 export interface StartPuzzle {
  id: number;
  start_movie: Movie;
  end_movie: Movie;
}

/**
 * SolutionResponse model
 */
 export interface SolutionResponse {
  puzzle: number;
  token: string;
  solution: (Movie | CastMember)[];
  count?: number;
}

