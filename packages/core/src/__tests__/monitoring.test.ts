/**
 * @file monitoring.test.ts
 * @description 性能监控功能测试
 */

import * as monitoring from '../monitoring';

describe('monitoring', () => {
  describe('exports', () => {
    it('should export monitoring utilities', () => {
      expect(monitoring).toBeDefined();
    });
  });
});
