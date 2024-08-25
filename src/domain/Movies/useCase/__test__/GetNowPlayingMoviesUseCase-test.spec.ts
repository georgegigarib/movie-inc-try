import { mock, MockProxy } from 'jest-mock-extended';
import { GetNowPlayingMoviesUseCase } from '@/src/domain/Movies/useCase/GetNowPlayingMoviesUseCase';
import { MovieRepository } from '@/src/domain/Movies/repository/MovieRepository';
import { Movie } from '@/src/domain/Movies/model/Movie';

describe('GetNowPlayingMoviesUseCase', () => {
    let movieRepositoryMock: MockProxy<MovieRepository>;
    let useCase: GetNowPlayingMoviesUseCase;

    const mockMovies: Movie[] = [
        new Movie(1, 'The Dark Knight', '2008-07-18', 9.0, '/path/to/poster1.jpg'),
        new Movie(2, 'Inception', '2010-07-16', 8.8, '/path/to/poster2.jpg'),
        new Movie(3, 'Interstellar', '2014-11-07', 8.6, '/path/to/poster3.jpg'),
        new Movie(4, 'Batman Begins', '2005-06-15', 8.2, '/path/to/poster4.jpg')
    ];

    beforeEach(() => {
        movieRepositoryMock = mock<MovieRepository>();

        jest.spyOn(MovieRepository.prototype, 'getAll').mockResolvedValue(mockMovies);

        useCase = new GetNowPlayingMoviesUseCase();
    });

    it('should sort movies alphabetically by title', async () => {
        const sortedMovies = await useCase.execute();

        const expectedTitles = [
            'Batman Begins',
            'Inception',
            'Interstellar',
            'The Dark Knight'
        ];
        
        const sortedTitles = sortedMovies.map(movie => movie.title);

        expect(sortedTitles).toEqual(expectedTitles);
    });
});
