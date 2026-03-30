export function useUISettings() {
  return {
    theme: 'dark' as const,
    setTheme: (_theme: string) => {},
    fontSize: 'medium' as const,
    setFontSize: (_size: string) => {},
    fontFamily: 'system-ui' as const,
    setFontFamily: (_font: string) => {},
    activeFontSize: 'medium',
    activeFontFamily: 'system-ui',
    activeTheme: 'dark',
  };
}
