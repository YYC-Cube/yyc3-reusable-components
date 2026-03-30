/**
 * @file colors.test.ts
 * @description 颜色配置测试
 */

import {
  oklchColors,
  hexColors,
  glassColors,
  gradients,
  blurConfig,
  textGradient,
  borderGradient,
  AIColorGenerator,
} from '../colors';

describe('colors', () => {
  describe('oklchColors', () => {
    it('should define primary color system', () => {
      expect(oklchColors.primary).toBeDefined();
      expect(oklchColors.primary.main).toBeDefined();
      expect(oklchColors.primary.light).toBeDefined();
      expect(oklchColors.primary.dark).toBeDefined();
    });

    it('should define secondary color system', () => {
      expect(oklchColors.secondary).toBeDefined();
      expect(oklchColors.secondary.main).toBeDefined();
    });

    it('should define accent color system', () => {
      expect(oklchColors.accent).toBeDefined();
      expect(oklchColors.accent.main).toBeDefined();
    });

    it('should define background colors', () => {
      expect(oklchColors.background).toBeDefined();
      expect(oklchColors.background.primary).toBeDefined();
      expect(oklchColors.background.secondary).toBeDefined();
    });

    it('should define text colors', () => {
      expect(oklchColors.text).toBeDefined();
      expect(oklchColors.text.primary).toBeDefined();
      expect(oklchColors.text.secondary).toBeDefined();
    });

    it('should define functional colors', () => {
      expect(oklchColors.destructive).toBeDefined();
      expect(oklchColors.success).toBeDefined();
      expect(oklchColors.warning).toBeDefined();
      expect(oklchColors.info).toBeDefined();
    });
  });

  describe('hexColors', () => {
    it('should define primary hex colors', () => {
      expect(hexColors.primary).toBeDefined();
      expect(hexColors.primary.main).toBe('#00ff87');
      expect(hexColors.primary.light).toBeDefined();
      expect(hexColors.primary.dark).toBeDefined();
    });

    it('should define secondary hex colors', () => {
      expect(hexColors.secondary).toBeDefined();
      expect(hexColors.secondary.main).toBe('#00d4ff');
    });

    it('should define accent hex colors', () => {
      expect(hexColors.accent).toBeDefined();
      expect(hexColors.accent.main).toBe('#f59e0b');
    });

    it('should define functional hex colors', () => {
      expect(hexColors.success).toBeDefined();
      expect(hexColors.warning).toBeDefined();
      expect(hexColors.danger).toBeDefined();
      expect(hexColors.info).toBeDefined();
    });

    it('should define gray scale', () => {
      expect(hexColors.gray).toBeDefined();
      expect(hexColors.gray[50]).toBeDefined();
      expect(hexColors.gray[900]).toBeDefined();
    });
  });

  describe('glassColors', () => {
    it('should define glass card colors', () => {
      expect(glassColors.card).toBeDefined();
      expect(glassColors.card.default).toBeDefined();
      expect(glassColors.card.elevated).toBeDefined();
    });

    it('should define glass border colors', () => {
      expect(glassColors.border).toBeDefined();
      expect(glassColors.border.default).toBeDefined();
      expect(glassColors.border.highlight).toBeDefined();
    });

    it('should define glass shadow colors', () => {
      expect(glassColors.shadow).toBeDefined();
      expect(glassColors.shadow.sm).toBeDefined();
      expect(glassColors.shadow.lg).toBeDefined();
    });
  });

  describe('gradients', () => {
    it('should define primary gradients', () => {
      expect(gradients.primary).toBeDefined();
      expect(gradients.primaryLight).toBeDefined();
    });

    it('should define background gradients', () => {
      expect(gradients.background).toBeDefined();
      expect(gradients.backgroundOverlay).toBeDefined();
    });

    it('should define card gradients', () => {
      expect(gradients.card).toBeDefined();
      expect(gradients.cardHighlight).toBeDefined();
    });

    it('should define glow effects', () => {
      expect(gradients.glow).toBeDefined();
      expect(gradients.glow.primary).toBeDefined();
      expect(gradients.glow.secondary).toBeDefined();
    });
  });

  describe('blurConfig', () => {
    it('should define blur configurations', () => {
      expect(blurConfig.sm).toBeDefined();
      expect(blurConfig.md).toBeDefined();
      expect(blurConfig.lg).toBeDefined();
      expect(blurConfig.xl).toBeDefined();
      expect(blurConfig.full).toBeDefined();
    });

    it('should return valid CSS blur values', () => {
      expect(blurConfig.sm).toContain('blur');
      expect(blurConfig.lg).toContain('blur(20px)');
    });
  });

  describe('textGradient', () => {
    it('should generate text gradient styles', () => {
      const styles = textGradient('#00ff87', '#00d4ff');
      expect(styles.backgroundImage).toBeDefined();
      expect(styles.backgroundClip).toBe('text');
      expect(styles.WebkitBackgroundClip).toBe('text');
      expect(styles.WebkitTextFillColor).toBe('transparent');
    });
  });

  describe('borderGradient', () => {
    it('should generate border gradient styles', () => {
      const styles = borderGradient('#00ff87', '#00d4ff');
      expect(styles.borderImage).toBeDefined();
      expect(styles.borderImage).toContain('linear-gradient');
    });
  });

  describe('AIColorGenerator', () => {
    describe('hexToHSL', () => {
      it('should convert hex to HSL', () => {
        const hsl = AIColorGenerator.hexToHSL('#ff0000');
        expect(hsl.h).toBeDefined();
        expect(hsl.s).toBeDefined();
        expect(hsl.l).toBeDefined();
        expect(hsl.h).toBeCloseTo(0, 0);
        expect(hsl.s).toBeCloseTo(100, 0);
        expect(hsl.l).toBeCloseTo(50, 0);
      });

      it('should handle black color', () => {
        const hsl = AIColorGenerator.hexToHSL('#000000');
        expect(hsl.l).toBe(0);
      });

      it('should handle white color', () => {
        const hsl = AIColorGenerator.hexToHSL('#ffffff');
        expect(hsl.l).toBe(100);
      });
    });

    describe('hslToHex', () => {
      it('should convert HSL to hex', () => {
        const hex = AIColorGenerator.hslToHex(0, 100, 50);
        expect(hex).toMatch(/^#[0-9a-f]{6}$/i);
      });

      it('should handle edge values', () => {
        const black = AIColorGenerator.hslToHex(0, 0, 0);
        expect(black.toLowerCase()).toBe('#000000');

        const white = AIColorGenerator.hslToHex(0, 0, 100);
        expect(white.toLowerCase()).toBe('#ffffff');
      });
    });

    describe('generateColorScheme', () => {
      it('should generate complete color scheme from primary color', () => {
        const scheme = AIColorGenerator.generateColorScheme('#00ff87');
        expect(scheme.primary).toBeDefined();
        expect(scheme.secondary).toBeDefined();
        expect(scheme.accent).toBeDefined();
        expect(scheme.background).toBeDefined();
        expect(scheme.card).toBeDefined();
        expect(scheme.text).toBeDefined();
      });

      it('should generate harmonious colors', () => {
        const scheme = AIColorGenerator.generateColorScheme('#ff0000');
        expect(scheme.primary).toBe('#ff0000');
        expect(scheme.secondary).toMatch(/^#[0-9a-f]{6}$/i);
        expect(scheme.accent).toMatch(/^#[0-9a-f]{6}$/i);
      });
    });
  });
});
