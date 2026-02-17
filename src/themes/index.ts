/**
 * Marrakech Compass Design System
 * Moroccan-inspired color palette and typography
 */

export const colors = {
  // Primary palette
  primary: '#C65D3B', // Terracotta
  secondary: '#356B66', // Teal
  accent: '#D9A441', // Gold

  // Backgrounds
  background: '#F7F4F0', // Warm sand
  foreground: '#2D2622', // Dark brown
  card: '#EFE9E2', // Light sand
  muted: '#E5DFD6',
  mutedForeground: '#7A7471',
  border: '#DDD6CC',

  // Extended palette
  terracotta: '#C65D3B',
  terracottaLight: '#D98B70',
  teal: '#356B66',
  tealLight: '#4D8A84',
  sand: '#D4C4A8',
  sandLight: '#EBE4D6',
  gold: '#D9A441',
  ochre: '#B07832',

  // Dark mode
  backgroundDark: '#14110F',
  foregroundDark: '#F3EEE7',
  cardDark: '#1E1916',

  // Semantic
  success: '#4A9B7F',
  warning: '#D9A441',
  error: '#C65D3B',
  info: '#356B66',
} as const;

export const typography = {
  fontFamily: {
    display: 'PlayfairDisplay',
    body: 'DMSans',
  },
  fontSize: {
    xs: 10,
    sm: 12,
    base: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 28,
    '4xl': 30,
  },
  fontWeight: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
  },
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.75,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  base: 16,
  lg: 20,
  xl: 24,
  '2xl': 32,
  '3xl': 40,
  '4xl': 48,
} as const;

export const borderRadius = {
  sm: 4,
  md: 8,
  lg: 12,
  xl: 16,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  lg: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
} as const;

export type Theme = typeof theme;
export type Colors = typeof colors;
export type Typography = typeof typography;
