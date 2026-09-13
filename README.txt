BEERBELGIO.GITHUB.IO — V0.34 PUBLIC STAGING

STAGING
- Public GitHub Pages staging remains active.
- noindex / nofollow / noarchive remains enabled.
- English remains the primary language.
- sonoDGTL base route: /sonodgtl/ (ENG)
- Italian alternate: /sonodgtl/it/
- .nojekyll remains enabled for direct static hosting.
- Cache-busting advanced to ?v=034 for main CSS/JS/local visual assets.
- Build rule confirmed: every staging build REPLACES the previous authoritative override block. V0.34 contains one staging block only; V0.33 is not stacked underneath it.

RIGHTS / LICENSING
- Commercial reuse is NO LONGER granted by the repository licence.
- Original website code: PolyForm Noncommercial 1.0.0.
- Original creative material: CC BY-NC 4.0.
- Non-commercial reuse/adaptation is allowed under those licence terms with attribution / required notices.
- Preferred attribution: Matteo Belgiovine / BeerBelgio — https://beerbelgio.github.io/
- Any commercial / monetised use requires a separate written agreement with Matteo Belgiovine; commercial terms and compensation/revenue participation are to be discussed separately.
- Third-party font/platform names/logos remain excluded and are documented in THIRD_PARTY_NOTICES.md.

MOBILE STAGE
- Portrait remains at the approved 80vw.
- Landscape is now also 80vw: no additional widening on rotation.

HERO CLAIM
- Obsolete live-FUN canvas element and canvas-copy JavaScript have been physically removed from HTML/JS, not merely hidden.
- Desktop: each half of the claim is centred inside its own equal half of the hero, instead of being pulled toward the central gap.
- Desktop fitting area is slightly larger so the paired claim can grow while remaining symmetrically centred.
- Mobile: same two-column layout retained; fitting area expanded and spacing above/below reduced by roughly 40% compared with V0.33.
- Mobile claim gains approximately 15% more usable fitting room while preserving FUN / three-line proportionality.

HERO IDENTITIES
- Mobile BeerBelgio and sonoDGTL descriptors are both exactly 11px.
- Mobile category/meta blocks reduced to 10.4px.
- Divider-to-title and title/descriptor/category spacing increased to a consistent 15px rhythm.
- Landscape still places BeerBelgio and sonoDGTL side-by-side.

QUICK LINKS
- Mobile approved layout remains 4 + 4 icons, then FULL LAVA alone.
- Desktop is rebuilt as a conceptual 6×2 / 12-cell grid.
- Eight circular platform links occupy 8 cells (4 + 4).
- FULL LAVA occupies the remaining 2 columns × 2 rows = the footprint of four circular cells plus their internal gaps.
- Desktop circles are therefore substantially larger and evenly distributed across the available width.
- Email icon keeps the same scale as every other icon; its upper flap incision is now heavier/more visible.

FEATURED
- Video title overlay removed completely.
- Play triangle enlarged inside the existing circle (desktop 34px; mobile 28px).
- Desktop Spotify / YouTube labels increased by 0.5px to 16.5px.
- Mobile Spotify / YouTube remain 15px.
- CTA arrows moved slightly closer to text everywhere (6px desktop / 5px mobile).

SONODGTL CARD
- Mobile title now deliberately breaks before REAL-WORLD PROJECTS.
- Mobile CTA still breaks between OPEN THE WEBSITE / LET’S WORK TOGETHER!
- Desktop keeps natural single-line flow where space allows.

CONTACT
- Desktop remains visually unchanged.
- Mobile headline is explicitly structured as three safe lines:
  WORKING ON
  SOMETHING
  WEIRD AND COOL?
- This avoids short orphan words while preserving the approved smile placement.

LAVA / IPHONE
- Why cards and bubbles behave differently: cards are normal DOM/document elements; the lava is one fixed canvas compositor layer. Safari can resize/clip that fixed visual layer differently when its top/bottom browser chrome and safe areas animate.
- V0.34 uses viewport-fit=cover + safe-area overscan + the CSS LARGE viewport height (100lvh) for the lava canvas.
- JS now sizes the canvas backing bitmap from the canvas' actual CSS bounding box instead of inventing portrait padding/runways.
- visualViewport resize handling has been removed from lava.js. Safari used to fire it continuously as browser chrome moved during scrolling, repeatedly recreating/clearing the canvas and causing visible flicker.
- BASIC and FULL LAVA still share exactly the same lava field and geometry.

DEFERRED
- Final floating motto scroll-growth / centre-screen transformation remains intentionally NOT implemented yet.
