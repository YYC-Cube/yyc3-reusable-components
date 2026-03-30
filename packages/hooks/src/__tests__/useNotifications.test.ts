import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useNotifications } from './useNotifications';

describe('useNotifications', () => {
  it('initializes with empty notifications array', () => {
    const { result } = renderHook(() => useNotifications());
    expect(result.current.notifications).toEqual([]);
  });

  it('adds a notification', () => {
    const { result } = renderHook(() => useNotifications());
    
    act(() => {
      result.current.addNotification({
        id: '1',
        type: 'success',
        message: 'Test notification',
        duration: 3000,
      });
    });
    
    expect(result.current.notifications).toHaveLength(1);
    expect(result.current.notifications[0]).toMatchObject({
      id: '1',
      type: 'success',
      message: 'Test notification',
    });
  });

  it('removes a notification', () => {
    const { result } = renderHook(() => useNotifications());
    
    act(() => {
      result.current.addNotification({
        id: '1',
        type: 'success',
        message: 'Test notification',
        duration: 3000,
      });
    });
    
    expect(result.current.notifications).toHaveLength(1);
    
    act(() => {
      result.current.removeNotification('1');
    });
    
    expect(result.current.notifications).toHaveLength(0);
  });

  it('clears all notifications', () => {
    const { result } = renderHook(() => useNotifications());
    
    act(() => {
      result.current.addNotification({
        id: '1',
        type: 'success',
        message: 'Test notification 1',
        duration: 3000,
      });
      result.current.addNotification({
        id: '2',
        type: 'error',
        message: 'Test notification 2',
        duration: 3000,
      });
    });
    
    expect(result.current.notifications).toHaveLength(2);
    
    act(() => {
      result.current.clearNotifications();
    });
    
    expect(result.current.notifications).toHaveLength(0);
  });

  it('handles different notification types', () => {
    const { result } = renderHook(() => useNotifications());
    
    const types = ['success', 'error', 'warning', 'info'] as const;
    
    types.forEach((type) => {
      act(() => {
        result.current.addNotification({
          id: type,
          type,
          message: `${type} notification`,
          duration: 3000,
        });
      });
    });
    
    expect(result.current.notifications).toHaveLength(4);
    result.current.notifications.forEach((notification) => {
      expect(types).toContain(notification.type);
    });
  });
});
