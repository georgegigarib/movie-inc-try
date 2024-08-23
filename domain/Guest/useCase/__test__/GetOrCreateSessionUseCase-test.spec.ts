import { GetOrCreateSessionUseCase } from '@/domain/Guest/useCase/GetOrCreateSessionUseCase';
import { GuestRepository } from '@/domain/Guest/repository/GuestRepository';
import { GuestSession } from '@/domain/Guest/model/GuestSession';
import { getSession, setSession, isActive } from '@/utils/sessionStorage';

jest.mock('@/domain/Guest/repository/GuestRepository');
jest.mock('@/utils/sessionStorage');

describe('GetOrCreateSessionUseCase', () => {
  const mockSession = new GuestSession('12345', '2024-08-22T06:31:09Z');
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should return existing session if it is active', async () => {
    (getSession as jest.Mock).mockResolvedValue(mockSession);
    (isActive as jest.Mock).mockReturnValue(true);
    
    const useCase = new GetOrCreateSessionUseCase();
    const result = await useCase.execute();
    
    expect(result).toEqual(mockSession);
    expect(getSession).toHaveBeenCalled();
    expect(isActive).toHaveBeenCalledWith(mockSession);
    expect(GuestRepository.prototype.createSession).not.toHaveBeenCalled();
    expect(setSession).not.toHaveBeenCalled();
  });

  it('should create a new session if no session exists', async () => {
    (getSession as jest.Mock).mockResolvedValue(null);
    (GuestRepository.prototype.createSession as jest.Mock).mockResolvedValue(mockSession);
    (setSession as jest.Mock).mockResolvedValue(undefined);
    
    const useCase = new GetOrCreateSessionUseCase();
    const result = await useCase.execute();
    
    expect(result).toEqual(mockSession);
    expect(getSession).toHaveBeenCalled();
    expect(isActive).not.toHaveBeenCalled();
    expect(GuestRepository.prototype.createSession).toHaveBeenCalled();
    expect(setSession).toHaveBeenCalledWith(mockSession);
  });

  it('should create a new session if the existing session is inactive', async () => {
    (getSession as jest.Mock).mockResolvedValue(mockSession);
    (isActive as jest.Mock).mockReturnValue(false);
    (GuestRepository.prototype.createSession as jest.Mock).mockResolvedValue(mockSession);
    (setSession as jest.Mock).mockResolvedValue(undefined);
    
    const useCase = new GetOrCreateSessionUseCase();
    const result = await useCase.execute();
    
    expect(result).toEqual(mockSession);
    expect(getSession).toHaveBeenCalled();
    expect(isActive).toHaveBeenCalledWith(mockSession);
    expect(GuestRepository.prototype.createSession).toHaveBeenCalled();
    expect(setSession).toHaveBeenCalledWith(mockSession);
  });
  
  it('should handle errors from getSession and create a new session', async () => {
    (getSession as jest.Mock).mockResolvedValue({});
    (GuestRepository.prototype.createSession as jest.Mock).mockResolvedValue(mockSession);
    (setSession as jest.Mock).mockResolvedValue(undefined);
    
    const useCase = new GetOrCreateSessionUseCase();
    const result = await useCase.execute();
    
    expect(result).toEqual(mockSession);
    expect(getSession).toHaveBeenCalled();
    expect(GuestRepository.prototype.createSession).toHaveBeenCalled();
    expect(setSession).toHaveBeenCalledWith(mockSession);
  });
});
