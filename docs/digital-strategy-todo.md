# Digital Strategy To-Do List
Derived from `boutique-hotel-digital-strategy-bible.md` (2024-2025 industry data), adapted for Olympos Lodge: 17 rooms, direct-booking website, TR/DE/EN audience.

Priority key: **P1** = do first, highest leverage. **P2** = next quarter. **P3** = ongoing / later.

---

## 1. Listings & Distribution

- [ ] **P1** Build one master content set (photos, descriptions, amenities, room types) and use it everywhere: website, Booking.com, Expedia, Google. No per-channel drift.
- [ ] **P1** Audit OTA listings for content completeness. Expedia guideline: ~4 photos per room type including one bathroom shot, plus exterior, lobby/entrance, and one photo per key amenity. Aim for 35+ quality images total (Expedia: avg shopper views ~35 photos). *Blocked until the new photoshoot.*
- [ ] **P2** Verify room mapping is correct across all channels (room types match, no mismatched bookings).
- [ ] **P2** Check rate parity strategy for our jurisdiction. Turkey is not covered by EU DMA or UK CMA rules; confirm what our Booking.com/Expedia contracts actually allow before undercutting or matching.
- [ ] **P3** Evaluate a channel manager / connectivity layer (SiteMinder, Cloudbeds) if OTA channel count grows beyond what we manage by hand.

## 2. Google Ecosystem

- [ ] **P1** Complete every field on Google Business Profile: category ("Boutique hotel"), hotel class, check-in/out times, full attribute set (beach access, free Wi-Fi, parking, pet policy, breakfast, spa, accessibility).
- [ ] **P1** Wire the "official site" booking link in the Google hotel panel to our booking engine via a connectivity partner, so the rate tile is not OTA-only.
- [ ] **P1** Turn on Google free booking links (FBL). Commission-free placement next to OTAs; requires rates to reach Google via a connectivity partner. Highest-leverage free surface available.
- [ ] **P1** GA4: configure cross-domain tracking between the marketing site and the booking engine, and mark the booking-engine `purchase` as a key event with revenue, length of stay, and room type. Add `begin_checkout` funnel event. Without this, channel attribution is wrong.
- [ ] **P2** Refresh GBP photos seasonally; replace guest-upload-dominated gallery with our own current set after the photoshoot.
- [ ] **P2** Seed GBP Q&A with our own answers to predictable questions (how to reach Çıralı, parking, transfer from Antalya airport, pet policy, beach access) before wrong crowd answers appear.
- [ ] **P2** Use Google Posts for seasonal offers and events; they expire, so set a monthly cadence.
- [ ] **P2** Google Search Console: confirm domain is verified, XML sitemap submitted, and all money pages (home, rooms, room detail pages, location, contact) are indexed with no accidental `noindex`. Check brand vs non-brand query split.
- [ ] **P2** Implement Google's Hotel Price structured data on booking landing pages so rate tiles pass price validation and stay live.
- [ ] **P2** Keep Schema.org `Hotel` JSON-LD accurate. Note: do NOT expect `aggregateRating` star rich results from self-hosted reviews (Google restricts this); ties into the existing SEO revision checklist item on aggregateRating.
- [ ] **P3** Monitor Core Web Vitals in GSC quarterly: LCP < 2.5s, INP < 200ms, CLS < 0.1 (INP replaced FID in March 2024).

## 3. Direct Booking & Website

- [ ] **P1** Audit the booking flow on mobile end to end: guest checkout (no forced account), no surprise fees, minimal form steps, large tap targets. 52% of travelers abandon over a bad digital experience (SiteMinder 2025).
- [ ] **P1** Measure our booking-engine conversion rate and set the 3.3% independent-hotel average (Mews 2024) as the reference point. Define the metric consistently (engine entry vs whole site).
- [ ] **P2** Add trust signals near the booking CTA: best-rate guarantee, secure-payment badge, live review scores (Google/Booking.com) with dates.
- [ ] **P2** Image pipeline: WebP/AVIF with lazy-loading to protect LCP/CLS, especially on room pages.
- [ ] **P2** Hreflang audit for TR/DE/EN: every localized URL needs a complete reciprocal set with a self-referencing tag and exactly one `x-default`, using correct codes (`tr`, `de`, `en`). Missing return links cause Google to ignore the tags entirely. Re-audit after any URL change.
- [ ] **P2** Unique title (~50-60 chars) and meta description per page, front-loading brand + location + intent (e.g. "Olympos Lodge | Beachfront Boutique Hotel in Çıralı - Book Direct").
- [ ] **P3** Consider abandonment-recovery email for incomplete bookings (hotel cart abandonment runs ~80%).
- [ ] **P3** Evaluate a parity/price-comparison widget (Triptease, The Hotels Network) once direct volume justifies it.

## 4. SEO & Content

- [ ] **P1** Own the branded SERP: strong homepage, branded titles, completed GBP, schema, and FBL so "Olympos Lodge" searches land on us, not an OTA.
- [ ] **P2** Build a Çıralı destination content hub: things to do, Chimaera flames, Olympos ruins, turtle nesting season, best months to visit, how to get here from Antalya. Long-tail intent queries convert better and feed AI surfaces. One primary keyword per page, clear H2/H3, FAQ block. (The cirali.html guide page is the seed; expand it.)
- [ ] **P2** NAP consistency check: identical name, address, phone across website, GBP, Booking.com, Expedia, Tripadvisor, and any directories.
- [ ] **P2** Backlinks via local/DMO routes: Antalya tourism board, Çıralı/Olympos travel guides, "best hotels in Çıralı" listicles, co-marketing with local tour operators (boat trips, Lycian Way hikes). Skip paid directories.
- [ ] **P3** Complete the existing SEO revision checklist items before launch: sameAs, offers schema, sitemap dates, llms.txt, FAQ data.

## 5. Reputation & Reviews

- [ ] **P1** Set a 24-hour response SLA for all reviews, prioritizing 100% of negatives. Industry average is 3.2 days; the OTA benchmark is 24h. At 17 rooms this is feasible and a real ranking input.
- [ ] **P1** Systematic post-stay review ask: email/WhatsApp to ALL departed guests, neutral wording. Never gate on satisfaction, never incentivize, never write reviews for guests (policy violations on Google and all OTAs).
- [ ] **P2** Platform priority for us: 1. Google (feeds Maps + hotel panel), 2. Booking.com (largest source, score is a ranking input), 3. Tripadvisor, 4. Expedia. Use native invite tools (Booking automatic invitations, Tripadvisor Review Express, Google review link).
- [ ] **P2** Negative-review response template: thank, acknowledge the specific issue, apologize where warranted, state the concrete fix, move offline. Personalize positive responses; prospects read them.
- [ ] **P3** Feed recurring review complaints into an operational fix list each season.

## 6. Social & Visual Content

- [ ] **P1** Assign platform roles: Instagram = visual home and conversion hub (Reels for reach, Stories for in-stay/UGC); Facebook = events, local community, retargeting audience; TikTok = optional discovery layer; Pinterest = evergreen planning content.
- [ ] **P2** Cadence target: ~3 quality Reels/week, short vertical video 15-60s. Consistency beats volume. Inspiration content runs year-round; offer content fires inside the ~8-week booking window.
- [ ] **P2** UGC pipeline: one branded hashtag + geotag, written reshare permission workflow, repurpose guest content into Reels/Pins.
- [ ] **P2** Build a monthly content grid across pillars: rooms/garden, restaurant, beach, Çıralı/Chimaera experiences, people, UGC, offers.
- [ ] **P3** Micro-influencer program: gifted 1-2 night stays for nano/micro creators with a contracted deliverable set (e.g. 1 Reel + 3 Stories + usage rights). Always contract deliverables, usage rights, and disclosure ("Ad" rules apply even for gifted stays in most jurisdictions).

## 7. Email & CRM

- [ ] **P2** Verify email authentication before scaling: SPF, DKIM, DMARC, one-click unsubscribe (Gmail/Yahoo bulk-sender requirements, enforced since Feb 2024).
- [ ] **P2** Build the three core sequences: pre-arrival (confirmation + upsell: massage booking, transfers, special occasions), in-stay (WhatsApp preferred, see §11), post-stay (thank-you + review ask, then segmented win-back/seasonal offers).
- [ ] **P2** Benchmarks to manage against: ~33.6% newsletter open / 2.15% CTR (Revinate). Prioritize click-through and revenue per email over opens (Apple MPP inflates opens).
- [ ] **P3** Keep clean, consented, deduplicated guest profiles tied to bookings. GDPR/KVKK explicit opt-in for marketing sends.
- [ ] **P3** Loyalty without points: direct-booker perks (upgrade when available, early check-in, welcome amenity) and pre-arrival outreach that references prior stays.

## 8. Paid Advertising

- [ ] **P1** Branded-defense search: check who bids on "Olympos Lodge" today. If OTAs are bidding, run a small brand campaign; file a Google Ads trademark complaint if the name is registered. If nobody bids and we rank #1, skip and re-test periodically.
- [ ] **P2** Check metasearch CPC viability before spending: booking-engine conversion ≥2.5% and average booking value above €250. Our ADR likely clears the value bar; verify conversion first.
- [ ] **P2** Priority order for constrained budget: brand defense → metasearch (Google Hotel Ads) → retargeting → non-brand/PMax → paid social.
- [ ] **P3** Retargeting setup: frequency caps, exclude already-booked guests. Meta as retargeting/demand-gen layer ($100-1,000/month typical for independents), never judged on last click.
- [ ] **P3** Budget frame: travel marketing averages ~8.4% of revenue (Gartner 2024); independents often run 4-5%. Set our number deliberately.

## 9. OTA Optimization (Billboard Effect)

- [ ] **P2** Treat OTA listings as paid discovery that feeds direct bookings (Billboard Effect: roughly a third of direct bookers visited an OTA first). Maximize listing quality even while pushing direct.
- [ ] **P2** Booking.com: fill content/completeness score to 100% (room types, amenities, policies, house rules, photos). Model Genius program economics against margin before opting in; do not enroll by default.
- [ ] **P2** Expedia: Content Score is photo-driven; follow the per-room-type photo guideline after the photoshoot.
- [ ] **P2** Win the switch to direct with perks parity can't block: direct-only flexible cancellation, free extras, best-rate guarantee.
- [ ] **P3** Capture every OTA guest's email/profile at check-in so the second stay books direct.

## 10. Technology Stack

- [ ] **P1** Confirm the baseline triangle exists and is integrated: cloud PMS ↔ channel manager ↔ commission-free booking engine, with PCI-compliant payments. For 17 rooms: Little Hotelier, Cloudbeds, or Mews class.
- [ ] **P2** Verify certified integrations before buying any new tool (PMS ↔ CM ↔ IBE). No point tools that fracture the guest record.
- [ ] **P3** When direct volume grows: parity-monitoring widget, revenue-management tool, booking-funnel personalization. Avoid over-buying; a 17-room property does not need enterprise modular stacks.

## 11. Emerging Channels

- [ ] **P1** WhatsApp Business API for guest communication (not the consumer app): pre-arrival, in-stay concierge, post-stay. Turkey is a strong-WhatsApp market; this is the most mature "emerging" channel. Use a hospitality provider (HiJiffy, Asksuite, Whistle) for multi-agent inbox and templates.
- [ ] **P2** If deploying the phone/site AI concierge: require live availability lookup and booking inside the chat, define human-handoff coverage hours, and treat vendor ROI claims ("23x ROI") as marketing, not forecasts. A defensible expectation is ~80-90% query automation. (Ties to existing RAG audit: verify room service hours and offers status first.)
- [ ] **P2** GEO (AI search visibility): the levers are Schema.org `Hotel`/`FAQPage` markup, strong third-party review presence, and getting into "best hotels in Çıralı/Olympos" listicles. Treat as visibility hygiene, not a measurable booking channel; booking impact is unquantified.
- [ ] **Skip** Voice booking. No documented hotel-booking volume; allocate zero budget.

---

## Suggested first sprint (P1s only)

1. GBP: complete every field, fix booking link, seed Q&A.
2. Turn on Google free booking links via a connectivity partner.
3. GA4 cross-domain tracking + purchase key event.
4. Mobile booking-flow audit and conversion-rate baseline.
5. Review response SLA (24h) + systematic post-stay review ask.
6. Branded-search check: who bids on "Olympos Lodge"?
7. WhatsApp Business API evaluation.
8. Master content set prep (ready to deploy when photoshoot delivers).
