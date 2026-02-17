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
        Zustand[Zustand UI State]
        SyncStore[Zustand Sync Coordinator]
        i18n[i18n Context]
        UserData[User Data Store]
    end

    subgraph Data [Data Layer - Offline Core]
        Bundle[Bundled Baseline Content Pack]
        Manifest[Signed Content Manifest]
        Scheduler[Background Update Scheduler]
        Updater[Content Updater (ETag + Range + Resume)]
        Sync[Delta Apply + Rollback]
        SQLite[SQLite Content DB (catalog + per-locale FTS)]
        UserDB[SQLite User DB (favorites, notes, reports)]
        FileCache[File-system Asset Cache]
        MapTiles[Mapbox Offline Packs]
    end

    subgraph Remote [Remote Publishing (outside the app)]
        CMS[Supabase (CMS / Editorial)]
        Builder[Content Build + QA + Sign (CI)]
        CDN[CDN: manifest + content packs]
        CMS --> Builder --> CDN
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

    Zustand --> Repository
    Repository --> SQLite
    SyncStore -.->|"content-swapped" event| Repository
    Zustand --> UserDB
    SyncStore --> Scheduler
    Scheduler --> Updater
    Updater --> Manifest
    Updater --> CDN
    Updater --> FileCache
    Updater --> Sync
```

---

## Tech Stack

- **Framework**: Expo SDK 54 (Managed Workflow)
- **Navigation**: Expo Router v6 (file-based routing)
- **Deep Linking**: Expo Router universal links + `expo-linking` for share-to-app flows
- **Styling**: NativeWind v4 (Tailwind CSS for React Native) + theme tokens from marrakech-compass
- **State Management**: Zustand (UI/user state + sync coordination)
- **Maps**: @rnmapbox/maps with offline tile support
- **i18n**: i18next + react-i18next + expo-localization (EN/FR/ES/DE/IT/NL/AR with RTL)
- **Content**: Pack-based - bundled baseline pack + signed updates from CDN (Supabase used only for authoring)
- **Background tasks**: expo-task-manager + expo-background-fetch (manifest checks + resumable downloads)
- **Storage**: AsyncStorage (settings only) + expo-sqlite (content DB + user DB) + expo-file-system (assets/packs)
- **Data Validation**: Zod schemas for all inbound content (bundled and synced)

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
│   ├── day-trip/[id].tsx         # Day trip detail screen
│   ├── phrasebook.tsx            # Offline phrase book (accessible from Tips + Home quick tools)
│   ├── my-trip.tsx               # Saved places + itineraries + notes + checklist
│   └── settings.tsx              # Language & preferences
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Base: Button, Card, Badge, Accordion
│   │   ├── cards/                # PlaceCard, ItineraryCard, PickCard
│   │   ├── maps/                 # MapView, Marker, OfflineIndicator
│   │   └── layout/               # Header, TabBar, SafeArea
│   ├── content/                  # Bundled baseline packs (offline-first)
│   │   ├── manifest.json         # Baseline manifest (mirrors remote format)
│   │   └── packs/                # One folder per locale (loaded on demand)
│   │       ├── en/
│   │       │   ├── places.json
│   │       │   ├── itineraries.json
│   │       │   ├── picks.json
│   │       │   └── tips.json
│   │       └── ...               # fr/es/de/it/nl/ar
│   ├── hooks/                    # Custom hooks
│   │   ├── useLocale.ts          # Locale selection + fallback chain (e.g., ar → fr → en)
│   │   ├── useFavorites.ts       # Favorites management
│   │   └── useOfflineStatus.ts   # Network/offline detection
│   ├── data/                     # Local persistence + repositories
│   │   ├── schema.ts             # SQLite schema and migrations
│   │   ├── repository.ts         # Typed read/write data access (places, itineraries, picks, tips)
│   │   └── useContentQuery.ts    # Reactive hook: subscribes to DB change events, auto-invalidates on content swap
│   ├── sync/                     # Remote update pipeline
│   │   ├── manifest.ts           # Version/checksum handling
│   │   ├── downloader.ts         # Resumable pack/delta download (ETag + Range)
│   │   ├── scheduler.ts          # Background checks + constraints (Wi‑Fi only, low battery, etc.)
│   │   ├── installer.ts          # Staged install + atomic activation
│   │   └── rollback.ts           # Last-known-good recovery
│   ├── search/                   # Offline search/indexing
│   │   ├── fts.ts                # FTS5 queries (BM25 ranking)
│   │   ├── indexer.ts            # Build/refresh indexes per locale
│   │   └── suggest.ts            # Suggestions (recents, categories, did-you-mean)
│   ├── routing/                  # Offline routing
│   │   ├── graph.ts              # Graph loader + in-memory structures
│   │   ├── astar.ts              # Pathfinding
│   │   └── instructions.ts       # Turn hint generation
│   ├── user/                     # User-generated data (offline-first)
│   │   ├── favorites.ts          # Saved places/itineraries
│   │   ├── notes.ts              # Notes + checklist items
│   │   └── reports.ts            # Issue reports (offline queue → upload on connect)
│   ├── monitoring/               # Telemetry + crash integration
│   │   ├── crash.ts
│   │   └── events.ts
│   ├── stores/                   # Zustand stores
│   │   ├── useAppStore.ts        # Main app state
│   │   └── useSettingsStore.ts   # User preferences
│   ├── services/                 # API & utilities
│   │   ├── content.ts            # Content loading (local + remote)
│   │   ├── maps.ts               # Mapbox utilities
│   │   ├── routing.ts            # Offline routing graph + A* pathfinding
│   │   └── contentApi.ts         # CDN fetcher (manifest + packs)
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

tools/                            # Build-time tooling (not shipped in app bundle)
└── content/                      # Export from CMS → validate → pack/delta → sign → upload to CDN
```

---

## Content Data Models

Type-safe interfaces for all content:

```typescript
type Locale = "en" | "fr" | "es" | "de" | "it" | "nl" | "ar";
type ISODateTime = string; // ISO 8601

// Editorial content is stored per-locale in SQLite and only the active locale is read into memory.
// Fallback chain example: device locale → user-selected locale → "fr" → "en".

interface OpeningHours {
  timezone: string; // e.g. "Africa/Casablanca"
  weekly: Partial<Record<
    "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun",
    { start: string; end: string }[] // "HH:mm" 24h
  >>;
  notes?: string;
  exceptions?: { date: string; closed?: boolean; ranges?: { start: string; end: string }[]; note?: string }[];
}

interface PlaceImage {
  /** Relative path within the content pack (e.g. "images/places/bahia-1") */
  basePath: string;
  /** Available widths; app selects best match for device pixel density */
  widths: number[];          // e.g. [400, 800, 1200]
  /** ThumbHash string for instant placeholder rendering */
  thumbhash: string;
  /** Aspect ratio (width/height) to reserve layout space and prevent CLS */
  aspectRatio: number;
  alt?: string;
}

interface PlaceBase {
  id: string;
  slug: string;
  category: PlaceCategory;
  coordinates: { lat: number; lng: number };
  neighborhood: string;
  priceRange?: 1 | 2 | 3 | 4;
  rating?: number;
  images: PlaceImage[];
  openingHours?: OpeningHours;
  contacts?: { address?: string; phone?: string; website?: string };
  featured?: boolean;
  status?: "open" | "temporarily-closed" | "seasonal";
  lastVerifiedAt?: ISODateTime;
  accessibilityTags?: ("wheelchair" | "step-free" | "family-friendly")[];
}

interface PlaceI18n {
  placeId: string;
  locale: Locale;
  name: string;
  description: string;
  tips?: string[];
  // Optional synonyms/transliterations to improve offline search quality
  searchKeywords?: string[];
}

// Convenience shape used by UI (base + active locale row)
type Place = PlaceBase & PlaceI18n;

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

interface DayTrip {
  id: string;
  slug: string;
  locale: Locale;
  title: string;
  description: string;
  heroImage: PlaceImage;
  /** Approximate one-way travel time from Marrakech center */
  travelTimeMinutes: number;
  /** How to get there */
  transportOptions: {
    mode: "private-car" | "shared-minibus" | "bus" | "organized-tour";
    description: string;
    estimatedCostDH?: { min: number; max: number };
  }[];
  /** Best months to visit (1-12) */
  bestMonths: number[];
  /** What to bring */
  packingTips: string[];
  highlights: { placeId?: string; name: string; description: string }[];
  warnings?: string[];
  lastVerifiedAt: ISODateTime;
}

interface Phrase {
  id: string;
  category: "greeting" | "shopping" | "directions" | "food" | "emergency" | "transport" | "courtesy";
  locale: Locale;
  english: string;
  darija: string;
  darijaLatin: string;           // Transliteration for pronunciation
  french: string;
  /** Relative path to bundled audio clip (compressed Opus, ~2-5 KB each) */
  audioPath?: string;
}

interface Itinerary {
  id: string;
  durationType: "1day" | "weekend" | "long-weekend" | "1week";
  locale: Locale;
  title: string;
  description: string;
  days: ItineraryDay[];
}

interface ItineraryDay {
  dayNumber: number;
  title: string;
  stops: ItineraryStop[];
}

interface ItineraryStop {
  placeId: string;
  timeSlot: string; // "9:00 AM - 11:00 AM"
  notes: string;
}

interface Pick {
  id: string;
  category: PickCategory;
  placeId: string;
  locale: Locale;
  title: string;
  tagline: string;
  whyWeLoveIt: string;
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
  locale: Locale;
  title: string;
  content: string[];
  lastReviewedAt: ISODateTime;
  sourceRefs?: string[];
  safetyLevel?: "general" | "important" | "critical";
}

interface ContentManifest {
  version: string;
  /** Monotonic integer that must strictly increase; reject manifests with lower or equal sequence */
  sequence: number;
  publishedAt: ISODateTime;
  minAppVersion: string;
  checksum: string;            // SHA-256 of manifest payload
  signature: string;           // Ed25519 signature of manifest payload
  deltaFrom?: string[];
  /** Per-pack checksums: key = pack filename, value = SHA-256 hex digest */
  packChecksums: Record<string, string>;
  /** Index of the signing key used (supports rotation with backup keys) */
  signingKeyIndex: number;
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
- Quick link to Phrase Book (most-used greetings + bargaining phrases)

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
- Content freshness indicator (subtle badge based on `lastVerifiedAt`)
- Tap freshness badge to submit a data correction report

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

**Neighborhood Quick Filters:**

- Horizontal scrollable chips above category grid: Medina, Gueliz, Hivernage, Mellah, Palmeraie, All
- Selecting a neighborhood scopes all category results and search to that area
- "Near Me" chip uses device location to auto-select closest neighborhood (or shows distance-sorted if between neighborhoods)

**Features:**

- Offline full-text search (SQLite FTS5) with:
  - diacritic folding (café ≈ cafe)
  - locale-aware tokenization (incl. Arabic)
  - curated synonyms/transliterations via `searchKeywords`
  - "Did you mean" suggestions (top candidates) instead of brittle full fuzzy matching
- Filter by: neighborhood, price range, rating, **open-now (persistent toggle)**, distance, accessibility, family-friendly
- Sort by: hybrid score (BM25 relevance + editorial score + distance + open-now/closing-soon)
- **Open/closed status badge on all place cards**: real-time computation from `OpeningHours` + device clock
  - States: "Open" (green) / "Closes soon · Xm" (amber, <60 min) / "Closed · Opens HH:MM" (muted)
  - Respects `exceptions` for holidays, Ramadan, seasonal closures
- Subtle freshness indicator on cards with `lastVerifiedAt` > 6 months old
- Search suggestions:
  - recent searches + recently viewed
  - category quick filters
  - "near me" quick results (no network required)
- Place cards with image, name, category, rating, price (images render ThumbHash placeholder instantly, crossfade on load)
- Heart icon to save to favorites
- Tap to view detail screen

**My Trip (Saved + Notes):**

- Accessible via header icon (consistent entry from all tabs)
- Saved places + saved itineraries + personal notes/checklists
- Persisted offline in UserDB (more robust than growing AsyncStorage blobs)
- Optional export/share as text for a day plan

---

### Tab 4: Maps

**Full-screen Mapbox Map:**

- Interactive map centered on Marrakech Medina
- Offline map packs by zone and zoom (Medina Core, City Center, Full City) with size estimates
- Download progress indicator and status

**POI Markers:**

- Color-coded by category (using theme colors)
- Clustered at low zoom levels
- Tap marker to show place preview card

**Features:**

- Current location indicator (with permission)
- Search places on map
- Online turn-by-turn walking directions when connected
- Offline navigation inside downloaded zones:
  - downloadable lightweight pedestrian routing graph per zone
  - on-device A* route + route polyline overlay
  - simple turn hints + "off route" detection
- Outside downloaded zones: fallback to bearing/waypoint guidance (clearly labeled as approximate)
- Recenter button
- Layer toggle (streets vs satellite)

**Offline Download Manager:**

- Granular pack manager with pause/resume/retry and low-storage protection
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
16. **Scams & Incident Response** - Lost passport, theft steps, police/consulate workflow

Quick reference cards for most important info with `lastReviewedAt` stamp.
Persistent "Emergency Mode" action available from all tabs.

**Emergency Mode UX requirements:**

- one-handed reachable CTA (bottom sheet)
- one-tap call shortcuts + copy-to-clipboard for key numbers/addresses
- offline phrase cards for critical scenarios (lost passport, medical help)
- "Share my location" message templates (SMS/WhatsApp text) when service exists

---

### Settings Screen

- **Language Selection**: EN / FR / ES / DE / IT / NL / AR (with flag icons, RTL support for Arabic)
- **Offline Maps**: Download status, manage storage
- **Safety Center**: Emergency contacts, embassy list, SOS message templates
- **My Trip**: Export data, clear notes/checklists, manage saved items
- **Data Usage Mode**: Wi-Fi-only downloads, image quality, map storage cap
- **Accessibility**: Text size, reduce motion, high contrast, RTL preview
  - All interactive elements carry `accessibilityLabel` and `accessibilityRole`
  - Map POIs exposed as an accessible list alternative (screen reader users can browse POIs as a sorted list instead of tapping map markers)
  - Dynamic type: all text uses relative sizing; tested at 200% scale on both platforms
  - Reduce motion: disables all Reanimated/LayoutAnimation transitions; replaces with instant state changes
  - Minimum touch target: 44×44 pt on all interactive elements (per Apple HIG / Material guidelines)
- **Theme**: System / Light / Dark
- **Clear Cache**: Reset local data
- **About**: App version, credits, feedback link

### Sharing & Deep Links

- Place and itinerary detail screens include a "Share" button
- Generates a universal link (e.g., `https://marrakechcompass.app/place/bahia-palace`)
- If recipient has app installed: opens directly to detail screen
- If not: falls back to a lightweight web preview page (static, hosted on CDN)
- Share sheet includes: name, one-line description, hero image thumbnail

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
  // Dark mode semantic tokens (keep Moroccan feel, improve contrast)
  backgroundDark: '#14110F',
  foregroundDark: '#F3EEE7',
  cardDark: '#1E1916',
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

```jsonc
{
  "expo": "~54.0.0",
  "expo-router": "~6.0.0",
  "@rnmapbox/maps": "^10.0.0",
  "nativewind": "^4.0.0",
  "tailwindcss": "^3.4.0",
  "zustand": "^4.5.0",
  "zod": "^3.23.0",
  "expo-sqlite": "~15.0.0",
  "i18next": "^23.0.0",
  "react-i18next": "^14.0.0",
  "expo-localization": "~16.0.0",
  "@react-native-async-storage/async-storage": "^2.0.0",
  "@expo/vector-icons": "^15.0.0",
  "expo-font": "~14.0.0",
  "expo-linear-gradient": "~15.0.0",
  "@shopify/flash-list": "^1.7.0",

  // Content integrity + background updates (install SDK-aligned versions via `expo install`)
  "expo-image": "SDK-aligned",
  "expo-crypto": "SDK-aligned",
  "expo-updates": "SDK-aligned",
  "expo-task-manager": "SDK-aligned",
  "expo-background-fetch": "SDK-aligned",
  "tweetnacl": "^1.0.3"
}
```

---

## Offline Strategy

### Content (Signed Packs - Offline First)

1. Ship a signed baseline content package with the app.
2. On connectivity, fetch a lightweight manifest from CDN with HTTP caching (ETag/If-None-Match).
3. Verify manifest signature against pinned public key(s) — app ships with primary + backup key.
   Reject manifests with `sequence` ≤ last-applied sequence (replay protection).
4. Download pack/delta with resumable Range requests; enforce low-storage + Wi‑Fi-only policies.
5. Verify per-pack SHA-256 checksums against manifest's `packChecksums` before staging.
6. Stage install into a new **content DB file + asset directory**, then atomically swap pointers.
7. Keep current + previous content versions for instant rollback.
8. Fall back to last-known-good package on any validation or migration failure.

### Maps (Mapbox Offline Tiles)

1. On first launch, recommend at least one map pack (Medina Core) with explicit size.
2. Offer optional larger packs (City Center, Full City) with Wi-Fi-only default.
3. Tiles cached via Mapbox SDK offline manager
4. Show download progress and completion status
5. Maps work fully offline once downloaded

### Favorites & Settings

- Persisted immediately via Zustand + AsyncStorage
- No network required
- Sync retries use exponential backoff and never block read paths.

---

## Reliability & Performance Budgets

- Cold start P75: <2.0s on mid-range Android, <1.5s on recent iPhone
- Scroll performance: 55+ FPS in list/map interactions
- Memory P75: <250MB on mid-range Android during heavy scrolling (image lists)
- Largest JS bundle (gzip): keep under a defined budget (track in CI)
- Content DB query P95: <50ms for common list/search queries
- Crash-free sessions: >=99.5%
- Max map/content download failure rate: <3%

### Cold Start Critical Path (no blocking work outside this sequence)

1. JS bundle load + Hermes bytecode init
2. Open SQLite content DB (already populated) OR first-launch: hydrate **active locale only** from bundled JSON
3. Mount tab navigator shell with skeleton placeholders
4. Query repository for Home screen data (hero, highlights, weather cache)
5. Render Home screen; remaining tabs lazy-mount on first visit

### Lazy Locale Hydration

- First launch: insert only the device's detected locale (+ English fallback) into content DB
- On language switch: hydrate the new locale from bundled pack on a background thread, show loading indicator
- FTS indexes: build only for active locale; rebuild on switch (takes <500ms for typical content size)

### Image Loading Strategy

- List screens: prefetch first 10 card thumbnails (400w WebP); load rest on scroll via expo-image's built-in priority system
- Detail screens: load 800w hero immediately; lazy-load gallery images
- All images: render ThumbHash placeholder instantly, crossfade on load

## Observability & Analytics

- Crash reporting with offline queue and upload-on-connect
- Structured event taxonomy for key journeys (search, save, map download, emergency mode)
- Privacy-first analytics: no precise location persisted without explicit consent

## Diagnostics & Self-Healing

- Diagnostics screen (in Settings):
  - content manifest version + signature verification status
  - last update attempt + failure reason (if any)
  - map pack inventory + storage usage
  - search index status (per locale) + "Rebuild index" action
- Safe mode:
  - if content DB fails validation/open: automatically roll back to last-known-good
  - allow user to export a redacted debug bundle (logs + versions) for support

### Error Boundaries & Degradation Tiers

- Each tab wrapped in a React error boundary with a "Something went wrong — tap to retry" fallback
- Degradation tiers:
  - **Tier 0 (healthy)**: All systems nominal
  - **Tier 1 (degraded search)**: FTS index corrupt → disable search, show browse-only with category filters; auto-rebuild in background
  - **Tier 2 (degraded maps)**: Map SDK crash → show static fallback map image with POI list; link to external maps app
  - **Tier 3 (degraded content)**: Content DB corrupt → rollback to baseline; show banner "Using cached content"
  - **Tier 4 (emergency only)**: Catastrophic failure → show Emergency Mode (contacts, phrase cards, share-location) — always works
- Tier transitions logged to crash reporter with full context

## Content Publishing QA (CI)

- Validate schemas (Zod) + referential integrity (placeId links, missing images)
- Image pipeline: source images → resize to 400/800/1200w → convert to WebP → generate ThumbHash → embed in content JSON
- Translation completeness report per locale
- Link checking (websites) + coordinate sanity checks
- Generate a "Content Health" summary embedded in manifest metadata

## Testing & Release Gates

- Unit tests: stores, data validation, sync conflict handling
- Integration tests: offline bootstrap, manifest apply, rollback
- E2E tests (iOS/Android): core tab flows in offline and flaky-network modes
- Release gate: cannot ship if offline smoke suite fails

**Additional release gates:**

- Content security gate: manifest signature verification + pack checksum verification tests must pass
- Performance gate: fail build on cold-start/scroll regression beyond budget thresholds
- Size gate: fail build if JS bundle or app install size exceeds budget

---

## Implementation Order

1. **Phase A - Foundation**: Expo setup, navigation shell, CI, lint/test baseline
2. **Phase B - Design System & i18n**: Component library (NativeWind), theme tokens, i18n setup with AR/RTL proven on a test screen. Proving RTL early avoids expensive retrofits.
3. **Phase C - Content Pipeline Spike**: pack format, signing/verification (with key rotation + replay protection), staged install + rollback (de-risk early)
4. **Phase D - Offline Data Core**: schema, repository layer with reactive queries, lazy locale hydration, seed content, safe mode, error boundaries
5. **Phase E - Maps Early**: Mapbox integration + offline packs + download manager (de-risk early)
6. **Phase F - Core UX Screens**: Home/Explore/Tips + detail screens wired to repositories. Skeleton placeholders, image loading with ThumbHash.
7. **Phase G - Search & Discovery**: FTS5 ranking, suggestions, open-now filter, neighborhood browsing, phrase book
8. **Phase H - Planner, My Trip & Safety**: notes/checklists, trip data export/import, emergency mode polish
9. **Phase I - Observability & Launch Hardening**: crash reporting, diagnostics, perf+size gates, cloud backup, store release

---

## Todos

- [ ] Initialize Expo project with TypeScript, NativeWind, copy theme system from marrakech-compass
- [ ] Configure Expo Router with 5-tab navigation and nested routes (place/[id], itinerary/[id], category/[slug])
- [ ] Create TypeScript types (Place, PlaceBase, PlaceI18n, Itinerary, Pick, Tip) and per-locale bundled JSON content in content/packs/ directory
- [ ] Configure i18next with expo-localization, create translation files for EN/FR/ES/DE/IT/NL/AR (with RTL support)
- [ ] Set up data layer (SQLite content DB + user DB + repository + schema validation + rollback)
- [ ] Keep AsyncStorage for settings only; avoid large content blobs in AsyncStorage
- [ ] Create reusable NativeWind components (Card, Button, PlaceCard, AccordionSection, CategoryPill, etc.)
- [ ] Implement Home with weather widget, Plan Your Trip (itineraries), quick tools, and highlights carousel
- [ ] Implement Our Picks with editorial-style category cards and rich imagery
- [ ] Implement Explore with offline FTS5 search, BM25 ranking, suggestions, advanced filters, and favorites
- [ ] Implement Maps tab with multi-pack offline downloads, POI markers, online routing + offline A* navigation
- [ ] Implement Tips tab with accordion sections including safety and emergency contacts
- [ ] Create place detail, itinerary detail, and category listing screens
- [ ] Implement My Trip screen (saved places + itineraries + notes + checklists + export)
- [ ] Configure Mapbox SDK with offline region downloads for Marrakech (Medina + surrounding areas)
- [ ] Set up content publishing pipeline (export → validate → pack/delta → sign → upload to CDN)
- [ ] Embed public signing key in app + implement signature verification before applying updates
- [ ] Add telemetry, crash reporting, offline-safe error handling, and performance instrumentation
- [ ] Implement diagnostics screen with content/map status and self-healing actions
- [ ] Add unit/integration/E2E test suites with offline smoke gates + security/performance/size gates
- [ ] Set up EAS Build for iOS and Android app store deployment
