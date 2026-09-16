BEERBELGIO.GITHUB.IO — V0.52 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

BASELINE / FREEZE STRATEGY
- HUB responsive architecture remains the known-good V0.42 baseline restored in V0.49.
- Desktop HUB layout is intentionally frozen in this build.
- LAVA ENGINE remains byte-for-byte the V0.40 lava.js baseline. No lava-engine feature is reintroduced in this build.
- sonoDGTL remains based on the current V0.51 page, with only the refinements listed below.

V0.52 HUB CHANGES
- Portrait Hero claim: no SVG geometry change. The existing portrait-specific SVG is now centred by the card/grid itself (`justify-self:center`) instead of relying on auto margins on an oversized image.
- Portrait Hero top offset: page content now starts 50 px lower, while refresh still lands at scrollY=0. This creates a visible lava band above the Hero without changing the responsive stage geometry.
- Portrait final motto runway: added bottom runway only in portrait so the final “FUN IS A SERIOUS THING.” can be scrolled to approximately the vertical centre of the viewport. Landscape/desktop remain unchanged.
- Landscape Hero claim: external margin above/below the claim reduced to 0 px; the SVG keeps its own internal artboard spacing.
- Landscape quick links: rebuilt as one 9-column row (`8 × 42px + FULL LAVA 118px`) with `space-between`, matching the desktop logic. FULL LAVA cannot wrap into a second row.
- Contact WRITE ME: optical vertical correction increased from +3 px to +6 px so top/bottom residual space reads more evenly.
- No desktop HUB geometry, page-stage scaling, lava canvas, or lava.js code is changed.

V0.52 SONODGTL CHANGES
- Main sonoDGTL lettering now uses M PLUS Rounded 1c Black / 900.
- To compensate for the heavier weight, lettering size is reduced by ~15%: 162 px desktop, 82 px touch-landscape, 54 px touch-portrait.
- Space between the naming/navigation block and the Hero is doubled by doubling the nav bottom padding in each responsive mode.
- Touch portrait order changed: EN / ITA / HUB controls appear above, lettering below.
- Contact HUB control: replaced the large 3000×3000-artboard logo with a button-specific SVG using a cropped viewBox around the real mark. This removes internal transparent whitespace that made the mathematically centred group look visually left-shifted.
- Contact HUB group now uses normal centred flex/grid flow with an exact 3 px text/logo gap; the previous absolute-centering workaround is removed.

LAVA STATUS
- lava.js is deliberately unchanged from the V0.40 baseline.
- LAVA_AUDIT_V040-V048.txt remains included for later controlled feature reintroduction.

RISK / RESPONSIVE NOTE
- The two new HUB scroll/spacing changes are portrait-only CSS spacing changes. They do not write widths, transforms or viewport dimensions and do not touch the responsive stage JavaScript.
- The 50 px top offset changes only where the first card begins in document flow.
- The final-motto runway changes only maximum scrollable page height in portrait.

RIGHTS / LICENSING
- Original website code: PolyForm Noncommercial 1.0.0.
- Original text / visual design / original creative material: CC BY-NC 4.0.
- Non-commercial reuse is allowed with attribution to Matteo Belgiovine / BeerBelgio.
- Commercial or monetised reuse is NOT automatically licensed and requires a separate written agreement with Matteo Belgiovine.
- See LICENSE.md, COPYRIGHT.md and THIRD_PARTY_NOTICES.md.

STAGING RULES
- Keep noindex / nofollow / noarchive until public 1.0.
- Every staging build uses one authoritative staging override layer; do not stack old version override blocks.
- /sonodgtl/ = English primary version.
- /sonodgtl/it/ = Italian alternative version.
- /lava/ = standalone lava route.
