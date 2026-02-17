/**
 * Hook for locale selection with fallback chain
 * e.g., ar → fr → en
 */

import { supportedLocales, defaultLocale, type SupportedLocale } from '../i18n';

export interface UseLocaleResult {
  locale: SupportedLocale;
  isRTL: boolean;
  setLocale: (locale: SupportedLocale) => void;
  fallbackChain: SupportedLocale[];
}

// Placeholder - will be implemented with i18next in Phase B
export function useLocale(): UseLocaleResult {
  return {
    locale: defaultLocale,
    isRTL: false,
    setLocale: () => undefined,
    fallbackChain: [defaultLocale],
  };
}

export function getLocaleFallbackChain(locale: SupportedLocale): SupportedLocale[] {
  // Arabic falls back to French, then English
  if (locale === 'ar') {
    return ['ar', 'fr', 'en'];
  }
  // All others fall back to English
  if (locale !== 'en') {
    return [locale, 'en'];
  }
  return ['en'];
}

export function isValidLocale(locale: string): locale is SupportedLocale {
  return supportedLocales.includes(locale as SupportedLocale);
}
