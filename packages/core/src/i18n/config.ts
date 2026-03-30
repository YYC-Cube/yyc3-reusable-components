export interface I18nConfig {
  defaultLocale: string;
  supportedLocales: string[];
  fallbackLocale: string;
  localeDetection: 'browser' | 'cookie' | 'storage' | 'manual';
}

export const i18nConfig: I18nConfig = {
  defaultLocale: 'zh',
  supportedLocales: ['zh', 'en', 'ar'],
  fallbackLocale: 'en',
  localeDetection: 'browser',
};

export type Locale = (typeof i18nConfig.supportedLocales)[number];
