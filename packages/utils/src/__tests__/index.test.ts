import * as Utils from '../index';

describe('utils index', () => {
  it('should export cn function', () => {
    expect(Utils.cn).toBeDefined();
    expect(typeof Utils.cn).toBe('function');
  });

  it('should export formatDate function', () => {
    expect(Utils.formatDate).toBeDefined();
    expect(typeof Utils.formatDate).toBe('function');
  });

  it('should export debounce function', () => {
    expect(Utils.debounce).toBeDefined();
    expect(typeof Utils.debounce).toBe('function');
  });

  it('should export throttle function', () => {
    expect(Utils.throttle).toBeDefined();
    expect(typeof Utils.throttle).toBe('function');
  });

  it('should export logger', () => {
    expect(Utils.logger).toBeDefined();
    expect(typeof Utils.logger).toBe('object');
  });

  it('should export color utilities', () => {
    expect(Utils.hexToRgb).toBeDefined();
    expect(Utils.rgbToHex).toBeDefined();
    expect(Utils.lighten).toBeDefined();
    expect(Utils.darken).toBeDefined();
  });

  it('should export animation utilities', () => {
    expect(Utils.fadeIn).toBeDefined();
    expect(Utils.fadeOut).toBeDefined();
    expect(Utils.slideIn).toBeDefined();
    expect(Utils.slideOut).toBeDefined();
  });

  it('should export performance monitor', () => {
    expect(Utils.PerformanceMonitor).toBeDefined();
    expect(Utils.measurePerformance).toBeDefined();
  });

  it('should export task tracker', () => {
    expect(Utils.TaskTracker).toBeDefined();
    expect(Utils.createTask).toBeDefined();
  });

  it('should export service worker utilities', () => {
    expect(Utils.registerServiceWorker).toBeDefined();
    expect(Utils.unregisterServiceWorker).toBeDefined();
  });

  it('should have all expected exports', () => {
    const expectedExports = [
      'cn',
      'formatDate',
      'debounce',
      'throttle',
      'logger',
      'hexToRgb',
      'rgbToHex',
      'lighten',
      'darken',
      'fadeIn',
      'fadeOut',
      'slideIn',
      'slideOut',
      'PerformanceMonitor',
      'measurePerformance',
      'TaskTracker',
      'createTask',
      'registerServiceWorker',
      'unregisterServiceWorker',
    ];

    expectedExports.forEach(exportName => {
      expect((Utils as any)[exportName]).toBeDefined();
    });
  });
});
