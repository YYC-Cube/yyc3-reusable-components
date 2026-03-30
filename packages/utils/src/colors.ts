/**
 * YYC³ 统一配色系统
 * 基于 OKLch 色彩空间和环保主题
 */

// OKLch 色彩定义
export const oklchColors = {
  // 主色系（绿色环保主题）
  primary: {
    main: 'oklch(0.65 0.22 160)',
    foreground: 'oklch(0.98 0.01 160)',
    light: 'oklch(0.75 0.20 160)',
    dark: 'oklch(0.55 0.24 160)',
  },
  
  // 次色系（青色）
  secondary: {
    main: 'oklch(0.70 0.18 180)',
    foreground: 'oklch(0.98 0.01 180)',
    light: 'oklch(0.80 0.16 180)',
    dark: 'oklch(0.60 0.20 180)',
  },
  
  // 强调色（琥珀色）
  accent: {
    main: 'oklch(0.72 0.25 30)',
    foreground: 'oklch(0.98 0.01 30)',
    light: 'oklch(0.82 0.23 30)',
    dark: 'oklch(0.62 0.27 30)',
  },
  
  // 背景色（深色）
  background: {
    primary: 'oklch(0.15 0.02 160)',
    secondary: 'oklch(0.20 0.02 160)',
    tertiary: 'oklch(0.25 0.02 160)',
  },
  
  // 文字色
  text: {
    primary: 'oklch(0.95 0.01 160)',
    secondary: 'oklch(0.70 0.02 160)',
    tertiary: 'oklch(0.50 0.02 160)',
    disabled: 'oklch(0.40 0.02 160)',
  },
  
  // 边框色
  border: {
    primary: 'oklch(0.85 0.02 160)',
    secondary: 'oklch(0.60 0.02 160)',
    subtle: 'oklch(0.30 0.02 160)',
  },
  
  // 功能色
  destructive: {
    main: 'oklch(0.60 0.25 25)',
    foreground: 'oklch(0.98 0.01 25)',
  },
  
  success: {
    main: 'oklch(0.65 0.20 145)',
    foreground: 'oklch(0.98 0.01 145)',
  },
  
  warning: {
    main: 'oklch(0.70 0.22 75)',
    foreground: 'oklch(0.15 0.02 75)',
  },
  
  info: {
    main: 'oklch(0.65 0.20 240)',
    foreground: 'oklch(0.98 0.01 240)',
  },
};

// HEX 色彩定义（用于不支持OKLch的地方）
export const hexColors = {
  // 主色系
  primary: {
    main: '#00ff87',
    light: '#33ffaa',
    dark: '#00cc6b',
    50: 'rgba(0, 255, 135, 0.05)',
    100: 'rgba(0, 255, 135, 0.1)',
    200: 'rgba(0, 255, 135, 0.2)',
    300: 'rgba(0, 255, 135, 0.3)',
    500: 'rgba(0, 255, 135, 0.5)',
    700: 'rgba(0, 255, 135, 0.7)',
    900: 'rgba(0, 255, 135, 0.9)',
  },
  
  // 次色系
  secondary: {
    main: '#00d4ff',
    light: '#33deff',
    dark: '#00a8cc',
    50: 'rgba(0, 212, 255, 0.05)',
    100: 'rgba(0, 212, 255, 0.1)',
    200: 'rgba(0, 212, 255, 0.2)',
    300: 'rgba(0, 212, 255, 0.3)',
    500: 'rgba(0, 212, 255, 0.5)',
    700: 'rgba(0, 212, 255, 0.7)',
    900: 'rgba(0, 212, 255, 0.9)',
  },
  
  // 强调色
  accent: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
    50: 'rgba(245, 158, 11, 0.05)',
    100: 'rgba(245, 158, 11, 0.1)',
    200: 'rgba(245, 158, 11, 0.2)',
    300: 'rgba(245, 158, 11, 0.3)',
    500: 'rgba(245, 158, 11, 0.5)',
    700: 'rgba(245, 158, 11, 0.7)',
    900: 'rgba(245, 158, 11, 0.9)',
  },
  
  // 功能色
  success: {
    main: '#10b981',
    light: '#34d399',
    dark: '#059669',
  },
  
  warning: {
    main: '#f59e0b',
    light: '#fbbf24',
    dark: '#d97706',
  },
  
  danger: {
    main: '#ef4444',
    light: '#f87171',
    dark: '#dc2626',
  },
  
  info: {
    main: '#3b82f6',
    light: '#60a5fa',
    dark: '#2563eb',
  },
  
  // 灰度
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
    950: '#0a0f0a',
  },
};

// 玻璃拟态效果配色
export const glassColors = {
  // 卡片背景
  card: {
    default: 'rgba(255, 255, 255, 0.08)',
    elevated: 'rgba(255, 255, 255, 0.12)',
    subtle: 'rgba(255, 255, 255, 0.05)',
  },
  
  // 边框
  border: {
    default: 'rgba(255, 255, 255, 0.1)',
    elevated: 'rgba(255, 255, 255, 0.15)',
    subtle: 'rgba(255, 255, 255, 0.05)',
    highlight: {
      top: 'rgba(255, 255, 255, 0.2)',
      left: 'rgba(255, 255, 255, 0.15)',
    },
  },
  
  // 阴影
  shadow: {
    sm: 'rgba(0, 0, 0, 0.05)',
    md: 'rgba(0, 0, 0, 0.1)',
    lg: 'rgba(0, 0, 0, 0.15)',
    xl: 'rgba(0, 0, 0, 0.2)',
  },
  
  // 内发光
  innerGlow: {
    default: 'rgba(255, 255, 255, 0.1)',
    strong: 'rgba(255, 255, 255, 0.15)',
  },
};

// 渐变色定义
export const gradients = {
  // 主渐变
  primary: 'linear-gradient(135deg, rgba(0, 255, 135, 0.8), rgba(6, 182, 212, 0.8))',
  primaryLight: 'linear-gradient(135deg, rgba(0, 255, 135, 0.15), rgba(6, 182, 212, 0.1))',
  
  // 次渐变
  secondary: 'linear-gradient(135deg, rgba(6, 182, 212, 0.8), rgba(34, 211, 238, 0.8))',
  secondaryLight: 'linear-gradient(135deg, rgba(6, 182, 212, 0.15), rgba(34, 211, 238, 0.1))',
  
  // 强调渐变
  accent: 'linear-gradient(135deg, rgba(245, 158, 11, 0.8), rgba(251, 191, 36, 0.8))',
  accentLight: 'linear-gradient(135deg, rgba(245, 158, 11, 0.15), rgba(251, 191, 36, 0.1))',
  
  // 背景渐变
  background: 'linear-gradient(to bottom right, rgb(9, 9, 11), rgb(15, 23, 42), rgb(9, 9, 11))',
  backgroundOverlay: 'linear-gradient(to top right, rgba(59, 130, 246, 0.1), transparent, rgba(139, 92, 246, 0.1))',
  
  // 卡片渐变
  card: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.05) 100%)',
  cardHighlight: 'linear-gradient(135deg, rgba(0, 255, 135, 0.15) 0%, rgba(0, 212, 255, 0.1) 100%)',
  
  // 按钮渐变
  buttonPrimary: 'linear-gradient(135deg, rgba(0, 255, 135, 0.8), rgba(6, 182, 212, 0.8))',
  buttonSecondary: 'linear-gradient(135deg, rgba(71, 85, 105, 0.8), rgba(51, 65, 85, 0.8))',
  buttonDanger: 'linear-gradient(135deg, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.8))',
  
  // 光晕
  glow: {
    primary: 'radial-gradient(circle, rgba(0, 255, 135, 0.3), transparent)',
    secondary: 'radial-gradient(circle, rgba(6, 182, 212, 0.25), transparent)',
    accent: 'radial-gradient(circle, rgba(245, 158, 11, 0.3), transparent)',
  },
};

// 模糊效果配置
export const blurConfig = {
  sm: 'blur(8px)',
  md: 'blur(12px)',
  lg: 'blur(20px)',
  xl: 'blur(40px)',
  full: 'blur(20px) saturate(180%)',
};

// 生成渐变文本类
export const textGradient = (from: string, to: string) => ({
  backgroundImage: `linear-gradient(135deg, ${from}, ${to})`,
  backgroundClip: 'text',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
});

// 生成渐变边框类
export const borderGradient = (from: string, to: string) => ({
  borderImage: `linear-gradient(135deg, ${from}, ${to}) 1`,
});

// AI 智能配色生成器（从主色生成完整配色方案）
export class AIColorGenerator {
  static hexToHSL(hex: string): { h: number; s: number; l: number } {
    const r = parseInt(hex.slice(1, 3), 16) / 255;
    const g = parseInt(hex.slice(3, 5), 16) / 255;
    const b = parseInt(hex.slice(5, 7), 16) / 255;
    
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;
    
    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
        case g: h = ((b - r) / d + 2) / 6; break;
        case b: h = ((r - g) / d + 4) / 6; break;
      }
    }
    
    return { h: h * 360, s: s * 100, l: l * 100 };
  }

  static hslToHex(h: number, s: number, l: number): string {
    s /= 100;
    l /= 100;

    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
    const m = l - c / 2;
    let r = 0, g = 0, b = 0;

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0;
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0;
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x;
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c;
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c;
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x;
    }

    const toHex = (val: number) => {
      const hex = Math.round((val + m) * 255).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    };

    return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  }

  static generateColorScheme(primaryColor: string) {
    const hsl = this.hexToHSL(primaryColor);
    
    return {
      primary: primaryColor,
      secondary: this.hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
      accent: this.hslToHex((hsl.h + 180) % 360, hsl.s, hsl.l),
      background: this.hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 80)),
      card: this.hslToHex(hsl.h, hsl.s, Math.max(0, hsl.l - 70)),
      text: this.hslToHex(hsl.h, Math.max(0, hsl.s - 50), Math.min(100, hsl.l + 80)),
    };
  }
}
