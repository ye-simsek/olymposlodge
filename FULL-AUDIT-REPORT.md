# Full SEO Audit Report — Olympos Lodge

**URL Audited:** https://www.olymposlodge.com.tr (live WordPress site)  
**Static Build:** https://ye-simsek.github.io/olymposlodge/ (repo)  
**Audit Date:** 2026-04-12  
**Business Type:** Hotel — 17-room boutique hotel, Çıralı, Antalya, Turkey  
**Platform (live):** WordPress + Elementor + WP Rocket on LiteSpeed  
**Languages:** Turkish (primary), English, German  

---

## Executive Summary

### Overall SEO Health Score: 39 / 100 (live site)

The static build in this repo scores ~65/100 — much of the schema, meta, and structural work is already done but **not deployed** to the live WordPress site. The score below reflects what Google and AI crawlers currently see.

| Category | Weight | Static Build | Live WP Site | Weighted (Live) |
|----------|--------|-------------|-------------|-----------------|
| Technical SEO | 22% | 68 | 42 | 9.2 |
| Content Quality | 23% | 67 | 30 | 6.9 |
| On-Page SEO | 20% | 58 | 35 | 7.0 |
| Schema / Structured Data | 10% | 82 | 15 | 1.5 |
| Performance (CWV) | 10% | 60 | 30 | 3.0 |
| AI Search Readiness | 10% | 68 | 38 | 3.8 |
| Local SEO | 5% | 60 | 62 | 3.1 |
| **Total** | **100%** | **65** | | **34.5 → 39** |

---

### Top 5 Critical Issues (Live Site)

1. **Hreflang is completely broken** — all 3 language tags (tr/en/de) point to the same URL on the static build; the live WP site has no hreflang at all. Google cannot serve language-appropriate results.
2. **90%+ of content pages missing from sitemap** — rooms, about, contact, gallery, Çıralı guide, and all language variants are absent from wp-sitemap.xml.
3. **No meta description on homepage** — the most important page has zero SERP snippet control. Title is thin: "Olympos Lodge – Çıralı Antalya".
4. **AI crawlers receive near-zero content** — Elementor renders content via JavaScript. Non-browser crawlers (GPTBot, ClaudeBot) get empty pages. llms.txt exists in repo but returns 404 live.
5. **No HSTS security header** — HTTP visitors can be intercepted before the 301 redirect.

### Top 5 Quick Wins

1. **Deploy llms.txt and robots.txt** from repo to WP server root (30 min — GEO score jumps from 38 to ~60)
2. **Add meta descriptions** to homepage and key pages via WordPress/Yoast (1 hour)
3. **Fix TripAdvisor footer link** — currently points to tripadvisor.com root, not property listing (5 min)
4. **Remove /test/ and /portfolio/tropicana-hotel/** from WordPress (10 min — junk pages in sitemap)
5. **Install Yoast/RankMath** to fix sitemap coverage and add lastmod dates (30 min)

---

## 1. Technical SEO (Live: 42/100 | Static: 68/100)

### Crawlability

| Finding | Severity |
|---|---|
| Non-www → www 301 redirect is clean, no chains | PASS |
| robots.txt conflict: repo file vs live WP file reference different sitemaps | HIGH |
| `/assets/` disallowed in repo robots.txt — may block rendering on static build | MEDIUM |
| AI crawlers (GPTBot, ClaudeBot, etc.) implicitly allowed via wildcard | PASS |

### Indexability

| Finding | Severity |
|---|---|
| **Hreflang tags all point to same URL** (static build) / absent (live WP) | CRITICAL |
| Sitemap references `/rooms/` but live site serves `/odalar/` — slug mismatch | HIGH |
| EN/DE language pages absent from all sitemaps | HIGH |
| `aggregateRating` hardcoded (4.4/5, 660 reviews) — needs verifiable source URL | HIGH |
| Client-side i18n via translations.js — EN/DE may never be indexed | MEDIUM |
| `/test/` page and `/portfolio/tropicana-hotel/` in sitemap | HIGH |
| Author/user archive sitemaps included (no SEO value) | MEDIUM |

### Security

| Finding | Severity |
|---|---|
| HTTPS active with valid certificate | PASS |
| **No HSTS header** | CRITICAL |
| No X-Content-Type-Options header | HIGH |
| No X-Frame-Options or CSP frame-ancestors | HIGH |
| No Content-Security-Policy | MEDIUM |
| `cache-control: public, max-age=0` (no browser caching) | HIGH |

### URL Structure

| Finding | Severity |
|---|---|
| Sitemap slug mismatch: `/rooms/` in repo vs `/odalar/` live | HIGH |
| Trailing slash consistency maintained | PASS |

### Mobile

| Finding | Severity |
|---|---|
| Viewport meta correctly set with `viewport-fit=cover` | PASS |

### IndexNow

| Finding | Severity |
|---|---|
| Not implemented — easy win for Bing/Yandex instant indexing | LOW |

---

## 2. Content Quality (Live: 30/100 | Static: 67/100)

### Meta Tags

| Page | Title | Meta Description | Severity |
|---|---|---|---|
| Homepage (TR) | "Olympos Lodge – Çıralı Antalya" (thin) | **MISSING** | CRITICAL |
| EN homepage | Not verified | Likely missing | HIGH |
| DE homepage | Not verified | Likely missing | HIGH |

### E-E-A-T Signals

| Signal | Status | Severity |
|---|---|---|
| Author/expertise indicators | None visible on live site | MEDIUM |
| Trust signals (reviews) | Static rating only, no live widgets | HIGH |
| Contact info visible | Phone/email in footer | PASS |
| About page exists | Yes at `/hakkimizda/` | PASS |

### Content Depth (Live Site)

| Finding | Severity |
|---|---|
| Homepage prose is JS-rendered — crawlers see near-empty page | CRITICAL |
| No FAQ sections in crawlable HTML on live site | HIGH |
| No destination guide content linked from homepage | MEDIUM |

### Content Depth (Static Build — for reference)

| Page | Word Count | Target | Status |
|---|---|---|---|
| index.html | ~480 | 500 | Borderline |
| pages/rooms.html | ~310 | 800 | **THIN** |
| pages/cirali.html | ~620 | 500 | Pass |
| pages/offers.html | ~120 | 800 | **CRITICAL** |
| pages/location.html | ~280 | 500 | **THIN** |
| pages/lodge.html | ~400 | 800 | **THIN** |
| pages/gallery.html | ~0 | N/A | **No text** |
| room-standart | ~180 | 300 | **THIN** |
| room-gol-evi | ~230 | 300 | **THIN** |

### Images

| Finding | Severity |
|---|---|
| All images are JPG — no WebP/AVIF | HIGH |
| Generic filenames (IMG_4891.jpg, IMG_4920.jpg) | MEDIUM |
| Alt text quality needs page-by-page verification | MEDIUM |
| No image sitemap | MEDIUM |

---

## 3. On-Page SEO (Live: 35/100 | Static: 58/100)

| Issue | Severity |
|---|---|
| Homepage title thin — just "Olympos Lodge – Çıralı Antalya" | HIGH |
| Missing "otel" or "hotel" keyword in title and meta description | HIGH |
| No commercial keywords in any H1 | HIGH |
| Location page H1 is single word "Konum" | HIGH |
| No question-format headings for featured snippet targeting | MEDIUM |
| No breadcrumb navigation on rooms listing page | HIGH |
| No cross-linking between related content | MEDIUM |

---

## 4. Schema / Structured Data (Live: 15/100 | Static: 82/100)

### Live WordPress Site

**No JSON-LD schema detected on any page.** The live WP site has zero structured data — all the schema work exists only in the static build.

### Static Build (in repo — not deployed)

| Page | Schema | Status |
|---|---|---|
| Homepage | Hotel + aggregateRating + FAQPage (6 Qs) | Present |
| Room pages ×6 | HotelRoom + BreadcrumbList | Present |
| Çıralı page | TouristAttraction ×2 + BreadcrumbList | Present |
| Offers page | OfferCatalog (placeholder) | Present |

### Issues in Static Build Schema

| Issue | Severity |
|---|---|
| `sameAs` contains own URL (circular) — needs TripAdvisor, Booking.com, GBP CID | HIGH |
| `aggregateRating` hardcoded with no verifiable source URL | HIGH |
| No `WebSite` + `SearchAction` — blocks sitelinks search box | HIGH |
| No `Offer` on HotelRoom pages — biggest gap for travel SERP eligibility | CRITICAL |
| No `containedInPlace` linking rooms back to Hotel entity | HIGH |
| `rooms.html` and `location.html` have zero schema | HIGH |
| `cirali.html` uses invalid `touristType` property | MEDIUM |
| FAQ answers in English on `lang="tr"` page | MEDIUM |
| No `openingHoursSpecification` for seasonal property | MEDIUM |

---

## 5. Performance / Core Web Vitals (Live: 30/100 | Static: 60/100)

### LCP (Largest Contentful Paint) — CRITICAL

| Finding | Severity |
|---|---|
| Hero image is JPG (not WebP/AVIF) — 30-50% larger than needed | CRITICAL |
| No `<link rel="preload">` for hero on live WP site | CRITICAL |
| WP Rocket may apply `loading="lazy"` to hero, delaying LCP | CRITICAL |
| 413KB HTML document — long parse time | HIGH |
| 5 Google Font families loaded synchronously | MEDIUM |
| **Estimated LCP: 3.5-5.5s** (target: <2.5s) | |

### INP (Interaction to Next Paint) — HIGH

| Finding | Severity |
|---|---|
| 8-12 JavaScript bundles on main thread (Elementor, jQuery, GSAP, Swiper, Chaty, Instagram feed, etc.) | HIGH |
| Estimated main thread blocking: 2-4 seconds post-load | |

### CLS (Cumulative Layout Shift) — MEDIUM

| Finding | Severity |
|---|---|
| Instagram feed images without reserved dimensions | MEDIUM |
| Chaty widget injected after load | MEDIUM |

### Caching

| Finding | Severity |
|---|---|
| `cache-control: public, max-age=0` on all responses | HIGH |
| No browser caching for static assets — repeat visitors re-download everything | HIGH |

---

## 6. AI Search Readiness / GEO (Live: 38/100 | Static: 68/100)

### GEO Health Score Breakdown

| Dimension | Score |
|---|---|
| Citability | 35/100 |
| Structural Readability | 30/100 |
| Multi-Modal Content | 45/100 |
| Authority & Brand Signals | 55/100 |
| Technical Accessibility | 25/100 |

### Platform Scores (Live Site)

| Platform | Score | Primary Blocker |
|---|---|---|
| Google AI Overviews | 30/100 | No JSON-LD, JS-rendered content |
| ChatGPT | 25/100 | No llms.txt deployed, no brand entity anchors |
| Perplexity | 40/100 | Implicit crawler access, no structured passages |
| Bing Copilot | 30/100 | No schema, no FAQ markup |

### Critical Findings

| Finding | Severity |
|---|---|
| **llms.txt returns 404 on live site** — exists in repo, not deployed | CRITICAL |
| AI crawlers get near-zero readable content (JS rendering required) | CRITICAL |
| No extractable factual passages in crawlable HTML | HIGH |
| No Wikipedia entity, no YouTube channel for brand signals | MEDIUM |

---

## 7. Sitemap (Live: 25/100 | Static: 70/100)

### Live WordPress Sitemap (wp-sitemap.xml)

| Finding | Severity |
|---|---|
| **90%+ of content pages missing** from all sub-sitemaps | CRITICAL |
| `/test/` page (draft/staging) is in sitemap | HIGH |
| `/portfolio/tropicana-hotel/` in sitemap — competitor name on your domain | HIGH |
| Author/user archive sitemaps included | HIGH |
| CPT layout and portfolio sitemaps (theme scaffolding) | MEDIUM |
| No `lastmod` dates on any URL | MEDIUM |
| No image sitemap | MEDIUM |

### Pages Missing from Live Sitemap

- `/odalar/` (rooms) • `/cirali/` (destination guide) • `/galeri/` (gallery)
- `/hakkimizda/` (about) • `/iletisim/` (contact)
- All room pages: `/antik-oda/`, `/aqua-super-deluxe-oda/`, `/cift-kisilik-oda/`, `/deluxe-cift-kisilik-oda/`, `/super-deluxe-cift-kisilik-oda/`
- `/de/startseite/` (DE homepage)
- Legal pages: `/gizlilik-kvkk-bilgilendirme/`, `/on-bilgilendirme-formu/`

### Static Build Sitemap (/sitemap.xml)

18 URLs, structurally clean. Issues: identical `lastmod` dates, `changefreq`/`priority` tags (Google ignores these).

---

## 8. Local SEO (Live: 62/100 | Static: 60/100)

### NAP Consistency

| Source | Locality | Phone |
|---|---|---|
| HTML footer | "Kemer / Antalya" | +90 532 308 34 86 |
| JSON-LD (static build) | "Ulupınar" | +905323083486 |
| **Conflict** | Kemer vs Ulupınar | Format differs |

### GBP Signals

| Finding | Severity |
|---|---|
| Maps embed on location page with correct coordinates | PASS |
| `hasMap` in schema (static build) with Google Maps URL | PASS |
| **No Maps embed or directions CTA on homepage** | HIGH |
| No Google Reviews widget or badge | MEDIUM |
| `sameAs` missing GBP CID URL | HIGH |

### Review Health

| Finding | Severity |
|---|---|
| Static `aggregateRating` (4.4/5, 660 reviews) — no live source | HIGH |
| No live review widget embedded | HIGH |
| TripAdvisor footer link points to root domain, not property page | CRITICAL |
| No on-page testimonials with structured markup | MEDIUM |

### Local Keyword Gaps

| Finding | Severity |
|---|---|
| No "otel" or "hotel" in meta description | HIGH |
| No "Kemer otel" or "Antalya butik otel" targeting | MEDIUM |

---

## The Static → Live Gap

The biggest issue isn't missing SEO work — **it's that the work exists but isn't deployed.** The static build has:

- Hotel + HotelRoom + FAQPage + TouristAttraction schema
- Canonical tags on all 16 pages
- llms.txt for AI crawlers
- Proper robots.txt with AI crawler permissions
- Meta descriptions on all pages

**None of this is visible to Google on the live WordPress site.** The most impactful action is deploying the static site or replicating key elements (schema, meta, llms.txt) on WordPress.

---

## Scoring Methodology

| Category | Weight | What Was Measured |
|---|---|---|
| Technical SEO | 22% | Crawlability, indexability, security, URL structure, mobile, hreflang |
| Content Quality | 23% | Meta tags, E-E-A-T, content depth, image optimization, readability |
| On-Page SEO | 20% | Titles, descriptions, headings, internal linking, keyword usage |
| Schema | 10% | Structured data presence, validation, completeness |
| Performance | 10% | LCP, INP, CLS estimates, caching, resource loading |
| GEO | 10% | AI crawler access, citability, brand signals, llms.txt |
| Local SEO | 5% | NAP, GBP, reviews, local schema, citations |

## Limitations

- **No Google Search Console data** — indexation status, queries, CTR unverified
- **No CrUX field data** — CWV scores are estimates from HTML/stack analysis
- **No GBP dashboard access** — ranking, review velocity, category unverified
- **No backlink analysis** — no Moz/Bing API credentials available
- **Performance estimated** — Lighthouse lab tests not run
- **Content quality scored conservatively** — live site's JS rendering made direct assessment impossible

---

*Generated by Claude Code SEO Audit — April 12, 2026*
