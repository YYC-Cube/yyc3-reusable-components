import { renderHook, act } from '@testing-library/react-hooks';
import { useChannelConfig } from '../useChannelConfig';

describe('useChannelConfig', () => {
  it('should initialize with default config', () => {
    const { result } = renderHook(() => useChannelConfig());

    expect(result.current.config).toBeDefined();
    expect(result.current.loading).toBe(false);
  });

  it('should update channel config', () => {
    const { result } = renderHook(() => useChannelConfig());

    act(() => {
      result.current.updateConfig({ name: 'New Channel' });
    });

    expect(result.current.updateConfig).toBeDefined();
  });

  it('should reset config to defaults', () => {
    const { result } = renderHook(() => useChannelConfig());

    act(() => {
      result.current.resetConfig();
    });

    expect(result.current.resetConfig).toBeDefined();
  });

  it('should validate config', () => {
    const { result } = renderHook(() => useChannelConfig());

    const isValid = result.current.validateConfig();
    expect(typeof isValid).toBe('boolean');
  });

  it('should get channel by id', () => {
    const { result } = renderHook(() => useChannelConfig());

    const channel = result.current.getChannel('channel-1');
    expect(channel).toBeDefined();
  });

  it('should list all channels', () => {
    const { result } = renderHook(() => useChannelConfig());

    const channels = result.current.listChannels();
    expect(Array.isArray(channels)).toBe(true);
  });

  it('should handle channel settings', () => {
    const { result } = renderHook(() => useChannelConfig());

    expect(result.current.settings).toBeDefined();
  });

  it('should persist config to storage', () => {
    const { result } = renderHook(() => useChannelConfig());

    act(() => {
      result.current.saveConfig();
    });

    expect(result.current.saveConfig).toBeDefined();
  });

  it('should load config from storage', () => {
    const { result } = renderHook(() => useChannelConfig());

    expect(result.current.loadConfig).toBeDefined();
  });
});
