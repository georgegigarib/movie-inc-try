import { mock, MockProxy } from 'jest-mock-extended';
import { GetRatedMoviesUseCase } from '@/src/domain/Movies/useCase/GetRatedMoviesUseCase';
import { MovieRepository } from '@/src/domain/Movies/repository/MovieRepository';
import { Movie } from '@/src/domain/Movies/model/Movie';
import { GuestSession } from '@/src/domain/Guest/model/GuestSession';
import { GetOrCreateSessionUseCase } from '@/src/domain/Guest/useCase/GetOrCreateSessionUseCase';

describe('GetRatedMoviesUseCase', () => {
  let movieRepositoryMock: MockProxy<MovieRepository>;
  let getOrCreateSessionUseCaseMock: MockProxy<GetOrCreateSessionUseCase>;
  let getRatedMoviesUseCase: GetRatedMoviesUseCase;
  let guestSession: GuestSession;
  let movies: Movie[];

  beforeEach(() => {
    movieRepositoryMock = mock<MovieRepository>();
    getOrCreateSessionUseCaseMock = mock<GetOrCreateSessionUseCase>();
    getRatedMoviesUseCase = new GetRatedMoviesUseCase();

    (getRatedMoviesUseCase as any).movieRepository = movieRepositoryMock;
    (getRatedMoviesUseCase as any).getOrCreateSessionUseCase = getOrCreateSessionUseCaseMock;

    guestSession = new GuestSession('session123', '2024-12-31');
    movies = [
      new Movie(
        1,
        'Inception',
        '2010-07-16',
        8.8,
        'https://image.tmdb.org/t/p/original/poster1.jpg',
        'A mind-bending thriller',
        [{ id: 1, name: 'Action' }],
        [],
        5
      ),
    ];
  });

  describe('execute', () => {
    it('should return rated movies when session is active', async () => {
      getOrCreateSessionUseCaseMock.execute.mockResolvedValue(guestSession);
      movieRepositoryMock.getRatedMovies.mockResolvedValue(movies);

      const result = await getRatedMoviesUseCase.execute();

      expect(result).toEqual(movies);
      expect(getOrCreateSessionUseCaseMock.execute).toHaveBeenCalledTimes(1);
      expect(movieRepositoryMock.getRatedMovies).toHaveBeenCalledWith(guestSession.guestSessionId);
    });
  });
});
