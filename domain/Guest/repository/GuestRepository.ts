import { CouldNotCreateGuestSessionException } from "@/domain/Guest/exceptions/CouldNotCreateGuestSessionException";
import { GuestApiClient } from "@/infrastructure/Guest/api/GuestApiClient";
import { GuestSession } from "@/domain/Guest/model/GuestSession";


export class GuestRepository {
  private apiClient: GuestApiClient;

  constructor() {
    this.apiClient = new GuestApiClient();
  }

  public async createSession(): Promise<GuestSession> {
    const sessionData = await this.apiClient.createSession();
    
    if (!sessionData.guest_session_id || !sessionData.expires_at) {
      throw new CouldNotCreateGuestSessionException();
    }

    return new GuestSession(sessionData.guest_session_id, sessionData.expires_at);
  }
}
