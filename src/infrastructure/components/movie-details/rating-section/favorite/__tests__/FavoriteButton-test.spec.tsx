import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import FavoriteButton from '@/src/infrastructure/components/movie-details/rating-section/favorite/FavoriteButton';

describe('FavoriteButton', () => {
  it('renders heart icon when isFavorite is true', () => {
    const { getByTestId, toJSON } = render(
      <FavoriteButton isFavorite={true} onToggleFavorite={() => {}} />
    );
    const icon = getByTestId('icon');
    expect(icon.props.children).toBe('heart');
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders heart-o icon when isFavorite is false', () => {
    const { getByTestId, toJSON } = render(
      <FavoriteButton isFavorite={false} onToggleFavorite={() => {}} />
    );
    const icon = getByTestId('icon');
    expect(icon.props.children).toBe('heart-o');
    expect(toJSON()).toMatchSnapshot();
  });

  it('calls onToggleFavorite when button is pressed', () => {
    const mockOnToggleFavorite = jest.fn();
    const { getByTestId } = render(
      <FavoriteButton isFavorite={false} onToggleFavorite={mockOnToggleFavorite} />
    );
    const button = getByTestId('favorite-button');
    fireEvent.press(button);
    expect(mockOnToggleFavorite).toHaveBeenCalledTimes(1);
  });
});
