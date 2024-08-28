import { GuestSessionDto } from "@/src/domain/Guest/dtos/Dtos";
import regeneratorRuntime from "regenerator-runtime";

export class GuestApiClient {
  private readonly authBaseUrl: string = `${process.env.EXPO_PUBLIC_API_CLIENT_BASE_URL}/authentication`;
  private readonly apiKey: string = process.env.EXPO_PUBLIC_API_KEY as string;

  constructor() {}

  public async createSession(): Promise<GuestSessionDto> {
    const url = new URL(`${this.authBaseUrl}/guest_session/new`);
    url.searchParams.set('api_key', this.apiKey)

    const response = await fetch(url);
    const result = await response.json();

    return response.ok ? result : Promise.reject(result);
  }
}
