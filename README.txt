BEERBELGIO.GITHUB.IO — V0.46 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine hub.
Search indexing remains disabled until the public 1.0 launch.

V0.46 CHANGELOG
- Mobile hub responsiveness: desktop proportional scaling now has a hard touch guard using navigator.maxTouchPoints + hover/pointer checks. A touch device cannot inherit the desktop proportional class even if the browser transiently misreports pointer capabilities during rotation.
- Mobile hub stage: portrait and landscape remain fixed at 80vw and explicitly override any accidental desktop-proportional rules.
- Desktop hub: proportional stage enlarged from 45vw to 52vw, so the whole card system and its typography render about 15% larger while keeping the same internal 760px composition.
- Hero claim: desktop artwork enlarged by 20%; portrait enlarged and anchored from the left; landscape enlarged while remaining centred. The user-supplied 740x120 SVG viewBox is preserved unchanged.
- Hero identities: mobile BeerBelgio / sonoDGTL title and descriptor sizes slightly increased after restoring the correct mobile scaling path.
- Hub contact portrait: CTA headline enlarged; smiley centred horizontally and vertically inside its dedicated right third. Landscape smiley also centred in its reserved column.
- Lava autonomous morphing: restored stronger V0.26-style contour coefficients, wider radial deformation limits and per-blob independent phase speeds so each blob changes shape continuously instead of holding a potato-like outline.
- Lava drag morphing: grabbed blobs now grow only about 5%, but liquid deformation is substantially stronger and keeps evolving for the full hold duration. Release momentum behaviour remains proportional to the gesture.
- Blank-click attract/repel behaviour remains trajectory-only; it does not directly rotate or snap the blob contour.
- sonoDGTL: Italian hero location shortened to TORINO. English hero body rewritten to reduce first-person repetition while preserving the same service meaning.
- sonoDGTL landscape: hero name/role and location meta use the same font size.
- sonoDGTL orange card: Italian portrait text is slightly reduced to avoid the orphan first-line article.
- sonoDGTL HUB contact button: label precedes the BeerBelgio logo and the logo is doubled in size.
- sonoDGTL narrow desktop windows: a new fine-pointer-only proportional scaling system activates below 980px viewport width. The 1120px desktop composition scales into 80vw instead of progressively collapsing its anchors/columns.
- Cache busting updated to ?v=046.

RIGHTS / LICENSING
- Original website code: PolyForm Noncommercial 1.0.0.
- Original text / visual design / original creative material: CC BY-NC 4.0.
- Non-commercial reuse is allowed with attribution to Matteo Belgiovine / BeerBelgio.
- Commercial or monetised reuse is NOT automatically licensed and requires a separate written agreement with Matteo Belgiovine.
- See LICENSE.md, COPYRIGHT.md and THIRD_PARTY_NOTICES.md.

STAGING RULES
- Keep noindex / nofollow / noarchive until public 1.0.
- Every staging build uses one authoritative staging override block. Replace the previous block rather than stacking another version underneath it.
- /sonodgtl/ = English primary version.
- /sonodgtl/it/ = Italian alternative version.
- /lava/ remains the standalone lava route.
