import { GuestApiClient } from "@/src/infrastructure/api/Guest/api/GuestApiClient";
import { GuestSessionDto } from "@/src/domain/Guest/dtos/Dtos";

describe("GuestApiClient", () => {
  let guestApiClient: GuestApiClient;

  beforeEach(() => {
    guestApiClient = new GuestApiClient();
    (globalThis as any).fetch = jest.fn();
  });

  describe("createSession", () => {
    it("should call fetch with the correct URL and return session data", async () => {
      const mockResponse: GuestSessionDto = {
        guest_session_id: "test-session-id",
        expires_at: "2024-01-01T00:00:00Z",
        success: true,
      };

      (globalThis as any).fetch.mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockResponse),
      });

      const result = await guestApiClient.createSession();

      const [calledUrl] = (globalThis as any).fetch.mock.calls[0];

      expect(calledUrl).toContain('/authentication/guest_session/new');
      expect(calledUrl).toContain('api_key=');

      expect(result).toEqual(mockResponse);
    });

    it("should throw an error if fetch fails", async () => {
      (globalThis as any).fetch.mockRejectedValue(new Error("Network error"));

      await expect(guestApiClient.createSession()).rejects.toThrow("Network error");
    });
  });
});
