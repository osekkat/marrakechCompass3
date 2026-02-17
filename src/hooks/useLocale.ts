/**
 * Hook for locale selection with fallback chain
 * e.g., ar → fr → en
 */

import { useCallback, useMemo, useState } from 'react';
import {
  supportedLocales,
  defaultLocale,
  isRTL as isRTLLocale,
  type SupportedLocale,
} from '../i18n';

export interface UseLocaleResult {
  locale: SupportedLocale;
  isRTL: boolean;
  setLocale: (locale: SupportedLocale) => void;
  fallbackChain: SupportedLocale[];
}

// Placeholder - will be implemented with i18next in Phase B
export function useLocale(): UseLocaleResult {
  const [locale, setLocaleState] = useState<SupportedLocale>(defaultLocale);

  const setLocale = useCallback((nextLocale: SupportedLocale): void => {
    setLocaleState(nextLocale);
  }, []);

  const fallbackChain = useMemo((): SupportedLocale[] => {
    return getLocaleFallbackChain(locale);
  }, [locale]);

  return {
    locale,
    isRTL: isRTLLocale(locale),
    setLocale,
    fallbackChain,
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
  return supportedLocales.some((supportedLocale) => supportedLocale === locale);
}
