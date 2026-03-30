import { Locale } from './config';

export interface Translation {
  [key: string]: string | Translation;
}

export class I18nManager {
  private currentLocale: Locale = 'zh';
  private translations: Map<Locale, Translation> = new Map();
  private fallbackLocale: Locale = 'en';

  constructor() {
    this.loadTranslations();
  }

  async loadTranslations(): Promise<void> {
    const locales = ['zh', 'en', 'ar'] as Locale[];
    
    for (const locale of locales) {
      try {
        const translation = await import(`./locales/${locale}.json`);
        this.translations.set(locale, translation.default);
      } catch (error) {
        console.error(`Failed to load translation for ${locale}:`, error);
      }
    }
  }

  setLocale(locale: Locale): void {
    if (this.translations.has(locale)) {
      this.currentLocale = locale;
      document.documentElement.lang = locale;
      document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
    } else {
      console.warn(`Locale ${locale} not supported`);
    }
  }

  getLocale(): Locale {
    return this.currentLocale;
  }

  t(key: string, params?: Record<string, any>): string {
    const translation = this.translations.get(this.currentLocale);
    const fallbackTranslation = this.translations.get(this.fallbackLocale);
    
    let value = this.getNestedValue(translation, key);
    
    if (!value) {
      value = this.getNestedValue(fallbackTranslation, key);
    }

    if (value && params) {
      value = this.interpolate(value, params);
    }

    return value || key;
  }

  private getNestedValue(obj: Translation | undefined, key: string): string | undefined {
    const keys = key.split('.');
    let value: any = obj;
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value;
  }

  private interpolate(template: string, params: Record<string, any>): string {
    return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
      return params[key] !== undefined ? String(params[key]) : match;
    });
  }
}

export const i18nManager = new I18nManager();
export const t = (key: string, params?: Record<string, any>) => i18nManager.t(key, params);
