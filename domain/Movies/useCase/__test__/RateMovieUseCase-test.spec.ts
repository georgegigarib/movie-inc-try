import { mock, MockProxy } from 'jest-mock-extended';
import { RateMovieUseCase } from '@/domain/Movies/useCase/RateMovieUseCase';
import { MovieRepository } from '@/domain/Movies/repository/MovieRepository';
import { GetOrCreateSessionUseCase } from '@/domain/Guest/useCase/GetOrCreateSessionUseCase';
import { GuestSession } from '@/domain/Guest/model/GuestSession';
import { CouldNotRateMovieException } from '@/domain/Movies/exceptions/CouldNotRateMovieException';

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
    it('should throw CouldNotRateMovieException if rateMovie throws an exception', async () => {
        getOrCreateSessionUseCaseMock.execute.mockResolvedValue(guestSession);
        movieRepositoryMock.rateMovie.mockRejectedValue(new CouldNotRateMovieException());
  
        await expect(rateMovieUseCase.execute(1, 5)).rejects.toThrow(CouldNotRateMovieException);
        expect(getOrCreateSessionUseCaseMock.execute).toHaveBeenCalledTimes(1);
        expect(movieRepositoryMock.rateMovie).toHaveBeenCalledWith(1, 5, guestSession.guestSessionId);
      });

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
