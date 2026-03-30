import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useAI } from './useAI';

describe('useAI', () => {
  it('initializes with default state', () => {
    const { result } = renderHook(() => useAI());
    expect(result.current).toHaveProperty('messages');
    expect(result.current).toHaveProperty('isLoading');
    expect(result.current).toHaveProperty('error');
  });

  it('provides sendMessage function', () => {
    const { result } = renderHook(() => useAI());
    expect(result.current).toHaveProperty('sendMessage');
    expect(typeof result.current.sendMessage).toBe('function');
  });

  it('provides clearMessages function', () => {
    const { result } = renderHook(() => useAI());
    expect(result.current).toHaveProperty('clearMessages');
    expect(typeof result.current.clearMessages).toBe('function');
  });

  it('handles message sending', async () => {
    const { result } = renderHook(() => useAI());
    
    await act(async () => {
      await result.current.sendMessage('Hello AI');
    });
    
    expect(result.current.messages).toHaveLength(1);
  });

  it('clears messages', () => {
    const { result } = renderHook(() => useAI());
    
    act(() => {
      result.current.clearMessages();
    });
    
    expect(result.current.messages).toHaveLength(0);
  });

  it('handles loading state', async () => {
    const { result } = renderHook(() => useAI());
    
    act(() => {
      result.current.sendMessage('Test message');
    });
    
    expect(result.current.isLoading).toBe(true);
  });

  it('handles error state', async () => {
    const { result } = renderHook(() => useAI());
    
    try {
      await act(async () => {
        await result.current.sendMessage('Error message');
      });
    } catch (error) {
      expect(result.current.error).not.toBeNull();
    }
  });
});
