import { getSession, isActive, setSession } from "@/utils/sessionStorage";
import { GetOrCreateSessionUseCase } from "@/domain/Guest/useCase/GetOrCreateSessionUseCase";
import { GuestRepository } from "@/domain/Guest/repository/GuestRepository";
import { MovieRepository } from "@/domain/Movies/repository/MovieRepository";
import { Movie } from "@/domain/Movies/model/Movie";

export class GetNowPlayingMoviesUseCase {
    private movieRepository: MovieRepository
    
    constructor()
    {
        this.movieRepository = new MovieRepository()
    }

    public async execute(): Promise<Movie[]> {
        const movies = await this.movieRepository.getAll()

        return movies.sort((a, b) => a.title.localeCompare(b.title));
    }
}