import { MovieMapper } from '@/src/domain/Movies/mappers/MovieMapper';
import { MovieDto } from '@/src/domain/Movies/client/Dtos';
import { Movie } from '@/src/domain/Movies/model/Movie';
import { Actor } from '@/src/domain/Actor/model/Actor';
import { ActorMapper } from '@/src/domain/Actor/mappers/ActorMapper';

describe('MovieMapper', () => {
  let movieMapper: MovieMapper;
  let actorMapper: ActorMapper;

  const actorDto1 = {
    name: 'Robert Downey Jr.',
    id: 1,
    character: 'Tony Stark',
    profile_path: '/profile-path1.jpg',
  };

  const actorDto2 = {
    name: 'Gwyneth Paltrow',
    id: 2,
    character: 'Pepper Potts',
    profile_path: '/profile-path2.jpg',
  };

  const movieDto: MovieDto = {
    id: 1,
    title: 'Iron Man',
    original_title: 'Iron Man',
    poster_path: '/poster-path.jpg',
    adult: false,
    overview: 'A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is kidnapped and forced to build a devastating weapon.',
    release_date: '2008-05-02',
    genre_ids: [1],
    genres: [{ id: 1, name: 'Action' }],
    original_language: 'en',
    backdrop_path: '/backdrop-path.jpg',
    popularity: 123.45,
    vote_count: 2000,
    video: false,
    vote_average: 7.9,
    credits: {
      cast: [actorDto1, actorDto2],
    }
  };

  beforeEach(() => {
    actorMapper = new ActorMapper();
    movieMapper = new MovieMapper();
  });

  it('should map a MovieDto to a Movie model', () => {
    const movie = movieMapper.model(movieDto);

    expect(movie).toBeInstanceOf(Movie);
    expect(movie.id).toBe(movieDto.id);
    expect(movie.title).toBe(movieDto.title);
    expect(movie.releaseDate).toBe('May 2, 2008'); // Updated to match the formatDate change
    expect(movie.voteAverage).toBe(movieDto.vote_average);
    expect(movie.posterPath).toBe(`https://image.tmdb.org/t/p/original${movieDto.poster_path}`);
    expect(movie.overview).toBe(movieDto.overview);
    expect(movie.genres).toEqual(movieDto.genres);
    expect(movie.actors).toHaveLength(2);
    movie.actors?.forEach(actor => {
      expect(actor).toBeInstanceOf(Actor);
    });
    expect(movie.actors?.[0].name).toBe(actorDto1.name);
    expect(movie.actors?.[1].name).toBe(actorDto2.name);
  });

  it('should handle empty credits', () => {
    const emptyCreditsDto: MovieDto = {
      id: 1,
      title: 'Empty Credits Movie',
      original_title: 'Empty Credits Movie',
      poster_path: '/poster-path.jpg',
      adult: false,
      overview: '',
      release_date: '2023-01-01',
      genre_ids: [],
      genres: [],
      original_language: 'en',
      backdrop_path: '',
      popularity: 0,
      vote_count: 0,
      video: false,
      vote_average: 0,
      credits: {
        cast: [],
      }
    };

    const movie = movieMapper.model(emptyCreditsDto);

    expect(movie).toBeInstanceOf(Movie);
    expect(movie.actors).toHaveLength(0);
  });

  it('should call ActorMapper.model the correct number of times and return expected Model', () => {
    const actorMapperSpy = jest.spyOn(ActorMapper.prototype, 'model');

    const movie = movieMapper.model(movieDto);

    expect(actorMapperSpy).toHaveBeenCalledTimes(2);
    expect(actorMapperSpy).toHaveBeenCalledWith(actorDto1);
    expect(actorMapperSpy).toHaveBeenCalledWith(actorDto2);

    movie.actors?.forEach(actor => {
      expect(actor).toBeInstanceOf(Actor);
    });
  });
});
