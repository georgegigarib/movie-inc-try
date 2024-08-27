import React from 'react';
import { render } from '@testing-library/react-native';
import MoviePoster from '@/src/infrastructure/components/movie-box/poster/Poster';
import { Movie } from '@/src/domain/Movies/model/Movie';

const mockMovie: Movie = new Movie(
  1,
  'Sample Movie',
  '2024-01-01',
  8.5,
  'https://example.com/poster.jpg'
);

describe('MoviePoster', () => {
  it('renders correctly and displays movie poster, vote average, and favorite icon', () => {
    const { getByTestId, toJSON } = render(
      <MoviePoster 
        posterPath={mockMovie.posterPath}
        voteAverage={mockMovie.voteAverage}
        isFavorite={false}
        onToggleFavorite={() => {}}
      />
    );

    expect(getByTestId('movie-poster')).toBeTruthy();
    expect(getByTestId('poster-image')).toBeTruthy();
    expect(getByTestId('vote-container')).toBeTruthy();

    expect(toJSON()).toMatchSnapshot();
  });
});
