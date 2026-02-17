---
name: Marrakech Compass Mobile App
overview: Build a cross-platform iOS/Android travel guide app for Marrakech using Expo (managed workflow) with Mapbox offline maps, hybrid content architecture (bundled JSON + optional Supabase sync), NativeWind styling, and localization for 6 languages, based on the existing marrakech-compass design system.
todos:
  - id: setup-project
    content: Initialize Expo project with TypeScript, NativeWind, copy theme system from marrakech-compass
    status: pending
  - id: setup-navigation
    content: Configure Expo Router with 5-tab navigation and nested routes (place/[id], itinerary/[id], category/[slug])
    status: pending
  - id: content-schema
    content: Create TypeScript types (Place, Itinerary, Pick, Tip) and bundled JSON content files in content/ directory
    status: pending
  - id: setup-i18n
    content: Configure i18next with expo-localization, create translation files for EN/FR/ES/DE/IT/NL/AR (with RTL support)
    status: pending
  - id: state-management
    content: Set up Zustand store for favorites, language preference, offline sync status, and settings persistence
    status: pending
  - id: build-ui-components
    content: Create reusable NativeWind components (Card, Button, PlaceCard, AccordionSection, CategoryPill, etc.)
    status: pending
  - id: build-home-screen
    content: Implement Home with weather widget, Plan Your Trip (itineraries), quick tools, and highlights carousel
    status: pending
  - id: build-picks-screen
    content: Implement Our Picks with editorial-style category cards and rich imagery
    status: pending
  - id: build-explore-screen
    content: Implement Explore with category grid, filters, search, and favorites
    status: pending
  - id: build-maps-screen
    content: Implement Maps tab with Mapbox, offline tiles, POI markers, walking directions, and location tracking
    status: pending
  - id: build-tips-screen
    content: Implement Tips tab with accordion sections including safety and emergency contacts
    status: pending
  - id: build-detail-screens
    content: Create place detail, itinerary detail, and category listing screens
    status: pending
  - id: integrate-mapbox
    content: Configure Mapbox SDK with offline region downloads for Marrakech (Medina + surrounding areas)
    status: pending
  - id: setup-supabase-optional
    content: Set up optional Supabase backend for remote content updates (can be deferred post-MVP)
    status: pending
  - id: polish
    content: Add loading states, animations, error handling, and haptic feedback
    status: pending
  - id: configure-eas
    content: Set up EAS Build for iOS and Android app store deployment
    status: pending
isProject: false
---

# Marrakech Compass Mobile App

## Design Philosophy

This app is designed as a **true offline-first travel companion** - like having Lonely Planet in your pocket. The architecture prioritizes:

1. **Instant usability**: Works fully offline from first launch (bundled content)
2. **Editorial quality**: Curated "best of" picks, not just a database dump
3. **Practical utility**: Quick tools, emergency info, and walking directions
4. **Beautiful UX**: Moroccan-inspired design with smooth animations

---

## Architecture Overview

```mermaid
graph TB
    subgraph UI [UI Layer - NativeWind]
        Tabs[Tab Navigator]
        Home[Home + Plan]
        Picks[Our Picks]
        Explore[Explore]
        Maps[Maps]
        Tips[Tips]
    end

    subgraph State [State Layer]
        Zustand[Zustand Store]
        i18n[i18n Context]
        Favorites[Favorites]
    end

    subgraph Data [Data Layer - Hybrid]
        Bundled[Bundled JSON Content]
        Supabase[Supabase - Optional Remote]
        AsyncStorage[AsyncStorage Cache]
        MapTiles[Mapbox Offline Tiles]
    end

    Tabs --> Home
    Tabs --> Picks
    Tabs --> Explore
    Tabs --> Maps
    Tabs --> Tips

    Home --> Zustand
    Picks --> Zustand
    Explore --> Zustand
    Maps --> MapTiles
    Tips --> Zustand

    Zustand --> Bundled
    Zustand --> Supabase
    Zustand --> AsyncStorage
    Zustand --> Favorites
```

---

## Tech Stack

- **Framework**: Expo SDK 54 (Managed Workflow)
- **Navigation**: Expo Router v6 (file-based routing)
- **Styling**: NativeWind v4 (Tailwind CSS for React Native) + theme tokens from marrakech-compass
- **State Management**: Zustand (persisted to AsyncStorage for offline)
- **Maps**: @rnmapbox/maps with offline tile support
- **i18n**: i18next + react-i18next + expo-localization (EN/FR/ES/DE/IT/NL/AR with RTL)
- **Content**: Hybrid - bundled JSON (offline-first) + optional Supabase sync
- **Storage**: AsyncStorage + expo-file-system for offline content

---

## Project Structure

```
marrakechCompass3/
├── app/                          # Expo Router screens
│   ├── _layout.tsx               # Root layout with providers
│   ├── (tabs)/                   # Main tab navigation
│   │   ├── _layout.tsx           # Tab bar configuration
│   │   ├── index.tsx             # Home + Plan Your Trip
│   │   ├── picks.tsx             # Our Picks / Coup de Coeur
│   │   ├── explore.tsx           # Explore categories
│   │   ├── maps.tsx              # Offline maps
│   │   └── tips.tsx              # Travel tips
│   ├── place/[id].tsx            # Place detail screen
│   ├── itinerary/[id].tsx        # Itinerary detail screen
│   ├── category/[slug].tsx       # Category listing screen
│   └── settings.tsx              # Language & preferences
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Base: Button, Card, Badge, Accordion
│   │   ├── cards/                # PlaceCard, ItineraryCard, PickCard
│   │   ├── maps/                 # MapView, Marker, OfflineIndicator
│   │   └── layout/               # Header, TabBar, SafeArea
│   ├── content/                  # Bundled JSON content (offline-first)
│   │   ├── places.json           # All places data
│   │   ├── itineraries.json      # Trip itineraries
│   │   ├── picks.json            # Curated picks
│   │   └── tips.json             # Toolkit sections
│   ├── hooks/                    # Custom hooks
│   │   ├── useLocale.ts          # Localized content helper
│   │   ├── useFavorites.ts       # Favorites management
│   │   └── useOfflineStatus.ts   # Network/offline detection
│   ├── stores/                   # Zustand stores
│   │   ├── useAppStore.ts        # Main app state
│   │   └── useSettingsStore.ts   # User preferences
│   ├── services/                 # API & utilities
│   │   ├── content.ts            # Content loading (local + remote)
│   │   ├── maps.ts               # Mapbox utilities
│   │   └── supabase.ts           # Optional Supabase client
│   ├── themes/                   # Design system (from marrakech-compass)
│   │   └── index.ts              # Color tokens, typography, spacing
│   ├── i18n/                     # Internationalization
│   │   ├── index.ts              # i18n configuration
│   │   └── locales/              # Translation files
│   │       ├── en.json
│   │       ├── fr.json
│   │       ├── es.json
│   │       ├── de.json
│   │       ├── it.json
│   │       ├── nl.json
│   │       └── ar.json           # Arabic (RTL)
│   └── types/                    # TypeScript types
│       └── index.ts              # Place, Itinerary, Pick, Tip interfaces
├── assets/                       # Images, fonts, icons
│   ├── images/                   # Place photos, hero images
│   └── fonts/                    # Playfair Display, DM Sans
└── tailwind.config.js            # NativeWind configuration
```

---

## Content Data Models

Type-safe interfaces for all content:

```typescript
// Localized string type for multi-language support
type LocalizedString = Record<"en" | "fr" | "es" | "de" | "it" | "nl" | "ar", string>;

interface Place {
  id: string;
  slug: string;
  name: LocalizedString;
  description: LocalizedString;
  category: PlaceCategory;
  coordinates: { lat: number; lng: number };
  address: string;
  neighborhood: string;
  priceRange?: 1 | 2 | 3 | 4;
  rating?: number;
  images: string[];
  tips?: LocalizedString[];
  openingHours?: string;
  phone?: string;
  website?: string;
  featured?: boolean;
}

type PlaceCategory =
  | "restaurant"
  | "cafe"
  | "museum"
  | "gallery"
  | "riad"
  | "hotel"
  | "garden"
  | "courtyard"
  | "shopping"
  | "souk"
  | "hammam"
  | "spa"
  | "monument";

interface Itinerary {
  id: string;
  durationType: "1day" | "weekend" | "long-weekend" | "1week";
  title: LocalizedString;
  description: LocalizedString;
  days: ItineraryDay[];
}

interface ItineraryDay {
  dayNumber: number;
  title: LocalizedString;
  stops: ItineraryStop[];
}

interface ItineraryStop {
  placeId: string;
  timeSlot: string; // "9:00 AM - 11:00 AM"
  notes: LocalizedString;
}

interface Pick {
  id: string;
  category: PickCategory;
  placeId: string;
  title: LocalizedString;
  tagline: LocalizedString;
  whyWeLoveIt: LocalizedString;
  images: string[];
}

type PickCategory =
  | "architecture"
  | "djemaa-el-fna"
  | "shopping"
  | "cuisine"
  | "stay"
  | "hidden-gem"
  | "rooftop-view"
  | "art-design"
  | "cultural"
  | "museum"
  | "new-town"
  | "hammam";

interface TipSection {
  id: string;
  icon: string;
  title: LocalizedString;
  content: LocalizedString[];
}
```

---

## Feature Implementation

### Tab 1: Home + Plan Your Trip

**Hero Section:**

- Live weather widget (Open-Meteo API) with temperature, conditions, humidity
- Language switcher button in header
- Beautiful hero image with gradient overlay

**Plan Your Trip Section:**

- Duration selector chips: 1 Day, Weekend, Long Weekend, 1 Week
- Interactive itinerary cards with expand/collapse animation
- Day-by-day breakdown with timing and place links
- Bookmark/favorite itineraries

**Arrival Mode (Quick Tools):**

- Airport info and transfer options
- First steps checklist
- Emergency contacts quick access
- Currency converter widget
- Prayer times (for context)

**Quick Links:**

- Grid of icons linking to other tabs and key categories

**Don't Miss Carousel:**

- Horizontal scroll of featured highlights with images

---

### Tab 2: Our Picks (Coup de Coeur)

Editorial-style curated recommendations:

- **Best Architectural Experience** - Bahia Palace, Medersa Ben Youssef
- **Best Djemaa El Fna Experience** - timing, stalls, atmosphere tips
- **Best Shopping / Souks** - navigation, what to buy, where
- **Best Dining Experience** - from street food to fine dining
- **Best Place to Stay** - riads with character
- **Best Hidden Gem** - off-the-beaten-path discoveries
- **Best Rooftop View** - sunset spots, cafe terraces
- **Best Art & Design** - galleries, concept stores, artisan workshops
- **Best Cultural Experiences** - cooking classes, calligraphy, music
- **Best Museum Experiences** - Yves Saint Laurent, Dar Si Said, Photography Museum
- **Best Experience in New Town (Gueliz)** - modern cafes, boutiques, nightlife
- **Best Hammam Experience** - traditional vs luxury, what to expect

Each pick features:

- Rich hero imagery
- "Why We Love It" editorial description
- Practical tips
- Tap to view full place detail with map

---

### Tab 3: Explore

**Category Grid:**

- Restaurants & Cafes
- Museums & Galleries
- Riads & Hotels
- Gardens & Courtyards
- Shopping & Souks
- Hammams & Spas
- Day Trips (Atlas Mountains, Essaouira, Ouzoud)

**Features:**

- Search bar with instant filtering
- Filter by: neighborhood, price range, rating
- Place cards with image, name, category, rating, price
- Heart icon to save to favorites
- Tap to view detail screen

**Saved/Favorites:**

- Accessible via header icon
- Persisted offline via Zustand + AsyncStorage

---

### Tab 4: Maps

**Full-screen Mapbox Map:**

- Interactive map centered on Marrakech Medina
- Offline tile support (downloadable ~50MB for full Marrakech region)
- Download progress indicator and status

**POI Markers:**

- Color-coded by category (using theme colors)
- Clustered at low zoom levels
- Tap marker to show place preview card

**Features:**

- Current location indicator (with permission)
- Search places on map
- Walking directions between points (critical for Medina navigation)
- Recenter button
- Layer toggle (streets vs satellite)

**Offline Download Manager:**

- One-tap download for Marrakech region
- Download status: Not downloaded / Downloading / Ready
- Size indicator before download

---

### Tab 5: Tips

Expandable accordion sections with essential travel info:

1. **Getting Around** - Petit taxis, buses, walking in Medina, calèche rides
2. **Language** - Key phrases in Darija/Arabic and French, pronunciation tips
3. **Etiquette & Customs** - Dress code, photography, mosque visits, Ramadan
4. **Climate & Packing** - Best seasons, what to wear, sun protection
5. **Bargaining Guide** - How to negotiate in souks, fair prices
6. **SIM Cards & WiFi** - Where to buy, data packages, cafe WiFi
7. **Food, Drink & Nightlife** - Must-try dishes, water safety, alcohol, bars and clubs
8. **Accommodation** - Riads vs hotels, booking tips, neighborhoods guide
9. **Health & Safe Travels** - Vaccinations, pharmacies, scam awareness, emergency contacts
10. **Money & Tipping** - ATMs, exchange rates, tipping customs
11. **Family Travel** - Kid-friendly activities, stroller tips, family riads
12. **LGBTIQ+ Travellers** - Legal context, safety advice, welcoming spaces
13. **Accessible Travel** - Mobility considerations, accessible riads, tour options
14. **Responsible Travel** - Sustainable tourism, ethical shopping, water conservation
15. **Nuts & Bolts** - Visas, electricity, time zone, public holidays, opening hours

Quick reference cards for most important info.

---

### Settings Screen

- **Language Selection**: EN / FR / ES / DE / IT / NL / AR (with flag icons, RTL support for Arabic)
- **Offline Maps**: Download status, manage storage
- **Clear Cache**: Reset local data
- **About**: App version, credits, feedback link

---

## Design System (from marrakech-compass)

### Colors (Moroccan-inspired)

```javascript
colors: {
  primary: '#C65D3B',      // Terracotta
  secondary: '#356B66',    // Teal
  accent: '#D9A441',       // Gold
  background: '#F7F4F0',   // Warm sand
  foreground: '#2D2622',   // Dark brown
  card: '#EFE9E2',         // Light sand
  muted: '#E5DFD6',
  mutedForeground: '#7A7471',
  border: '#DDD6CC',
  // Custom tokens
  terracotta: '#C65D3B',
  terracottaLight: '#D98B70',
  teal: '#356B66',
  tealLight: '#4D8A84',
  sand: '#D4C4A8',
  gold: '#D9A441',
  ochre: '#B07832',
}
```

### Typography

- **Display**: Playfair Display (headings, hero text)
- **Body**: DM Sans (content, UI text)
- Sizes: xs (10) to 4xl (30)

### NativeWind Integration

Extend Tailwind config with theme tokens:

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        terracotta: { DEFAULT: "#C65D3B", light: "#D98B70" },
        teal: { DEFAULT: "#356B66", light: "#4D8A84" },
        sand: { DEFAULT: "#D4C4A8", light: "#EBE4D6" },
        gold: "#D9A441",
        ochre: "#B07832",
      },
      fontFamily: {
        display: ["PlayfairDisplay"],
        body: ["DMSans"],
      },
    },
  },
};
```

---

## Key Dependencies

```json
{
  "expo": "~54.0.0",
  "expo-router": "~6.0.0",
  "@rnmapbox/maps": "^10.0.0",
  "nativewind": "^4.0.0",
  "tailwindcss": "^3.4.0",
  "zustand": "^4.5.0",
  "i18next": "^23.0.0",
  "react-i18next": "^14.0.0",
  "expo-localization": "~16.0.0",
  "@react-native-async-storage/async-storage": "^2.0.0",
  "@expo/vector-icons": "^15.0.0",
  "expo-font": "~14.0.0",
  "expo-linear-gradient": "~15.0.0",
  "@supabase/supabase-js": "^2.0.0"
}
```

---

## Offline Strategy

### Content (Bundled JSON - Offline First)

1. All content ships with the app in `src/content/*.json`
2. App works 100% offline from first launch
3. Optional: Check Supabase for content updates when online
4. Sync updated content to AsyncStorage cache
5. Fall back to bundled content if no network

### Maps (Mapbox Offline Tiles)

1. On first launch, prompt user to download offline maps
2. Download Marrakech region (~50MB): Medina + Gueliz + Palmeraie
3. Tiles cached via Mapbox SDK offline manager
4. Show download progress and completion status
5. Maps work fully offline once downloaded

### Favorites & Settings

- Persisted immediately via Zustand + AsyncStorage
- No network required

---

## Implementation Order

1. **Project Setup**: Initialize Expo, configure NativeWind, set up folder structure, copy theme
2. **Navigation**: Expo Router with 5 tabs and nested routes
3. **Content & Types**: Create TypeScript interfaces and bundled JSON files
4. **i18n**: Configure multi-language support with language switcher
5. **UI Components**: Build reusable NativeWind components
6. **Home Screen**: Weather, Plan Your Trip, quick tools, highlights
7. **Our Picks Screen**: Editorial category cards with rich imagery
8. **Explore Screen**: Category grid, search, filters, favorites
9. **Tips Screen**: Accordion sections with comprehensive travel info
10. **Detail Screens**: Place detail, itinerary detail, category listing
11. **State Management**: Zustand for favorites, settings, sync status
12. **Maps Integration**: Mapbox with offline tiles and POI markers
13. **Polish**: Loading states, animations, error handling, haptics
14. **Supabase (Optional)**: Remote content updates for post-MVP
15. **EAS Build**: Configure for iOS and Android app stores
16. **Content Population**: Add comprehensive Marrakech content
