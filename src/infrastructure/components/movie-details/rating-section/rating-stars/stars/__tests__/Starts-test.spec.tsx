import { render, fireEvent } from '@testing-library/react-native';
import StarRow from '@/src/infrastructure/components/movie-details/rating-section/rating-stars/stars/Stars';
import React from 'react';

describe('StarRow', () => {
  test('renders correctly and handles press events', () => {
    const handlePress = jest.fn();
    const { getByTestId, toJSON } = render(
      <StarRow
        start={1}
        count={5}
        rating={3}
        submitted={false}
        onPress={handlePress}
      />
    );

    for (let i = 1; i <= 5; i++) {
      const star = getByTestId(`star-row-touchable-${i}`);
      expect(star).toBeTruthy();
    }

    fireEvent.press(getByTestId('star-row-touchable-2'));
    expect(handlePress).toHaveBeenCalledWith(2);
    expect(toJSON()).toMatchSnapshot();
  });
});
