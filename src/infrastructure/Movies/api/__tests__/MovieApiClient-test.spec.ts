import { MoviesApiClient } from "@/src/infrastructure/Movies/api/MovieApiClient";
import { MovieDto } from "@/src/domain/Movies/client/Dtos";

describe("MoviesApiClient", () => {
  let moviesApiClient: MoviesApiClient;

  const mockMovieDto: Partial<MovieDto> = {
    id: 1,
    title: "Test Movie",
    original_title: "Test Movie",
  };

  const mockMovieDto2: Partial<MovieDto> = {
    id: 1,
    title: "Test Movie",
    original_title: "Test Movie",
  };

  beforeEach(() => {
    moviesApiClient = new MoviesApiClient();
    (globalThis as any).fetch = jest.fn();
  });

  describe("getAll", () => {
    it("should call fetch with the correct URL and return movies", async () => {
      const mockResponse = { results: [mockMovieDto, mockMovieDto2] };
      (globalThis as any).fetch.mockResolvedValue({
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await moviesApiClient.getAll();

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('/movie/now_playing'));
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('api_key='));
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('language='));
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('page=1'));
      expect(result).toEqual(mockResponse.results);
    });
  });

  describe("get", () => {
    it("should call fetch with the correct URL and return a movie", async () => {
      const movieId = 1;
      (globalThis as any).fetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockMovieDto),
      });

      const result = await moviesApiClient.get(movieId);

      expect(fetch).toHaveBeenCalledWith(expect.stringContaining(`/${movieId}?api_key=`));
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('language='));
      expect(fetch).toHaveBeenCalledWith(expect.stringContaining('append_to_response=credits'));
      expect(result).toEqual(mockMovieDto);
    });

    it("should return null if the response is not ok", async () => {
      const movieId = 1;
      (globalThis as any).fetch.mockResolvedValue({
        ok: false,
        json: jest.fn(),
      });

      const result = await moviesApiClient.get(movieId);

      expect(result).toBeNull();
    });

    it("should return null if there is an error", async () => {
      const movieId = 1;
      (globalThis as any).fetch.mockRejectedValue(new Error("Network error"));

      const result = await moviesApiClient.get(movieId);

      expect(result).toBeNull();
    });
  });
  
  describe("getRecommendations", () => {
    it("should call fetch with the correct URL and return movie recommendations", async () => {
      const movieId = 1;
      const mockResponse = { results: [mockMovieDto, mockMovieDto2] };
  
      (globalThis as any).fetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });
  
      const result = await moviesApiClient.getRecommendations(movieId);
  
      const [url] = (globalThis as any).fetch.mock.calls[0];
  
      expect(url).toContain(`/${movieId}/recommendations`);
      expect(url).toContain('api_key=');
      expect(url).toContain('language=');
      expect(url).toContain('page=1');
  
      expect(result).toEqual(mockResponse.results);
    });
  
    it("should return an empty array if the response is not ok", async () => {
      const movieId = 1;
  
      (globalThis as any).fetch.mockResolvedValue({
        ok: false,
        json: jest.fn(),
      });
  
      const result = await moviesApiClient.getRecommendations(movieId);
  
      expect(result).toEqual([]);
    });
  });
  

  describe("rateMovie", () => {
    it("should call fetch with the correct URL and return success status", async () => {
      const movieId = 1;
      const rate = 8;
      const guestSessionId = "test-session-id";
      const mockResponse = { success: true };
  
      (globalThis as any).fetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });
  
      const result = await moviesApiClient.rateMovie(movieId, rate, guestSessionId);
  
      const [url, options] = (globalThis as any).fetch.mock.calls[0];
  
      expect(url).toContain(`/${movieId}/rating`);
      expect(url).toContain('api_key=');
      expect(url).toContain(`guest_session_id=${guestSessionId}`);
  
      expect(options).toEqual({
        method: 'POST',
        body: JSON.stringify({ value: rate }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      expect(result).toEqual(mockResponse);
    });
  
    it("should return { success: false } if the response is not ok", async () => {
      const movieId = 1;
      const rate = 8;
      const guestSessionId = "test-session-id";
  
      (globalThis as any).fetch.mockResolvedValue({
        ok: false,
        json: jest.fn(),
      });
  
      const result = await moviesApiClient.rateMovie(movieId, rate, guestSessionId);
  
      expect(result).toEqual({ success: false });
    });
  });

  describe("rateMovie", () => {
    it("should call fetch with the correct URL and return success status", async () => {
      const movieId = 1;
      const rate = 8;
      const guestSessionId = "test-session-id";
      const mockResponse = { success: true };
  
      (globalThis as any).fetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });
  
      const result = await moviesApiClient.rateMovie(movieId, rate, guestSessionId);
  
      const [url, options] = (globalThis as any).fetch.mock.calls[0];
  
      expect(url).toContain(`/${movieId}/rating`);
      expect(url).toContain('api_key=');
      expect(url).toContain(`guest_session_id=${guestSessionId}`);
  
      expect(options).toEqual({
        method: 'POST',
        body: JSON.stringify({ value: rate }),
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
      });
  
      expect(result).toEqual(mockResponse);
    });
  
    it("should return { success: false } if the response is not ok", async () => {
      const movieId = 1;
      const rate = 8;
      const guestSessionId = "test-session-id";
  
      (globalThis as any).fetch.mockResolvedValue({
        ok: false,
        json: jest.fn(),
      });
  
      const result = await moviesApiClient.rateMovie(movieId, rate, guestSessionId);
  
      expect(result).toEqual({ success: false });
    });
  });
});
