import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useChannelManager } from './useChannelManager';

describe('useChannelManager', () => {
  it('initializes with empty channels', () => {
    const { result } = renderHook(() => useChannelManager());
    expect(result.current.channels).toEqual([]);
  });

  it('provides addChannel function', () => {
    const { result } = renderHook(() => useChannelManager());
    expect(result.current).toHaveProperty('addChannel');
    expect(typeof result.current.addChannel).toBe('function');
  });

  it('provides removeChannel function', () => {
    const { result } = renderHook(() => useChannelManager());
    expect(result.current).toHaveProperty('removeChannel');
    expect(typeof result.current.removeChannel).toBe('function');
  });

  it('provides updateChannel function', () => {
    const { result } = renderHook(() => useChannelManager());
    expect(result.current).toHaveProperty('updateChannel');
    expect(typeof result.current.updateChannel).toBe('function');
  });

  it('adds a channel', () => {
    const { result } = renderHook(() => useChannelManager());
    
    act(() => {
      result.current.addChannel({
        id: '1',
        name: 'Test Channel',
        type: 'text',
      });
    });
    
    expect(result.current.channels).toHaveLength(1);
    expect(result.current.channels[0].name).toBe('Test Channel');
  });

  it('removes a channel', () => {
    const { result } = renderHook(() => useChannelManager());
    
    act(() => {
      result.current.addChannel({
        id: '1',
        name: 'Test Channel',
        type: 'text',
      });
    });
    
    expect(result.current.channels).toHaveLength(1);
    
    act(() => {
      result.current.removeChannel('1');
    });
    
    expect(result.current.channels).toHaveLength(0);
  });

  it('updates a channel', () => {
    const { result } = renderHook(() => useChannelManager());
    
    act(() => {
      result.current.addChannel({
        id: '1',
        name: 'Test Channel',
        type: 'text',
      });
    });
    
    expect(result.current.channels[0].name).toBe('Test Channel');
    
    act(() => {
      result.current.updateChannel('1', { name: 'Updated Channel' });
    });
    
    expect(result.current.channels[0].name).toBe('Updated Channel');
  });

  it('handles multiple channels', () => {
    const { result } = renderHook(() => useChannelManager());
    
    act(() => {
      result.current.addChannel({ id: '1', name: 'Channel 1', type: 'text' });
      result.current.addChannel({ id: '2', name: 'Channel 2', type: 'image' });
      result.current.addChannel({ id: '3', name: 'Channel 3', type: 'audio' });
    });
    
    expect(result.current.channels).toHaveLength(3);
  });
});
