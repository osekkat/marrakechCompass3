/**
 * Main app state store using Zustand
 * Handles UI state and sync coordination
 */

// Placeholder - will be implemented in Phase D
export interface AppState {
  isInitialized: boolean;
  isOnline: boolean;
  activeLocale: string;
  contentVersion: string | null;
}

export interface AppActions {
  setInitialized: (initialized: boolean) => void;
  setOnline: (online: boolean) => void;
  setActiveLocale: (locale: string) => void;
  setContentVersion: (version: string | null) => void;
}

// Placeholder export
export const useAppStore = (): AppState & AppActions => {
  return {
    isInitialized: false,
    isOnline: true,
    activeLocale: 'en',
    contentVersion: null,
    setInitialized: () => undefined,
    setOnline: () => undefined,
    setActiveLocale: () => undefined,
    setContentVersion: () => undefined,
  };
};
