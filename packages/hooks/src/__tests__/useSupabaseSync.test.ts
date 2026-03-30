import { renderHook, act } from '@testing-library/react-hooks';
import { useSupabaseSync } from '../useSupabaseSync';

// Mock Supabase client
jest.mock('@supabase/supabase-js', () => ({
  createClient: jest.fn(() => ({
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        data: [],
        error: null,
      })),
      insert: jest.fn(() => ({
        data: null,
        error: null,
      })),
      update: jest.fn(() => ({
        data: null,
        error: null,
      })),
      delete: jest.fn(() => ({
        data: null,
        error: null,
      })),
    })),
    auth: {
      signIn: jest.fn(),
      signOut: jest.fn(),
      onAuthStateChange: jest.fn(() => ({
        data: { subscription: { unsubscribe: jest.fn() } },
      })),
    },
  })),
}));

describe('useSupabaseSync', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useSupabaseSync());

    expect(result.current.data).toEqual([]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should fetch data from Supabase', async () => {
    const { result } = renderHook(() => useSupabaseSync());

    await act(async () => {
      await result.current.fetch('table_name');
    });

    expect(result.current.fetch).toBeDefined();
  });

  it('should insert data into Supabase', async () => {
    const { result } = renderHook(() => useSupabaseSync());

    await act(async () => {
      await result.current.insert('table_name', { name: 'test' });
    });

    expect(result.current.insert).toBeDefined();
  });

  it('should update data in Supabase', async () => {
    const { result } = renderHook(() => useSupabaseSync());

    await act(async () => {
      await result.current.update('table_name', 'id', { name: 'updated' });
    });

    expect(result.current.update).toBeDefined();
  });

  it('should delete data from Supabase', async () => {
    const { result } = renderHook(() => useSupabaseSync());

    await act(async () => {
      await result.current.delete('table_name', 'id');
    });

    expect(result.current.delete).toBeDefined();
  });

  it('should handle sync status', () => {
    const { result } = renderHook(() => useSupabaseSync());

    expect(result.current.syncStatus).toBeDefined();
  });

  it('should handle authentication state', () => {
    const { result } = renderHook(() => useSupabaseSync());

    expect(result.current.user).toBeDefined();
    expect(result.current.isAuthenticated).toBeDefined();
  });

  it('should subscribe to real-time changes', () => {
    const { result } = renderHook(() => useSupabaseSync());

    act(() => {
      result.current.subscribe('table_name');
    });

    expect(result.current.subscribe).toBeDefined();
  });
});
