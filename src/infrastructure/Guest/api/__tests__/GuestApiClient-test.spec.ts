import { MoviesApiClient } from "@/src/infrastructure/Movies/api/MovieApiClient";
import { MovieDto } from "@/src/domain/Movies/client/Dtos";

describe("MoviesApiClient", () => {
  let moviesApiClient: MoviesApiClient;

  const mockMovieDto: Partial<MovieDto> = {
    id: 1,
    title: "Test Movie",
    poster_path: "/path/to/poster.jpg",
    overview: "This is a test movie.",
    release_date: "2024-01-01",
    genre_ids: [1, 2],
    original_language: "en",
    backdrop_path: "/path/to/backdrop.jpg",
    popularity: 100,
    vote_count: 200,
    vote_average: 8.0
  };

  const mockResponse = {
    results: [mockMovieDto]
  };

  const setupFetchMock = (response: any, ok = true) => {
    (globalThis as any).fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(response),
      ok
    });
  };

  beforeEach(() => {
    setupFetchMock(mockResponse);
    moviesApiClient = new MoviesApiClient();
  });

  describe("getAll", () => {
    it("should make a request with the correct base URL and endpoint", async () => {
      const result = await moviesApiClient.getAll();

      expect(fetch).toHaveBeenCalled();
      const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
      expect(calledUrl).toBe('http://test-url.com/movie/now_playing?api_key=test-api-key&language=en-US&page=1');
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe("get", () => {
    it("should make a request with the correct base URL and endpoint", async () => {
      setupFetchMock(mockMovieDto);
      const result = await moviesApiClient.get(1);

      expect(fetch).toHaveBeenCalled();
      const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
      expect(calledUrl).toBe('http://test-url.com/movie/1?api_key=test-api-key&language=en-US&append_to_response=credits');
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockMovieDto);
    });
  });

  describe("getRecommendations", () => {
    it("should make a request with the correct base URL and endpoint", async () => {
      const result = await moviesApiClient.getRecommendations(1);

      expect(fetch).toHaveBeenCalled();
      const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
      expect(calledUrl).toBe('http://test-url.com/movie/1/recommendations?api_key=test-api-key&language=en-US&page=1');
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe("rateMovie", () => {
    it("should make a request with the correct base URL and endpoint", async () => {
      const rateMovieResponse = { success: true };
      setupFetchMock(rateMovieResponse);
      const result = await moviesApiClient.rateMovie(1, 8, 'test-session-id');

      expect(fetch).toHaveBeenCalled();
      const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
      expect(calledUrl).toBe('http://test-url.com/movie/1/rating?api_key=test-api-key&guest_session_id=test-session-id');
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(rateMovieResponse);
    });
  });

  describe("getRatedMovies", () => {
    it("should make a request with the correct base URL and endpoint", async () => {
      const getRatedMoviesResponse = {
        results: [mockMovieDto]
      };
      setupFetchMock(getRatedMoviesResponse);
      const result = await moviesApiClient.getRatedMovies('test-session-id');

      expect(fetch).toHaveBeenCalled();
      const calledUrl = (fetch as jest.Mock).mock.calls[0][0];
      expect(calledUrl).toBe('http://test-url.com/guest_session/test-session-id/rated/movies?api_key=test-api-key');
      expect(fetch).toHaveBeenCalledTimes(1);
      expect(result).toEqual(getRatedMoviesResponse.results);
    });
  });
});
