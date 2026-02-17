/**
 * Core TypeScript types for Marrakech Compass
 * Based on plan.md data models
 */

/**
 * Supported locales for the app.
 * Must match supportedLocales in src/i18n/index.ts
 */
export type Locale = 'en' | 'fr' | 'es' | 'de' | 'it' | 'nl' | 'ar';
export type ISODateTime = string; // ISO 8601

export type PlaceCategory =
  | 'restaurant'
  | 'cafe'
  | 'museum'
  | 'gallery'
  | 'riad'
  | 'hotel'
  | 'garden'
  | 'courtyard'
  | 'shopping'
  | 'souk'
  | 'hammam'
  | 'spa'
  | 'monument';

export type PickCategory =
  | 'architecture'
  | 'djemaa-el-fna'
  | 'shopping'
  | 'cuisine'
  | 'stay'
  | 'hidden-gem'
  | 'rooftop-view'
  | 'art-design'
  | 'cultural'
  | 'museum'
  | 'new-town'
  | 'hammam';

export type PhraseCategory =
  | 'greeting'
  | 'shopping'
  | 'directions'
  | 'food'
  | 'emergency'
  | 'transport'
  | 'courtesy';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface PlaceImage {
  basePath: string;
  widths: number[];
  thumbhash: string;
  aspectRatio: number;
  alt?: string;
}

export interface OpeningHours {
  timezone: string;
  weekly: Partial<
    Record<'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun', { start: string; end: string }[]>
  >;
  notes?: string;
  exceptions?: {
    date: string;
    closed?: boolean;
    ranges?: { start: string; end: string }[];
    note?: string;
  }[];
}

export interface PlaceBase {
  id: string;
  slug: string;
  category: PlaceCategory;
  coordinates: Coordinates;
  neighborhood: string;
  priceRange?: 1 | 2 | 3 | 4;
  rating?: number;
  images: PlaceImage[];
  openingHours?: OpeningHours;
  contacts?: { address?: string; phone?: string; website?: string };
  featured?: boolean;
  status?: 'open' | 'temporarily-closed' | 'seasonal';
  lastVerifiedAt?: ISODateTime;
  accessibilityTags?: ('wheelchair' | 'step-free' | 'family-friendly')[];
}

export interface PlaceI18n {
  placeId: string;
  locale: Locale;
  name: string;
  description: string;
  tips?: string[];
  searchKeywords?: string[];
}

export type Place = PlaceBase & PlaceI18n;

export interface ItineraryStop {
  placeId: string;
  timeSlot: string;
  notes: string;
}

export interface ItineraryDay {
  dayNumber: number;
  title: string;
  stops: ItineraryStop[];
}

export interface Itinerary {
  id: string;
  durationType: '1day' | 'weekend' | 'long-weekend' | '1week';
  locale: Locale;
  title: string;
  description: string;
  days: ItineraryDay[];
}

export interface Pick {
  id: string;
  category: PickCategory;
  placeId: string;
  locale: Locale;
  title: string;
  tagline: string;
  whyWeLoveIt: string;
  images: string[];
}

export interface TipSection {
  id: string;
  icon: string;
  locale: Locale;
  title: string;
  content: string[];
  lastReviewedAt: ISODateTime;
  sourceRefs?: string[];
  safetyLevel?: 'general' | 'important' | 'critical';
}

export interface Phrase {
  id: string;
  category: PhraseCategory;
  locale: Locale;
  english: string;
  darija: string;
  darijaLatin: string;
  french: string;
  audioPath?: string;
}

export interface DayTrip {
  id: string;
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  heroImage: PlaceImage;
  travelTimeMinutes: number;
  transportOptions: {
    mode: 'private-car' | 'shared-minibus' | 'bus' | 'organized-tour';
    description: string;
    estimatedCostDH?: { min: number; max: number };
  }[];
  bestMonths: number[];
  packingTips: string[];
  highlights: { placeId?: string; name: string; description: string }[];
  warnings?: string[];
  lastVerifiedAt: ISODateTime;
}

export interface ContentManifest {
  version: string;
  sequence: number;
  publishedAt: ISODateTime;
  minAppVersion: string;
  checksum: string;
  signature: string;
  deltaFrom?: string[];
  packChecksums: Record<string, string>;
  signingKeyIndex: number;
}

// User data types
export interface Favorite {
  id: number;
  contentType: 'place' | 'itinerary' | 'pick';
  contentId: string;
  createdAt: ISODateTime;
}

export interface Note {
  id: number;
  contentType: string;
  contentId: string;
  noteText: string;
  createdAt: ISODateTime;
  updatedAt: ISODateTime;
}

export interface ChecklistItem {
  id: number;
  title: string;
  completed: boolean;
  sortOrder: number;
  createdAt: ISODateTime;
}

export interface IssueReport {
  id: number;
  contentType: string;
  contentId: string;
  reportType: 'incorrect' | 'closed' | 'outdated' | 'other';
  details?: string;
  createdAt: ISODateTime;
  synced: boolean;
}
