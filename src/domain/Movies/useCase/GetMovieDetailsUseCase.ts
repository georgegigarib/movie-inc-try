import { MovieRepository } from "@/src/domain/Movies/repository/MovieRepository";
import { Movie } from "@/src/domain/Movies/model/Movie";
import { GetOrCreateSessionUseCase } from "@/src/domain/Guest/useCase/GetOrCreateSessionUseCase";

export class GetMovieDetailsUseCase {
    private movieRepository: MovieRepository
    private getOrCreateSessionUseCase: GetOrCreateSessionUseCase
    
    constructor()
    {
        this.movieRepository = new MovieRepository()
        this.getOrCreateSessionUseCase = new GetOrCreateSessionUseCase()
    }

    public async execute(movieId: number): Promise<Movie> {
        const session = await this.getOrCreateSessionUseCase.execute()
        const ratedMovies = await this.movieRepository.getRatedMovies(session.guestSessionId)
        
        let movieDetails = await this.movieRepository.get(movieId)

        const ratedMovie = ratedMovies.find(movie => movie.id === movieId);
        if (ratedMovie) {
            movieDetails.rating = ratedMovie.rating;
        }
        
        return movieDetails
    }
}