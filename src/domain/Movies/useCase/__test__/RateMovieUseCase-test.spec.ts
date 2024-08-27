import { mock, MockProxy } from 'jest-mock-extended';
import { RateMovieUseCase } from '@/src/domain/Movies/useCase/RateMovieUseCase';
import { MovieRepository } from '@/src/domain/Movies/repository/MovieRepository';
import { CouldNotRateMovieException } from '@/src/domain/Movies/exceptions/CouldNotRateMovieException';
import { GuestSession } from '@/src/domain/Guest/model/GuestSession';
import { GetOrCreateSessionUseCase } from '@/src/domain/Guest/useCase/GetOrCreateSessionUseCase';

describe('RateMovieUseCase', () => {
  let movieRepositoryMock: MockProxy<MovieRepository>;
  let getOrCreateSessionUseCaseMock: MockProxy<GetOrCreateSessionUseCase>;
  let rateMovieUseCase: RateMovieUseCase;
  let guestSession: GuestSession;

  beforeEach(() => {
    movieRepositoryMock = mock<MovieRepository>();
    getOrCreateSessionUseCaseMock = mock<GetOrCreateSessionUseCase>();
    rateMovieUseCase = new RateMovieUseCase();

    (rateMovieUseCase as any).movieRepository = movieRepositoryMock;
    (rateMovieUseCase as any).getOrCreateSessionUseCase = getOrCreateSessionUseCaseMock;

    guestSession = new GuestSession('session123', '2024-12-31');
  });

  describe('execute', () => {
    it('should return true when the rating is successful', async () => {
      getOrCreateSessionUseCaseMock.execute.mockResolvedValue(guestSession);
      movieRepositoryMock.rateMovie.mockResolvedValue(true);

      const result = await rateMovieUseCase.execute(1, 5);

      expect(result).toBe(true);
      expect(getOrCreateSessionUseCaseMock.execute).toHaveBeenCalledTimes(1);
      expect(movieRepositoryMock.rateMovie).toHaveBeenCalledWith(1, 5, guestSession.guestSessionId);
    });
  });
});
