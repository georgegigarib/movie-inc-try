import React from 'react';
import { render} from '@testing-library/react-native';
import ActorCarousel from '@/src/infrastructure/components/movie-details/actor-carousel/ActorCarousel';
import { Actor } from '@/src/domain/Actor/model/Actor';

const mockActors: Actor[] = [
  new Actor('John Doe', 1, 'Main Character', 'https://example.com/profile.jpg'),
  new Actor('Jane Smith', 2, 'Supporting Character', 'https://example.com/profile2.jpg'),
];

describe('ActorCarousel', () => {
  it('renders correctly with actors', () => {
    const { getByTestId, toJSON } = render(<ActorCarousel actors={mockActors} />);
    
    expect(getByTestId('actor-carousel')).toBeTruthy();
    expect(getByTestId('cast-title')).toBeTruthy();
    expect(getByTestId('actor-scroll-view')).toBeTruthy();
    mockActors.forEach(actor => {
      expect(getByTestId(`actor-${actor.id}`)).toBeTruthy();
    });

    expect(toJSON()).toMatchSnapshot();
  });

  it('shows no actors message when no actors are provided', () => {
    const { getByTestId } = render(<ActorCarousel actors={undefined} />);
    
    expect(getByTestId('no-actors-text')).toBeTruthy();
  });

  it('shows no actors message when actors array is empty', () => {
    const { getByTestId } = render(<ActorCarousel actors={[]} />);
    
    expect(getByTestId('no-actors-text')).toBeTruthy();
  });
});
