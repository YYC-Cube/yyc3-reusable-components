/**
 * @file utils.test.ts
 * @description 工具函数测试
 */

import {
  cn,
  formatDate,
  formatCurrency,
  debounce,
  generateId,
  isEmpty,
  safeJsonParse,
  getStatusColor,
  isValidEmail,
  formatFileSize,
  getGradientColor,
  truncate,
  calculatePercentage,
} from '../utils';

describe('utils', () => {
  describe('cn', () => {
    it('should merge class names', () => {
      const result = cn('foo', 'bar');
      expect(result).toContain('foo');
      expect(result).toContain('bar');
    });

    it('should handle conditional classes', () => {
      const result = cn('foo', false && 'bar', 'baz');
      expect(result).toContain('foo');
      expect(result).toContain('baz');
    });

    it('should handle undefined and null', () => {
      const result = cn('foo', undefined, null, 'bar');
      expect(result).toContain('foo');
      expect(result).toContain('bar');
    });
  });

  describe('formatDate', () => {
    it('should format date', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date);
      expect(result).toMatch(/2024/);
    });

    it('should format date with locale', () => {
      const date = new Date('2024-01-15');
      const result = formatDate(date, 'zh');
      expect(result).toMatch(/2024/);
    });
  });

  describe('formatCurrency', () => {
    it('should format currency', () => {
      const result = formatCurrency(100);
      expect(result).toBeDefined();
    });

    it('should handle string input', () => {
      const result = formatCurrency('1,000');
      expect(result).toBeDefined();
    });
  });

  describe('debounce', () => {
    it('should debounce function', () => {
      const fn = vi.fn();
      const debouncedFn = debounce(fn, 100);
      debouncedFn();
      expect(fn).not.toHaveBeenCalled();
    });
  });

  describe('generateId', () => {
    it('should generate unique ID', () => {
      const id1 = generateId();
      const id2 = generateId();
      expect(id1).toBeDefined();
      expect(id2).toBeDefined();
      expect(id1).not.toBe(id2);
    });
  });

  describe('isEmpty', () => {
    it('should check if value is empty', () => {
      expect(isEmpty(null)).toBe(true);
      expect(isEmpty(undefined)).toBe(true);
      expect(isEmpty('')).toBe(true);
      expect(isEmpty([])).toBe(true);
      expect(isEmpty({})).toBe(true);
      expect(isEmpty('value')).toBe(false);
      expect(isEmpty([1])).toBe(false);
      expect(isEmpty({ key: 'value' })).toBe(false);
    });
  });

  describe('safeJsonParse', () => {
    it('should parse valid JSON', () => {
      const result = safeJsonParse('{"key":"value"}', {});
      expect(result).toEqual({ key: 'value' });
    });

    it('should return fallback for invalid JSON', () => {
      const fallback = { default: true };
      const result = safeJsonParse('invalid json', fallback);
      expect(result).toEqual(fallback);
    });
  });

  describe('getStatusColor', () => {
    it('should return color for status', () => {
      const result = getStatusColor('success');
      expect(result).toBeDefined();
    });
  });

  describe('isValidEmail', () => {
    it('should validate email', () => {
      expect(isValidEmail('test@example.com')).toBe(true);
      expect(isValidEmail('invalid')).toBe(false);
    });
  });

  describe('formatFileSize', () => {
    it('should format file size', () => {
      expect(formatFileSize(0)).toContain('0');
      expect(formatFileSize(1024)).toContain('1');
      expect(formatFileSize(1048576)).toContain('1');
    });
  });

  describe('truncate', () => {
    it('should truncate text', () => {
      const longText = 'This is a very long text that should be truncated';
      const result = truncate(longText, 10);
      expect(result.length).toBeLessThanOrEqual(13); // 10 + '...'
    });

    it('should not truncate short text', () => {
      const shortText = 'Short';
      const result = truncate(shortText, 10);
      expect(result).toBe(shortText);
    });
  });

  describe('calculatePercentage', () => {
    it('should calculate percentage', () => {
      expect(calculatePercentage(50, 100)).toBe(50);
      expect(calculatePercentage(1, 3)).toBe(33);
    });

    it('should handle division by zero', () => {
      expect(calculatePercentage(50, 0)).toBe(0);
    });
  });

  describe('getGradientColor', () => {
    it('should return gradient color', () => {
      const result = getGradientColor(0);
      expect(result).toBeDefined();
      expect(typeof result).toBe('string');
    });
  });
});
