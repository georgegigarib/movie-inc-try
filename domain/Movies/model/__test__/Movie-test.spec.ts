import { Movie } from '@/domain/Movies/model/Movie';
import { Actor } from '@/domain/Actor/model/Actor';

describe('Movie', () => {
  const actor1 = new Actor('Robert Downey Jr.', 1, 'Tony Stark', '/profile-path1.jpg');
  const actor2 = new Actor('Gwyneth Paltrow', 2, 'Pepper Potts', '/profile-path2.jpg');

  it('should create an instance of Movie with all properties', () => {
    const movie = new Movie(
      1,
      'Iron Man',
      '2008-05-02',
      7.9,
      '/poster-path.jpg',
      'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is kidnapped and forced to build a devastating weapon.',
      [{ id: 1, name: 'Action' }],
      [actor1, actor2]
    );

    expect(movie).toBeInstanceOf(Movie);
    expect(movie.id).toBe(1);
    expect(movie.title).toBe('Iron Man');
    expect(movie.releaseDate).toBe('2008-05-02');
    expect(movie.voteAverage).toBe(7.9);
    expect(movie.posterPath).toBe('/poster-path.jpg');
    expect(movie.overview).toBe('A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is kidnapped and forced to build a devastating weapon.');
    expect(movie.genres).toEqual([{ id: 1, name: 'Action' }]);
    expect(movie.actors).toHaveLength(2);
    expect(movie.actors?.[0]).toBe(actor1);
    expect(movie.actors?.[1]).toBe(actor2);
  });

  it('should create an instance of Movie with optional properties', () => {
    const movie = new Movie(
      2,
      'The Avengers',
      '2012-05-04',
      8.0,
      '/poster-path2.jpg'
    );

    expect(movie).toBeInstanceOf(Movie);
    expect(movie.id).toBe(2);
    expect(movie.title).toBe('The Avengers');
    expect(movie.releaseDate).toBe('2012-05-04');
    expect(movie.voteAverage).toBe(8.0);
    expect(movie.posterPath).toBe('/poster-path2.jpg');
    expect(movie.overview).toBeUndefined();
    expect(movie.genres).toBeUndefined();
    expect(movie.actors).toBeUndefined();
  });
});
