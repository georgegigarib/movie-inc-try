import { MovieDto } from "@/src/domain/Movies/dtos/Dtos";
import regeneratorRuntime from "regenerator-runtime";

export class MoviesApiClient {
  private readonly movieBaseURL: string = `${process.env.EXPO_PUBLIC_API_CLIENT_BASE_URL}/movie`;
  private readonly guestBaseURL: string = `${process.env.EXPO_PUBLIC_API_CLIENT_BASE_URL}/guest_session`;
  private readonly apiKey: string = process.env.EXPO_PUBLIC_API_KEY as string;
  private readonly language: string = process.env
    .EXPO_PUBLIC_API_LANGUAGE as string;

  constructor() {}

  public async getAll(): Promise<MovieDto[]> {
    const url = `${this.movieBaseURL}/now_playing?api_key=${this.apiKey}&language=${this.language}&page=1`;
    const response = await fetch(url);
    const res = await response.json();
    return res.results as MovieDto[];
  }

  public async get(id: number): Promise<MovieDto | null> {
    const url = `${this.movieBaseURL}/${id}?api_key=${this.apiKey}&language=${this.language}&append_to_response=credits`;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      return data as MovieDto;
    } catch {
      return null;
    }
  }

  public async getRecommendations(id: number): Promise<MovieDto[]> {
    const URL = `${this.movieBaseURL}/${id}/recommendations?api_key=${this.apiKey}&language=${this.language}&page=1`;
    const response = await fetch(URL);
    const result = await response.json();

    if (!response.ok) {
      return [];
    }

    return (result.results as MovieDto[]) || [];
  }

  public async getRatedMovies(sessionId: string): Promise<MovieDto[]> {
    let url = `${this.guestBaseURL}/${sessionId}/rated/movies?api_key=${this.apiKey}`;
    const options = {
      method: "GET",
    };

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      return [];
    }

    return result.results as MovieDto[];
  }

  public async rateMovie(
    id: number,
    rate: number,
    guestSessionId: string
  ): Promise<{ success: boolean }> {
    const url = `${this.movieBaseURL}/${id}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`;
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({ value: rate }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false };
    }

    return { success: result.success };
  }
}
