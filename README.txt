BEERBELGIO.GITHUB.IO — V0.42 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine hub.
Search indexing remains disabled until the public 1.0 launch.

V0.42 CHANGELOG
- Build hygiene: V0.42 replaces the previous staging override layer rather than stacking additional overrides on top.
- Hero claim: swapped in the newly supplied claim SVG; portrait claim reduced to sit inside safer side margins; desktop / touch-landscape claim reduced and re-centred as a single group.
- Hero spacing (hub): portrait spacing tightened between meta line, claim and identity cards. Current portrait values are: claim wrap margin 2 px above / 4 px below, identity stack gap 16 px, quick-links block margin 14 px top / bottom.
- Quick links portrait: restored clearer spacing rhythm so row 1 → row 2 and row 2 → FULL LAVA share the same 14 px row gap, while the whole block keeps 14 px separation from the surrounding cards.
- Quick links touch-landscape: rebuilt as a true single-row desktop-like strip so FULL LAVA no longer drops below the icon row.
- Share / LinkedIn assets: kept the share icon on the same sizing rules as the other quick-link icons and replaced LinkedIn with the updated supplied SVG.
- Contact card: desktop headline enlarged again; smiley shifted upward / re-centred for portrait and landscape; lower-row alignment adjusted to keep WRITE ME visually more central in the remaining space.
- Mobile lava viewport: coarse-pointer canvas now overscans both horizontally and vertically to reduce right / bottom clipping.
- Lava warping: increased ambient morph, stronger interaction deformation and restored visible liquid warping during autonomous movement, scroll/touch interaction and drag / release.
- Drag release: removed the explicit safety cap on release velocity so fast gestures preserve more of the user-imparted motion.
- sonoDGTL: hero rewritten to be leaner and more immediate; top-right meta restored; claim shortened; principle card refined; WHAT I DO widened, HOW I WORK narrowed; training / digitalisation added; EXPERIENCE block removed; footer now carries the copyright line.

SONODGTL SOURCE NOTE
- Current sonoDGTL structure is grounded in the uploaded CV and cover letter.
- The supplied Wix URL remains a conceptual reference, but this staging environment still could not reliably fetch that page directly.

RIGHTS / LICENSING
- Original website code: PolyForm Noncommercial 1.0.0.
- Original text / visual design / original creative material: CC BY-NC 4.0.
- Non-commercial reuse is allowed with attribution to Matteo Belgiovine / BeerBelgio.
- Commercial or monetised reuse is NOT automatically licensed and requires a separate written agreement with Matteo Belgiovine.
- Third-party fonts, logos, names and trademarks retain their own terms. See LICENSE.md and THIRD_PARTY_NOTICES.md.

STAGING RULES
- Keep noindex / nofollow / noarchive until public 1.0.
- Every staging build uses one authoritative staging override block. Replace the previous block rather than stacking another version underneath it.
- /sonodgtl/ = English primary version.
- /sonodgtl/it/ = Italian alternative version.
- /lava/ remains the standalone lava route.
