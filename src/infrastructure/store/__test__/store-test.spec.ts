import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect } from '@jest/globals';
import favoriteMoviesReducer from '@/src/infrastructure/store/favoriteMovies';

const store = configureStore({
  reducer: {
    movies: favoriteMoviesReducer,
  },
});

describe('Redux store', () => {
  it('should have the correct initial state', () => {
    const state = store.getState();
    expect(state.movies).toEqual({ movies: [] });
  });

  it('should have the correct types for dispatch and state', () => {
    expect(typeof store.dispatch).toBe('function');
    expect(typeof store.getState).toBe('function');
  });
});
