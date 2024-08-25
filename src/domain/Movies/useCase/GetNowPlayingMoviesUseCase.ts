import { MovieRepository } from "@/src/domain/Movies/repository/MovieRepository";
import { Movie } from "@/src/domain/Movies/model/Movie";

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