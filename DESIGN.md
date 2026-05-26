---
name: Olympos Lodge
description: A boutique hotel website on the Mediterranean — single-storey beach lodge in a 20,000 m² garden in Çıralı. The visual identity is hand-warm and quietly luxurious: cream paper, weathered gold ink, classical serifs, and editorial pacing. Inspired in spirit by Casa Angelina, Amanruya, Badrutt's Palace, and Casa Cook.

colors:
  primary:
    warm-gold: "#8E7441"            # principal brand colour — used for labels, links, dividers, icon ink
    warm-gold-muted: "#998059"      # softened gold for nested specs / icon set on rooms grid
    cream: "#F7F5F0"                # canonical page background (warm white, slightly oat)
  text:
    ink: "#1c1814"                  # near-black with a brown undertone — body copy
    ink-light: "#6b6b6b"            # secondary copy
    ink-muted: "#999999"            # tertiary / metadata
    title-bronze: "#8a7040"         # h3 on landscape room cards, slightly cooler than warm-gold
  surface:
    border: "#e8e4de"               # hairline dividers
    divider-stone: "#b4a894"        # darker stone hairline used between feature rows
  accent:
    deep-blue: "#263d93"            # rare ink-blue accent (badges, focus moments)
  alpha:
    gold-fade-mid: "rgba(142, 116, 65, 0.75)"
    gold-fade-edge: "rgba(142, 116, 65, 0.40)"
    gold-fade-soft: "rgba(142, 116, 65, 0.18)"
    overlay-subtle: "rgba(0, 0, 0, 0.07)"
    overlay-soft:   "rgba(0, 0, 0, 0.08)"
    overlay-medium: "rgba(0, 0, 0, 0.10)"
    overlay-deep:   "rgba(0, 0, 0, 0.60)"

typography:
  families:
    heading: "'Cormorant Garamond', Georgia, serif"        # hero & body display — humanist serif, italic-rich
    heading-sc: "'Cormorant SC', serif"                    # small-caps companion for room titles
    body: "'DM Sans', 'Helvetica Neue', sans-serif"        # body copy fallback (used sparingly)
    accent: "'Josefin Sans', sans-serif"                   # geometric sans for tracked-out labels
    label: "'Cinzel', serif"                               # high-contrast roman caps for buttons & specs
  weights:
    body: 300                       # default body weight is light/airy
    heading: 400                    # display headings are book weight
    label-medium: 500               # link & spec text weight
  scale:
    display-xl: "clamp(3rem, 5vw, 5rem)"     # page-hero titles
    display-lg: "clamp(2.5rem, 4vw, 4.5rem)" # section heroes
    display-md: "clamp(2rem, 4vw, 3.2rem)"   # h2
    display-sm: "clamp(1.6rem, 2.8vw, 2.6rem)"
    title-card: "36px"                       # landscape room card titles (uppercase Cormorant SC)
    title-h3: "clamp(1.4rem, 2.5vw, 1.8rem)"
    body-lead: "19px"                        # featured paragraph (room descriptions)
    body: "1rem"
    body-secondary: "0.9rem"
    spec: "13px"                             # meta row (Cinzel, uppercase)
    link: "13.75px"                          # "view more" links inside cards
    label-eyebrow: "0.75rem"                 # section labels above headings
    label-micro: "0.6rem"                    # captions / sub-labels
  letter-spacing:
    display: "-0.02em"               # tightened on heroes
    body-heading: "-0.01em"
    title-card: "0.009em"            # rooms grid card titles
    label-loose: "0.15em"            # buttons & specs
    label-looser: "0.20em"           # eyebrows
    micro-caps: "0.10em"
  line-height:
    display: 1
    heading: 1.2
    body: 1.7
    body-tight: 1.5                  # featured paragraphs
    secondary: 1.6
  case:
    eyebrow: uppercase
    button: uppercase
    spec: uppercase
    title-card: uppercase

spacing:
  scale:
    xs: "0.5rem"     # 8px  — inline icon gap
    sm: "1rem"       # 16px — within block padding
    md: "2rem"       # 32px — block padding, label margins
    lg: "4rem"       # 64px — section gutters
    xl: "6rem"       # 96px — section padding
    2xl: "10rem"     # 160px — page hero padding
  card-gutter: "65px"           # gap between landscape image and text within a room card
  page-cap: "1440px"            # max content width before edges bleed to viewport
  header-height: "90px"

radii:
  none: "0"
  hairline: "2px"      # quiet geometry — booking calendar cells, form fields
  card: "4px"          # cards & lifted surfaces
  pill: "99px"         # round CTAs and chips
  full: "50%"          # avatar / dot

shadows:
  whisper: "0 2px 12px rgba(0, 0, 0, 0.07)"     # cards on cream
  soft: "0 4px 20px rgba(0, 0, 0, 0.10)"
  glow: "0 4px 32px rgba(0, 0, 0, 0.08)"        # large feature cards
  elevated: "0 8px 40px rgba(0, 0, 0, 0.10)"
  deep: "0 24px 80px rgba(0, 0, 0, 0.60)"       # modals / lightbox
  ink-bleed: "0 1px 0 rgba(110, 90, 48, 0.18)"  # drop-shadow under hand-drawn icons

motion:
  easing:
    standard: "cubic-bezier(0.25, 0.1, 0.25, 1)"   # primary easing — ease-out, restful
    expo-out: "cubic-bezier(0.22, 1, 0.36, 1)"     # subnav reveal
  duration:
    fast: "200ms"
    base: "400ms"
    slow: "800ms"
    subnav: "520ms"
  patterns:
    link-hover: "letter-spacing widens 0.15em → 0.22em over 400ms"
    image-hover: "scale(1.0) → scale(1.03) over 800ms"
    scroll-reveal: "opacity 0 → 1, translateY(24px) → 0 over 800ms"

textures:
  paper-noise:
    description: "Fractal-noise SVG laid over the cream background at ~22% opacity. Adds the warmth of laid paper without printing visibly. Applied to body and most large light surfaces."
    base-frequency: "0.75"
    octaves: 4
    saturation: 0
    opacity: 0.22
  ink-bleed:
    description: "Hand-drawn icon filter — fractal turbulence + displacement + 0.25 gaussian blur. Mimics ink absorbing into paper. Applied to all custom navigation/spec icons."
    base-frequency: "1.8"
    octaves: 2
    displacement-scale: 0.9
    blur-stdev: 0.25

iconography:
  style: "Hand-drawn brush ink in warm-gold, 50pt notional grid, filled paths (no stroke)."
  treatment: "All custom icons share the ink-bleed filter; thin paths use a stroke equal to fill colour to survive displacement."
  set:
    - column        # symbolises ruins / Çıralı
    - signpost      # activities
    - key-and-tassel # at-the-lodge
    - room-size     # bracket frame
    - garden-view
    - lake-view

layout:
  grid:
    page-cap: "1440px"
    full-bleed: "calc(50% - 50vw) margins to escape the cap when needed"
  rhythm:
    section-padding-y: "var(--space-xl) — 96px on desktop"
    paragraph-max-width: "46ch (compact) / 86ch (feature)"
  cards:
    landscape-room:
      image-column: "1065px"
      image-height: "600px"
      content-padding: "10px 0 5px 65px"
      reverse-mirror: true   # alternates left/right per row
  navigation:
    header: "fixed, transparent over hero, fades to cream on scroll"
    subnav: "sticky tab strip on child pages, hand-drawn icon above each tab, hairline underline indicator that grows from centre"

states:
  focus-visible: "1px solid warm-gold, offset 3px"
  link-hover: "letter-spacing widens; no underline"
  image-hover: "subtle scale (1.03) inside fixed crop"
  cta-disabled: "60% opacity, cursor not-allowed"

accessibility:
  base-font-size: "16px"
  body-line-height: 1.7
  contrast-strategy: "Body ink against cream meets WCAG AA. Warm gold links on cream are reserved for short labels and use weight + tracking to remain legible."
  motion-respect: "All decorative motion is short and ease-out; reduce-motion users see no scaling or letter-spacing animation in the parts of the build that gate it."
---

# Olympos Lodge — Visual Identity

## Mood

A 17-room single-storey lodge on a quiet stretch of the Turkish Mediterranean, set in twenty thousand square metres of garden. The site should feel like the property: hand-built, restrained, and unhurried. Warm cream paper underfoot, weathered gold ink, classical Roman letterforms, and large stretches of intentional silence between elements. Nothing glossy, nothing aggressive, nothing trend-stamped.

The reference points are Casa Angelina, Amanruya, Badrutt's Palace, and Casa Cook — properties that earn their luxury through restraint rather than ornament.

## The Page Surface

Every page sits on a warm cream (`#F7F5F0`) overlaid with a barely-perceptible fractal noise texture at 22% opacity. The texture is critical: without it the cream reads as flat digital paint; with it, the page feels like uncoated stock that's caught a little tea over time. Backgrounds in any panel that needs to "cover" the surface (sticky nav, weather panel, modals) reapply the same texture so the warmth never breaks.

Pages cap at 1440 px. Beyond that, hero images and feature rows are allowed to bleed into the viewport edges using negative-margin escapes — the cap holds the eye, and the imagery breathes past it.

## Colour

There is one brand colour, **warm gold `#8E7441`**, used like ink: section labels, links, hairline dividers, custom icons, focus rings. A softer cousin (`#998059`) appears on the rooms grid where icons and metadata sit at a quieter volume. Body copy is a warm near-black `#1c1814` — never pure black — and headings on landscape room cards lift into a slightly cooler bronze `#8a7040`. A deep ink blue `#263d93` is held in reserve for the rare badge or accent.

Hairline dividers come in two weights: a fine `#e8e4de` for in-page rules and a heavier stone `#b4a894` between landscape feature rows. Both span the full viewport, not the content cap, so the page reads as continuous columns of paper rather than stacked cards.

## Typography

The voice runs across five carefully chosen families:

- **Cormorant Garamond** is the lead — humanist serif with a generous italic. It carries every hero title and most long-form copy. Set at weight 400 for headings, 300 for paragraphs, with line-height 1.7 for comfort and 1.5 for featured copy.
- **Cormorant SC** — its small-caps sibling — sets uppercase room titles at 36 px so they don't shout.
- **Cinzel**, a high-contrast roman, handles every uppercase label that needs presence: CTAs, room specs, sub-navigation tabs. Weight 500, tracking around 0.15em.
- **Josefin Sans** is the geometric tracked-out voice for eyebrow labels — section markers like *Her Odada* — at small sizes (11–12 px) with 0.20em tracking.
- **DM Sans** is a quiet fallback for utility surfaces (booking widgets, meta).

The unifying rule: anything in caps tracks open (0.10–0.20em). Everything in mixed case stays close-set and is allowed an italic. Headings can be tight (`-0.01em` to `-0.02em`); body copy never is.

## Iconography

All custom icons share a single visual fiction: brush ink absorbing into paper. They live in a 50-point square, are filled (not stroked), use the warm-gold ink, and pass through an SVG `feTurbulence` + `feDisplacementMap` + tiny gaussian blur — the result is a hand-drawn quality that survives at 22 px in nav strips and at 220 px in handoff sheets without looking traced. Examples in service: a column for *Çıralı*, a signpost for *Activities*, a key-and-tassel for *At The Lodge*, framed brackets for room size, simplified leaves and ripples for garden / lake views.

The ink-bleed filter is part of the brand. It is intentionally never disabled.

## Composition

The grid pacing is editorial. Each room on the rooms page is a landscape card 605 px tall: a 1065 px image on one side, a column of text on the other separated by a fixed 65 px gutter, with the layout alternating image-left and image-right down the page. Inside the text column the rhythm is `title → paragraph → meta row → "view more →" link`, with the paragraph using `margin-top: auto` so it pushes everything below it gently to the bottom — the title floats up into the photograph, the meta and CTA land at the same baseline.

Section labels (eyebrows) always sit above headings as a 12 px Cinzel or Josefin caps line in warm gold, separated by a comfortable margin. They function as scent: they tell the reader where they are without raising their voice.

Subnav tabs on child pages stack a hand-drawn icon over a Cinzel caps label with a hairline underline that grows from the centre on the active tab. The underline is the only "interactive accent" we use — there are no rounded buttons screaming for clicks.

## Motion

Movement is short, ease-out, and decorative. The standard easing `cubic-bezier(0.25, 0.1, 0.25, 1)` is used for almost everything. Three idiomatic patterns:

1. **Link breath** — on hover, link letter-spacing widens from 0.15em to 0.22em over 400 ms. No underline appears, no colour change. The word physically opens.
2. **Image lift** — images inside fixed crops scale to 1.03 over 800 ms on hover; the frame stays still.
3. **Reveal-on-scroll** — opacity 0 → 1 with a 24 px upward translate over 800 ms. Used sparingly — only on first-fold transitions — never on every paragraph.

Subnav reveals use a more dramatic expo-out (`cubic-bezier(0.22, 1, 0.36, 1)`) over 520 ms.

## Surfaces & Elevation

Shadows are whispered, not dropped. The catalogue:

- Card on cream: `0 2px 12px rgba(0,0,0,0.07)` — barely there.
- Lifted feature: `0 4px 32px rgba(0,0,0,0.08)`.
- Modal layer: `0 8px 40px rgba(0,0,0,0.10)`.
- Lightbox / fullscreen image: `0 24px 80px rgba(0,0,0,0.60)` — a true crash, used only when the image deserves it.

Border radii are equally restrained: `0` (default), `2px` (booking calendar), `4px` (cards), `99px` (round CTAs), `50%` (dots, avatars). Anything in between feels engineered for the screen rather than drawn for the brand.

## Voice & Detail

The product takes its time. Paragraphs are written like postcards from a known correspondent: italic where the writer would pause, sparse adjectives, short sentences. The interface trusts that — empty space around copy is the correct amount of empty space. CTAs say *Daha Fazla* / *View More* / *Mehr Ansehen*, rendered as Cinzel caps with a thin arrow → and no box around them. The arrow is the button.

When in doubt: less colour, more space, more italic.
