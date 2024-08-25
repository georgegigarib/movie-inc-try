import { GuestSession } from "@/src/domain/Guest/model/GuestSession";

describe('GuestSession', () => {
  it('should create an instance of GuestSession with all properties', () => {
    const guestSession = new GuestSession(
      'acbcb98d6e2dc860343c6094771af629',
      '2024-08-22 20:58:53 UTC'
    );

    expect(guestSession).toBeInstanceOf(GuestSession);
    expect(guestSession.guestSessionId).toBe('acbcb98d6e2dc860343c6094771af629');
    expect(guestSession.expireDate).toBe('2024-08-22 20:58:53 UTC');
  });
});
