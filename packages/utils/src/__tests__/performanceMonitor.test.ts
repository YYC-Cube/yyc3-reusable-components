/**
 * @file performanceMonitor.test.ts
 * @description 性能监控测试
 */

import * as monitoring from '../performanceMonitor';

describe('performanceMonitor', () => {
  describe('exports', () => {
    it('should export monitoring utilities', () => {
      expect(monitoring).toBeDefined();
    });
  });
});
