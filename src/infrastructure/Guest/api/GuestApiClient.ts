import { GuestSessionDto } from '@/src/domain/Guest/clients/Dtos';
import {
  API_CLIENT_BASE_URL,
  API_KEY,
} from '@env';
import regeneratorRuntime from "regenerator-runtime"

const AUTH_API_BASE_URL = `${API_CLIENT_BASE_URL}/authentication`;

export class GuestApiClient {
  constructor() {}

  public async createSession(): Promise<GuestSessionDto> {
    const URL = `${AUTH_API_BASE_URL}/guest_session/new?api_key=${API_KEY}`;
    const response = await fetch(URL);
    const result = await response.json();

    return result;
  }
}
