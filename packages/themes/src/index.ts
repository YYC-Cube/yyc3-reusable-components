/**
 * @yyc3/themes
 * YYC³ Theme System - Cyberpunk, Liquid Glass, and more
 */

export const ThemeType = {
  CYBERPUNK: 'cyberpunk',
  LIQUID_GLASS: 'liquid-glass',
  DARK: 'dark',
  LIGHT: 'light',
} as const;

export type ThemeTypeValue = (typeof ThemeType)[keyof typeof ThemeType];

export interface ThemeConfig {
  name: string;
  type: ThemeTypeValue;
  primaryColor: string;
  accentColor: string;
  backgroundColor: string;
}

export const themes: Record<string, ThemeConfig> = {
  cyberpunk: {
    name: 'Cyberpunk',
    type: ThemeType.CYBERPUNK,
    primaryColor: '#00f0ff',
    accentColor: '#00ffcc',
    backgroundColor: '#0a0a0a',
  },
  'liquid-glass': {
    name: 'Liquid Glass',
    type: ThemeType.LIQUID_GLASS,
    primaryColor: '#00ff87',
    accentColor: '#00d4ff',
    backgroundColor: '#0a0f0a',
  },
  dark: {
    name: 'Dark',
    type: ThemeType.DARK,
    primaryColor: '#6366f1',
    accentColor: '#8b5cf6',
    backgroundColor: '#0f172a',
  },
  light: {
    name: 'Light',
    type: ThemeType.LIGHT,
    primaryColor: '#3b82f6',
    accentColor: '#6366f1',
    backgroundColor: '#ffffff',
  },
};

export function getTheme(name: string): ThemeConfig | undefined {
  return themes[name];
}

export function applyTheme(name: string): void {
  const theme = getTheme(name);
  if (!theme) {
    console.warn(`Theme "${name}" not found`);
    return;
  }

  document.documentElement.setAttribute('data-theme', name);
  document.documentElement.className = `theme-${name}`;
}
