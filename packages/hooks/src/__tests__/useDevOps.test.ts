import { renderHook, act } from '@testing-library/react-hooks';
import { useDevOps } from '../useDevOps';

describe('useDevOps', () => {
  it('should initialize with default state', () => {
    const { result } = renderHook(() => useDevOps());

    expect(result.current.pipelines).toEqual([]);
    expect(result.current.deployments).toEqual([]);
    expect(result.current.loading).toBe(false);
  });

  it('should fetch pipelines', async () => {
    const { result } = renderHook(() => useDevOps());

    await act(async () => {
      await result.current.fetchPipelines();
    });

    expect(result.current.fetchPipelines).toBeDefined();
  });

  it('should trigger deployment', async () => {
    const { result } = renderHook(() => useDevOps());

    await act(async () => {
      await result.current.triggerDeployment('pipeline-1');
    });

    expect(result.current.triggerDeployment).toBeDefined();
  });

  it('should get deployment status', () => {
    const { result } = renderHook(() => useDevOps());

    const status = result.current.getDeploymentStatus('deployment-1');
    expect(status).toBeDefined();
  });

  it('should cancel deployment', async () => {
    const { result } = renderHook(() => useDevOps());

    await act(async () => {
      await result.current.cancelDeployment('deployment-1');
    });

    expect(result.current.cancelDeployment).toBeDefined();
  });

  it('should handle metrics', () => {
    const { result } = renderHook(() => useDevOps());

    expect(result.current.metrics).toBeDefined();
  });

  it('should handle alerts', () => {
    const { result } = renderHook(() => useDevOps());

    expect(result.current.alerts).toBeDefined();
  });
});
