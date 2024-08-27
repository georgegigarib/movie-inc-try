import React from 'react';
import { render } from '@testing-library/react-native';
import Box from '@/src/infrastructure/components/movie-details/actor-carousel/actor-box/Box';
import { Actor } from '@/src/domain/Actor/model/Actor';

const mockActor: Actor = new Actor(
  'John Doe',
  1,
  'Main Character',
  'https://example.com/profile.jpg'
);

describe('Box', () => {
  it('renders correctly and shows actor details', () => {
    const { getByTestId, toJSON } = render(<Box actor={mockActor} />);
    
    expect(getByTestId('actor-box-button')).toBeTruthy();
    expect(getByTestId('actor-box')).toBeTruthy();
    expect(getByTestId('actor-image')).toBeTruthy();
    expect(getByTestId('actor-names')).toBeTruthy();
    expect(getByTestId('actor-name').children[0]).toBe('John Doe');
    expect(getByTestId('actor-character').children[0]).toBe('Main Character');
    
    expect(toJSON()).toMatchSnapshot();
  });
});
