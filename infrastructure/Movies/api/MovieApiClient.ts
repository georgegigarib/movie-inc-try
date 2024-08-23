import { MovieDto } from "@/domain/Movies/client/Dtos";
import {
  API_CLIENT_BASE_URL,
  API_KEY,
  API_LANGUAGE
} from '@env';
import regeneratorRuntime from "regenerator-runtime"

const MOVIES_API_BASE_URL = `${API_CLIENT_BASE_URL}/movie`;
const GUEST_API_BASE_URL = `${API_CLIENT_BASE_URL}/guest_session`;

export class MoviesApiClient {
  private readonly movieBaseURL: string = MOVIES_API_BASE_URL;
  private readonly guestBaseURL: string = GUEST_API_BASE_URL;
  private readonly apiKey: string = API_KEY;
  private readonly language: string = API_LANGUAGE;

  constructor() {}

  public async getAll(): Promise<MovieDto[]> {
    const URL = `${this.movieBaseURL}/now_playing?api_key=${this.apiKey}&language=${this.language}&page=1`;
    const response = await fetch(URL);
    const res = await response.json();
    return res.results as MovieDto[] || [];
  }

  public async get(id: number): Promise<MovieDto | null> {
    const URL = `${this.movieBaseURL}/${id}?api_key=${this.apiKey}&language=${this.language}&append_to_response=credits`;
    try {
      const response = await fetch(URL);

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

    return result.results as MovieDto[] || [];
  }

  public async rateMovie(id: number, rate: number, guestSessionId: string): Promise<{ success: boolean }> {
    const URL = `${this.movieBaseURL}/${id}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`;
    const response = await fetch(URL, {
      method: 'POST',
      body: JSON.stringify({ value: rate }),
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });

    const result = await response.json();

    if (!response.ok) {
      return { success: false };
    }

    return { success: result.success || false };
  }

  public async getRatedMovies(sessionId: string): Promise<MovieDto[]> {
    let url = `${this.guestBaseURL}/${sessionId}/rated/movies`;
    const urle = 'https://api.themoviedb.org/3/guest_session/0539d09ba2e917fbaba8ff5785b549d1/rated/movies?language=en-US&page=1&sort_by=created_at.asc';
     const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer 1b80934b9ab468e6b68c655377739be5'
      }
    };

    const response = await fetch(url, options);
    const result = await response.json();

    if (!response.ok) {
      return [];
    }

    return result.results as MovieDto[] || [];
  }
}
