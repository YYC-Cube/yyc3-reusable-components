import { renderHook, act } from '@testing-library/react-hooks';
import { useNavigationContext } from '../useNavigationContext';

describe('useNavigationContext', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useNavigationContext());

    expect(result.current.currentPath).toBeDefined();
    expect(result.current.previousPath).toBeNull();
  });

  it('should navigate to new path', () => {
    const { result } = renderHook(() => useNavigationContext());

    act(() => {
      result.current.navigate('/new-path');
    });

    expect(result.current.currentPath).toBe('/new-path');
  });

  it('should track previous path', () => {
    const { result } = renderHook(() => useNavigationContext());

    act(() => {
      result.current.navigate('/first-path');
    });

    act(() => {
      result.current.navigate('/second-path');
    });

    expect(result.current.previousPath).toBe('/first-path');
    expect(result.current.currentPath).toBe('/second-path');
  });

  it('should go back to previous path', () => {
    const { result } = renderHook(() => useNavigationContext());

    act(() => {
      result.current.navigate('/first-path');
    });

    act(() => {
      result.current.navigate('/second-path');
    });

    act(() => {
      result.current.goBack();
    });

    expect(result.current.currentPath).toBe('/first-path');
  });

  it('should handle navigation history', () => {
    const { result } = renderHook(() => useNavigationContext());

    expect(result.current.history).toBeDefined();
    expect(Array.isArray(result.current.history)).toBe(true);
  });

  it('should clear navigation history', () => {
    const { result } = renderHook(() => useNavigationContext());

    act(() => {
      result.current.navigate('/path-1');
      result.current.navigate('/path-2');
    });

    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.history.length).toBe(0);
  });

  it('should handle navigation params', () => {
    const { result } = renderHook(() => useNavigationContext());

    act(() => {
      result.current.navigate('/path', { id: '123', tab: 'settings' });
    });

    expect(result.current.params).toBeDefined();
  });

  it('should check if can go back', () => {
    const { result } = renderHook(() => useNavigationContext());

    expect(result.current.canGoBack).toBe(false);

    act(() => {
      result.current.navigate('/new-path');
    });

    expect(result.current.canGoBack).toBe(true);
  });

  it('should handle active navigation item', () => {
    const { result } = renderHook(() => useNavigationContext());

    act(() => {
      result.current.setActiveItem('nav-item-1');
    });

    expect(result.current.activeItem).toBe('nav-item-1');
  });
});
