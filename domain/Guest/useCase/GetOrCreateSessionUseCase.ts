import { getSession, isActive, setSession } from "@/utils/sessionStorage";
import { GuestRepository } from "@/domain/Guest/repository/GuestRepository";
import { GuestSession } from "@/domain/Guest/model/GuestSession";

export class GetOrCreateSessionUseCase {
    private guestRepository;
    constructor()
    {
        this.guestRepository = new GuestRepository()
    }

    public async execute(): Promise<GuestSession> {
        let sessionData = await getSession(); 
         
        if (!(sessionData?.guestSessionId && isActive(sessionData)) || !sessionData) {
          sessionData = await this.guestRepository.createSession();
          
          setSession(sessionData);
        }
        
        return sessionData
    }
}