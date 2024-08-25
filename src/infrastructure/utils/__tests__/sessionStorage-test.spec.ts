import AsyncStorage from '@react-native-async-storage/async-storage';
import { getSession, setSession, isActive } from '@/src/infrastructure/utils/sessionStorage';
import { GuestSession } from '@/domain/Guest/model/GuestSession';

jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

describe('Session Functions', () => {
  const mockSession: GuestSession = { guestSessionId: '12345', expireDate: '2034-08-22 06:31:09 UTC' };

  describe('getSession', () => {
    it('should return parsed session data if it exists', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(JSON.stringify(mockSession));
      const session = await getSession();
      expect(session).toEqual(mockSession);
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('MovieDBGuestSession');
    });

    it('should return null if there is no session data', async () => {
      (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);
      const session = await getSession();
      expect(session).toBeNull();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('MovieDBGuestSession');
    });

    it('should return null if there is an error', async () => {
      (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error('Failed to get item'));
      const session = await getSession();
      expect(session).toBeNull();
      expect(AsyncStorage.getItem).toHaveBeenCalledWith('MovieDBGuestSession');
    });
  });

  describe('setSession', () => {
    it('should set session data in AsyncStorage', async () => {
      (AsyncStorage.setItem as jest.Mock).mockResolvedValue(undefined);
      await setSession(mockSession);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('MovieDBGuestSession', JSON.stringify(mockSession));
    });

    it('should handle errors when setting session data', async () => {
      (AsyncStorage.setItem as jest.Mock).mockRejectedValue(new Error('Failed to set item'));
      await setSession(mockSession);
      expect(AsyncStorage.setItem).toHaveBeenCalledWith('MovieDBGuestSession', JSON.stringify(mockSession));
    });
  });

  describe('isActive', () => {
    let originalDateNow: () => number;

    beforeEach(() => {
      originalDateNow = Date.now;
    });

    it('should return true if the current date is before the session expiry date', () => {
      const mockCurrentDate = new Date('2024-08-20T06:31:08Z'); // Before expiry
  
      global.Date.now = jest.fn(() => mockCurrentDate.getTime());
  
      expect(isActive(mockSession)).toBe(true);
    });
  
    it('should return false if the current date is after the session expiry date', () => {
      const expiredSession: GuestSession = {
        guestSessionId: '12345',
        expireDate: '2024-08-20T06:31:09Z',
      };

      const mockCurrentDate = new Date('2024-08-23T06:31:10Z'); // After expiry
  
      global.Date.now = jest.fn(() => mockCurrentDate.getTime());
  
      expect(isActive(expiredSession)).toBe(false);
    });

    afterEach(() => {
      global.Date.now = originalDateNow;
    });
  });  

  beforeEach(() => {
    jest.clearAllMocks(); // Limpia los mocks antes de cada prueba
  });
});
