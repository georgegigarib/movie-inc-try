import { MoviesApiClient } from "@/infrastructure/Movies/api/MovieApiClient";
import { mock, MockProxy } from "jest-mock-extended";
import { MovieDto } from "@/domain/Movies/client/Dtos";
import { Movie } from "@/domain/Movies/model/Movie";
import { MovieRepository } from "@/domain/Movies/repository/MovieRepository";
import { Actor } from "@/domain/Actor/model/Actor";
import { CouldNotLoadMoviesException } from "@/domain/Movies/exceptions/CouldNotLoadMoviesException";
import { MovieMapper } from "@/domain/Movies/mappers/MovieMapper";
import { CouldNotGetMovieException } from "../../exceptions/CouldNotGetMovieException";
import { CouldNotGetRecommendationsException } from "../../exceptions/CouldNotGetRecommendationsException";
import { CouldNotGetRatedMoviesException } from "../../exceptions/CouldNotGetRatedMoviesException.ts";
import { CouldNotRateMovieException } from "../../exceptions/CouldNotRateMovieException";

describe("MovieRepository", () => {
  let moviesApiClientMock: MockProxy<MoviesApiClient>;
  let movieMapperMock: MockProxy<MovieMapper>;
  let movieRepository: MovieRepository;
  let movieMocks: Record<number, Movie>;
  let movieDtos: Partial<MovieDto>[];

  beforeEach(() => {
    moviesApiClientMock = mock<MoviesApiClient>();
    movieMapperMock = mock<MovieMapper>();
    movieRepository = new MovieRepository();
    (movieRepository as any).apiClient = moviesApiClientMock;
    (movieRepository as any).movieMapper = movieMapperMock;

    movieDtos = [
      {
        id: 1,
        title: "Inception",
        release_date: "2010-07-16",
        vote_average: 8.8,
        poster_path: "/poster1.jpg",
        overview: "A mind-bending thriller",
        genres: [
          { id: 1, name: "Action" },
          { id: 2, name: "Science Fiction" },
        ],
        credits: {
          cast: [
            {
              id: 101,
              name: "Leonardo DiCaprio",
              character: "Cobb",
              profile_path: "some-path1",
            },
            {
              id: 102,
              name: "Joseph Gordon-Levitt",
              character: "Arthur",
              profile_path: "some-path2",
            },
          ],
        },
        rating: 5,
      },
      {
        id: 2,
        title: "The Matrix",
        release_date: "1999-03-31",
        vote_average: 8.7,
        poster_path: "/poster2.jpg",
        overview: "A computer hacker learns about the true nature of reality",
        genres: [
          { id: 1, name: "Action" },
          { id: 2, name: "Science Fiction" },
        ],
        credits: {
          cast: [
            {
              id: 103,
              name: "Keanu Reeves",
              character: "Neo",
              profile_path: "some-path3",
            },
            {
              id: 104,
              name: "Laurence Fishburne",
              character: "Morpheus",
              profile_path: "some-path4",
            },
          ],
        },
        rating: 5,
      },
    ];

    movieMocks = {
      1: new Movie(
        1,
        "Inception",
        "2010-07-16",
        8.8,
        "https://image.tmdb.org/t/p/original/poster1.jpg",
        "A mind-bending thriller",
        [
          { id: 1, name: "Action" },
          { id: 2, name: "Science Fiction" },
        ],
        [
          new Actor("Leonardo DiCaprio", 101, "Cobb", "some-path1"),
          new Actor("Joseph Gordon-Levitt", 102, "Arthur", "some-path2"),
        ],
        5
      ),
      2: new Movie(
        2,
        "The Matrix",
        "1999-03-31",
        8.7,
        "https://image.tmdb.org/t/p/original/poster2.jpg",
        "A computer hacker learns about the true nature of reality",
        [
          { id: 1, name: "Action" },
          { id: 2, name: "Science Fiction" },
        ],
        [
          new Actor("Keanu Reeves", 103, "Neo", "some-path3"),
          new Actor("Laurence Fishburne", 104, "Morpheus", "some-path4"),
        ],
        5
      ),
    };
  });

  describe("getAll", () => {
    it("should return movies when API client returns data", async () => {
      moviesApiClientMock.getAll.mockResolvedValue(movieDtos as MovieDto[]);
      movieMapperMock.model.mockImplementation((dto) => movieMocks[dto.id]);

      const result = await movieRepository.getAll();

      expect(result).toEqual(Object.values(movieMocks));
      expect(result[0]).toBeInstanceOf(Movie);
      expect(result[1]).toBeInstanceOf(Movie);
      expect(result).toHaveLength(2);
      Object.values(movieMocks).forEach((movie) => {
        expect(result).toContainEqual(movie);
      });
      expect(moviesApiClientMock.getAll).toHaveBeenCalledTimes(1);
      expect(movieMapperMock.model).toHaveBeenCalledTimes(2);
      movieDtos.forEach((dto) => {
        expect(movieMapperMock.model).toHaveBeenCalledWith(dto);
      });
    });
  });

  describe("get", () => {
    it("should throw CouldNotGetMovieException if no movie is returned", async () => {
      moviesApiClientMock.get.mockResolvedValue(null);
  
      await expect(movieRepository.get(1)).rejects.toThrow(CouldNotGetMovieException);
    });
  
    it("should return a movie when API client returns a movie DTO", async () => {
      moviesApiClientMock.get.mockResolvedValue(movieDtos[0] as MovieDto);
      movieMapperMock.model.mockReturnValue(movieMocks[1]);
  
      const result = await movieRepository.get(1);
  
      expect(result).toEqual(movieMocks[1]);
      expect(result).toBeInstanceOf(Movie);
      expect(moviesApiClientMock.get).toHaveBeenCalledWith(1);
      expect(movieMapperMock.model).toHaveBeenCalledWith(movieDtos[0]);
    });
  });

  describe("getRecommendations", () => {
    it("should throw CouldNotGetRecommendationsException if no recommendations are returned", async () => {
      moviesApiClientMock.getRecommendations.mockResolvedValue([]);
  
      await expect(movieRepository.getRecommendations(1)).rejects.toThrow(
        CouldNotGetRecommendationsException
      );
    });
  
    it("should return recommended movies when API client returns data", async () => {
      moviesApiClientMock.getRecommendations.mockResolvedValue([
        movieDtos[0] as MovieDto,
        movieDtos[1] as MovieDto,
      ]);
      movieMapperMock.model
        .mockImplementationOnce(dto => movieMocks[1])
        .mockImplementationOnce(dto => movieMocks[2]);
  
      const result = await movieRepository.getRecommendations(1);
  
      expect(result).toEqual([movieMocks[1], movieMocks[2]]);
      expect(result[0]).toBeInstanceOf(Movie);
      expect(result[1]).toBeInstanceOf(Movie);
      expect(result).toHaveLength(2);
      expect(moviesApiClientMock.getRecommendations).toHaveBeenCalledWith(1);
      expect(movieMapperMock.model).toHaveBeenCalledTimes(2);
      expect(movieMapperMock.model).toHaveBeenCalledWith(movieDtos[0]);
      expect(movieMapperMock.model).toHaveBeenCalledWith(movieDtos[1]);
    });
  });

  describe("getRatedMovies", () => {
    it("should return rated movies when API client returns data", async () => {
      moviesApiClientMock.getRatedMovies.mockResolvedValue(movieDtos as MovieDto[]);
      movieMapperMock.model.mockImplementation(dto => movieMocks[dto.id]);
  
      const result = await movieRepository.getRatedMovies("session123");
  
      expect(result).toEqual(Object.values(movieMocks));
      expect(result[0]).toBeInstanceOf(Movie);
      expect(result[1]).toBeInstanceOf(Movie);
      expect(result).toHaveLength(2);
      Object.values(movieMocks).forEach(movie => {
        expect(result).toContainEqual(movie);
      });
      expect(moviesApiClientMock.getRatedMovies).toHaveBeenCalledWith("session123");
      expect(movieMapperMock.model).toHaveBeenCalledTimes(2);
      movieDtos.forEach(dto => {
        expect(movieMapperMock.model).toHaveBeenCalledWith(dto);
      });
    });
  });

  describe("rateMovie", () => {
    it("should throw CouldNotRateMovieException if the rating is not successful", async () => {
      moviesApiClientMock.rateMovie.mockResolvedValue({ success: false });
  
      await expect(movieRepository.rateMovie(1, 5, "session123")).rejects.toThrow(
        CouldNotRateMovieException
      );
    });
  
    it("should return true when the rating is successful", async () => {
      moviesApiClientMock.rateMovie.mockResolvedValue({ success: true });
  
      const result = await movieRepository.rateMovie(1, 5, "session123");
  
      expect(result).toBe(true);
      expect(moviesApiClientMock.rateMovie).toHaveBeenCalledWith(1, 5, "session123");
    });
  });
});
