import {
  getSession,
  isActive,
  setSession,
} from "@/src/infrastructure/utils/sessionStorage";
import { GuestSession } from "@/src/domain/Guest/model/GuestSession";
import { GuestRepository } from "@/src/domain/Guest/repository/GuestRepository";

export class GetOrCreateSessionUseCase {
  constructor(private readonly guestRepository = new GuestRepository()) {}

  public async execute(): Promise<GuestSession> {
    let sessionData = await getSession();

    if (!sessionData?.guestSessionId || !isActive(sessionData)) {
      sessionData = await this.guestRepository.createSession();

      setSession(sessionData);
    }

    return sessionData;
  }
}
