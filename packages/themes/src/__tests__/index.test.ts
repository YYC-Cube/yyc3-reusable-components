/**
 * @file index.test.ts
 * @description Themes 包测试
 * @author YYC³ Team
 */

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  ThemeType,
  themes,
  getTheme,
  applyTheme,
  type ThemeConfig,
  type ThemeTypeValue,
} from '../index';

describe('@yyc3/themes Package', () => {
  describe('ThemeType', () => {
    it('should export theme types', () => {
      expect(ThemeType.CYBERPUNK).toBe('cyberpunk');
      expect(ThemeType.LIQUID_GLASS).toBe('liquid-glass');
      expect(ThemeType.DARK).toBe('dark');
      expect(ThemeType.LIGHT).toBe('light');
    });
  });

  describe('themes', () => {
    it('should export all themes', () => {
      expect(themes.cyberpunk).toBeDefined();
      expect(themes['liquid-glass']).toBeDefined();
      expect(themes.dark).toBeDefined();
      expect(themes.light).toBeDefined();
    });

    it('should have correct theme structure', () => {
      const themeNames = ['cyberpunk', 'liquid-glass', 'dark', 'light'] as const;

      themeNames.forEach((name) => {
        const theme = themes[name];
        expect(theme).toHaveProperty('name');
        expect(theme).toHaveProperty('type');
        expect(theme).toHaveProperty('primaryColor');
        expect(theme).toHaveProperty('accentColor');
        expect(theme).toHaveProperty('backgroundColor');
      });
    });

    it('should have cyberpunk theme with correct values', () => {
      expect(themes.cyberpunk.name).toBe('Cyberpunk');
      expect(themes.cyberpunk.type).toBe('cyberpunk');
      expect(themes.cyberpunk.primaryColor).toBe('#00f0ff');
      expect(themes.cyberpunk.accentColor).toBe('#00ffcc');
      expect(themes.cyberpunk.backgroundColor).toBe('#0a0a0a');
    });

    it('should have liquid-glass theme with correct values', () => {
      expect(themes['liquid-glass'].name).toBe('Liquid Glass');
      expect(themes['liquid-glass'].type).toBe('liquid-glass');
      expect(themes['liquid-glass'].primaryColor).toBe('#00ff87');
      expect(themes['liquid-glass'].accentColor).toBe('#00d4ff');
      expect(themes['liquid-glass'].backgroundColor).toBe('#0a0f0a');
    });
  });

  describe('getTheme', () => {
    it('should return theme by name', () => {
      const theme = getTheme('cyberpunk');
      expect(theme).toBeDefined();
      expect(theme?.name).toBe('Cyberpunk');
    });

    it('should return undefined for non-existent theme', () => {
      const theme = getTheme('non-existent');
      expect(theme).toBeUndefined();
    });
  });

  describe('applyTheme', () => {
    beforeEach(() => {
      // Mock document.documentElement
      global.document = {
        documentElement: {
          setAttribute: vi.fn(),
          className: '',
        },
      } as any;
    });

    afterEach(() => {
      vi.restoreAllMocks();
    });

    it('should apply theme to document', () => {
      applyTheme('cyberpunk');
      expect(document.documentElement.setAttribute).toHaveBeenCalledWith(
        'data-theme',
        'cyberpunk'
      );
      expect(document.documentElement.className).toBe('theme-cyberpunk');
    });

    it('should warn for non-existent theme', () => {
      const consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});
      applyTheme('non-existent');
      expect(consoleSpy).toHaveBeenCalledWith('Theme "non-existent" not found');
      consoleSpy.mockRestore();
    });
  });

  describe('Type exports', () => {
    it('should export ThemeConfig type', () => {
      const config: ThemeConfig = {
        name: 'Test',
        type: 'dark',
        primaryColor: '#000',
        accentColor: '#fff',
        backgroundColor: '#111',
      };
      expect(config.name).toBe('Test');
    });

    it('should export ThemeTypeValue type', () => {
      const type: ThemeTypeValue = 'cyberpunk';
      expect(type).toBe('cyberpunk');
    });
  });
});
