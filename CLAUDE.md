# Olympos Lodge

## Pending Tasks
1. ~~Wire REZERVASYON button → SabeeApp booking engine~~
2. ~~Scroll fade-ins for about/nature/experience/gallery sections~~ ✓ Done
3. Manifesto/editorial intro section between hero and rooms     Done
4. Footer: WhatsApp link, Spotify playlists (season/checkin confirmed and in staging)
5. Mobile pass — full spacing/typography review
6. Child pages: individual rooms, Chimaera flames, Olympos ruins Done, needs review
7. ~~rooms.html — room descriptions are placeholders; supplement with richer copy from RAG file~~ ✓ Done
8. Hero video poster — user will handle extraction; currently a placeholder
9. Dining section needs revisiting (copy, photos, full menu details)
14. Experiences page: improve Spa section (the Deneyim/Experience section was removed from homepage; spa content should live on the Experiences/Çıralı page)
10. Instagram feed — link to footer
11. Newsletter — email service provider not yet decided; discuss when ready
12. KVKK + Terms pages confirmed accurate by user but recommend professional legal review before go-live
13. Cookie consent — UI built (bottom-left FAB → panel with toggles); actual consent logic (localStorage, conditional script loading) not yet implemented
15. lodge.html intro — second column (`lodge_intro_p2`) is a placeholder summary; replace with final copy once decided

## Design References
Casa Angelina, Amanruya, Badrutt's Palace, Casa Cook

## Hotel Information
Full details in `olympos_lodge_rag_english copy.txt`. The facts below cover the most commonly needed data — use them directly without opening the RAG file.

**Property:** 17 rooms, 20,000 m² garden, single-storey. Direct beach access. Restaurant, private spa (jacuzzi 6-person, sauna, steam room), fire pits, library, picnic area.

**Included in all stays:** Breakfast, beach lounger + umbrella + towel + cabana, Wi-Fi, bicycle, canoe, SUP, parking, spa access. Massage extra (reserve 2h ahead).

**All rooms have:** Queen bed, private terrace + sun loungers, A/C, minibar, Wi-Fi, hair dryer, Rebul toiletries, safe, daily housekeeping. Ground floor, no stairs. Non-smoking indoors.

**i18n key prefixes:** asd_ / sd_ / dx_ / ge_ / an_ / st_

## CSS Files (styles.css has been split)
`styles.css` no longer exists. Use these files instead:

| File | Contents | Loaded on |
|---|---|---|
| `base.css` | Variables, reset, typography, header, nav, footer, scroll animations, weather panel, cookie consent | Every page |
| `home.css` | All homepage sections + rooms listing grid | `index.html`, `rooms.html` |
| `rooms.css` | Individual room page styles (hero, editorial, amenities, strip, CTA) | `rooms.html` + all `room-*.html` |
| `cirali.css` | Child-page hero, Çıralı guide editorial, spa/lodge/location shared styles | `cirali.html`, `lodge.html`, `spa.html`, `location.html` |
| `activities.css` | Activities page sub-nav and grid | `activities.html`, `lodge.html` |
| `pages.css` | Legal pages, photo gallery page | `gallery.html`, `privacy.html`, `terms.html` |

**When editing CSS:** identify which file owns the component from the table above. Do NOT read other CSS files unless the change spans multiple files.

## Conventions
- Bump `base.css?v=`, `home.css?v=`, etc. on every CSS change to that file
- Bump `script.js?v=` on every script.js change
- Bump `translations.js?v=` on every translations.js change (i18n only lives there now)
- For i18n work, read `assets/translations.js` only — do NOT read script.js
- Read only the file(s) directly relevant to the change; pull in others only if the edit requires cross-file coordination
- Do not make any changes until you have 90% confidence in what you need to build. Ask me follow-up questions until you reach that level of confidence.

## Skills

### frontend-design (auto-invoked on frontend work)

Location: `.claude/skills/frontend-design/SKILL.md`
Enforces bold, distinctive aesthetics. Bans generic fonts (Inter, Roboto, Arial, system fonts). Commits to a clear aesthetic direction — luxury/refined matches this project. No AI slop.

### GSD — Get Shit Done

Location: `.claude/commands/gsd/` (installed v1.30.0)
Spec-driven development system. Key commands:

- `/gsd:help` — list all commands
- `/gsd:new-project` — kick off a new spec
- `/gsd:build` — build from spec
- `/gsd:task` — run a focused task

### firecrawl-web (scraping + research)

Location: `.claude/skills/firecrawl-web/SKILL.md` | script: `~/.claude/skills/firecrawl-web/fc.py`
Scrapes URLs to clean markdown, takes screenshots, extracts structured data, searches the web.
Auto-triggers when asked to scrape/fetch a URL.
Requirements:

- Python 3 (install: `winget install Python.Python.3.13`) — **not yet installed on this machine**
- `FIRECRAWL_API_KEY` env var (free tier at firecrawl.dev) — **not yet set**
