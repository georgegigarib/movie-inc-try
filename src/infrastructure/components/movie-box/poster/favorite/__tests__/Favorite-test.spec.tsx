import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Favorite from '@/src/infrastructure/components/movie-box/poster/favorite/Favorite';

describe('Favorite', () => {
  it('renders heart icon when isFavorite is true', () => {
    const { getByTestId } = render(
      <Favorite isFavorite={true} onPress={() => {}} />
    );
    const icon = getByTestId('favorite-icon');
    expect(icon.props.children).toBe('heart');
  });

  it('renders heart-o icon when isFavorite is false', () => {
    const { getByTestId } = render(
      <Favorite isFavorite={false} onPress={() => {}} />
    );
    const icon = getByTestId('favorite-icon');
    expect(icon.props.children).toBe('heart-o');
  });

  it('calls onPress when the button is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(
      <Favorite isFavorite={false} onPress={mockOnPress} />
    );
    const button = getByTestId('favorite-button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
