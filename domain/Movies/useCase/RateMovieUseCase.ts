import { getSession, isActive, setSession } from "@/utils/sessionStorage";
import { GetOrCreateSessionUseCase } from "@/domain/Guest/useCase/GetOrCreateSessionUseCase";
import { GuestRepository } from "@/domain/Guest/repository/GuestRepository";
import { MovieRepository } from "@/domain/Movies/repository/MovieRepository";

export class RateMovieUseCase {
    private movieRepository: MovieRepository
    private getOrCreateSessionUseCase: GetOrCreateSessionUseCase
    
    constructor()
    {
        this.movieRepository = new MovieRepository()
        this.getOrCreateSessionUseCase = new GetOrCreateSessionUseCase()
    }

    public async execute(movieId: number, rate: number): Promise<Boolean> {
        const session = await this.getOrCreateSessionUseCase.execute()

        return this.movieRepository.rateMovie(movieId, rate, session.guestSessionId)
    }
}