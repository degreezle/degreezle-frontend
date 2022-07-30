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
  local_datetime?: string;
}

/**
 * SolutionResponse model
 */
 export interface SolutionResponse {
  puzzle: number;
  token: string;
  solution: (Movie | CastMember)[];
  count: number;
  shortest_solution: string;
  longest_solution: string;
}

/**
 * Metrics model
 */
 export interface Metrics {
  num_solved: number;
  shortest_solution: number;
  longest_solution: number;
  average_steps: number;
  median_steps: number;
}

/**
 * Storage model V1.0.0
 */
 export interface StorageV1_0_0 {
  seen_instructions?: boolean;
  solutions?: {
      [puzzleId: number]: StorageSolutionV1_0_0;
  };
  current_streak?: number;
  max_streak?: number;
  last_solution_date?: string;
  version: string;
}

/**
 * Storage solution model V1.0.0
 */
export interface StorageSolutionV1_0_0 {
  token: string;
  length: number;
}
