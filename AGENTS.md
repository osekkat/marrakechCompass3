# AGENTS.md — Marrakech Compass

> Guidelines for AI coding agents working in this React Native/Expo codebase.

---

## RULE 0 - THE FUNDAMENTAL OVERRIDE PREROGATIVE

If I tell you to do something, even if it goes against what follows below, YOU MUST LISTEN TO ME. I AM IN CHARGE, NOT YOU.

---

## RULE 1 – ABSOLUTE (DO NOT EVER VIOLATE THIS)

You may NOT delete any file or directory unless I explicitly give the exact command **in this session**.

- This includes files you just created (tests, tmp files, scripts, etc.).
- You do not get to decide that something is "safe" to remove.
- If you think something should be removed, stop and ask. You must receive clear written approval **before** any deletion command is even proposed.

Treat "never delete files without permission" as a hard invariant.

---

## Irreversible Git & Filesystem Actions — DO NOT EVER BREAK GLASS

Absolutely forbidden unless I give the **exact command and explicit approval** in the same message:

- `git reset --hard`
- `git clean -fd`
- `rm -rf`
- Any command that can delete or overwrite code/data

Rules:

1. If you are not 100% sure what a command will delete, do not propose or run it. Ask first.
2. Prefer safe tools: `git status`, `git diff`, `git stash`, copying to backups, etc.
3. After approval, restate the command verbatim, list what it will affect, and wait for confirmation.
4. When a destructive command is run, record in your response:
   - The exact user text authorizing it
   - The command run
   - When you ran it

If that audit trail is missing, then you must act as if the operation never happened.

---

## Product Overview

**Marrakech Compass** is a **true offline-first travel companion** — like having Lonely Planet in your pocket for Marrakech. Built with Expo/React Native for iOS and Android.

**Design Philosophy:**

1. **Instant usability**: Works fully offline from first launch (bundled content)
2. **Editorial quality**: Curated "best of" picks, not just a database dump
3. **Practical utility**: Quick tools, emergency info, and walking directions
4. **Beautiful UX**: Moroccan-inspired design with smooth animations

**Core value propositions:**

- Discover **curated places** — restaurants, riads, souks, museums, hammams
- Plan trips with **editorial itineraries** (1 day to 1 week)
- Navigate with **offline maps** and walking directions
- Speak with confidence using the **Darija phrasebook**
- Stay safe with **practical travel tips** and **emergency mode**
- Works **offline** as the default mode

**Key Features:**

- **Home + Plan Your Trip**: Weather, itineraries, quick tools, arrival mode
- **Our Picks (Coup de Coeur)**: Editorial recommendations by category
- **Explore**: Full-text search, filters, neighborhood browsing
- **Maps**: Offline Mapbox with POI markers and walking directions
- **Tips**: Travel essentials, safety, emergency contacts
- **My Trip**: Saved places, notes, checklists
- **Phrasebook**: Darija/French/English with audio

---

## Tech Stack

| Layer          | Technology                           | Purpose                               |
| -------------- | ------------------------------------ | ------------------------------------- |
| **Framework**  | Expo SDK 54 (Managed Workflow)       | Cross-platform React Native           |
| **Navigation** | Expo Router v6                       | File-based routing                    |
| **Styling**    | NativeWind v4 + Tailwind CSS         | Moroccan-inspired design system       |
| **State**      | Zustand                              | UI state + sync coordination          |
| **Maps**       | @rnmapbox/maps                       | Offline tiles + POI markers           |
| **i18n**       | i18next + react-i18next              | EN/FR/ES/DE/IT/NL/AR with RTL         |
| **Database**   | expo-sqlite                          | Content DB + User DB (FTS5)           |
| **Validation** | Zod                                  | Schema validation for content         |
| **Storage**    | AsyncStorage (settings only)         | Lightweight preferences               |
| **Background** | expo-task-manager + background-fetch | Manifest checks + resumable downloads |
| **Images**     | expo-image                           | Optimized loading with ThumbHash      |
| **Crypto**     | expo-crypto + tweetnacl              | Content signing verification          |

### Key Configuration Files

| File                         | Purpose                               |
| ---------------------------- | ------------------------------------- |
| `app.json` / `app.config.js` | Expo configuration                    |
| `tailwind.config.js`         | NativeWind theme tokens               |
| `eas.json`                   | EAS Build configuration               |
| `src/data/schema.ts`         | SQLite schema + migrations            |
| `tools/content/`             | Content build + sign + upload scripts |

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
│   ├── phrasebook.tsx            # Offline phrase book
│   ├── my-trip.tsx               # Saved places + notes + checklist
│   └── settings.tsx              # Language & preferences
├── src/
│   ├── components/               # Reusable UI components
│   │   ├── ui/                   # Base: Button, Card, Badge, Accordion
│   │   ├── cards/                # PlaceCard, ItineraryCard, PickCard
│   │   ├── maps/                 # MapView, Marker, OfflineIndicator
│   │   └── layout/               # Header, TabBar, SafeArea
│   ├── content/                  # Bundled baseline packs (offline-first)
│   │   ├── manifest.json         # Baseline manifest
│   │   └── packs/                # Per-locale content (en/, fr/, ar/, etc.)
│   ├── hooks/                    # Custom hooks
│   │   ├── useLocale.ts          # Locale + fallback chain
│   │   ├── useFavorites.ts       # Favorites management
│   │   └── useOfflineStatus.ts   # Network detection
│   ├── data/                     # Local persistence + repositories
│   │   ├── schema.ts             # SQLite schema and migrations
│   │   ├── repository.ts         # Typed data access
│   │   └── useContentQuery.ts    # Reactive hook with auto-invalidation
│   ├── sync/                     # Remote update pipeline
│   │   ├── manifest.ts           # Version/checksum handling
│   │   ├── downloader.ts         # Resumable pack download
│   │   ├── scheduler.ts          # Background checks
│   │   ├── installer.ts          # Staged install + atomic activation
│   │   └── rollback.ts           # Last-known-good recovery
│   ├── search/                   # Offline search/indexing
│   │   ├── fts.ts                # FTS5 queries (BM25 ranking)
│   │   ├── indexer.ts            # Build/refresh indexes per locale
│   │   └── suggest.ts            # Suggestions + did-you-mean
│   ├── routing/                  # Offline routing
│   │   ├── graph.ts              # Graph loader
│   │   ├── astar.ts              # A* pathfinding
│   │   └── instructions.ts       # Turn hint generation
│   ├── user/                     # User-generated data
│   │   ├── favorites.ts          # Saved places/itineraries
│   │   ├── notes.ts              # Notes + checklist items
│   │   └── reports.ts            # Issue reports (offline queue)
│   ├── stores/                   # Zustand stores
│   │   ├── useAppStore.ts        # Main app state
│   │   └── useSettingsStore.ts   # User preferences
│   ├── services/                 # API & utilities
│   │   ├── content.ts            # Content loading
│   │   ├── maps.ts               # Mapbox utilities
│   │   └── contentApi.ts         # CDN fetcher
│   ├── themes/                   # Design system
│   │   └── index.ts              # Color tokens, typography, spacing
│   ├── i18n/                     # Internationalization
│   │   ├── index.ts              # i18n configuration
│   │   └── locales/              # Translation files (en, fr, ar, etc.)
│   └── types/                    # TypeScript types
│       └── index.ts              # Place, Itinerary, Pick, Tip interfaces
├── assets/                       # Images, fonts, icons
├── tools/                        # Build-time tooling (not in app bundle)
│   └── content/                  # CMS export → validate → pack → sign → CDN
└── tailwind.config.js            # NativeWind configuration
```

---

## Database Architecture (Critical)

**Two SQLite database files:**

| Database     | Purpose                                               | Write Pattern              |
| ------------ | ----------------------------------------------------- | -------------------------- |
| `content.db` | Places, itineraries, picks, phrases, tips, FTS tables | Read-only (swap on update) |
| `user.db`    | Favorites, notes, checklists, reports, downloads      | Read-write                 |

**Why two DBs:** Content updates become a fast **file swap** (no migration risk, no user data corruption).

### Content DB Activation Protocol

Activation must be exclusive and crash-safe:

1. Pause reads, close DB connections
2. Stage new content in temp directory
3. Atomic swap using expo-file-system
4. Reopen the DB

### FTS Tables

**FTS tables must ship prebuilt** in bundled content. Never build FTS at first launch (causes slow startup on low-end devices).

If rebuild is ever required, do it in background and keep core search usable.

### Lazy Locale Hydration

- First launch: insert only the device's detected locale (+ English fallback) into content DB
- On language switch: hydrate the new locale from bundled pack on a background thread
- FTS indexes: build only for active locale; rebuild on switch (<500ms for typical content size)

---

## Offline-First Rules (Non-Negotiable)

This is an **offline-first travel app**. These rules are absolute:

1. **Core value works immediately after install, offline** — no blocking downloads
2. **No blocking "downloading resources…" screen on first launch**
3. **Bundled baseline content ships with the app** — always usable
4. **Optional map packs are additive** — app works without them
5. **Clear messaging when offline** — calm, not scary

### Backup Policy (Critical for Large Offline Packs)

- **Exclude** re-downloadable map packs/tiles/audio/images from backups
- **Backup only** user data (`user.db` + small settings)

This keeps backups small and restores fast.

---

## Navigation Rules (Non-Negotiable)

These rules prevent "it feels off" moments that undermine trust in a quality travel app.

**Expo Router Patterns:**

- Keep the 5 bottom tabs as the _only_ top-level navigation
- Use stack navigation for drill-down flows (place detail, itinerary detail)
- Preserve interactive swipe-back on iOS
- Use sheets/modals only for focused, temporary tasks (filters, pickers)
- Ensure gesture navigation compatibility on Android

### Bottom Tabs

1. **Home** — Plan Your Trip, weather, quick tools
2. **Picks** — Coup de Coeur editorial recommendations
3. **Explore** — Search, browse, filter places
4. **Maps** — Offline maps with POI markers
5. **Tips** — Travel essentials, safety, emergency

---

## UI/UX Standards

### Mandatory Skill Usage for UI Work

- For any UI/UX, visual design, theming, or interaction-design task, the model **must use the `front-end design` skill** before implementing changes.
- The skill must guide decisions on layout, typography, color, motion, and component styling so design output is intentional (not generic boilerplate).
- If the `front-end design` skill is unavailable in the current session, the model must explicitly say so and then follow the UI/UX standards in this file as the fallback.

### Design System (Moroccan-Inspired)

```javascript
colors: {
  primary: '#C65D3B',      // Terracotta
  secondary: '#356B66',    // Teal
  accent: '#D9A441',       // Gold
  background: '#F7F4F0',   // Warm sand
  foreground: '#2D2622',   // Dark brown
  card: '#EFE9E2',         // Light sand
  // Dark mode
  backgroundDark: '#14110F',
  foregroundDark: '#F3EEE7',
  cardDark: '#1E1916',
}

typography: {
  display: 'Playfair Display',  // Headings, hero text
  body: 'DM Sans',              // Content, UI text
}
```

### Loading, Progress, and Error UX (Standardized)

Every screen must follow the same state model:

- `loading` → show skeleton/placeholder content (no blank screens)
- `content` → normal state
- `refreshing` → keep content visible; show subtle progress
- `offline` → show cached content + clear "what still works" message
- `error` → explain what failed + provide next action (Retry / Downloads / Work offline)

**Progress indicator rules:**

- Prefer **determinate** progress for downloads/imports (bytes + % + pause/resume/cancel)
- Use **indeterminate** spinners only for short unknown-duration work
- If >10s, show recovery actions

### Touch Targets

- Minimum hit targets: 44×44 pt (per Apple HIG / Material guidelines)
- All interactive elements must meet this standard

### Accessibility

- Dynamic type / font scaling (tested at 200% scale)
- Correct contrast ratios
- All interactive elements carry `accessibilityLabel` and `accessibilityRole`
- Correct focus order for VoiceOver/TalkBack
- RTL readiness for Arabic text
- Map POIs exposed as an accessible list alternative
- Reduce motion option: disables all animations

---

## Location & Permissions (Battery-Safe)

### Location Usage

- Use expo-location with appropriate accuracy settings
- Request location **only while maps/navigation screen is visible**
- Choose balanced accuracy (not high accuracy) unless actively navigating
- Throttle UI updates to 10–20 Hz regardless of sensor frequency
- Add safety timeout (stop updates after X minutes if screen left in weird lifecycle state)
- Provide manual "Refresh location" button

### Privacy

- Request **foreground/"When in Use"** location only (never background)
- Show pre-permission explanation before system prompt
- Denial path must keep app fully usable
- No backend, no background tracking
- Location used only on-device for maps and navigation

---

## Performance Requirements

### Responsiveness (Non-Negotiable)

**Never block the JS thread with:**

- Synchronous disk IO
- Large JSON parsing
- Heavy SQLite queries
- Image decoding

Use async patterns and background threads for heavy work.

### Performance Budgets

| Metric                             | Target   |
| ---------------------------------- | -------- |
| Cold start P75 (mid-range Android) | < 2.0s   |
| Cold start P75 (recent iPhone)     | < 1.5s   |
| Scroll performance                 | 55+ FPS  |
| Search response (P95)              | < 100ms  |
| Content DB query (P95)             | < 50ms   |
| Memory P75 (mid-range Android)     | < 250MB  |
| Crash-free sessions                | >= 99.5% |

### Cold Start Critical Path

1. JS bundle load + Hermes bytecode init
2. Open SQLite content DB (already populated) OR first-launch: hydrate active locale only
3. Mount tab navigator shell with skeleton placeholders
4. Query repository for Home screen data
5. Render Home screen; remaining tabs lazy-mount on first visit

### Image Loading Strategy

- List screens: prefetch first 10 card thumbnails (400w WebP)
- Detail screens: load 800w hero immediately; lazy-load gallery
- All images: render ThumbHash placeholder instantly, crossfade on load

### Map Markers

Keep curated marker count reasonable. Enforce marker budget via **clustering/progressive disclosure**.

---

## Content Pipeline

### Bundled Content (in `src/content/packs/`)

Per-locale content packs:

```
src/content/
├── manifest.json           # Baseline manifest (mirrors remote format)
└── packs/
    ├── en/
    │   ├── places.json
    │   ├── itineraries.json
    │   ├── picks.json
    │   ├── tips.json
    │   └── phrases.json
    ├── fr/
    ├── ar/
    └── ...                 # es, de, it, nl
```

### Build Pipeline

```bash
# Validate content schemas (Zod)
node tools/content/validate.ts

# Check referential integrity (placeId links, missing images)
node tools/content/check-links.ts

# Build content pack (resize images, generate ThumbHash, pack)
node tools/content/build-pack.ts

# Sign manifest with Ed25519
node tools/content/sign-manifest.ts

# Upload to CDN
node tools/content/upload.ts
```

### Content Manifest Schema

```typescript
interface ContentManifest {
  version: string;
  sequence: number; // Monotonic, reject lower or equal
  publishedAt: ISODateTime;
  minAppVersion: string;
  checksum: string; // SHA-256 of manifest payload
  signature: string; // Ed25519 signature
  packChecksums: Record<string, string>; // Per-pack SHA-256
  signingKeyIndex: number; // Supports key rotation
}
```

### Schema Validation Rules

- Unique IDs
- Valid coordinates (lat/lng in Morocco region)
- Required `lastVerifiedAt` dates
- No missing referenced IDs (placeId in itineraries, etc.)
- Translation completeness per locale

---

## Downloads & Packs

### Map Pack Types

| Pack          | Contents                         | Ships With App |
| ------------- | -------------------------------- | -------------- |
| Base Content  | All editorial content            | Yes            |
| Medina Core   | Offline map tiles (zoom 14-18)   | Optional       |
| City Center   | Expanded map tiles               | Optional       |
| Full City     | Complete Marrakech map tiles     | Optional       |
| Routing Graph | Pedestrian routing data per zone | Optional       |

### Downloads Screen (Product Surface)

- Determinate progress (bytes + %)
- Per-pack state: queued → downloading → verifying → installing → ready (or failed)
- Pause/resume/cancel with clear error reasons
- "Free space required" preflight + low-storage protection
- Wi‑Fi-only toggle + cellular confirmation for large packs
- State persists across app restarts/process death

### Pack Integrity

- Verify SHA-256 from manifest before importing
- Signed manifest (Ed25519) with pinned public key
- Safe install: download → verify → unpack to temp → validate → atomic move → register
- Rollback: keep last-known-good version

### Content Update Flow

1. On connectivity, fetch lightweight manifest from CDN (ETag/If-None-Match)
2. Verify signature against pinned public key(s) — app ships with primary + backup key
3. Reject manifests with `sequence` ≤ last-applied (replay protection)
4. Download pack with resumable Range requests; enforce Wi-Fi-only policy
5. Verify per-pack SHA-256 checksums
6. Stage install into new content DB + asset directory
7. Atomic swap pointers; keep previous version for instant rollback

---

## Core Services

### Search Service (FTS5)

```typescript
interface SearchService {
  search(query: string, filters: SearchFilters): Promise<Place[]>;
  suggest(partial: string): Promise<Suggestion[]>;
  rebuildIndex(locale: Locale): Promise<void>;
}
```

Features:

- BM25 ranking
- Diacritic folding (café ≈ cafe)
- Locale-aware tokenization (incl. Arabic)
- Curated synonyms via `searchKeywords`
- "Did you mean" suggestions

### Routing Service (Offline A\*)

```typescript
interface RoutingService {
  calculateRoute(from: Coordinates, to: Coordinates): Promise<Route>;
  getInstructions(route: Route): TurnInstruction[];
}
```

Features:

- On-device A\* pathfinding
- Downloadable pedestrian routing graph per zone
- Simple turn hints + "off route" detection
- Fallback to bearing/waypoint guidance outside downloaded zones

### GeoEngine (Utilities)

- `haversine(point1, point2)` → distance in meters
- `bearing(from, to)` → degrees
- `isWithinBounds(point, bounds)` → boolean

---

## Tooling Assumptions (Developer Toolbelt)

### Shell & Terminal UX

- **zsh** + **oh-my-zsh** + **powerlevel10k**
- **lsd** (or eza fallback) — Modern ls
- **atuin** — Shell history with Ctrl-R
- **fzf** — Fuzzy finder
- **zoxide** — Better cd
- **direnv** — Directory-specific env vars

### Dev Tools

- **tmux** — Terminal multiplexer
- **ripgrep** (`rg`) — Fast search
- **ast-grep** (`sg`) — Structural search/replace
- **lazygit** — Git TUI
- **bat** — Better cat

### Coding Agents

- **Claude Code** — Anthropic's coding agent
- **Codex CLI** — OpenAI's coding agent
- **Gemini CLI** — Google's coding agent

### Dicklesworthstone Stack

1. **ntm** — Named Tmux Manager (agent cockpit)
2. **mcp_agent_mail** — Agent coordination via mail-like messaging
3. **ultimate_bug_scanner** (`ubs`) — Bug scanning with guardrails
4. **beads_viewer** (`bv`) — Task management TUI
5. **coding_agent_session_search** (`cass`) — Unified agent history search
6. **cass_memory_system** (`cm`) — Procedural memory for agents
7. **coding_agent_account_manager** (`caam`) — Agent auth switching
8. **simultaneous_launch_button** (`slb`) — Two-person rule for dangerous commands

---

## UBS — Ultimate Bug Scanner

**Golden Rule:** `ubs <changed-files>` before every commit. Exit 0 = safe. Exit >0 = fix & re-run.

### Commands

```bash
ubs src/data/repository.ts             # Specific files (< 1s) — USE THIS
ubs $(git diff --name-only --cached)   # Staged files — before commit
ubs --only=ts,tsx src/                 # Language filter (3-5x faster)
ubs --ci --fail-on-warning .           # CI mode — before PR
ubs --help                             # Full command reference
ubs sessions --entries 1               # Tail the latest session log
ubs .                                  # Whole project (ignores node_modules/, .expo/)
```

### Bug Severity

- **Critical (always fix):** Memory leaks, unhandled promise rejections, async/await issues, data exposure
- **Important (production):** Unhandled errors, type issues, missing error boundaries
- **Contextual (judgment):** TODO/FIXME, console.log debugging, unused variables

### Speed Critical

Scope to changed files. `ubs src/data/repository.ts` (< 1s) vs `ubs .` (30s). **Never full scan for small edits.**

### Anti-Patterns

- ❌ Ignore findings → ✅ Investigate each
- ❌ Full scan per edit → ✅ Scope to file
- ❌ Fix symptom (`value && value.prop`) → ✅ Root cause (`value?.prop`)

---

## ast-grep vs ripgrep

**Use `ast-grep` when structure matters.** It parses code and matches AST nodes, ignoring comments/strings, and can **safely rewrite** code.

- Refactors/codemods: rename APIs, change import forms
- Policy checks: enforce patterns across a repo
- Editor/automation: LSP mode, `--json` output

**Use `ripgrep` when text is enough.** Fastest way to grep literals/regex.

- Recon: find strings, TODOs, log lines, config values
- Pre-filter: narrow candidate files before ast-grep

### Rule of Thumb

- Need correctness or **applying changes** → `ast-grep`
- Need raw speed or **hunting text** → `rg`
- Often combine: `rg` to shortlist files, then `ast-grep` to match/modify

### TypeScript/React Examples

```bash
# Find structured code (ignores comments)
ast-grep run -l TypeScript -p 'function $NAME($$$ARGS): $RET { $$$BODY }'
ast-grep run -l TypeScript -p 'const $NAME = ($$$ARGS) => $BODY'

# Find all console.log calls
ast-grep run -l TypeScript -p 'console.log($$$ARGS)'

# Find useState hooks
ast-grep run -l TypeScript -p 'const [$STATE, $SETTER] = useState($$$INIT)'

# Find async functions
ast-grep run -l TypeScript -p 'async function $NAME($$$ARGS) { $$$BODY }'

# Quick textual hunt
rg -n 'TODO' -t ts -t tsx

# Combine speed + precision
rg -l -t ts 'useQuery' | xargs ast-grep run -l TypeScript -p 'useQuery($$$ARGS)' --json
```

---

## Morph Warp Grep — AI-Powered Code Search

**Use `mcp__morph-mcp__warp_grep` for exploratory "how does X work?" questions.** An AI agent expands your query, greps the codebase, reads relevant files, and returns precise line ranges with full context.

**Use `ripgrep` for targeted searches.** When you know exactly what you're looking for.

**Use `ast-grep` for structural patterns.** When you need AST precision for matching/rewriting.

### When to Use What

| Scenario                                      | Tool        | Why                                    |
| --------------------------------------------- | ----------- | -------------------------------------- |
| "How is the pricing engine implemented?"      | `warp_grep` | Exploratory; don't know where to start |
| "Where is the compass heading calculated?"    | `warp_grep` | Need to understand architecture        |
| "Find all uses of `LocationService`"          | `ripgrep`   | Targeted literal search                |
| "Find files with force unwraps"               | `ripgrep`   | Simple pattern                         |
| "Replace all `print()` with `Logger.debug()`" | `ast-grep`  | Structural refactor                    |

### warp_grep Usage

```
mcp__morph-mcp__warp_grep(
  repoPath: "/data/projects/touristApp",
  query: "How does the Quote → Action fairness calculation work?"
)
```

Returns structured results with file paths, line ranges, and extracted code snippets.

### Anti-Patterns

- **Don't** use `warp_grep` to find a specific function name → use `ripgrep`
- **Don't** use `ripgrep` to understand "how does X work" → wastes time with manual reads
- **Don't** use `ripgrep` for codemods → risks collateral edits

---

## cass — Cross-Agent Search

`cass` indexes prior agent conversations (Claude Code, Codex, Cursor, Gemini, ChatGPT, etc.) so we can reuse solved problems.

Rules:

- Never run bare `cass` (TUI). Always use `--robot` or `--json`.

Examples:

```bash
cass health
cass search "pricing engine error" --robot --limit 5
cass view /path/to/session.jsonl -n 42 --json
cass expand /path/to/session.jsonl -n 42 -C 3 --json
cass capabilities --json
cass robot-docs guide
```

Tips:

- Use `--fields minimal` for lean output.
- Filter by agent with `--agent`.
- Use `--days N` to limit to recent history.

stdout is data-only, stderr is diagnostics; exit code 0 means success.

Treat cass as a way to avoid re-solving problems other agents already handled.

---

## Memory System: cass-memory (cm)

The Cass Memory System (cm) gives agents effective memory based on searching across previous coding agent sessions and extracting useful lessons.

### Quick Start

```bash
# 1. Check status and see recommendations
cm onboard status

# 2. Get sessions to analyze (filtered by gaps in your playbook)
cm onboard sample --fill-gaps

# 3. Read a session with rich context
cm onboard read /path/to/session.jsonl --template

# 4. Add extracted rules (one at a time or batch)
cm playbook add "Your rule content" --category "debugging"
# Or batch add:
cm playbook add --file rules.json

# 5. Mark session as processed
cm onboard mark-done /path/to/session.jsonl
```

Before starting complex tasks, retrieve relevant context:

```bash
cm context "<task description>" --json
```

This returns:

- **relevantBullets**: Rules that may help with your task
- **antiPatterns**: Pitfalls to avoid
- **historySnippets**: Past sessions that solved similar problems
- **suggestedCassQueries**: Searches for deeper investigation

### Protocol

1. **START**: Run `cm context "<task>" --json` before non-trivial work
2. **WORK**: Reference rule IDs when following them (e.g., "Following b-8f3a2c...")
3. **FEEDBACK**: Leave inline comments when rules help/hurt:
   - `// [cass: helpful b-xyz] - reason`
   - `// [cass: harmful b-xyz] - reason`
4. **END**: Just finish your work. Learning happens automatically.

### Key Flags

| Flag           | Purpose                                      |
| -------------- | -------------------------------------------- |
| `--json`       | Machine-readable JSON output (required!)     |
| `--limit N`    | Cap number of rules returned                 |
| `--no-history` | Skip historical snippets for faster response |

stdout = data only, stderr = diagnostics. Exit 0 = success.

---

## Third-Party Library Usage

If you aren't 100% sure how to use a third-party library, **SEARCH ONLINE** to find the latest documentation and current best practices.

- **iOS**: Check Apple Developer docs, Swift Package Index, GitHub repos
- **Android**: Check Android Developers docs, KotlinLang docs, library GitHub pages
- **Don't guess** at APIs or patterns that may have changed

---

## Console Output

- Prefer **structured, minimal logs** (avoid spammy debug output)
- Treat user-facing UX as UI-first; logs are for operators/debugging
- **iOS**: Use `os_log` or `Logger` for structured logging
- **Android**: Use `Timber` or `Log` with appropriate levels
- Remove `print()` / `println()` / `Log.d()` debugging statements before commit

---

## Code Editing Discipline

- Do **not** run scripts that bulk-modify code (codemods, invented one-off scripts, giant `sed`/regex refactors).
- Large mechanical changes: break into smaller, explicit edits and review diffs.
- Subtle/complex changes: edit by hand, file-by-file, with careful reasoning.

### No Script-Based Code Changes (Strict)

- Never run a script that programmatically rewrites application code across files.
- For many straightforward edits, do explicit/manual edits in manageable chunks.
- For nuanced logic changes, always edit manually with full local context.
- If a scripted refactor is truly necessary, ask for explicit user approval first.

### No File Proliferation

If you want to change something or add a feature, **revise existing code files in place**.

New files are only for genuinely new domains that don't fit existing modules. The bar for adding files is very high.

---

## Generated Files — NEVER Edit Manually

- **Rule:** Never hand-edit generated outputs.
- Generated from shared schema:
  - Swift models from JSON Schema
  - Kotlin models from JSON Schema
  - SQLite content.db from JSON content
- **Convention:** Document generator commands; regenerate rather than hand-edit.

---

## Backwards Compatibility

We do not care about backwards compatibility—we're in early development with no users. We want to do things the **RIGHT** way with **NO TECH DEBT**.

- Never create "compatibility shims"
- Never create wrapper functions for deprecated APIs
- Never create variations like `MainV2.swift` or `main_improved.kt`
- Just fix the code directly

---

## Compiler & Linter Checks (CRITICAL)

**After any substantive code changes, you MUST verify no errors were introduced:**

### TypeScript / ESLint

```bash
# Type check
npx tsc --noEmit

# Run ESLint
npx eslint . --ext .ts,.tsx

# Fix auto-fixable issues
npx eslint . --ext .ts,.tsx --fix
```

### Expo / Metro

```bash
# Start Metro bundler (check for bundling errors)
npx expo start --clear

# Export to verify build
npx expo export --platform ios
npx expo export --platform android
```

### Content Validation

```bash
# Validate content schemas
node tools/content/validate.ts

# Check referential integrity
node tools/content/check-links.ts
```

If you see errors, **carefully understand and resolve each issue**. Read sufficient context to fix them the RIGHT way.

---

## Testing

### Test Pyramid

```
         ┌─────────────┐
         │    E2E      │  ← Detox/Maestro: critical user flows
         │  (few)      │
         ├─────────────┤
         │ Integration │  ← DB queries, services, sync
         │  (some)     │
         ├─────────────┤
         │    Unit     │  ← Services, utilities, components
         │  (many)     │
         └─────────────┘
```

### Jest Testing

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage

# Run specific test file
npm test -- src/data/repository.test.ts

# Watch mode
npm test -- --watch
```

### E2E Testing (Detox or Maestro)

```bash
# Build for E2E
npx expo prebuild
npx detox build -c ios.sim.debug

# Run E2E tests
npx detox test -c ios.sim.debug
```

### Critical Test Suites

- **Data Layer:** Content loading, FTS search, migrations, rollback
- **Sync:** Manifest verification, pack download, content swap
- **Offline:** Airplane mode flows, pack installation
- **Search:** FTS queries, suggestions, filters

### Release Gates (Must Block Deployment)

- **Offline smoke test:** Core flows work in airplane mode
- **Content security gate:** Manifest signature + pack checksum verification
- **Performance gate:** Cold start and scroll regressions checked
- **Size gate:** JS bundle and app size within budget

---

## QA Checklist

### Both Platforms

- Works in airplane mode (immediately after fresh install)
- Works on low-memory devices
- Map view smooth with clustering/progressive disclosure
- Search fast across all content
- Dark mode correct
- RTL text (Arabic) renders correctly
- All 7 languages load correctly (EN/FR/ES/DE/IT/NL/AR)

### iOS-Specific

- VoiceOver smoke test on core flows
- Dynamic Type sizes work
- Works on iOS 16.0+
- Background download resume after app termination

### Android-Specific

- TalkBack smoke test on core flows
- Font scaling works
- Works on API 26+
- Background download resume after process death

### Location & Maps

- Deny permission → app still usable (maps work, just no "my location")
- Grant permission → current location shows on map
- Offline map packs download and work without network
- Walking directions work offline in downloaded zones

---

## Observability

### Quality Gates (Release Blockers)

- Crash-free sessions >= 99.5%
- Map/content download failure rate < 3%
- Cold start P75 within budget
- These are **release blockers**, not "nice to haves"

### Crash Reporting

- Crash reporting with offline queue and upload-on-connect
- Privacy-first analytics: no precise location persisted without explicit consent
- Structured event taxonomy for key journeys (search, save, map download, emergency mode)
- Export debug bundle (logs + versions) for support

### Diagnostics Screen (in Settings)

- Content manifest version + signature verification status
- Last update attempt + failure reason (if any)
- Map pack inventory + storage usage
- Search index status per locale + "Rebuild index" action

### Error Boundaries & Degradation Tiers

- Each tab wrapped in React error boundary with "Something went wrong — tap to retry"
- **Tier 0 (healthy)**: All systems nominal
- **Tier 1 (degraded search)**: FTS corrupt → disable search, show browse-only; auto-rebuild
- **Tier 2 (degraded maps)**: Map SDK crash → static fallback; link to external maps
- **Tier 3 (degraded content)**: Content DB corrupt → rollback to baseline; show banner
- **Tier 4 (emergency only)**: Catastrophic failure → Emergency Mode always works

---

## CI Gates

### TypeScript & Lint

```bash
npx tsc --noEmit
npx eslint . --ext .ts,.tsx
```

### Tests

```bash
npm test -- --coverage --ci
```

### Content Pipeline

```bash
node tools/content/validate.ts
node tools/content/check-links.ts
```

### Build Verification

```bash
npx expo export --platform ios
npx expo export --platform android
```

### EAS Build (Production)

```bash
eas build --platform ios --profile production
eas build --platform android --profile production
```

### Trust & Reliability Gates

- Content security: manifest signature + pack checksum verification
- Offline smoke test: core flows work in airplane mode
- Performance gate: cold start and scroll within budgets
- Size gate: JS bundle and app install size within budget

---

## Issue Tracking with br (beads_rust)

All issue tracking goes through **br**. No other TODO systems.

**Note:** `br` is non-invasive—it never executes git commands directly. After `br sync --flush-only`, you must manually run `git add .beads/` and `git commit`.

Key invariants:

- `.beads/` is authoritative state and **must always be committed** with code changes.
- Do not edit `.beads/*.jsonl` directly; only via `br`.

### Essential Commands

```bash
# View issues (launches TUI - avoid in automated sessions)
bv

# CLI commands for agents (use these instead)
br ready              # Show issues ready to work (no blockers)
br ready --json       # JSON output for parsing
br list --status=open # All open issues
br show <id>          # Full issue details with dependencies
br create --title="..." --type=task --priority=2
br update <id> --status=in_progress
br close <id> --reason="Completed"
br close <id1> <id2>  # Close multiple issues at once
br sync --flush-only  # Flush changes to .beads/ (does NOT run git)
```

Types: `bug`, `feature`, `task`, `epic`, `chore`

Priorities: `0` critical, `1` high, `2` medium (default), `3` low, `4` backlog

### Workflow Pattern

1. **Start**: Run `br ready` to find actionable work
2. **Claim**: Use `br update <id> --status in_progress`
3. **Work**: Implement the task
4. **Complete**: Use `br close <id> --reason "Completed"`
5. **Sync**: Always run `br sync --flush-only` then `git add .beads/ && git commit` at session end

### Key Concepts

- **Dependencies**: Issues can block other issues. `br ready` shows only unblocked work.
- **Blocking**: `br dep add <issue> <depends-on>` to add dependencies
- **Shared IDs**: Use Beads issue ID (e.g., `br-123`) as Mail `thread_id` and prefix subjects with `[br-123]`
- **Reservations**: When starting a task, call `file_reservation_paths()` with the issue ID in `reason`

### Mapping Cheat Sheet

| Concept                   | Value                             |
| ------------------------- | --------------------------------- |
| Mail `thread_id`          | `br-###`                          |
| Mail subject              | `[br-###] ...`                    |
| File reservation `reason` | `br-###`                          |
| Commit messages           | Include `br-###` for traceability |

---

## bv — Graph-Aware Triage Engine

bv is a graph-aware triage engine for Beads projects (`.beads/beads.jsonl`). Instead of parsing JSONL or hallucinating graph traversal, use robot flags for deterministic, dependency-aware outputs with precomputed metrics (PageRank, betweenness, critical path, cycles, HITS, eigenvector, k-core).

**Scope boundary:** bv handles _what to work on_ (triage, priority, planning). For agent-to-agent coordination (messaging, work claiming, file reservations), use MCP Agent Mail, which should be available to you as an MCP server. If it's not, flag to the user—they may need to start Agent Mail using the `am` alias.

**⚠️ CRITICAL: Use ONLY `--robot-*` flags. Bare `bv` launches an interactive TUI that blocks your session.**

### The Workflow: Start With Triage

**`bv --robot-triage` is your single entry point.** It returns everything you need in one call:

- `quick_ref`: at-a-glance counts + top 3 picks
- `recommendations`: ranked actionable items with scores, reasons, unblock info
- `quick_wins`: low-effort high-impact items
- `blockers_to_clear`: items that unblock the most downstream work
- `project_health`: status/type/priority distributions, graph metrics
- `commands`: copy-paste shell commands for next steps

```bash
bv --robot-triage        # THE MEGA-COMMAND: start here
bv --robot-next          # Minimal: just the single top pick + claim command
```

### Command Reference

**Planning:**
| Command | Returns |
|---------|---------|
| `--robot-plan` | Parallel execution tracks with `unblocks` lists |
| `--robot-priority` | Priority misalignment detection with confidence |

**Graph Analysis:**
| Command | Returns |
|---------|---------|
| `--robot-insights` | Full metrics: PageRank, betweenness, HITS (hubs/authorities), eigenvector, critical path, cycles, k-core, articulation points, slack |
| `--robot-label-health` | Per-label health: `health_level` (healthy\|warning\|critical), `velocity_score`, `staleness`, `blocked_count` |
| `--robot-label-flow` | Cross-label dependency: `flow_matrix`, `dependencies`, `bottleneck_labels` |
| `--robot-label-attention [--attention-limit=N]` | Attention-ranked labels by: (pagerank × staleness × block_impact) / velocity |

**History & Change Tracking:**
| Command | Returns |
|---------|---------|
| `--robot-history` | Bead-to-commit correlations: `stats`, `histories` (per-bead events/commits/milestones), `commit_index` |
| `--robot-diff --diff-since <ref>` | Changes since ref: new/closed/modified issues, cycles introduced/resolved |

**Other:**
| Command | Returns |
|---------|---------|
| `--robot-burndown <sprint>` | Sprint burndown, scope changes, at-risk items |
| `--robot-forecast <id\|all>` | ETA predictions with dependency-aware scheduling |
| `--robot-alerts` | Stale issues, blocking cascades, priority mismatches |
| `--robot-suggest` | Hygiene: duplicates, missing deps, label suggestions, cycle breaks |
| `--robot-graph [--graph-format=json\|dot\|mermaid]` | Dependency graph export |
| `--export-graph <file.html>` | Self-contained interactive HTML visualization |

### Scoping & Filtering

```bash
bv --robot-plan --label backend              # Scope to label's subgraph
bv --robot-insights --as-of HEAD~30          # Historical point-in-time
bv --recipe actionable --robot-plan          # Pre-filter: ready to work (no blockers)
bv --recipe high-impact --robot-triage       # Pre-filter: top PageRank scores
bv --robot-triage --robot-triage-by-track    # Group by parallel work streams
bv --robot-triage --robot-triage-by-label    # Group by domain
```

### Understanding Robot Output

**All robot JSON includes:**

- `data_hash` — Fingerprint of source beads.jsonl (verify consistency across calls)
- `status` — Per-metric state: `computed|approx|timeout|skipped` + elapsed ms
- `as_of` / `as_of_commit` — Present when using `--as-of`; contains ref and resolved SHA

**Two-phase analysis:**

- **Phase 1 (instant):** degree, topo sort, density — always available immediately
- **Phase 2 (async, 500ms timeout):** PageRank, betweenness, HITS, eigenvector, cycles — check `status` flags

**For large graphs (>500 nodes):** Some metrics may be approximated or skipped. Always check `status`.

### jq Quick Reference

```bash
bv --robot-triage | jq '.quick_ref'                        # At-a-glance summary
bv --robot-triage | jq '.recommendations[0]'               # Top recommendation
bv --robot-plan | jq '.plan.summary.highest_impact'        # Best unblock target
bv --robot-insights | jq '.status'                         # Check metric readiness
bv --robot-insights | jq '.Cycles'                         # Circular deps (must fix!)
bv --robot-label-health | jq '.results.labels[] | select(.health_level == "critical")'
```

**Performance:** Phase 1 instant, Phase 2 async (500ms timeout). Prefer `--robot-plan` over `--robot-insights` when speed matters. Results cached by data hash.

Use bv instead of parsing beads.jsonl—it computes PageRank, critical paths, cycles, and parallel tracks deterministically.

---

## MCP Agent Mail — Multi-Agent Coordination

Agent Mail is available as an MCP server for coordinating work across agents.

### CRITICAL: How Agents Access Agent Mail

**Coding agents (Claude Code, Codex, Gemini CLI) access Agent Mail NATIVELY via MCP tools.**

- You do NOT need to implement HTTP wrappers, client classes, or JSON-RPC handling
- MCP tools are available directly in your environment (e.g., `macro_start_session`, `send_message`, `fetch_inbox`)
- If MCP tools aren't available, flag it to the user — they may need to start the Agent Mail server

**DO NOT** create HTTP wrappers or unify "client code" for agent-to-Agent-Mail communication — this is already handled by your MCP runtime.

What Agent Mail gives:

- Identities, inbox/outbox, searchable threads.
- Advisory file reservations (leases) to avoid agents clobbering each other.
- Persistent artifacts in git (human-auditable).

Core patterns:

1. **Same repo**
   - Register identity:
     - `ensure_project` then `register_agent` with the repo's absolute path as `project_key`.
   - Reserve files before editing:
     - `file_reservation_paths(project_key, agent_name, ["ios/**", "android/**"], ttl_seconds=3600, exclusive=true)`.
   - Communicate:
     - `send_message(..., thread_id="FEAT-123")`.
     - `fetch_inbox`, then `acknowledge_message`.
   - Fast reads:
     - `resource://inbox/{Agent}?project=<abs-path>&limit=20`.
     - `resource://thread/{id}?project=<abs-path>&include_bodies=true`.

2. **Macros vs granular:**
   - Prefer macros when speed is more important than fine-grained control:
     - `macro_start_session`, `macro_prepare_thread`, `macro_file_reservation_cycle`, `macro_contact_handshake`.
   - Use granular tools when you need explicit behavior.

Common pitfalls:

- "from_agent not registered" → call `register_agent` with correct `project_key`.
- `FILE_RESERVATION_CONFLICT` → adjust patterns, wait for expiry, or use non-exclusive reservation.

---

## Note for AI Agents on Multi-Agent Work

You may see changes in the working tree that you did not make. These are changes created by other agents working on the project concurrently. This is normal.

**NEVER** stash, revert, overwrite, or otherwise disturb changes made by other agents. Treat those changes identically to changes you made yourself.

---

## Note for Codex/GPT-5.3

You constantly bother me with questions about unexpected changes. NEVER DO THAT. Those are changes from other agents working concurrently. Just treat them as your own changes. NEVER stash, revert, or disturb other agents' work.

---

## Note on Built-in TODO Functionality

- Default issue tracking stays in `br` as described above.
- Exception: if the user explicitly asks you to use your built-in TODO functionality, comply with that request.

---

## Landing the Plane (Session Completion)

**When ending a work session**, complete ALL steps below. Work is NOT complete until `git push` succeeds.

**MANDATORY WORKFLOW:**

1. **File issues for remaining work** - Create beads for follow-up
2. **Run quality gates** (if code changed):

   ```bash
   # TypeScript + Lint
   npx tsc --noEmit
   npx eslint . --ext .ts,.tsx

   # Tests
   npm test

   # Content (if changed)
   node tools/content/validate.ts
   ```

3. **Update issue status** - Close finished work
4. **PUSH TO REMOTE** - This is MANDATORY:
   ```bash
   git pull --rebase
   br sync --flush-only
   git add .beads/
   git add <other files>
   git commit -m "..."
   git push
   git status  # MUST show "up to date with origin"
   ```
5. **Verify** - All changes committed AND pushed

**CRITICAL RULES:**

- Work is NOT complete until `git push` succeeds
- NEVER stop before pushing
- NEVER say "ready to push when you are" - YOU must push
- If push fails, resolve and retry until it succeeds

---

## Machine-Readable Reference

### TypeScript Interfaces (Core Types)

```typescript
type Locale = "en" | "fr" | "es" | "de" | "it" | "nl" | "ar";
type ISODateTime = string;

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
}

interface PlaceI18n {
  placeId: string;
  locale: Locale;
  name: string;
  description: string;
  tips?: string[];
  searchKeywords?: string[];
}

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

interface Itinerary {
  id: string;
  durationType: "1day" | "weekend" | "long-weekend" | "1week";
  locale: Locale;
  title: string;
  description: string;
  days: ItineraryDay[];
}

interface Pick {
  id: string;
  category: PickCategory;
  placeId: string;
  locale: Locale;
  title: string;
  tagline: string;
  whyWeLoveIt: string;
}

interface TipSection {
  id: string;
  icon: string;
  locale: Locale;
  title: string;
  content: string[];
  lastReviewedAt: ISODateTime;
  safetyLevel?: "general" | "important" | "critical";
}

interface Phrase {
  id: string;
  category:
    | "greeting"
    | "shopping"
    | "directions"
    | "food"
    | "emergency"
    | "transport"
    | "courtesy";
  locale: Locale;
  english: string;
  darija: string;
  darijaLatin: string;
  french: string;
  audioPath?: string;
}
```

### SQLite Schema (Content DB)

```sql
-- places_base (locale-independent)
CREATE TABLE places_base (
    id TEXT PRIMARY KEY,
    slug TEXT NOT NULL,
    category TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    neighborhood TEXT,
    price_range INTEGER,
    rating REAL,
    images TEXT,           -- JSON array of PlaceImage
    opening_hours TEXT,    -- JSON OpeningHours
    contacts TEXT,         -- JSON
    featured INTEGER DEFAULT 0,
    status TEXT DEFAULT 'open',
    last_verified_at TEXT
);

-- places_i18n (per-locale)
CREATE TABLE places_i18n (
    place_id TEXT NOT NULL,
    locale TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    tips TEXT,             -- JSON array
    search_keywords TEXT,  -- JSON array
    PRIMARY KEY (place_id, locale)
);

-- FTS5 virtual table (per-locale, prebuilt)
CREATE VIRTUAL TABLE places_fts USING fts5(
    name, description, tips, search_keywords,
    content='places_i18n',
    content_rowid='rowid'
);
```

### SQLite Schema (User DB)

```sql
CREATE TABLE favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL,  -- 'place', 'itinerary', 'pick'
    content_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    UNIQUE(content_type, content_id)
);

CREATE TABLE notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL,
    content_id TEXT NOT NULL,
    note_text TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE checklist_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    sort_order INTEGER,
    created_at TEXT NOT NULL
);

CREATE TABLE issue_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL,
    content_id TEXT NOT NULL,
    report_type TEXT NOT NULL,  -- 'incorrect', 'closed', 'outdated', 'other'
    details TEXT,
    created_at TEXT NOT NULL,
    synced INTEGER DEFAULT 0
);
```

<!-- marrakech-compass-machine-readable-v1 -->
