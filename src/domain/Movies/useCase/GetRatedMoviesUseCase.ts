import { MovieRepository } from "@/src/domain/Movies/repository/MovieRepository";
import { Movie } from "@/src/domain/Movies/model/Movie";
import { GetOrCreateSessionUseCase } from "@/src/domain/Guest/useCase/GetOrCreateSessionUseCase";

export class GetRatedMoviesUseCase {
    private movieRepository: MovieRepository
    private getOrCreateSessionUseCase: GetOrCreateSessionUseCase

    constructor()
    {
        this.movieRepository = new MovieRepository()
        this.getOrCreateSessionUseCase = new GetOrCreateSessionUseCase()
    }

    public async execute(): Promise<Movie[]> {
        const session = await this.getOrCreateSessionUseCase.execute()

        return this.movieRepository.getRatedMovies(session.guestSessionId)
    }
}