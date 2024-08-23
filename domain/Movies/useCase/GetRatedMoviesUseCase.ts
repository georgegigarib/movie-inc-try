import { getSession, isActive, setSession } from "@/utils/sessionStorage";
import { GetOrCreateSessionUseCase } from "@/domain/Guest/useCase/GetOrCreateSessionUseCase";
import { GuestRepository } from "@/domain/Guest/repository/GuestRepository";
import { MovieRepository } from "@/domain/Movies/repository/MovieRepository";
import { Movie } from "@/domain/Movies/model/Movie";

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