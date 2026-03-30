/**
 * @file serviceWorkerRegistration.test.ts
 * @description Service Worker 注册测试
 */

import { register, unregister, checkForUpdates, skipWaiting } from '../serviceWorkerRegistration';

describe('serviceWorkerRegistration', () => {
  describe('register', () => {
    it('should export register function', () => {
      expect(register).toBeDefined();
      expect(typeof register).toBe('function');
    });
  });

  describe('unregister', () => {
    it('should export unregister function', () => {
      expect(unregister).toBeDefined();
      expect(typeof unregister).toBe('function');
    });
  });

  describe('checkForUpdates', () => {
    it('should export checkForUpdates function', () => {
      expect(checkForUpdates).toBeDefined();
      expect(typeof checkForUpdates).toBe('function');
    });
  });

  describe('skipWaiting', () => {
    it('should export skipWaiting function', () => {
      expect(skipWaiting).toBeDefined();
      expect(typeof skipWaiting).toBe('function');
    });
  });
});
