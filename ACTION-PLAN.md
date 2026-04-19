# SEO Action Plan — Olympos Lodge

**Live Site Score: 39 / 100**  
**Static Build Score: 65 / 100**  
**Target Score: 80+ / 100**  
**Audit Date:** 2026-04-12

---

## Priority Legend

- **CRITICAL** — Blocks indexing or causes penalties. Fix immediately.
- **HIGH** — Significantly impacts rankings. Fix within 1 week.
- **MEDIUM** — Optimization opportunity. Fix within 1 month.
- **LOW** — Nice to have. Backlog.

---

## Phase 0: Deploy What Already Exists (Day 1)

These items are built in the repo but not live on the WordPress site. Deploying them alone raises the live score from ~39 to ~55.

| # | Action | Effort | Impact |
|---|---|---|---|
| 0.1 | **Deploy llms.txt** to WP server root (`public_html/llms.txt`) | 10 min | GEO +22 |
| 0.2 | **Deploy robots.txt** to WP server root (overrides WP default) | 10 min | Technical +5 |
| 0.3 | **Add JSON-LD schema** to WP homepage (Hotel + FAQPage blocks from `index.html`) | 30 min | Schema +40 |
| 0.4 | **Add meta descriptions** to all WP pages via Yoast/RankMath | 1 hour | Content +15 |

---

## Phase 1: Critical Fixes (Week 1)

### 1.1 Fix the sitemap — CRITICAL
**Issue:** 90%+ of content pages missing. `/test/` and `/portfolio/tropicana-hotel/` pollute crawl.  
**Action:**
- Install Yoast or RankMath (replaces WP core sitemap with comprehensive one)
- Delete or noindex `/test/` page
- Delete `/portfolio/tropicana-hotel/`
- Disable author, CPT layout, and portfolio sitemaps
- Verify all room pages, about, contact, gallery, Çıralı guide appear in sitemap
- Confirm EN/DE variants are included  
**Effort:** 1-2 hours

### 1.2 Fix hreflang — CRITICAL
**Issue:** All language tags point to the same URL. EN/DE content invisible to Google.  
**Action:**
- In the static build: update hreflang `href` values to point to actual language-specific URLs
- On WP: if using WPML/Polylang, ensure hreflang is generated per-language automatically
- If EN/DE is client-side JS only: this cannot be fixed without server-rendered language pages  
**Effort:** 2-4 hours (depends on i18n architecture)

### 1.3 Add HSTS header — CRITICAL
**Issue:** No `Strict-Transport-Security` header.  
**Action:** Add to LiteSpeed `.htaccess`: `Header set Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"`  
**Effort:** 10 min

### 1.4 Fix TripAdvisor link — CRITICAL
**Issue:** Footer links to `tripadvisor.com` root instead of property listing.  
**Action:** Replace with actual property URL. Add to `sameAs` in schema.  
**Effort:** 5 min  
**Files:** `assets/translations.js`, `index.html` (JSON-LD)

### 1.5 Fix cache-control headers — HIGH
**Issue:** `max-age=0` means no browser caching at all.  
**Action:** Configure WP Rocket or LiteSpeed Cache:
- Static assets (CSS/JS/images): `max-age=31536000`
- HTML pages: `max-age=3600`  
**Effort:** 30 min

### 1.6 Add security headers — HIGH
**Action:** Add via `.htaccess` or LiteSpeed config:
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- Basic CSP (report-only mode initially)  
**Effort:** 30 min

---

## Phase 2: Schema & On-Page (Weeks 2-3)

### 2.1 Add Offer schema to room pages — CRITICAL
**Issue:** Biggest gap for travel SERP eligibility.  
**Action:** Add `offers` block to each HotelRoom JSON-LD with `priceCurrency`, `availability`, `seller`.  
**Files:** All `room-*.html` pages  
**Effort:** 2 hours

### 2.2 Add WebSite + SearchAction schema — HIGH
**Issue:** Blocks sitelinks search box in Google results.  
**Action:** Add JSON-LD block to homepage `<head>`.  
**Files:** `index.html`  
**Effort:** 15 min

### 2.3 Fix sameAs array — HIGH
**Issue:** Contains own URL (circular). Missing TripAdvisor, Booking.com, GBP CID, Facebook.  
**Action:** Replace `sameAs` with actual third-party profile URLs.  
**Files:** `index.html` (JSON-LD)  
**Effort:** 30 min

### 2.4 Add containedInPlace to room pages — HIGH
**Issue:** HotelRoom entities not linked back to Hotel.  
**Action:** Add `containedInPlace` referencing Hotel entity in each room page JSON-LD.  
**Files:** All `room-*.html`  
**Effort:** 30 min

### 2.5 Add commercial keywords to headings — HIGH
**Issue:** No "otel", "hotel", "Çıralı otel" in any H1 or meta description.  
**Action:**
- Homepage meta: add "otel" or "butik otel"
- Location page: replace "Konum" with "Çıralı'ya Nasıl Ulaşılır"
- Rooms page: add "Çıralı otel odaları" context  
**Files:** Multiple HTML files, `assets/translations.js`  
**Effort:** 2-3 hours

### 2.6 Add BreadcrumbList to rooms.html and location.html — HIGH
**Issue:** Zero schema on these key landing pages.  
**Effort:** 30 min

### 2.7 Resolve NAP locality conflict — HIGH
**Issue:** Footer says "Kemer", schema says "Ulupınar". Must match GBP listing.  
**Action:** Check GBP listing, pick one, apply consistently everywhere.  
**Effort:** 30 min

### 2.8 Add GBP CID URL to sameAs — HIGH
**Action:** Find CID from Maps URL, add as `sameAs` entry.  
**Effort:** 15 min

---

## Phase 3: Content & Performance (Weeks 3-4)

### 3.1 Expand offers page — HIGH
**Issue:** ~120 words. Highest-intent commercial page with no real content.  
**Action:** Add pricing, dates, inclusions. Target 600+ words. Update OfferCatalog schema.  
**Effort:** 3-4 hours

### 3.2 Expand thin room pages — HIGH
**Issue:** room-standart (~180 words), room-gol-evi (~230 words).  
**Action:** Add 100-200 words of unique editorial content per room.  
**Effort:** 4-6 hours

### 3.3 Fix hero image loading (live WP) — CRITICAL for Performance
**Action:**
- Exclude hero from lazy loading (`loading="eager"`)
- Add `<link rel="preload" as="image">` for hero
- Convert to WebP format  
**Effort:** 1-2 hours

### 3.4 Reduce JavaScript payload — HIGH
**Action:**
- Defer or remove Instagram feed widget (replace with static images)
- Load Flatpickr and Magnific Popup only on pages that need them
- Audit Essential Addons — disable unused widgets  
**Effort:** 2-3 hours

### 3.5 Convert images to WebP — HIGH
**Action:** Install ShortPixel or use WP Rocket WebP conversion.  
**Effort:** 30 min (plugin config) + processing time

### 3.6 Replace anonymous testimonials — MEDIUM
**Issue:** "Bir misafir, 2024" is unverifiable per Google QRG.  
**Action:** Source from TripAdvisor/Google with name + country.  
**Effort:** 2 hours

### 3.7 Add content to gallery page — MEDIUM
**Issue:** Zero text content.  
**Action:** Add intro paragraph, category groupings, captions.  
**Effort:** 2 hours

### 3.8 Fix cirali.html schema — MEDIUM
**Action:** Remove invalid `touristType` property, refactor parallel `@context` to single `@graph`.  
**Effort:** 30 min

---

## Phase 4: Advanced / Backlog

| # | Action | Effort | Impact |
|---|---|---|---|
| 4.1 | Add `openingHoursSpecification` (seasonal hours) | 15 min | Local SEO |
| 4.2 | Create image sitemap for hotel photography | 1 hour | Images |
| 4.3 | Install IndexNow plugin for Bing/Yandex | 10 min | Technical |
| 4.4 | Create YouTube property walkthrough video | 1-2 weeks | GEO (0.737 AI citation correlation) |
| 4.5 | Self-host Google Fonts | 1-2 hours | Performance |
| 4.6 | Add Maps embed / directions CTA to homepage | 1 hour | Local SEO |
| 4.7 | Add live Google Reviews widget | 2 hours | Local SEO, Trust |
| 4.8 | Establish Wikipedia stub for Olympos Lodge | 2-4 weeks | GEO, Authority |
| 4.9 | Fix copyright year (2025 → dynamic) | 15 min | Trust |
| 4.10 | Add FAQ content blocks with question-format H2s | 3-4 hours | GEO, Content |

---

## Score Projections

| Phase | Est. Score | Key Gains |
|---|---|---|
| Current (live WP) | **39** | — |
| After Phase 0 (deploy existing work) | **~55** | Schema +40, GEO +22, Meta +15 |
| After Phase 1 (critical fixes) | **~65** | Sitemap, hreflang, security, caching |
| After Phase 2 (schema + on-page) | **~74** | Offers schema, keywords, NAP fix |
| After Phase 3 (content + performance) | **~82** | Content depth, CWV, images |
| After Phase 4 (advanced) | **~88** | Local signals, GEO, video |

---

## Items Needing Periodic Revision

These contain time-sensitive or placeholder data. Grep `TODO:SEO-REVISE` in the codebase.

| Item | File | When to update |
|---|---|---|
| aggregateRating | index.html | When review count changes significantly |
| sameAs URLs | index.html | When profile URLs are confirmed |
| Offer schema | pages/offers.html | When offers page is finalised |
| sitemap.xml lastmod | sitemap.xml | When any page is modified |
| llms.txt | llms.txt | When pages/rooms/descriptions change |
| FAQ answers | index.html | If operational facts change |
| HotelRoom schema | Room pages | If room details change |
| Canonical URL paths | All pages | When production URL structure is confirmed |

---

*Audit: April 12, 2026 | Live site: 39/100 | Static build: 65/100 | Target: 80+/100*
