# Olympos Lodge Website — Complete Roadmap

> Based on analysis of 20+ luxury/boutique hotel websites: Amanruya, Amanzoe, Six Senses Kaplankaya, Casa Cook (5 properties), Casa Angelina, Soneva Fushi, NIHI Sumba, COMO Shambhala, Awasi Patagonia, Baur au Lac, Hotel d'Angleterre, Badrutt's Palace, D-Hotel Maris, Fivelements, Hoshinoya, Longitude 131°, Song Saa, Musciara, Singita, Kaş boutique hotels.

---

## Current State

**What we have:**
- Hero section with video (hero.mp4)
- Intro section (Casa Cook-style two-column layout, TR/EN/DE)
- Rooms section with cards linking to detail pages
- 6 room detail pages (Aqua Super Deluxe, Super Deluxe, Deluxe, Göl Evi, Antik, Standart)
- Hikayemiz (Our Story) section
- Nature section
- Experience section
- Quote section
- Voices (testimonials) section
- Gallery section
- Footer with contact info
- Language switching (TR/EN/DE)
- Scroll reveal animations (partial)
- Sticky header with nav overlay

**What's missing (by priority):**
Everything below, organized into 4 phases.

---

## Phase 1 — Critical (Conversion & Trust)

These directly affect whether a visitor can book and whether they trust the site enough to do so.

### 1.1 Wire Booking Button to SabeeApp
- [ ] Integrate SabeeApp booking engine
- [ ] "Rezervasyon" button in header → opens SabeeApp widget or redirects to booking page
- [ ] "Rezervasyon" buttons on room detail pages → deep-link to that specific room type
- [ ] "Rezervasyon" button in room CTA sections → SabeeApp
- [ ] Consider: floating/persistent "Book" button on scroll (Casa Angelina pattern)
- [ ] Consider: inline booking bar below hero with date picker (Casa Cook pattern) — or keep hero clean (Aman pattern)
- [ ] Mobile: sticky bottom "Book" button

**References:** Every single property has persistent booking. Casa Cook has inline hero widget. Aman keeps hero clean with a simple CTA. Casa Angelina has floating widget.

### 1.2 Getting Here Section / Page
- [ ] New section or dedicated page
- [ ] Antalya Airport (AYT) — ~80km, ~1.5hr drive
- [ ] Driving directions from Antalya and Kemer
- [ ] Transfer options: private transfer, taxi, public transport
- [ ] "Arrange Your Transfer" CTA or WhatsApp inquiry link
- [ ] Google Maps embed or Mapbox interactive map (Aman uses Mapbox with custom branding)
- [ ] GPS coordinates (Casa Angelina pattern)
- [ ] Distances to nearby landmarks:
  - Olympos Ancient City — walking distance
  - Chimaera Flames — ~3km / 30-min hike
  - Phaselis Ancient City — ~25km
  - Kemer — ~35km
  - Tahtalı Mountain / Olympos Cable Car — ~15km
  - Ulupınar river restaurants — nearby
- [ ] Parking information
- [ ] i18n: all three languages

**References:** Amanruya shows flight durations from major cities. Awasi Patagonia has very detailed remote-access logistics. Casa Angelina lists km distances to airports and towns. D-Hotel Maris shows both Dalaman and Bodrum airport options.

### 1.3 Practical Info (Check-in/out, Season, Policies)
- [ ] Check-in / check-out times displayed in footer and/or a dedicated section
- [ ] Season dates (e.g., "Open: April – November") — prominently shown (Badrutt's, D-Hotel Maris, Musciara all do this)
- [ ] Children policy
- [ ] Pet policy
- [ ] Cancellation policy summary (or link to full policy)
- [ ] Payment methods accepted
- [ ] FAQ page (d'Angleterre has a comprehensive one):
  - "Is there air conditioning?" — Yes, all rooms
  - "How far is the airport?" — Antalya AYT, 80km
  - "Is breakfast included?" — answer
  - "Is there WiFi?" — Yes, free
  - "Can I arrange a transfer?" — answer
  - "What is Chimaera?" — brief explanation with link
  - "Are there mosquitoes?" — practical info
  - "Is the beach sandy?" — Çıralı beach info

**References:** d'Angleterre has the most thorough FAQ. Badrutt's Palace shows season dates in the footer. Musciara prominently marks "Open from [Month] to [Month]."

### 1.4 Phone & WhatsApp in Header + Footer
- [ ] Phone number visible in header (Casa Angelina, d'Angleterre pattern)
- [ ] WhatsApp floating button (bottom-right) — standard for Turkish hospitality
- [ ] WhatsApp link in footer
- [ ] Click-to-call on mobile (tel: link)
- [ ] Click-to-WhatsApp on mobile

**References:** Aman has WhatsApp in footer. D-Hotel Maris and all Turkish boutique hotels use floating WhatsApp buttons. Casa Angelina shows phone in header.

### 1.5 Newsletter Signup
- [ ] Email input + subscribe button in footer or as a dedicated section above footer
- [ ] Brief value proposition: "Seasonal updates and special offers" or "Çıralı'dan haberler"
- [ ] KVKK consent checkbox (Turkish data protection — legally required)
- [ ] i18n: all three languages

**References:** Every property has this. Casa Angelina has the most detailed (title, name, interests). Baur au Lac keeps it minimal. Soneva sometimes uses exit-intent popup.

### 1.6 Legal & Compliance
- [ ] KVKK (Turkish GDPR equivalent) privacy policy page
- [ ] Cookie consent banner
- [ ] Tourism registration / facility number ("Tesis No") — legally required in Turkey
- [ ] Terms & conditions page (can be minimal)
- [ ] Links to all legal pages in footer

**References:** D-Hotel Maris shows KVKK compliance. All EU properties have cookie consent. Turkish boutique hotels display Tesis No in footer.

---

## Phase 2 — Content (Storytelling & Depth)

These sections add substance, depth, and emotional pull. They're what separate a basic hotel site from one that makes someone want to visit.

### 2.1 Dining / Restaurant Section
- [ ] Dedicated section on homepage (between Experiences and Gallery, or after Nature)
- [ ] Restaurant name and concept
- [ ] Cuisine philosophy: local, seasonal, Mediterranean, Turkish
- [ ] Atmospheric photography (terrace dining, food close-ups, breakfast spread)
- [ ] **Breakfast feature** — serpme kahvaltı spread is a MAJOR selling point for Turkish boutique hotels. Consider a dedicated photo or subsection.
- [ ] Meal times: breakfast, lunch (if applicable), dinner
- [ ] "Breakfast included" mention
- [ ] Chef name/profile (if applicable)
- [ ] Menu preview or seasonal highlights
- [ ] Dietary accommodation note (vegetarian, vegan, gluten-free)
- [ ] Wine / drinks mention
- [ ] i18n: all three languages

**References:** Baur au Lac lists hours on homepage. Casa Angelina features Michelin-starred restaurant prominently. NIHI Sumba emphasizes farm-to-table. Turkish boutique hotels (Kaş pattern) make breakfast photography a hero feature. Soneva Fushi names each restaurant individually.

### 2.2 Spa / Wellness Section
- [ ] Dedicated section on homepage or own page
- [ ] Facilities listed: jacuzzi, sauna, steam room
- [ ] "Exclusively for guests" messaging
- [ ] Photography of spa area
- [ ] Treatment menu or highlights (if massage/treatments offered)
- [ ] "Private spa — entirely yours" positioning (from current intro text)
- [ ] Booking/inquiry CTA
- [ ] i18n: all three languages

**References:** Amanzoe has 2,850 sqm spa with downloadable PDF menu. COMO Shambhala positions wellness as the primary identity. Casa Angelina offers downloadable treatment PDFs. Even smaller properties like Musciara describe the "nature as wellness" angle.

### 2.3 Named Experiences with Dedicated Cards
Currently experiences are mentioned in the intro text but not given their own structured section. Each should be a card with image, title, description.

- [ ] **Chimaera Eternal Flames** — signature experience. Night hike to naturally burning flames. 2,500+ year history. No other hotel in the world has this nearby.
- [ ] **Olympos Ancient City** — Lycian-Roman ruins, walking distance from the lodge. River, tombs, theater.
- [ ] **Beach & Cabanas** — Çıralı's unspoiled Mediterranean beach. Caretta caretta nesting site. Cabanas for guests.
- [ ] **Canoe / Kayak** — explore the coastline at your own pace.
- [ ] **Boat Tours** — concierge-arranged, explore coves and coastline.
- [ ] **Bicycle Exploration** — ride through Çıralı village and surrounding roads.
- [ ] **Evening Firepits** — gather, pour a drink, let conversation find its current. (Potential signature social ritual — see memory note.)
- [ ] **Private Spa** — jacuzzi, sauna, steam room. Exclusively for guests.
- [ ] **Yoga in the Garden** — morning sessions in 20,000 sqm of green.
- [ ] **Lycian Way** — world-famous long-distance trail passes through Çıralı. Guided hikes available.
- [ ] **Caretta Caretta Turtle Watching** — seasonal (May–October), nesting on Çıralı beach.
- [ ] **Tahtalı Mountain / Olympos Cable Car** — panoramic views, nearby.

Each experience card should have:
- Atmospheric photo
- Name
- 1-2 sentence description
- Duration (if applicable)
- "Complimentary" or pricing note
- Seasonal availability if relevant
- i18n: all three languages

**References:** d'Angleterre has 8 named experiences with CHF pricing. Amanzoe has ceramics, beekeeping, stargazing, ruins hiking. NIHI Sumba makes "God's Left Hand" surf their crown jewel. Longitude 131° presents experiences as a narrative itinerary.

### 2.4 Local Area Guide / Destination Section
- [ ] "Çıralı & Beyond" or "Keşfet" section or page
- [ ] Çıralı beach — protected, unspoiled, 3.5km of pebble/sand
- [ ] Caretta caretta nesting site — conservation significance
- [ ] Chimaera flames — mythology, history, practical visit info
- [ ] Olympos ancient city — what to see, historical context
- [ ] Lycian Way — section passes through, difficulty, scenic highlights
- [ ] Phaselis — ancient harbor city, ~25km
- [ ] Ulupınar — mountain village, river trout restaurants
- [ ] Tahtalı / Olympos cable car
- [ ] Kemer and Antalya — for day trips
- [ ] Map with all landmarks marked
- [ ] i18n: all three languages

**References:** Casa Angelina has an excellent "Explore Praiano" page with local restaurants, churches, trails, beaches. d'Angleterre has "Discover Geneva" with curated recommendations. Amanzoe links to Epidaurus, Mycenae, Nafplio. NIHI Sumba dedicates a section to Sumbanese culture and island geography.

### 2.5 Complete All Room Detail Pages
Currently pages exist but may not all follow the latest layout pattern (Aqua Super Deluxe has the newest design).

For each room page:
- [ ] Full-bleed hero image
- [ ] Room specs strip (view, size, bed, capacity) — gold design
- [ ] Editorial two-column layout (text + inset photo | tall image)
- [ ] Image strip (3 photos)
- [ ] Amenities block
- [ ] CTA with atmospheric quote + "Rezervasyon" button → SabeeApp (deep-link to room)
- [ ] Prev/Next room navigation
- [ ] Consistent header, nav, footer
- [ ] i18n: all three languages
- [ ] Bump styles.css and script.js versions

Pages to update:
- [ ] room-super-deluxe.html
- [ ] room-deluxe.html
- [ ] room-gol-evi.html
- [ ] room-antik.html
- [ ] room-standart.html (currently uses older layout)

**References:** Aman gives each room a carousel of 6-7 photos. Casa Angelina has 8 room categories each with their own page. Hoshinoya uses poetic room names with floor plan illustrations.

### 2.6 Hero Tagline / Brand Statement
- [ ] Add a one-line tagline over the hero video
- [ ] Options: "An Intimate Retreat on the Lycian Coast" (current intro title) or something shorter
- [ ] Elegant serif, white text with subtle shadow
- [ ] Scroll indicator below ("Keşfet" or animated chevron)
- [ ] i18n: all three languages

**References:** Aman: "A private retreat on the Aegean coast." Casa Cook: "Elevated escapes, wherever you roam." Soneva: "No news, no shoes." Baur au Lac: "Charming generations / Your Home in Zurich since 1844." Singita: "Our Purpose is Conservation."

---

## Phase 3 — Trust & Polish

These add credibility, visual polish, and SEO/social value.

### 3.1 Instagram Feed Embed
- [ ] Section above or in footer: "Instagram @olymposlodge"
- [ ] Grid of 4-6 recent posts
- [ ] "Follow us" CTA
- [ ] Link to Instagram profile

**References:** Casa Cook, Soneva, Song Saa, Casa Angelina all embed live feeds. Instagram is the dominant social platform for boutique hotels.

### 3.2 Awards, Press & Trust Signals
- [ ] TripAdvisor badge/rating widget (if available)
- [ ] Google Reviews score
- [ ] Booking.com score
- [ ] Press quotes if any ("As seen in...")
- [ ] Any awards or certifications
- [ ] Tourism registration number in footer (Tesis No — legally required)
- [ ] Consider: "Since 1987" badge — heritage is a strong signal

**References:** Casa Angelina displays 12 certification/award badges immediately after hero. NIHI prominently uses "#1 Hotel in the World — Travel + Leisure." Baur au Lac shows Forbes 5-Star, LHW, Swiss Deluxe Hotels badges. Even small Turkish boutiques show TripAdvisor and Booking.com ratings.

### 3.3 Sustainability / Conservation Section
Çıralı has a unique story here that rivals Singita or Song Saa:
- [ ] Caretta caretta (loggerhead sea turtle) nesting beach — protected
- [ ] Çıralı's protected status — no high-rises, no mass tourism
- [ ] Environmental practices of the lodge (if any — solar, organic garden, etc.)
- [ ] "The anti-resort" positioning — preservation over development
- [ ] Link to turtle conservation info or local NGO
- [ ] i18n: all three languages

**References:** Singita leads with "Our Purpose is Conservation" before showing any rooms. Song Saa Foundation gets a major homepage section. Soneva has the most data-heavy sustainability section (metrics, infographics). NIHI's Sumba Foundation is near-equal to the resort brand. Longitude 131° includes Indigenous Acknowledgement of Country.

### 3.4 Scroll Animations (Complete)
- [ ] Fade-in-on-scroll for all major sections: intro, rooms, about, nature, experience, gallery, dining, spa
- [ ] Parallax effect on select full-bleed images (subtle)
- [ ] Stagger animation for room cards, experience cards, gallery items
- [ ] Gold divider animations
- [ ] Mobile: reduced/simplified animations for performance

**References:** Casa Angelina uses GSAP for scroll-triggered reveals. Hoshinoya: "images fade/slide in gently, text appears line by line." All properties use subtle (200-400ms) fade-in + translateY.

### 3.5 Hero Video Poster & Transition
- [ ] Extract exact first frame of hero.mp4 as poster image
- [ ] Add opacity fade-in on canplay event
- [ ] Result: imperceptible still → video transition

### 3.6 Schema.org Structured Data
- [ ] JSON-LD for Hotel / Resort type
- [ ] Include: name, URL, phone, email, address, description, image, geo coordinates
- [ ] Room types as offers/accommodation
- [ ] Social profiles
- [ ] Awards (if any)
- [ ] Check-in/out times

**References:** Aman has comprehensive JSON-LD with room types, amenities as LocationFeatureSpecification, awards, social profiles, and available languages.

### 3.7 Open Graph & Social Sharing Meta
- [ ] og:title, og:description, og:image for homepage
- [ ] og:title, og:description, og:image for each room page
- [ ] Twitter card meta tags
- [ ] Social sharing preview image (1200x630px)

### 3.8 Gallery Improvements
- [ ] Lightbox/fullscreen viewer (Fancybox or similar)
- [ ] Category filters: Rooms, Beach, Nature, Dining, Garden
- [ ] Drone/aerial shot of the property
- [ ] Night/twilight shots
- [ ] Human lifestyle shots (not just empty rooms)
- [ ] Video thumbnails mixed in (optional)

**References:** Aman uses carousel with 25-40 photos. Casa Angelina uses Fancybox. Longitude 131° uses Ken Burns slow-zoom. Song Saa mixes video into gallery grid.

### 3.9 Mobile Pass — Full Review
- [ ] Spacing and typography audit across all pages
- [ ] Touch-friendly tap targets (minimum 44px)
- [ ] Image optimization for mobile bandwidth
- [ ] Sticky bottom bar: "Book" + "Call" + "WhatsApp"
- [ ] Test on iPhone SE, iPhone 14/15, iPad, Android
- [ ] Hamburger menu UX review
- [ ] Gallery swipe behavior
- [ ] Room page layout on mobile
- [ ] Performance: lazy loading, WebP images, minimal JS

---

## Phase 4 — Growth & Engagement

These add ongoing value, return visits, and deeper engagement.

### 4.1 Blog / Journal Section
- [ ] "Günce" or "Journal" section accessible from nav
- [ ] Editorial content ideas:
  - "A Perfect Week in Çıralı" — itinerary guide
  - "The Legend of Chimaera" — mythology and history
  - "Caretta Caretta: Guardians of the Beach" — turtle conservation
  - "Walking the Lycian Way" — trail guide for the Çıralı section
  - "From Garden to Table" — breakfast and dining story
  - "Four Seasons in Çıralı" — seasonal guide
  - Chef or staff profiles
  - Guest stories
- [ ] Photography-heavy, magazine-style layout
- [ ] i18n: at least TR and EN

**References:** Casa Cook "Journals," d'Angleterre "Journal," NIHI "Stories," Soneva "Stories" — all use editorial blog content. Song Saa posts conservation updates and recipes.

### 4.2 Special Offers / Packages
- [ ] Dedicated section on homepage or page
- [ ] Named packages:
  - Early Bird (book X months ahead, save Y%)
  - Stay Longer Save More (3+ nights discount)
  - Honeymoon / Romance package (champagne, spa, candlelit dinner)
  - Lycian Explorer (includes Chimaera hike + Olympos tour)
  - Off-season rate
- [ ] Each with: name, inclusions, validity dates, price, "Book" CTA
- [ ] i18n: all three languages

**References:** Casa Cook has 6 active offers with specific terms and dates. d'Angleterre has 5 offers including "Children Go Free." Longitude 131° has "Stay 3 Pay 2." Song Saa has honeymoon, early bird, and last-minute deals.

### 4.3 FAQ Page
- [ ] Accordion-style expandable questions
- [ ] Categories: Before You Arrive, During Your Stay, Activities, Practical Info
- [ ] Common questions (see Phase 1.3 list above)
- [ ] i18n: all three languages

**References:** d'Angleterre has the most thorough FAQ covering check-in, parking, laundry, currency exchange, smoking, pets.

### 4.4 IP-Based Language Auto-Detection
- [ ] Detect visitor's country on first visit via ipapi.co or similar
- [ ] Auto-set language: Turkey → TR, Germany/Austria/Switzerland → DE, all others → EN
- [ ] Only on first visit (don't override manual language selection)
- [ ] Saved to localStorage
- [ ] See memory note: project_ip_language.md

### 4.5 Gift Vouchers
- [ ] Purchase flow: select amount or specific experience, add message, pay online, receive PDF
- [ ] Or: simple "Contact us for gift vouchers" with inquiry form

**References:** Baur au Lac uses e-guma. d'Angleterre uses SK Chase. Fivelements has full online purchase flow. Song Saa offers gift cards.

### 4.6 Spotify Playlist Link
- [ ] "Olympos Lodge Sounds" or "Çıralı Evenings" playlist
- [ ] Link in footer
- [ ] Gives visitors an ambient preview of the mood

**References:** Song Saa links "Song Saa Sounds." This is a small but distinctive touch.

### 4.7 Weather Widget Enhancement
- [ ] Current temperature display in footer or header
- [ ] Current conditions (sunny, cloudy, etc.)
- [ ] Optional: wind, sea temperature (Casa Angelina shows waves + wind)
- [ ] Best-time-to-visit guidance (seasonal temperature chart)
- [ ] Fix current weather panel text colors (dark on dark — needs white)

### 4.8 Chimaera & Olympos Ruins Child Pages
- [ ] Dedicated pages for the two major nearby attractions
- [ ] Rich content: history, mythology, what to expect, photos, practical visit info
- [ ] SEO value: people searching "Chimaera flames" or "Olympos ruins" could discover the lodge
- [ ] Link from experiences section and local area guide
- [ ] i18n: all three languages

### 4.9 Contact Page with Form
- [ ] Dedicated contact page (beyond the footer)
- [ ] Contact form: name, email, subject, message
- [ ] Map embed
- [ ] Full address, phone, email, WhatsApp
- [ ] Social media links
- [ ] Optional: "For group bookings or special requests" positioning

### 4.10 Weddings & Private Events (Optional)
- [ ] If relevant to the property
- [ ] Garden ceremony, intimate celebration positioning
- [ ] "Enquire" CTA
- [ ] Photo gallery of the grounds

**References:** Song Saa has a dedicated weddings section. Amanzoe has "Celebrations." Badrutt's Palace has weddings + private events.

---

## Unique Differentiators to Emphasize

These are Olympos Lodge's competitive advantages that no or few other properties share. They should be woven throughout the site:

1. **Chimaera Eternal Flames** — literally no other hotel on earth has naturally burning eternal flames nearby. This is a 2,500-year-old phenomenon from Greek mythology. Make it a signature experience.

2. **Olympos Ancient City** — Lycian-Roman ruins within walking distance. The lodge is named after these ruins. Rich historical narrative.

3. **Caretta Caretta Turtle Beach** — Çıralı beach is a protected nesting site. Conservation angle rivals Singita and Song Saa.

4. **Lycian Way** — one of the world's top 10 long-distance trails (Sunday Times) passes through. Hikers are a natural audience.

5. **Since 1987** — heritage story. Real generational story. Rivals Swiss hotel founding dates.

6. **20,000 sqm Garden, 17 Rooms** — the exclusivity ratio is extraordinary. That's ~1,175 sqm of garden per room. This is an Aman-level promise at boutique scale.

7. **Everything Exclusively for Guests** — garden, beach access, restaurant, spa. No day visitors. This is a strong luxury signal.

8. **Evening Firepits** — potential signature social ritual. The kind of thing guests photograph and talk about.

9. **The Anti-Resort** — Çıralı has no high-rises, no mass tourism, protected coastline. Position this as intentional, not accidental. "What we chose not to build matters as much as what we did."

10. **Protected Status of Çıralı** — the village itself is a differentiator. No commercial development allowed on the beachfront. This is not just a hotel choice — it's a destination philosophy.

---

## Best Model Matches

| Aspect | Best Reference | Why |
|--------|---------------|-----|
| Overall tone & editorial feel | Aman (Amanruya) | Minimal, image-driven, editorial, generous whitespace |
| Nature-first positioning | Singita | Conservation as brand identity, place before product |
| Heritage storytelling | Badrutt's Palace | Founding narrative as emotional hook |
| Operations & compliance | D-Hotel Maris | Seasonal Turkish hotel: KVKK, WhatsApp, transfers, EUR pricing |
| Layout & typography | Casa Cook Madonna | Two-column editorial, serif + sans pairing |
| Experience packaging | d'Angleterre | Named experiences with descriptions and pricing |
| Sustainability angle | Song Saa / Longitude 131° | Conservation story woven into brand identity |
| Breakfast as feature | Turkish boutique hotels | Serpme kahvaltı photography as a hero selling point |
| Enquiry-based luxury | Singita / Longitude 131° | "Enquire" instead of "Book" signals exclusivity |
| Wellness integration | COMO Shambhala | Nature + spa as holistic well-being narrative |

---

## Section Order (Recommended Final)

1. Header (sticky)
2. Hero (video + tagline)
3. Intro / Philosophy (two-column editorial)
4. Gold divider
5. Rooms (cards with room navigator)
6. Dining / Restaurant
7. Hikayemiz (Our Story)
8. Nature & Garden
9. Experiences (card grid)
10. Spa / Wellness
11. Local Area Guide / Çıralı & Beyond
12. Gallery
13. Voices (testimonials) + Awards/Press
14. Getting Here (map + logistics)
15. Newsletter signup
16. Footer (contact, season dates, check-in/out, WhatsApp, social, legal, weather)

---

*Last updated: 2026-03-27*
*Research: 20+ luxury/boutique hotel websites analyzed across 8 parallel research agents*
