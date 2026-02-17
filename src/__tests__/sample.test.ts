import { getLocaleFallbackChain, isValidLocale } from '../hooks/useLocale';

describe('Locale helpers', () => {
  it('returns the Arabic fallback chain ar -> fr -> en', () => {
    expect(getLocaleFallbackChain('ar')).toEqual(['ar', 'fr', 'en']);
  });

  it('returns locale -> en for non-English locales', () => {
    expect(getLocaleFallbackChain('fr')).toEqual(['fr', 'en']);
    expect(getLocaleFallbackChain('es')).toEqual(['es', 'en']);
  });

  it('returns only en when locale is already English', () => {
    expect(getLocaleFallbackChain('en')).toEqual(['en']);
  });

  it('validates supported locale codes', () => {
    expect(isValidLocale('en')).toBe(true);
    expect(isValidLocale('ar')).toBe(true);
    expect(isValidLocale('pt')).toBe(false);
    expect(isValidLocale('')).toBe(false);
  });
});
