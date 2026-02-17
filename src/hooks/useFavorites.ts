/**
 * Hook for managing favorites
 */

import type { Favorite } from '../types';

export interface UseFavoritesResult {
  favorites: Favorite[];
  isLoading: boolean;
  isFavorite: (contentType: string, contentId: string) => boolean;
  toggleFavorite: (contentType: string, contentId: string) => Promise<void>;
  addFavorite: (contentType: string, contentId: string) => Promise<void>;
  removeFavorite: (contentType: string, contentId: string) => Promise<void>;
}

// Placeholder - will be implemented in Phase D
// Uses Promise.resolve() to satisfy @typescript-eslint/require-await
export function useFavorites(): UseFavoritesResult {
  return {
    favorites: [],
    isLoading: false,
    isFavorite: (): boolean => false,
    toggleFavorite: (): Promise<void> => Promise.resolve(),
    addFavorite: (): Promise<void> => Promise.resolve(),
    removeFavorite: (): Promise<void> => Promise.resolve(),
  };
}
