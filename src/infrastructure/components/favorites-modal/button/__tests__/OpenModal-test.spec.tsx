import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import OpenModalButton from '@/src/infrastructure/components/favorites-modal/button/OpenModal';
  
describe('OpenModalButton', () => {
  it('matches the snapshot when isFavorite is true', () => {
    const { toJSON } = render(<OpenModalButton isFavorite={true} onPress={jest.fn()} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('matches the snapshot when isFavorite is false', () => {
    const { toJSON } = render(<OpenModalButton isFavorite={false} onPress={jest.fn()} />);
    expect(toJSON()).toMatchSnapshot();
  });

  it('renders the correct icon based on isFavorite prop', () => {
    const { getByTestId, rerender } = render(<OpenModalButton isFavorite={true} onPress={jest.fn()} />);

    const heartIcon = getByTestId('favorite-icon');
    expect(heartIcon.props.children).toBe('heart');
    expect(heartIcon.props.style.fontSize).toBe(15);
    expect(heartIcon.props.style.color).toBe('#fff');

    rerender(<OpenModalButton isFavorite={false} onPress={jest.fn()} />);

    const heartOutlineIcon = getByTestId('favorite-icon');
    expect(heartOutlineIcon.props.children).toBe('heart-o');
    expect(heartOutlineIcon.props.style.fontSize).toBe(15);
    expect(heartOutlineIcon.props.style.color).toBe('#fff');
  });

  it('calls onPress function when button is pressed', () => {
    const mockOnPress = jest.fn();
    const { getByTestId } = render(<OpenModalButton isFavorite={false} onPress={mockOnPress} />);

    const button = getByTestId('open-modal-button');
    fireEvent.press(button);

    expect(mockOnPress).toHaveBeenCalledTimes(1);
  });
});
