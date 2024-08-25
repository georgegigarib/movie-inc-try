import { describe, it, expect } from '@jest/globals';
import moviesReducer, { addMovie, removeMovie } from '@/src/infrastructure/store/favoriteMovies';
import { Movie } from '@/src/domain/Movies/model/Movie';

interface MoviesState {
  movies: Movie[];
}

const initialState: MoviesState = {
  movies: [],
};

describe('moviesReducer', () => {
  it('should handle initial state', () => {
    expect(moviesReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  it('should handle addMovie action', () => {
    const movie: Movie = {
      id: 1,
      title: 'Test Movie',
      releaseDate: '2024-01-01',
      rating: 7.5,
      posterPath: '/path/to/poster.jpg',
      voteAverage: 9,
    };
    const state = moviesReducer(initialState, addMovie(movie));
    expect(state.movies).toContainEqual(movie);
  });

  it('should handle removeMovie action', () => {
    const movie1: Movie = {
      id: 1,
      title: 'Test Movie 1',
      releaseDate: '2024-01-01',
      rating: 7.5,
      posterPath: '/path/to/poster1.jpg',
      voteAverage: 9,
    };
    const movie2: Movie = {
      id: 2,
      title: 'Test Movie 2',
      releaseDate: '2024-01-02',
      rating: 8.0,
      posterPath: '/path/to/poster2.jpg',
      voteAverage: 9,
    };

    let state = moviesReducer(initialState, addMovie(movie1));
    state = moviesReducer(state, addMovie(movie2));
    state = moviesReducer(state, removeMovie(1));

    expect(state.movies).toEqual([movie2]);
  });
});
