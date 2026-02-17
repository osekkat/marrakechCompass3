/**
 * Typed data access layer for SQLite databases
 * Provides reactive queries with auto-invalidation on content swap
 */

import type {
  Place,
  Itinerary,
  Pick,
  TipSection,
  Phrase,
  Favorite,
  PlaceCategory,
  Locale,
} from '../types';

// Placeholder interfaces - will be implemented in Phase D

export interface PlaceFilters {
  category?: PlaceCategory;
  neighborhood?: string;
  priceRange?: (1 | 2 | 3 | 4)[];
  minRating?: number;
  openNow?: boolean;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export interface SearchOptions {
  query: string;
  locale: Locale;
  filters?: PlaceFilters;
  limit?: number;
}

/** Content type for favorites */
export type FavoriteContentType = 'place' | 'itinerary' | 'pick';

export interface Repository {
  // Places
  getPlace(id: string, locale: Locale): Promise<Place | null>;
  getPlaces(locale: Locale, filters?: PlaceFilters): Promise<Place[]>;
  searchPlaces(options: SearchOptions): Promise<Place[]>;

  // Itineraries
  getItinerary(id: string, locale: Locale): Promise<Itinerary | null>;
  getItineraries(locale: Locale, durationType?: Itinerary['durationType']): Promise<Itinerary[]>;

  // Picks
  getPick(id: string, locale: Locale): Promise<Pick | null>;
  getPicks(locale: Locale, category?: Pick['category']): Promise<Pick[]>;

  // Tips
  getTipSection(id: string, locale: Locale): Promise<TipSection | null>;
  getTipSections(locale: Locale): Promise<TipSection[]>;

  // Phrases
  getPhrases(locale: Locale, category?: Phrase['category']): Promise<Phrase[]>;

  // Favorites (user DB)
  getFavorites(): Promise<Favorite[]>;
  addFavorite(contentType: FavoriteContentType, contentId: string): Promise<void>;
  removeFavorite(contentType: FavoriteContentType, contentId: string): Promise<void>;
  isFavorite(contentType: FavoriteContentType, contentId: string): Promise<boolean>;
}

// Placeholder implementation - returns Promise.resolve() to satisfy interface
// without triggering @typescript-eslint/require-await lint rule
export const createRepository = (): Repository => {
  return {
    getPlace: (): Promise<Place | null> => Promise.resolve(null),
    getPlaces: (): Promise<Place[]> => Promise.resolve([]),
    searchPlaces: (): Promise<Place[]> => Promise.resolve([]),
    getItinerary: (): Promise<Itinerary | null> => Promise.resolve(null),
    getItineraries: (): Promise<Itinerary[]> => Promise.resolve([]),
    getPick: (): Promise<Pick | null> => Promise.resolve(null),
    getPicks: (): Promise<Pick[]> => Promise.resolve([]),
    getTipSection: (): Promise<TipSection | null> => Promise.resolve(null),
    getTipSections: (): Promise<TipSection[]> => Promise.resolve([]),
    getPhrases: (): Promise<Phrase[]> => Promise.resolve([]),
    getFavorites: (): Promise<Favorite[]> => Promise.resolve([]),
    addFavorite: (): Promise<void> => Promise.resolve(),
    removeFavorite: (): Promise<void> => Promise.resolve(),
    isFavorite: (): Promise<boolean> => Promise.resolve(false),
  };
};
