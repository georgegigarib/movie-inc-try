import { MovieDto } from "@/src/domain/Movies/dtos/Dtos";
import { CouldNotGetMovieException } from "@/src/domain/Movies/exceptions/CouldNotGetMovieException";
import { CouldNotGetRecommendationsException } from "@/src/domain/Movies/exceptions/CouldNotGetRecommendationsException";
import { CouldNotRateMovieException } from "@/src/domain/Movies/exceptions/CouldNotRateMovieException";
import { MovieMapper } from "@/src/domain/Movies/mappers/MovieMapper";
import { Movie } from "@/src/domain/Movies/model/Movie";
import { MoviesApiClient } from "@/src/infrastructure/api/Movies/api/MovieApiClient";

export class MovieRepository {
  private movieMapper: MovieMapper;
  private apiClient: MoviesApiClient

  constructor() {
    this.movieMapper = new MovieMapper();
    this.apiClient = new MoviesApiClient()
  }

  public async getAll(): Promise<Movie[]> {
    const moviesData = await this.apiClient.getAll();

    return moviesData.map((movie) => this.movieMapper.model(movie));
  }
  
  public async get(id: number): Promise<Movie> {
    const movieDto = await this.apiClient.get(id);

    if (!movieDto) {
      throw new CouldNotGetMovieException();
    }

    return this.movieMapper.model(movieDto);
  }

  public async getRecommendations(id: number): Promise<Movie[]> {
    const moviesData = await this.apiClient.getRecommendations(id);

    if (moviesData.length === 0) {
      throw new CouldNotGetRecommendationsException();
    }

    return moviesData.map(movieDto => this.movieMapper.model(movieDto));
  }

  public async getRatedMovies(sessionId: string): Promise<Movie[]> {
    const moviesData = await this.apiClient.getRatedMovies(sessionId);

    return moviesData.map((movieDto) => this.movieMapper.model(movieDto));
  }

  public async rateMovie(id: number, rate: number, guestSessionId: string): Promise<Boolean> {
    const result = await this.apiClient.rateMovie(id, rate, guestSessionId);
    
    if (!result.success) {
      throw new CouldNotRateMovieException();
    }
    
    return result.success
  }
}
