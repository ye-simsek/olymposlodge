# Olympos Lodge

## Pending Tasks
1. ~~Wire REZERVASYON button → SabeeApp booking engine~~ ✓ Done
2. ~~Scroll fade-ins for about/nature/experience/gallery sections~~ ✓ Done
3. Manifesto/editorial intro section between hero and rooms
4. Footer: WhatsApp link, Spotify playlists (season/checkin confirmed and in staging)
5. Mobile pass — full spacing/typography review
6. Child pages: individual rooms, Chimaera flames, Olympos ruins
7. ~~rooms.html — room descriptions are placeholders; supplement with richer copy from RAG file~~ ✓ Done
8. Hero video poster — user will handle extraction; currently a placeholder
9. Dining section needs revisiting (copy, photos, full menu details)
14. Experiences page: add Spa section (the Deneyim/Experience section was removed from homepage; spa content should live on the Experiences/Çıralı page)
10. Instagram feed — static placeholder for now; revisit for live feed later
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

**Room facts:**

| Room | Count | Size | Key features |
|---|---|---|---|
| Aqua Super Deluxe | 1 | 105 m², detached | Fireplace, jacuzzi tub, indoor + outdoor rain shower (separate), espresso machine, waterfall wall, glass floor panels, pond + sea view, far end of garden |
| Super Deluxe | 2 | 105 m² | Fireplace, jacuzzi tub + rain shower, espresso machine, large terrace, front garden view, sea view through trees |
| Deluxe | 2 | 70 m² | Fireplace, jacuzzi tub + rain shower, espresso machine, large terrace, front garden view |
| Göl Evi (Lake House) | 1 | 60 m², detached | Fireplace, jacuzzi tub + rain shower, espresso machine, pond view, secluded |
| Antik (Honeymoon) | 1 | — | Brass bed, antique furniture, no fireplace, no jacuzzi, rain shower, private terrace |
| Standart | 10 | 35 m² | Rain shower (no jacuzzi/bathtub), no fireplace, coffee maker (not espresso), garden view |

**i18n key prefixes:** asd_ / sd_ / dx_ / ge_ / an_ / st_

## styles.css Section Map
4727 lines total. Read only the relevant range — do not read the full file.

| Lines | Section |
|---|---|
| 1–34 | Custom properties (CSS variables) |
| 35–132 | Reset, container, typography |
| 133–335 | Header |
| 336–420 | Navigation overlay |
| 421–528 | Hero (homepage) |
| 529–598 | Intro section |
| 599–678 | Conviction / parallax quote |
| 679–761 | Location teaser |
| 762–863 | Story & philosophy |
| 864–1168 | Rooms (homepage grid, room rows, specs, includes strip) |
| 1169–1216 | Nature section |
| 1217–1277 | Experience section |
| 1278–1326 | Parallax quote |
| 1327–1362 | Voices / guest book |
| 1363–1414 | Gallery teaser |
| 1415–1517 | Footer |
| 1518–1547 | Scroll animations |
| 1548–1631 | Rooms sticky heading (desktop) |
| 1632–1753 | Responsive — tablet |
| 1754–1985 | Responsive — mobile |
| 1986–2153 | Weather panel |
| 2154–2624 | Individual room pages (hero, editorial, amenities, strip, CTA) |
| 2625–2826 | Child pages (Çıralı, Chimaera, Olympos) |
| 2827–3682 | Çıralı destination guide editorial layout |
| 3683–4011 | Activities page |
| 4012–4237 | Cookie consent |
| 4238–4514 | Activities page (continued) |
| 4515–4615 | Legal pages (privacy, terms) |
| 4616–4727 | Photo gallery page |

## Conventions
- Bump `styles.css?v=` on every styles.css change
- Bump `script.js?v=` on every script.js change
- Bump `translations.js?v=` on every translations.js change (i18n only lives there now)
- For i18n work, read `assets/translations.js` only — do NOT read script.js
- Read only the file(s) directly relevant to the change; pull in others only if the edit requires cross-file coordination

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
