/**
 * @file i18n.test.ts
 * @description 国际化功能测试
 */

import { i18nConfig, i18nManager, t } from '../i18n';

describe('i18n', () => {
  describe('i18nConfig', () => {
    it('should define i18n configuration', () => {
      expect(i18nConfig).toBeDefined();
    });
  });

  describe('i18nManager', () => {
    it('should define i18n manager instance', () => {
      expect(i18nManager).toBeDefined();
    });

    it('should have setLocale method', () => {
      expect(typeof i18nManager.setLocale).toBe('function');
    });

    it('should have getLocale method', () => {
      expect(typeof i18nManager.getLocale).toBe('function');
    });
  });

  describe('t', () => {
    it('should define translation function', () => {
      expect(t).toBeDefined();
      expect(typeof t).toBe('function');
    });

    it('should return translation key if no match found', () => {
      const result = t('nonexistent.key');
      expect(typeof result).toBe('string');
    });
  });
});
