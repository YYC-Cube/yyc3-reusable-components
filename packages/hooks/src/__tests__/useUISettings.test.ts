import { renderHook, act } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useUISettings } from './useUISettings';

describe('useUISettings', () => {
  it('initializes with default settings', () => {
    const { result } = renderHook(() => useUISettings());
    expect(result.current).toHaveProperty('theme');
    expect(result.current).toHaveProperty('language');
    expect(result.current).toHaveProperty('fontSize');
  });

  it('provides updateSettings function', () => {
    const { result } = renderHook(() => useUISettings());
    expect(result.current).toHaveProperty('updateSettings');
    expect(typeof result.current.updateSettings).toBe('function');
  });

  it('provides resetSettings function', () => {
    const { result } = renderHook(() => useUISettings());
    expect(result.current).toHaveProperty('resetSettings');
    expect(typeof result.current.resetSettings).toBe('function');
  });

  it('updates theme setting', () => {
    const { result } = renderHook(() => useUISettings());
    
    act(() => {
      result.current.updateSettings({ theme: 'dark' });
    });
    
    expect(result.current.theme).toBe('dark');
  });

  it('updates language setting', () => {
    const { result } = renderHook(() => useUISettings());
    
    act(() => {
      result.current.updateSettings({ language: 'zh-CN' });
    });
    
    expect(result.current.language).toBe('zh-CN');
  });

  it('updates fontSize setting', () => {
    const { result } = renderHook(() => useUISettings());
    
    act(() => {
      result.current.updateSettings({ fontSize: 'large' });
    });
    
    expect(result.current.fontSize).toBe('large');
  });

  it('updates multiple settings at once', () => {
    const { result } = renderHook(() => useUISettings());
    
    act(() => {
      result.current.updateSettings({
        theme: 'dark',
        language: 'zh-CN',
        fontSize: 'large',
      });
    });
    
    expect(result.current.theme).toBe('dark');
    expect(result.current.language).toBe('zh-CN');
    expect(result.current.fontSize).toBe('large');
  });

  it('resets settings to defaults', () => {
    const { result } = renderHook(() => useUISettings());
    
    act(() => {
      result.current.updateSettings({
        theme: 'dark',
        language: 'zh-CN',
        fontSize: 'large',
      });
    });
    
    act(() => {
      result.current.resetSettings();
    });
    
    expect(result.current.theme).toBe('light');
    expect(result.current.language).toBe('en-US');
    expect(result.current.fontSize).toBe('medium');
  });
});
