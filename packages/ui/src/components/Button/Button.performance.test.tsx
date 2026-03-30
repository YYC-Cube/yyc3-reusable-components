import { render, cleanup } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { performanceMonitor } from '@core/monitoring/performance-monitor';
import { Button } from './Button';

describe('Button Performance', () => {
  beforeEach(() => {
    performanceMonitor.clearMetrics();
  });

  afterEach(() => {
    cleanup();
  });

  it('should render within performance threshold', () => {
    performanceMonitor.startMark('button-render');
    render(<Button>Click me</Button>);
    const duration = performanceMonitor.endMark('button-render');
    
    const metric = performanceMonitor.recordMetric(
      'Button',
      'firstRenderTime',
      duration,
      'ms'
    );
    
    expect(metric.value).toBeLessThanOrEqual(metric.threshold);
    expect(metric.value).toBeLessThan(16); // 60fps threshold
  });

  it('should handle rapid clicks efficiently', () => {
    const { getByText } = render(<Button onClick={() => {}}>Click me</Button>);
    const button = getByText('Click me');
    
    performanceMonitor.startMark('button-clicks');
    
    for (let i = 0; i < 100; i++) {
      button.click();
    }
    
    const duration = performanceMonitor.endMark('button-clicks');
    const avgClickTime = duration / 100;
    
    const metric = performanceMonitor.recordMetric(
      'Button',
      'clickResponseTime',
      avgClickTime,
      'ms'
    );
    
    expect(metric.value).toBeLessThanOrEqual(metric.threshold);
    expect(metric.value).toBeLessThan(50); // 50ms threshold
  });

  it('should re-render efficiently', () => {
    const { rerender } = render(<Button>Click me</Button>);
    
    performanceMonitor.startMark('button-rerender');
    rerender(<Button>Click me again</Button>);
    const duration = performanceMonitor.endMark('button-rerender');
    
    const metric = performanceMonitor.recordMetric(
      'Button',
      'reRenderTime',
      duration,
      'ms'
    );
    
    expect(metric.value).toBeLessThanOrEqual(metric.threshold);
    expect(metric.value).toBeLessThan(8); // 120fps threshold
  });

  it('should mount and unmount efficiently', () => {
    performanceMonitor.startMark('button-mount');
    const { unmount } = render(<Button>Click me</Button>);
    const mountDuration = performanceMonitor.endMark('button-mount');
    
    performanceMonitor.startMark('button-unmount');
    unmount();
    const unmountDuration = performanceMonitor.endMark('button-unmount');
    
    const mountMetric = performanceMonitor.recordMetric(
      'Button',
      'mountTime',
      mountDuration,
      'ms'
    );
    
    const unmountMetric = performanceMonitor.recordMetric(
      'Button',
      'unmountTime',
      unmountDuration,
      'ms'
    );
    
    expect(mountMetric.value).toBeLessThanOrEqual(mountMetric.threshold);
    expect(mountMetric.value).toBeLessThan(100); // 100ms threshold
    
    expect(unmountMetric.value).toBeLessThanOrEqual(unmountMetric.threshold);
    expect(unmountMetric.value).toBeLessThan(50); // 50ms threshold
  });

  it('should handle state changes efficiently', () => {
    const { getByText } = render(<Button>Click me</Button>);
    const button = getByText('Click me');
    
    performanceMonitor.startMark('button-state-change');
    
    for (let i = 0; i < 50; i++) {
      button.click();
    }
    
    const duration = performanceMonitor.endMark('button-state-change');
    const avgStateChangeTime = duration / 50;
    
    const metric = performanceMonitor.recordMetric(
      'Button',
      'stateChangeTime',
      avgStateChangeTime,
      'ms'
    );
    
    expect(metric.value).toBeLessThan(16); // 60fps threshold
  });

  it('should not leak memory', () => {
    const initialMemory = (performance as any).memory?.usedJSHeapSize || 0;
    
    for (let i = 0; i < 100; i++) {
      const { unmount } = render(<Button>Click me</Button>);
      unmount();
    }
    
    const finalMemory = (performance as any).memory?.usedJSHeapSize || 0;
    const memoryIncrease = finalMemory - initialMemory;
    
    const metric = performanceMonitor.recordMetric(
      'Button',
      'memoryLeak',
      memoryIncrease,
      'bytes'
    );
    
    expect(metric.value).toBeLessThan(1024 * 100); // 100KB threshold
  });
});
