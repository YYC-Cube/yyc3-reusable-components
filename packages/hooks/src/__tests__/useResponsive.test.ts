import { renderHook } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { useResponsive } from './useResponsive';

describe('useResponsive', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useResponsive());
    expect(result.current).toHaveProperty('isMobile');
    expect(result.current).toHaveProperty('isTablet');
    expect(result.current).toHaveProperty('isDesktop');
    expect(result.current).toHaveProperty('isLargeDesktop');
  });

  it('returns boolean values for breakpoints', () => {
    const { result } = renderHook(() => useResponsive());
    expect(typeof result.current.isMobile).toBe('boolean');
    expect(typeof result.current.isTablet).toBe('boolean');
    expect(typeof result.current.isDesktop).toBe('boolean');
    expect(typeof result.current.isLargeDesktop).toBe('boolean');
  });

  it('provides window width information', () => {
    const { result } = renderHook(() => useResponsive());
    expect(result.current).toHaveProperty('width');
    expect(typeof result.current.width).toBe('number');
  });
});
