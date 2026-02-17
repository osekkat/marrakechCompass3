/**
 * Typed data access layer for SQLite databases
 * Provides reactive queries with auto-invalidation on content swap
 */

import type { Place, Itinerary, Pick, TipSection, Phrase, Favorite } from '../types';

// Placeholder interfaces - will be implemented in Phase D

export interface PlaceFilters {
  category?: string;
  neighborhood?: string;
  priceRange?: number[];
  minRating?: number;
  openNow?: boolean;
  featured?: boolean;
  limit?: number;
  offset?: number;
}

export interface SearchOptions {
  query: string;
  locale: string;
  filters?: PlaceFilters;
  limit?: number;
}

export interface Repository {
  // Places
  getPlace(id: string, locale: string): Promise<Place | null>;
  getPlaces(locale: string, filters?: PlaceFilters): Promise<Place[]>;
  searchPlaces(options: SearchOptions): Promise<Place[]>;

  // Itineraries
  getItinerary(id: string, locale: string): Promise<Itinerary | null>;
  getItineraries(locale: string, durationType?: string): Promise<Itinerary[]>;

  // Picks
  getPick(id: string, locale: string): Promise<Pick | null>;
  getPicks(locale: string, category?: string): Promise<Pick[]>;

  // Tips
  getTipSection(id: string, locale: string): Promise<TipSection | null>;
  getTipSections(locale: string): Promise<TipSection[]>;

  // Phrases
  getPhrases(locale: string, category?: string): Promise<Phrase[]>;

  // Favorites (user DB)
  getFavorites(): Promise<Favorite[]>;
  addFavorite(contentType: string, contentId: string): Promise<void>;
  removeFavorite(contentType: string, contentId: string): Promise<void>;
  isFavorite(contentType: string, contentId: string): Promise<boolean>;
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
