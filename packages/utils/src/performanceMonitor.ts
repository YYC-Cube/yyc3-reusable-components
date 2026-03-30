// 性能指标
import { useState, useEffect } from 'react';

export interface PerformanceMetrics {
  fps: number;
  memory: {
    used: number;
    total: number;
    limit: number;
    usedPercent: number;
  } | null;
  network: {
    effectiveType: string;
    downlink: number;
    rtt: number;
  } | null;
  loadTime: number;
  domContentLoaded: number;
  firstPaint: number;
  firstContentfulPaint: number;
  largestContentfulPaint: number;
}

export class PerformanceMonitor {
  private fpsFrames: number[] = [];
  private lastFrameTime = typeof performance !== 'undefined' ? performance.now() : Date.now();
  private rafId: number | null = null;
  private listeners: Set<(metrics: PerformanceMetrics) => void> = new Set();

  constructor() {
    // 只在浏览器环境且支持requestAnimationFrame时启动FPS监控
    if (typeof window !== 'undefined' && typeof requestAnimationFrame !== 'undefined') {
      this.startFPSMonitoring();
    }
  }

  // 开始FPS监控
  private startFPSMonitoring() {
    const measureFPS = () => {
      const now = typeof performance !== 'undefined' ? performance.now() : Date.now();
      const delta = now - this.lastFrameTime;
      const fps = 1000 / delta;

      this.fpsFrames.push(fps);
      if (this.fpsFrames.length > 60) {
        this.fpsFrames.shift();
      }

      this.lastFrameTime = now;
      this.rafId = requestAnimationFrame(measureFPS);
    };

    this.rafId = requestAnimationFrame(measureFPS);
  }

  // 获取FPS
  getFPS(): number {
    if (this.fpsFrames.length === 0) return 60;
    const sum = this.fpsFrames.reduce((a, b) => a + b, 0);
    return Math.round(sum / this.fpsFrames.length);
  }

  // 获取内存信息
  getMemory() {
    if (!(performance as any).memory) return null;

    const memory = (performance as any).memory;
    return {
      used: memory.usedJSHeapSize,
      total: memory.totalJSHeapSize,
      limit: memory.jsHeapSizeLimit,
      usedPercent: (memory.usedJSHeapSize / memory.jsHeapSizeLimit) * 100,
    };
  }

  // 获取网络信息
  getNetwork() {
    const connection = (navigator as any).connection ||
                      (navigator as any).mozConnection ||
                      (navigator as any).webkitConnection;

    if (!connection) return null;

    return {
      effectiveType: connection.effectiveType || 'unknown',
      downlink: connection.downlink || 0,
      rtt: connection.rtt || 0,
    };
  }

  // 获取页面加载性能
  getPageLoadMetrics() {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (!navigation) {
      return {
        loadTime: 0,
        domContentLoaded: 0,
        firstPaint: 0,
        firstContentfulPaint: 0,
        largestContentfulPaint: 0,
      };
    }

    // 获取First Paint和First Contentful Paint
    const paintEntries = performance.getEntriesByType('paint');
    const firstPaint = paintEntries.find((entry) => entry.name === 'first-paint');
    const firstContentfulPaint = paintEntries.find((entry) => entry.name === 'first-contentful-paint');

    // 获取Largest Contentful Paint
    let largestContentfulPaint = 0;
    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as any;
        largestContentfulPaint = lastEntry.renderTime || lastEntry.loadTime;
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });
    } catch (e) {
      // LCP API not supported
    }

    return {
      loadTime: navigation.loadEventEnd - navigation.fetchStart,
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.fetchStart,
      firstPaint: firstPaint?.startTime || 0,
      firstContentfulPaint: firstContentfulPaint?.startTime || 0,
      largestContentfulPaint,
    };
  }

  // 获取所有指标
  getMetrics(): PerformanceMetrics {
    const pageLoadMetrics = this.getPageLoadMetrics();

    return {
      fps: this.getFPS(),
      memory: this.getMemory(),
      network: this.getNetwork(),
      ...pageLoadMetrics,
    };
  }

  // 订阅指标更新
  subscribe(callback: (metrics: PerformanceMetrics) => void) {
    this.listeners.add(callback);

    // 每秒更新一次
    const interval = setInterval(() => {
      callback(this.getMetrics());
    }, 1000);

    return () => {
      this.listeners.delete(callback);
      clearInterval(interval);
    };
  }

  // 停止监控
  stop() {
    if (this.rafId) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }

  // 格式化字节
  static formatBytes(bytes: number): string {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${(bytes / Math.pow(k, i)).toFixed(2)} ${sizes[i]}`;
  }

  // 获取性能评分
  static getPerformanceScore(metrics: PerformanceMetrics): {
    score: number;
    grade: 'A' | 'B' | 'C' | 'D' | 'F';
    recommendations: string[];
  } {
    let score = 100;
    const recommendations: string[] = [];

    // FPS评分（权重30%）
    if (metrics.fps < 30) {
      score -= 30;
      recommendations.push('帧率过低，建议减少动画或复杂渲染');
    } else if (metrics.fps < 50) {
      score -= 15;
      recommendations.push('帧率偏低，考虑优化渲染性能');
    }

    // 内存评分（权重25%）
    if (metrics.memory) {
      if (metrics.memory.usedPercent > 80) {
        score -= 25;
        recommendations.push('内存使用过高，可能存在内存泄漏');
      } else if (metrics.memory.usedPercent > 60) {
        score -= 12;
        recommendations.push('内存使用较高，建议优化');
      }
    }

    // 加载时间评分（权重25%）
    if (metrics.loadTime > 3000) {
      score -= 25;
      recommendations.push('页面加载时间过长，建议优化资源加载');
    } else if (metrics.loadTime > 1500) {
      score -= 12;
      recommendations.push('页面加载时间偏长，可以进一步优化');
    }

    // LCP评分（权重20%）
    if (metrics.largestContentfulPaint > 4000) {
      score -= 20;
      recommendations.push('LCP过长，影响用户体验');
    } else if (metrics.largestContentfulPaint > 2500) {
      score -= 10;
      recommendations.push('LCP偏长，建议优化关键渲染路径');
    }

    // 确定等级
    let grade: 'A' | 'B' | 'C' | 'D' | 'F';
    if (score >= 90) grade = 'A';
    else if (score >= 75) grade = 'B';
    else if (score >= 60) grade = 'C';
    else if (score >= 45) grade = 'D';
    else grade = 'F';

    return { score: Math.max(0, score), grade, recommendations };
  }

  // 监控长任务
  static monitorLongTasks(callback: (duration: number) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            callback(entry.duration);
          }
        }
      });

      observer.observe({ entryTypes: ['longtask'] });

      return () => observer.disconnect();
    } catch (e) {
      console.warn('Long Tasks API not supported');
      return () => {};
    }
  }

  // 监控布局偏移（CLS）
  static monitorLayoutShift(callback: (score: number) => void) {
    try {
      let clsScore = 0;
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            clsScore += (entry as any).value;
            callback(clsScore);
          }
        }
      });

      observer.observe({ entryTypes: ['layout-shift'] });

      return () => observer.disconnect();
    } catch (e) {
      console.warn('Layout Shift API not supported');
      return () => {};
    }
  }

  // 监控首次输入延迟（FID）
  static monitorFirstInputDelay(callback: (delay: number) => void) {
    try {
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fidEntry = entry as any;
          const delay = fidEntry.processingStart - fidEntry.startTime;
          callback(delay);
        }
      });

      observer.observe({ entryTypes: ['first-input'] });

      return () => observer.disconnect();
    } catch (e) {
      console.warn('First Input Delay API not supported');
      return () => {};
    }
  }
}

// 单例
export const performanceMonitor = new PerformanceMonitor();

// React Hook
export function usePerformanceMetrics() {
  const [metrics, setMetrics] = useState<PerformanceMetrics>(
    performanceMonitor.getMetrics()
  );

  useEffect(() => {
    return performanceMonitor.subscribe(setMetrics);
  }, []);

  return metrics;
}

// 性能警告Hook
export function usePerformanceWarnings() {
  const [warnings, setWarnings] = useState<string[]>([]);

  useEffect(() => {
    const unsubscribeLongTask = PerformanceMonitor.monitorLongTasks((duration) => {
      setWarnings((prev) => [
        ...prev,
        `检测到长任务: ${duration.toFixed(2)}ms`,
      ].slice(-10));
    });

    const unsubscribeCLS = PerformanceMonitor.monitorLayoutShift((score) => {
      if (score > 0.1) {
        setWarnings((prev) => [
          ...prev,
          `布局偏移过大: ${score.toFixed(4)}`,
        ].slice(-10));
      }
    });

    const unsubscribeFID = PerformanceMonitor.monitorFirstInputDelay((delay) => {
      if (delay > 100) {
        setWarnings((prev) => [
          ...prev,
          `首次输入延迟过长: ${delay.toFixed(2)}ms`,
        ].slice(-10));
      }
    });

    return () => {
      unsubscribeLongTask();
      unsubscribeCLS();
      unsubscribeFID();
    };
  }, []);

  return warnings;
}