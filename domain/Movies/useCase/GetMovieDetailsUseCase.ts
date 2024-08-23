import { getSession, isActive, setSession } from "@/utils/sessionStorage";
import { GetOrCreateSessionUseCase } from "@/domain/Guest/useCase/GetOrCreateSessionUseCase";
import { GuestRepository } from "@/domain/Guest/repository/GuestRepository";
import { MovieRepository } from "@/domain/Movies/repository/MovieRepository";
import { Movie } from "@/domain/Movies/model/Movie";

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