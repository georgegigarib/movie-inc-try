import { GuestApiClient } from "@/src/infrastructure/api/Guest/api/GuestApiClient";
import { GuestSession } from "@/src/domain/Guest/model/GuestSession";
import { CouldNotCreateGuestSessionException } from "@/src/domain/Guest/exceptions/CouldNotCreateGuestSessionException";

export class GuestRepository {
  constructor(
    private readonly apiClient: GuestApiClient = new GuestApiClient(),
  ) {}

  public async createSession(): Promise<GuestSession> {
    const sessionData = await this.apiClient.createSession();

    if (!sessionData.guest_session_id || !sessionData.expires_at) {
      throw new CouldNotCreateGuestSessionException();
    }

    return new GuestSession(
      sessionData.guest_session_id,
      sessionData.expires_at
    );
  }
}
