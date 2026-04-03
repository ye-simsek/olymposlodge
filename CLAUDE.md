# Olympos Lodge

## Pending Tasks
1. ~~Wire REZERVASYON button → SabeeApp booking engine~~ ✓ Done
2. Scroll fade-ins for about/nature/experience/gallery sections
3. Manifesto/editorial intro section between hero and rooms
4. Footer: WhatsApp link, Spotify playlists (season/checkin confirmed and in staging)
5. Mobile pass — full spacing/typography review
6. Child pages: individual rooms, Chimaera flames, Olympos ruins
7. rooms.html — room descriptions are placeholders; supplement with richer copy from RAG file
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
Factual details about the hotel (room sizes, amenities, descriptions, policies, etc.) can be found in `olympos_lodge_rag_english copy.txt` in the project root. Always check this file before using approximations or asking the user for facts about the property.

## Conventions
- Bump `styles.css?v=` on every styles.css change
- Bump `script.js?v=` on every script.js change
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
