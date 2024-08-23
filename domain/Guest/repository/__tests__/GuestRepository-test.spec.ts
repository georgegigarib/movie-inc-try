import { GuestRepository } from "@/domain/Guest/repository/GuestRepository";
import { GuestApiClient } from "@/infrastructure/Guest/api/GuestApiClient";
import { mock, MockProxy } from "jest-mock-extended";
import { GuestSession } from "@/domain/Guest/model/GuestSession";
import { CouldNotCreateGuestSessionException } from "@/domain/Guest/exceptions/CouldNotCreateGuestSessionException";
import { GuestSessionDto } from '@/domain/Guest/clients/Dtos';

describe("GuestRepository", () => {
    let guestApiClientMock: MockProxy<GuestApiClient>;
    let guestRepository: GuestRepository;
    let guestSessionDto: GuestSessionDto;
    let guestSession: GuestSession;
  
    beforeEach(() => {
      guestApiClientMock = mock<GuestApiClient>();
      guestRepository = new GuestRepository();
      (guestRepository as any).apiClient = guestApiClientMock;
  
      guestSessionDto = {
        guest_session_id: "session123",
        expires_at: "2024-01-01T00:00:00Z",
        success: true,
      };
  
      guestSession = new GuestSession("session123", "2024-01-01T00:00:00Z");
    });
  
    describe("createSession", () => {
      it("should throw CouldNotCreateGuestSessionException if session data is incomplete", async () => {
        guestApiClientMock.createSession.mockResolvedValue({
          guest_session_id: "",
          expires_at: "",
          success: true,
        });
  
        await expect(guestRepository.createSession()).rejects.toThrow(
          CouldNotCreateGuestSessionException
        );
      });
  
      it("should return a GuestSession when API client returns valid session data", async () => {
        guestApiClientMock.createSession.mockResolvedValue(guestSessionDto);
  
        const result = await guestRepository.createSession();
  
        expect(result).toEqual(guestSession);
        expect(result).toBeInstanceOf(GuestSession);
        expect(guestApiClientMock.createSession).toHaveBeenCalledTimes(1);
      });
    });
  });
  