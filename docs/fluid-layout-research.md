# Fluid Layout Architecture — Research Report

**Question:** How to make the Olympos Lodge homepage stay fluid and correctly laid out at *any* viewport width — especially narrow splitscreen widths (Chrome at ~20%–80% of a laptop screen, roughly 300–1100px) — instead of relying on a handful of fixed breakpoints (currently 640 / 768 / 900 / 1024px).

> Method: deep-research harness — parallel web search → source fetch → 3-vote adversarial verification → synthesis. 24 claims survived verification; 1 was refuted (noted below). Sources are primary (MDN, web.dev, Utopia, Every Layout, Smashing) unless marked.

---

## Executive summary

The durable fix is to stop treating "narrow" as a set of pixel thresholds and instead let each component size itself from the space it actually occupies. Three primitives do almost all the work, and all three are **Baseline-supported across every modern browser since 2023 and fully shipping as of Dec 2025** (caniuse ~92%, only IE/Opera Mini excluded) [23][0][1]:

1. **Container queries + container units (`cqi`)** — components respond to their own width, so the same room row works whether it's in a 1100px window or a 320px split [2][14].
2. **Fluid type & space via `clamp()`** (the Utopia model) — one declaration locks a min and max and interpolates between them with no breakpoints [6][8][9][15].
3. **Intrinsic layout** — CSS Grid `minmax()`/`auto-fit` and the flexbox "Switcher" reflow side-by-side ↔ stacked from available width alone, again with zero media queries [19][20].

Add `aspect-ratio` so images scale without fixed heights [10][11][12], fix the `100vw` scrollbar-overflow trap [21][22], and add a small global overflow guard. Media queries don't disappear — keep them for page-level scaffolding and user preferences (`prefers-reduced-motion`, `prefers-color-scheme`) which container queries structurally cannot read [3][13]. The result is a layout with essentially one "breakpoint": the content's own comfort, evaluated continuously.

---

## Part A — The principles (with verified browser-support reality)

### 1. Container queries vs media queries — and why they're the right primary tool here

- `container-type: inline-size` turns an element into a **query container**; `@container` rules then resolve against that element's **inline (horizontal) size**, independent of the viewport [0]. Children can size against it with **container units**: `1cqi` = 1% of the container's inline size (also `cqw`,`cqh`,`cqb`,`cqmin`,`cqmax`) [1][4].
- The point: a media-query component **breaks when moved into a narrower container**; a container-queried component **adapts to whatever space it's in** [14]. That is exactly the Olympos failure mode — the room rows looked fine full-width and blew out in a split because their sizing was bound to the viewport/fixed px, not their own column.
- **They're complementary, not substitutes** — "one is not meant to replace the other" [3]. Keep media queries for: top-level page scaffolding, and user-preference queries (`prefers-reduced-motion`, `prefers-color-scheme`) that container queries cannot express [13].
- If no ancestor is a container, `cqi` **falls back to the small-viewport unit** (`svi`) — so container units degrade sanely [4].

```css
.rooms-list { container-type: inline-size; }   /* or per-row */
.room-row__content h3 {
  /* scales to the row's own width, not the screen's */
  font-size: clamp(1.75rem, 1.2rem + 4cqi, 3rem);
}
```

### 2. Fluid type & space with `clamp()` (the Utopia model)

- `clamp(MIN, PREFERRED, MAX)` = `max(MIN, min(PREFERRED, MAX))`: locks the extremes, scales fluidly between them, in one property [15][7].
- The **preferred value must mix a relative unit with a fluid unit** — e.g. `clamp(2rem, 1rem + 4vw, 3rem)`; the `vw`/`cqi` coefficient sets the scaling *rate*, the `rem` part keeps it accessible [16].
- **Utopia** generates a whole type/space scale as `clamp()` custom properties by interpolating between a small-screen scale and a large-screen scale — "let the browser interpolate… instead of manually setting sizes for multiple breakpoints" [6][8]. Its explicit philosophy is to *remove* breakpoints and "allow the medium to share the load" [9].
- You can swap `vw` for `cqi` to make type scale to the **container** instead of the screen — `clamp(1rem, 0.875rem + 0.5cqi, 1.25rem)` [5]. Best of both for component-scoped text.

### 3. Accessibility guardrail (do not skip)

- **`vw` units do not scale on browser zoom** — pure-`vw` text can fail **WCAG 1.4.4 Resize Text** (text must reach 200% without loss); this is W3C failure technique F94 [17].
- Practical lock: keep **max font size ≤ 2.5× min font size** in any `clamp()` and always include a `rem` term in the preferred value, and zoomed text stays compliant on modern browsers [18][16]. (2.5× is a safe sufficient condition, not a hard spec limit — but treat it as the rule.)

### 4. Intrinsic layouts that need NO breakpoints

- **The Switcher / "Flexbox Holy Albatross"** — flips side-by-side ↔ stacked at a width threshold with no media query, driven by the container's own width [19][20]:

```css
.switcher { display: flex; flex-wrap: wrap; gap: var(--space-m); }
.switcher > * { flex-grow: 1; flex-basis: calc((var(--threshold, 34rem) - 100%) * 999); }
```

  When the parent is narrower than `--threshold`, `(threshold − 100%)` is positive × 999 → huge basis → each child takes a full row (**stacked**). When wider, it's negative → invalid → dropped to 0, and `flex-grow` lays them **side by side**. The flip point is the *container's* width, so it's correct at any split proportion [20].

- **RAM pattern (grid, repeat-auto-minmax)** — for the stat row, gallery, voices, footer:

```css
.grid { display: grid; gap: var(--space-m);
  grid-template-columns: repeat(auto-fit, minmax(min(16rem, 100%), 1fr)); }
```

  The `min(16rem, 100%)` is the key: it caps the track at the available width so a single item in a 320px split never forces overflow.

- **Fluid asymmetric columns** — replace fixed `1065px`/`680px` with intrinsic ratios using `minmax()`/`clamp()` so the editorial asymmetry survives but reflows:

```css
.room-row--landscape { grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr); }
```

  `minmax(0, …)` (not `1fr`) is what lets a grid/flex child actually shrink below its content size.

### 5. Fluid media with `aspect-ratio`

- `aspect-ratio` only acts when **at least one dimension is auto**; set both width and height and it's ignored [10]. So give the media box a ratio and one auto axis and the browser maintains proportion with **no fixed pixel height** [11].
- For the rooms' cover images this is a direct swap for `height: 605px`:

```css
.room-row__image { aspect-ratio: 4 / 3; height: auto; }
.room-row__image img { width: 100%; height: 100%; object-fit: cover; }
```

  `object-fit: cover` + `aspect-ratio` scales cover images to any container size without distortion [12].

### 6. Viewport units & the `100vw` scrollbar bug

- **`100vw` includes the classic vertical scrollbar**, so it's *wider than the content area* and causes horizontal overflow — and `svw`/`lvw`/`dvw` are all equivalent to `vw` here, so they do **not** fix it [21].
- ⚠️ **Refuted by verification (0–3):** `scrollbar-gutter: stable` does **not** fix `100vw` overflow — reserving the gutter doesn't change that `100vw` still spans it. Don't rely on it for this.
- **The fix that verified true:** make `<body>` an inline-size container and use `100cqw` (the body's content width, scrollbar excluded) anywhere you'd reach for `100vw` [22]. Caveat: this only holds while `body` is the *nearest* container — a nested `container-type` element redefines `cqw` for its own subtree [22]. The common derivative `--scrollbar: calc(100vw - 100cqw)` gives you the exact scrollbar width as a token.
- For the **hero**, prefer `100svh`/`100dvh` over `100vh` so the autoplay video doesn't get clipped by mobile/iPad browser chrome (orthogonal to the width bug, but the same family of fix).

### 7. Global overflow prevention (cheap insurance)

- `min-width: 0` (and `min-height: 0`) on grid/flex children — the default `min-width:auto` is the #1 cause of "one long word/image won't let the column shrink."
- `max-width: 100%` on all media (`img, video, svg`).
- `overflow-x: clip` on `html`/`body` as a backstop (not `hidden` — `clip` doesn't create a scroll container or break `position: sticky`).
- `text-wrap: balance` for headings, `text-wrap: pretty` for body, to avoid awkward ragged overflow at narrow widths.

---

## Part B — Section-by-section remediation for *this* site

| Section | Today | Failure at narrow split | Principled fix |
|---|---|---|---|
| **Hero** | `height: 100vh`, full-bleed video | video clipped by browser chrome | `min-height: 100svh`; `object-fit: cover` already correct [11] |
| **Intro** (2-col prose) | grid `1fr 1fr`, fixed `5.4rem` pad | two cramped columns then hard collapse at 640 | **Switcher** (§4) — stays 2-col while it fits, stacks itself; fluid padding `clamp(1.25rem, 5vw, 5.4rem)` |
| **Glance** (3 stats) | flex row, fixed-px dividers | dividers/gaps overflow | RAM grid (§4) or `flex-wrap: wrap`; convert dividers to `gap` + pseudo-elements that hide on wrap |
| **Conviction** (quote + 680px img) | flex row, **fixed 680px** image | image can't shrink → overflow (the bug you patched) | Switcher; image `width: min(680px, 100%)`; `aspect-ratio` instead of fixed dims |
| **Rooms** (`--landscape` 1065px) | **fixed `1065px` column**, `height:605px`, compound-selector specificity | reverse rows keep 1065px → page blows out | `container-type: inline-size` on the list; columns `minmax(0,1.15fr) minmax(0,0.85fr)`; **`@container (max-width: 46rem)` → stack** (replaces the `@media ≤1024` patch); image `aspect-ratio:4/3` not `605px`; type in `cqi` |
| **Story / linker** (alt img/text) | 2-col grid, collapse @1024 | fine, but breakpoint-bound | Switcher → reflows continuously, drop the 1024 media query |
| **Voices** (3-col → scroller) | grid → scroller @1024 | abrupt | RAM grid `auto-fit minmax(min(18rem,100%),1fr)` — wraps 3→2→1 on its own |
| **Gallery** (scroll-snap strip) | horizontal snap | OK by design | keep; ensure items `flex: 0 0 min(80%, 22rem)` so one fits a 320px split |
| **Footer** (3-col + weather) | grid, collapse @1024 | weather panel can overflow | RAM grid; weather panel `min-width: 0` + fluid internal type (`cqi`) |

The room section is the high-value target: container-querying it removes the specificity war entirely, because `@container` rules on `.room-row--landscape` win over the desktop defaults *by context*, not by selector weight.

---

## Part C — Migration plan (hand-written CSS, no build step)

Utopia is a *generator* — you paste its output once; you don't need a build tool. Order of work, each step independently shippable:

1. **Token layer** (new `:root` block in `base.css`). Paste a Utopia fluid **type** scale (`--step--1 … --step-5`) and **space** scale (`--space-2xs … --space-2xl`) as `clamp()` custom properties [6]. Keep every max ≤ 2.5× its min [18]. This alone makes all text/spacing fluid with no markup change.
2. **Global guards** — `*{min-width:0}` on layout children where needed, `img,video{max-width:100%;height:auto}`, `html{overflow-x:clip}`, body-as-container for the `100cqw` scrollbar token [22].
3. **Rooms → container queries** — the biggest win; replace the `@media ≤1024` stack patch with `@container`, swap `1065px`→`minmax()`, `605px`→`aspect-ratio`. Bump `home.css?v=`.
4. **Switcher** for intro / conviction / story / linker — delete their collapse media queries as you convert each.
5. **RAM grid** for glance / voices / footer.
6. **Hero** `100svh`; audit remaining `100vw` usages, replace with `100%`/`100cqw`.

Bump the relevant `?v=` query string on each CSS file you touch (project convention).

---

## Caveats & time-sensitivity

- All three primitives are **Baseline 2023 / full support Dec 2025** [23][0][1]; no polyfill needed for modern browsers, but they exclude IE11/Opera Mini (not a concern here).
- **`100cqw` scrollbar fix is context-sensitive** — only valid while `body` is the nearest container; nesting another `container-type` changes inner `cqw` meaning [22]. Document it where used.
- **`scrollbar-gutter: stable` is *not* the `100vw` fix** (verification refuted it 0–3) — though it's still worth setting to prevent layout shift when scrollbars appear/disappear.
- **Accessibility:** any `vw`/`cqi`-driven type must keep the rem term + 2.5× cap or risk WCAG 1.4.4 [17][18].
- One forward-looking note: Chrome 145+ is making `100vw` scrollbar-aware under opt-in (`scrollbar-gutter:stable`/`overflow-y:scroll`), but it's not cross-browser yet — don't depend on it [21].

## Open questions

1. Exact min/max anchors for the Utopia scales (target viewport floor 320px? ceiling 1100px or the real desktop max ~1440px?) — needs a quick design pass.
2. Editorial intent at the narrowest split: should `--landscape` rooms keep image-top or alternate image/text when stacked? (Switcher can preserve DOM order or force image-first.)
3. Does the live weather panel have a hard min content width that resists `min-width:0`? Worth a quick check before footer conversion.
