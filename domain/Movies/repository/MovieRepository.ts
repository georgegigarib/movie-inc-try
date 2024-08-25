import { MovieDto } from "../client/Dtos";
import { CouldNotGetMovieException } from "../exceptions/CouldNotGetMovieException";
import { CouldNotGetRatedMoviesException } from "../exceptions/CouldNotGetRatedMoviesException.ts";
import { CouldNotGetRecommendationsException } from "../exceptions/CouldNotGetRecommendationsException";
import { CouldNotLoadMoviesException } from "../exceptions/CouldNotLoadMoviesException";
import { CouldNotRateMovieException } from "../exceptions/CouldNotRateMovieException";
import { MovieMapper } from "../mappers/MovieMapper";
import { Movie } from "../model/Movie";
import { MoviesApiClient } from "@/infrastructure/Movies/api/MovieApiClient";

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
