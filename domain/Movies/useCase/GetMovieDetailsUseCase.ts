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
        console.log(session);
        
        // const ratedMovies = await this.movieRepository.getRatedMovies(session.guestSessionId)
        // console.log('si', ratedMovies);
        
        const movieDetails = await this.movieRepository.get(movieId)

        // const ratedMovieFound = ratedMovies.find(movie => movie.id === movieId)
        // console.log('rated', ratedMovieFound);
        
        
        return movieDetails
    }
}