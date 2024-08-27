import { GuestSession } from '@/src/domain/Guest/model/GuestSession';
import AsyncStorage from '@react-native-async-storage/async-storage';

const storageKey = 'MovieDBGuestSession';

export const getSession = async (): Promise<GuestSession | null> => {
  try {
      const data = await AsyncStorage.getItem(storageKey);
      return data ? JSON.parse(data) : null;
  } catch {
      return null;
  }
};

export const setSession = async (sessionData: GuestSession) => {
    try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(sessionData));
    } catch {}
};

export const isActive = (session: GuestSession): boolean => {
  const formattedDateStr = session.expireDate.replace(' ', 'T').replace(' UTC', 'Z');

  return new Date().getTime() < new Date(formattedDateStr).getTime();
};