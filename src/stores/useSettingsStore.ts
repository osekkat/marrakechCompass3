/**
 * User settings store using Zustand
 * Persisted via AsyncStorage
 */

// Placeholder - will be implemented in Phase D
export interface SettingsState {
  theme: 'system' | 'light' | 'dark';
  locale: string | null; // null = use system locale
  wifiOnlyDownloads: boolean;
  reduceMotion: boolean;
  textScale: number;
}

export interface SettingsActions {
  setTheme: (theme: 'system' | 'light' | 'dark') => void;
  setLocale: (locale: string | null) => void;
  setWifiOnlyDownloads: (value: boolean) => void;
  setReduceMotion: (value: boolean) => void;
  setTextScale: (scale: number) => void;
}

// Placeholder export
export const useSettingsStore = (): SettingsState & SettingsActions => {
  return {
    theme: 'system',
    locale: null,
    wifiOnlyDownloads: true,
    reduceMotion: false,
    textScale: 1,
    setTheme: () => undefined,
    setLocale: () => undefined,
    setWifiOnlyDownloads: () => undefined,
    setReduceMotion: () => undefined,
    setTextScale: () => undefined,
  };
};
