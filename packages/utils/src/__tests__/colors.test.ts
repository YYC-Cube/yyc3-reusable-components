import { hexToRgb, rgbToHex, lighten, darken, getContrastColor } from '../colors';

describe('colors', () => {
  describe('hexToRgb', () => {
    it('should convert hex to rgb', () => {
      expect(hexToRgb('#FF0000')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should handle lowercase hex', () => {
      expect(hexToRgb('#ff0000')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should handle 3-digit hex', () => {
      expect(hexToRgb('#F00')).toEqual({ r: 255, g: 0, b: 0 });
    });

    it('should return null for invalid hex', () => {
      expect(hexToRgb('invalid')).toBeNull();
    });
  });

  describe('rgbToHex', () => {
    it('should convert rgb to hex', () => {
      expect(rgbToHex(255, 0, 0)).toBe('#ff0000');
    });

    it('should handle edge values', () => {
      expect(rgbToHex(0, 0, 0)).toBe('#000000');
      expect(rgbToHex(255, 255, 255)).toBe('#ffffff');
    });
  });

  describe('lighten', () => {
    it('should lighten a color', () => {
      const result = lighten('#000000', 20);
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('should handle percentage', () => {
      const result = lighten('#808080', 50);
      expect(result).toBe('#c0c0c0');
    });
  });

  describe('darken', () => {
    it('should darken a color', () => {
      const result = darken('#ffffff', 20);
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });

    it('should handle percentage', () => {
      const result = darken('#808080', 50);
      expect(result).toBe('#404040');
    });
  });

  describe('getContrastColor', () => {
    it('should return black for light background', () => {
      const result = getContrastColor('#ffffff');
      expect(result).toBe('#000000');
    });

    it('should return white for dark background', () => {
      const result = getContrastColor('#000000');
      expect(result).toBe('#ffffff');
    });

    it('should handle mid-tone colors', () => {
      const result = getContrastColor('#808080');
      expect(result).toMatch(/^#[0-9a-f]{6}$/i);
    });
  });
});
