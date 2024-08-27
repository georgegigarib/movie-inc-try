import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Box from '@/src/infrastructure/components/movie-details/recommendation-carousel/box/Box';
import { Movie } from '@/src/domain/Movies/model/Movie';

const mockMovie: Movie = new Movie(
  1,
  'Sample Movie',
  '2024-01-01',
  8.5,
  'https://example.com/poster.jpg'
);

describe('Box', () => {
  it('renders correctly and shows movie title', () => {
    const { getByText, getByTestId, toJSON } = render(
      <Box movie={mockMovie} onPress={() => {}} />
    );

    expect(getByTestId('image')).toBeTruthy();
    expect(getByText('Sample Movie')).toBeTruthy();
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onPress when pressed', () => {
    const onPressMock = jest.fn();
    const { getByTestId } = render(
      <Box movie={mockMovie} onPress={onPressMock} />
    );

    fireEvent.press(getByTestId('open-modal-button'));
    expect(onPressMock).toHaveBeenCalled();
  });
});
