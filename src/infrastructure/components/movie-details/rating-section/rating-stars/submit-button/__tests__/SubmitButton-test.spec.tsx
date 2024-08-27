import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SubmitButton from '@/src/infrastructure/components/movie-details/rating-section/rating-stars/submit-button/SubmitButton';

describe('SubmitButton', () => {
  const mockOnPress = jest.fn();

  test('renders correctly when not loading, not submitted, and modified', () => {
    const { getByTestId, toJSON } = render(
      <SubmitButton
        isModified={true}
        submitted={false}
        isLoading={false}
        onPress={mockOnPress}
      />
    );
    expect(toJSON()).toMatchSnapshot();
    const button = getByTestId('submit-button');
    expect(button).toBeTruthy();
    expect(getByTestId('send-icon')).toBeTruthy();
  });

  test('renders correctly when loading', () => {
    const { getByTestId, toJSON } = render(
      <SubmitButton
        isModified={true}
        submitted={false}
        isLoading={true}
        onPress={mockOnPress}
      />
    );
    expect(toJSON()).toMatchSnapshot();
    const button = getByTestId('submit-button');
    expect(button).toBeTruthy();
    expect(getByTestId('activity-indicator')).toBeTruthy();
  });

  test('renders correctly when submitted', () => {
    const { getByTestId, toJSON } = render(
      <SubmitButton
        isModified={true}
        submitted={true}
        isLoading={false}
        onPress={mockOnPress}
      />
    );
    expect(toJSON()).toMatchSnapshot();
    const button = getByTestId('submit-button');
    expect(button).toBeTruthy();
    expect(getByTestId('check-icon')).toBeTruthy();
  });

  test('does not call onPress when disabled', () => {
    const { getByTestId } = render(
      <SubmitButton
        isModified={false}
        submitted={true}
        isLoading={false}
        onPress={mockOnPress}
      />
    );
    const button = getByTestId('submit-button');
    fireEvent.press(button);
    expect(mockOnPress).not.toHaveBeenCalled();
  });

  test('calls onPress when enabled and pressed', () => {
    const { getByTestId } = render(
      <SubmitButton
        isModified={true}
        submitted={false}
        isLoading={false}
        onPress={mockOnPress}
      />
    );
    const button = getByTestId('submit-button');
    fireEvent.press(button);
    expect(mockOnPress).toHaveBeenCalled();
  });
});
