# Olympos Lodge — Website

Boutique hotel website for Olympos Lodge, Çıralı, Antalya, Turkey.
Plain HTML/CSS/JS — no build step, no framework, no dependencies.

## Running locally

Open `index.html` directly in a browser, or serve from root:

```
npx serve .
```

## Structure

```
olymposlodge/
├── index.html          Homepage (hero, rooms overview, about, nature, experience, gallery, footer)
├── assets/
│   ├── styles.css      Complete design system — all components, responsive breakpoints
│   ├── script.js       Interactions: header scroll, mobile nav, i18n (TR/EN/DE), weather, carousels
│   ├── hero.mp4        Hero video (MP4)
│   └── hero.webm       Hero video (WebM, preferred)
├── pages/
│   ├── rooms.html      Room grid overview
│   ├── room-aqua-super-deluxe.html
│   ├── room-super-deluxe.html
│   ├── room-deluxe.html
│   ├── room-gol-evi.html
│   ├── room-antik.html
│   └── room-standart.html
└── docs/
    ├── BRIEF.md        Creative and editorial brief
    └── sitemap.md      Page structure and navigation map
```

## Conventions

- Bump `?v=` query string on every `styles.css` or `script.js` change (cache-busting)
- All images are served from the WordPress CDN (`www.olymposlodge.com.tr/wp-content/...`) — no local image assets
- Hotel facts (room sizes, amenities, policies) live in `olympos_lodge_rag_english copy.txt` — always check there before approximating

## Key references

| File | Purpose |
|---|---|
| `CLAUDE.md` | Pending tasks and dev conventions |
| `docs/BRIEF.md` | Brand identity, tone, palette, typography |
| `docs/sitemap.md` | Full page and section map |
| `olympos_lodge_rag_english copy.txt` | Authoritative hotel facts |

## Design references

Casa Angelina · Badrutt's Palace - Casa Cook
