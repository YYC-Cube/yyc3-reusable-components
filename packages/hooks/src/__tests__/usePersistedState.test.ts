import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { usePersistedState } from './usePersistedState';

describe('usePersistedState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('initializes with default value', () => {
    const { result } = renderHook(() => usePersistedState('test-key', 'default'));
    expect(result.current[0]).toBe('default');
  });

  it('initializes with stored value from localStorage', () => {
    localStorage.setItem('test-key', JSON.stringify('stored-value'));
    const { result } = renderHook(() => usePersistedState('test-key', 'default'));
    expect(result.current[0]).toBe('stored-value');
  });

  it('updates state and localStorage', () => {
    const { result } = renderHook(() => usePersistedState('test-key', 'default'));
    
    act(() => {
      result.current[1]('new-value');
    });
    
    expect(result.current[0]).toBe('new-value');
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify('new-value'));
  });

  it('handles complex objects', () => {
    const complexValue = { name: 'test', count: 42 };
    const { result } = renderHook(() => usePersistedState('test-key', null));
    
    act(() => {
      result.current[1](complexValue);
    });
    
    expect(result.current[0]).toEqual(complexValue);
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify(complexValue));
  });

  it('handles arrays', () => {
    const arrayValue = [1, 2, 3, 4];
    const { result } = renderHook(() => usePersistedState('test-key', []));
    
    act(() => {
      result.current[1](arrayValue);
    });
    
    expect(result.current[0]).toEqual(arrayValue);
    expect(localStorage.getItem('test-key')).toBe(JSON.stringify(arrayValue));
  });

  it('handles localStorage errors gracefully', () => {
    const originalGetItem = localStorage.getItem;
    localStorage.getItem = () => {
      throw new Error('localStorage error');
    };
    
    const { result } = renderHook(() => usePersistedState('test-key', 'default'));
    expect(result.current[0]).toBe('default');
    
    localStorage.getItem = originalGetItem;
  });
});
