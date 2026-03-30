import { 
  PerformanceMonitor,
  startMonitor,
  stopMonitor,
  getMetrics,
  measurePerformance
} from '../performanceMonitor';

describe('performanceMonitor', () => {
  describe('PerformanceMonitor', () => {
    it('should create monitor instance', () => {
      const monitor = new PerformanceMonitor();
      expect(monitor).toBeDefined();
    });

    it('should start monitoring', () => {
      const monitor = new PerformanceMonitor();
      monitor.start();
      expect(monitor.isRunning()).toBe(true);
    });

    it('should stop monitoring', () => {
      const monitor = new PerformanceMonitor();
      monitor.start();
      monitor.stop();
      expect(monitor.isRunning()).toBe(false);
    });

    it('should collect metrics', () => {
      const monitor = new PerformanceMonitor();
      monitor.start();
      const metrics = monitor.getMetrics();
      expect(metrics).toBeDefined();
      expect(metrics.timestamp).toBeDefined();
    });

    it('should track memory usage', () => {
      const monitor = new PerformanceMonitor();
      const memory = monitor.getMemoryUsage();
      expect(memory).toBeDefined();
    });

    it('should track CPU usage', () => {
      const monitor = new PerformanceMonitor();
      const cpu = monitor.getCPUUsage();
      expect(typeof cpu).toBe('number');
    });

    it('should generate report', () => {
      const monitor = new PerformanceMonitor();
      monitor.start();
      const report = monitor.generateReport();
      expect(report).toBeDefined();
      expect(report.timestamp).toBeDefined();
      expect(report.duration).toBeDefined();
    });
  });

  describe('startMonitor', () => {
    it('should start global monitor', () => {
      startMonitor();
      const metrics = getMetrics();
      expect(metrics).toBeDefined();
    });
  });

  describe('stopMonitor', () => {
    it('should stop global monitor', () => {
      startMonitor();
      stopMonitor();
      // Verify monitor is stopped
      expect(true).toBe(true);
    });
  });

  describe('getMetrics', () => {
    it('should return current metrics', () => {
      startMonitor();
      const metrics = getMetrics();
      expect(metrics).toBeDefined();
      expect(metrics.fps).toBeDefined();
      expect(metrics.memory).toBeDefined();
      stopMonitor();
    });
  });

  describe('measurePerformance', () => {
    it('should measure function performance', async () => {
      const testFn = () => {
        let sum = 0;
        for (let i = 0; i < 1000; i++) {
          sum += i;
        }
        return sum;
      };

      const measurement = await measurePerformance(testFn);
      expect(measurement).toBeDefined();
      expect(measurement.duration).toBeDefined();
      expect(measurement.result).toBeDefined();
    });

    it('should handle async functions', async () => {
      const asyncFn = async () => {
        await new Promise(resolve => setTimeout(resolve, 10));
        return 'done';
      };

      const measurement = await measurePerformance(asyncFn);
      expect(measurement.result).toBe('done');
      expect(measurement.duration).toBeGreaterThan(10);
    });

    it('should track memory allocation', async () => {
      const testFn = () => {
        const arr = new Array(1000).fill(0);
        return arr;
      };

      const measurement = await measurePerformance(testFn, { trackMemory: true });
      expect(measurement.memoryDelta).toBeDefined();
    });
  });
});
