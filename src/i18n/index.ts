/**
 * i18n configuration for Marrakech Compass
 * Supports: EN, FR, ES, DE, IT, NL, AR (with RTL)
 */

// Placeholder - will be configured with i18next in Phase B
export const supportedLocales = ['en', 'fr', 'es', 'de', 'it', 'nl', 'ar'] as const;
export type SupportedLocale = (typeof supportedLocales)[number];

export const rtlLocales = ['ar'] as const;
export type RTLLocale = (typeof rtlLocales)[number];

export function isRTL(locale: SupportedLocale): boolean {
  return rtlLocales.includes(locale as RTLLocale);
}

export const localeNames: Record<SupportedLocale, string> = {
  en: 'English',
  fr: 'Français',
  es: 'Español',
  de: 'Deutsch',
  it: 'Italiano',
  nl: 'Nederlands',
  ar: 'العربية',
};

export const defaultLocale: SupportedLocale = 'en';
export const fallbackLocale: SupportedLocale = 'en';
