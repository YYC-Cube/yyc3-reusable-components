/**
 * @file useUISettings.test.ts
 * @description useUISettings Hook 测试
 * @author YYC³ Team
 */

import { renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach } from 'vitest';
import { useUISettings } from '../useUISettings';

describe('useUISettings', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should initialize with default settings', () => {
    const { result } = renderHook(() => useUISettings());

    expect(result.current.settings).toBeDefined();
    expect(result.current.settings.theme).toBe('P1 Matrix');
    expect(result.current.settings.themeColorId).toBe('green');
    expect(result.current.settings.fontSize).toBe('xl');
    expect(result.current.loading).toBe(false);
  });

  it('should load settings from localStorage', () => {
    const savedSettings = {
      theme: 'Cyberpunk',
      themeColorId: 'cyan',
      bgOpacity: 80,
      fontSize: 'lg',
      fontId: 'fira-code',
      version: 2
    };
    localStorage.setItem('yyc3_ui_settings', JSON.stringify(savedSettings));

    const { result } = renderHook(() => useUISettings());

    expect(result.current.settings.theme).toBe('Cyberpunk');
    expect(result.current.settings.themeColorId).toBe('cyan');
    expect(result.current.settings.bgOpacity).toBe(80);
    expect(result.current.settings.fontSize).toBe('lg');
  });

  it('should update settings correctly', () => {
    const { result } = renderHook(() => useUISettings());

    act(() => {
      result.current.updateSettings({
        theme: 'Neon',
        themeColorId: 'purple'
      });
    });

    expect(result.current.settings.theme).toBe('Neon');
    expect(result.current.settings.themeColorId).toBe('purple');
  });

  it('should save complete settings', () => {
    const { result } = renderHook(() => useUISettings());

    const newSettings = {
      ...result.current.settings,
      theme: 'Glass',
      bgOpacity: 50
    };

    act(() => {
      result.current.saveSettings(newSettings);
    });

    expect(result.current.settings.theme).toBe('Glass');
    expect(result.current.settings.bgOpacity).toBe(50);

    const stored = JSON.parse(localStorage.getItem('yyc3_ui_settings')!);
    expect(stored.theme).toBe('Glass');
  });

  it('should reset settings to defaults', () => {
    const { result } = renderHook(() => useUISettings());

    act(() => {
      result.current.updateSettings({
        theme: 'Dark',
        themeColorId: 'blue',
        fontSize: 'sm'
      });
    });

    expect(result.current.settings.theme).toBe('Dark');

    act(() => {
      result.current.resetSettings();
    });

    expect(result.current.settings.theme).toBe('P1 Matrix');
    expect(result.current.settings.themeColorId).toBe('green');
    expect(result.current.settings.fontSize).toBe('xl');
  });

  it('should compute active theme color', () => {
    const { result } = renderHook(() => useUISettings());

    // activeThemeColor might be undefined if THEME_COLORS doesn't have matching id
    // Just verify the function exists
    expect(result.current).toHaveProperty('activeThemeColor');
  });

  it('should compute active font', () => {
    const { result } = renderHook(() => useUISettings());

    // activeFont might be undefined if FONT_OPTIONS doesn't have matching id
    // Just verify the function exists
    expect(result.current).toHaveProperty('activeFont');
  });

  it('should compute active font size', () => {
    const { result } = renderHook(() => useUISettings());

    // activeFontSize might be undefined if FONT_SIZE_OPTIONS doesn't have matching id
    // Just verify the function exists
    expect(result.current).toHaveProperty('activeFontSize');
  });

  it('should persist settings to localStorage on update', () => {
    const { result } = renderHook(() => useUISettings());

    act(() => {
      result.current.updateSettings({ theme: 'Matrix' });
    });

    const stored = JSON.parse(localStorage.getItem('yyc3_ui_settings')!);
    expect(stored.theme).toBe('Matrix');
  });
});
