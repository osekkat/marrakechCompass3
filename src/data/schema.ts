/**
 * SQLite schema definitions for content.db and user.db
 * Based on plan.md database architecture
 */

// Content DB schema (read-only, swapped on update)
export const CONTENT_DB_SCHEMA = `
-- places_base (locale-independent)
CREATE TABLE IF NOT EXISTS places_base (
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
CREATE TABLE IF NOT EXISTS places_i18n (
    place_id TEXT NOT NULL,
    locale TEXT NOT NULL,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    tips TEXT,             -- JSON array
    search_keywords TEXT,  -- JSON array
    PRIMARY KEY (place_id, locale)
);

-- FTS5 virtual table (per-locale, prebuilt)
-- Note: FTS tables are prebuilt during content pipeline and shipped with content packs.
-- The content sync uses external content (content='places_i18n').
-- Rebuild triggers are needed when places_i18n is updated.
CREATE VIRTUAL TABLE IF NOT EXISTS places_fts USING fts5(
    name, description, tips, search_keywords,
    content='places_i18n',
    content_rowid='rowid'
);

-- FTS rebuild triggers (run after content swap)
-- These are executed manually during content activation, not auto-triggered
-- CREATE TRIGGER places_fts_ai AFTER INSERT ON places_i18n BEGIN
--   INSERT INTO places_fts(rowid, name, description, tips, search_keywords)
--   VALUES (NEW.rowid, NEW.name, NEW.description, NEW.tips, NEW.search_keywords);
-- END;

-- itineraries
CREATE TABLE IF NOT EXISTS itineraries (
    id TEXT PRIMARY KEY,
    duration_type TEXT NOT NULL,
    locale TEXT NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    days TEXT NOT NULL     -- JSON array of ItineraryDay
);

-- picks
CREATE TABLE IF NOT EXISTS picks (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    place_id TEXT NOT NULL,
    locale TEXT NOT NULL,
    title TEXT NOT NULL,
    tagline TEXT NOT NULL,
    why_we_love_it TEXT NOT NULL,
    images TEXT NOT NULL   -- JSON array
);

-- tips
CREATE TABLE IF NOT EXISTS tips (
    id TEXT PRIMARY KEY,
    icon TEXT NOT NULL,
    locale TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL, -- JSON array
    last_reviewed_at TEXT NOT NULL,
    safety_level TEXT DEFAULT 'general'
);

-- phrases
CREATE TABLE IF NOT EXISTS phrases (
    id TEXT PRIMARY KEY,
    category TEXT NOT NULL,
    locale TEXT NOT NULL,
    english TEXT NOT NULL,
    darija TEXT NOT NULL,
    darija_latin TEXT NOT NULL,
    french TEXT NOT NULL,
    audio_path TEXT
);
`;

// User DB schema (read-write, persists across updates)
export const USER_DB_SCHEMA = `
CREATE TABLE IF NOT EXISTS favorites (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL,  -- 'place', 'itinerary', 'pick'
    content_id TEXT NOT NULL,
    created_at TEXT NOT NULL,
    UNIQUE(content_type, content_id)
);

CREATE TABLE IF NOT EXISTS notes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL,
    content_id TEXT NOT NULL,
    note_text TEXT,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS checklist_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER DEFAULT 0,
    sort_order INTEGER,
    created_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS issue_reports (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content_type TEXT NOT NULL,
    content_id TEXT NOT NULL,
    report_type TEXT NOT NULL,  -- 'incorrect', 'closed', 'outdated', 'other'
    details TEXT,
    created_at TEXT NOT NULL,
    synced INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS download_status (
    pack_id TEXT PRIMARY KEY,
    pack_type TEXT NOT NULL,    -- 'map', 'content', 'routing'
    status TEXT NOT NULL,       -- 'pending', 'downloading', 'ready', 'failed'
    progress REAL DEFAULT 0,
    size_bytes INTEGER,
    downloaded_bytes INTEGER DEFAULT 0,
    error_message TEXT,
    updated_at TEXT NOT NULL
);
`;
