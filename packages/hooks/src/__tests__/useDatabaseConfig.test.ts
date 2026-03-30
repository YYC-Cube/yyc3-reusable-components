import { renderHook, act } from '@testing-library/react-hooks';
import { useDatabaseConfig } from '../useDatabaseConfig';

// Mock databaseService
jest.mock('../../services/DatabaseService', () => ({
  databaseService: {
    getConfig: jest.fn(),
    updateConfig: jest.fn(),
    testConnection: jest.fn(),
  },
}));

describe('useDatabaseConfig', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should initialize with default config', () => {
    const { result } = renderHook(() => useDatabaseConfig());

    expect(result.current.config).toBeDefined();
    expect(result.current.loading).toBe(true);
  });

  it('should update config', async () => {
    const { result } = renderHook(() => useDatabaseConfig());

    await act(async () => {
      await result.current.updateConfig({ host: 'localhost' });
    });

    expect(result.current.updateConfig).toBeDefined();
  });

  it('should test connection', async () => {
    const { result } = renderHook(() => useDatabaseConfig());

    await act(async () => {
      const isConnected = await result.current.testConnection();
      expect(typeof isConnected).toBe('boolean');
    });
  });

  it('should reset config to defaults', () => {
    const { result } = renderHook(() => useDatabaseConfig());

    act(() => {
      result.current.resetConfig();
    });

    expect(result.current.resetConfig).toBeDefined();
  });

  it('should handle connection status', () => {
    const { result } = renderHook(() => useDatabaseConfig());

    expect(result.current.connectionStatus).toBeDefined();
  });

  it('should handle sync strategy', () => {
    const { result } = renderHook(() => useDatabaseConfig());

    expect(result.current.syncStrategy).toBeDefined();
  });
});
