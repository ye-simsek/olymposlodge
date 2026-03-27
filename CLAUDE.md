# Olympos Lodge

## Pending Tasks
1. Fix weather panel text colors (currently dark on dark background — needs white/rgba(255,255,255,0.85))
2. Wire REZERVASYON button → SabeeApp booking engine
3. Scroll fade-ins for about/nature/experience/gallery sections
4. Manifesto/editorial intro section between hero and rooms
5. Footer: season dates, check-in/out times, WhatsApp link, Spotify playlists
6. Mobile pass — full spacing/typography review
7. Child pages: individual rooms, Chimaera flames, Olympos ruins
9. rooms.html — room descriptions (room-row__desc) are placeholders; supplement each with richer copy pulled from RAG file once we revisit
8. Hero video poster: extract exact first frame of hero.mp4 as the poster image + add opacity fade-in on canplay, so the still→video cut is imperceptible

## Design References
Casa Angelina, Amanruya

## Hotel Information
Factual details about the hotel (room sizes, amenities, descriptions, policies, etc.) can be found in `olympos_lodge_rag_english copy.txt` in the project root. Always check this file before using approximations or asking the user for facts about the property.

## Conventions
- Bump `styles.css?v=` on every styles.css change
- Bump `script.js?v=` on every script.js change
- Read only the file(s) directly relevant to the change; pull in others only if the edit requires cross-file coordination
