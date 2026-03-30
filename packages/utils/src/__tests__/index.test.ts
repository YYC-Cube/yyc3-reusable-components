/**
 * @file index.test.ts
 * @description 包入口测试
 */

import * as utils from '../index';

describe('utils index', () => {
  it('should export utility functions', () => {
    expect(utils.cn).toBeDefined();
    expect(utils.formatDate).toBeDefined();
    expect(utils.debounce).toBeDefined();
    expect(utils.generateId).toBeDefined();
  });

  it('should export logger', () => {
    expect(utils.createLogger).toBeDefined();
    expect(utils.Logger).toBeDefined();
    expect(utils.LogLevel).toBeDefined();
  });

  it('should export color utilities', () => {
    expect(utils.oklchColors).toBeDefined();
    expect(utils.hexColors).toBeDefined();
    expect(utils.glassColors).toBeDefined();
    expect(utils.gradients).toBeDefined();
    expect(utils.AIColorGenerator).toBeDefined();
  });

  it('should export animation utilities', () => {
    expect(utils.easing).toBeDefined();
    expect(utils.duration).toBeDefined();
    expect(utils.pageTransition).toBeDefined();
    expect(utils.cardEnter).toBeDefined();
  });

  it('should export task tracker', () => {
    expect(utils.TaskTracker).toBeDefined();
    expect(utils.taskTracker).toBeDefined();
  });
});
