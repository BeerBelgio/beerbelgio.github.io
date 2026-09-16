BEERBELGIO.GITHUB.IO — V0.43 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine hub.
Search indexing remains disabled until the public 1.0 launch.

V0.43 CHANGELOG — HUB
- Build hygiene: V0.43 replaces the V0.42 staging override layer instead of stacking another override below it.
- Hero claim SVG: cropped the SVG viewBox around the actual artwork. The supplied artboard was 740×150, while the drawn paths occupied roughly 503×119, which was creating substantial invisible whitespace around the claim.
- Hero claim portrait: left-anchored, scaled to fill the available width more naturally, with 5 px wrapper margin above and 5 px below.
- Hero claim desktop: enlarged substantially by using the cropped viewBox at 100% of the 704 px claim area.
- Hero claim landscape: enlarged relative to V0.42 while preserving a desktop-like composition.
- Hero portrait spacing: removed dead space caused by the SVG artboard and tightened the identity-stack gap to 14 px.
- Quick links portrait: FULL LAVA text +1 px; row gap is explicitly 12 px between row 1 → row 2 and row 2 → FULL LAVA.
- Quick links landscape: FULL LAVA is explicitly pinned to column 9 / row 1; platform icons are explicitly pinned to row 1, preventing the button from dropping below the icons.
- Contact card: smiley removed from layout flow and absolutely centred at 50% of the card height, so it no longer changes card geometry. WRITE ME is vertically centred inside the residual area below the headline. Desktop headline increased to 58 px; landscape to 46 px. Portrait text/smiley sizes stay close to the approved scale.
- Lava mobile viewport: increased coarse-pointer canvas overscan on all sides, including an iOS-specific rule, to address right/bottom clipping.
- Lava scroll sensitivity: reduced on the normal hub as well as FULL LAVA.
- Lava autonomous warping: increased wobble, morph floor and deformation amplitude; contour smoothing reduced from three passes to two to make the liquid shape more visible without introducing sharp edges.
- Lava drag warping: increased by roughly 50% and given a stronger post-release deformation decay.
- Lava drag momentum: no artificial release-speed cap.
- Blank-space pointer clicks: first five clicks repel blobs from the click point, next five attract blobs, then the mode alternates every five clicks.

V0.43 CHANGELOG — SONODGTL
- Hero role: desktop / landscape use a line break between MATTEO BELGIOVINE and DIGITAL & MARKETING CONSULTANT; portrait shows only CONSULTANT below the name.
- Hero meta: reduced to two lines everywhere: location + REMOTE FRIENDLY.
- Hero claim: comma replaces the first full stop; always two explicit lines.
- Hero body copy: desktop can use the full card width with consistent side margins.
- HUB pill: now includes the main hub favicon.
- sonoDGTL favicon: sonoDGTL uses its own existing square logo asset as favicon, separate from the main hub.
- Principle card: replaced copy with the requested “Communication in the digital world…” direction; corrected grammar only, kept the intended meaning; clear / chiaro is italicised; both sentences use one consistent font size.
- General readability: body copy, capability descriptions, navigation and tags enlarged; body letter-spacing slightly tightened.
- WHAT I DO / HOW I WORK: keeps the wider / narrower 8-column vs 4-column ratio; TRAINING is unified into one keyword.
- Contact desktop: headline gets more horizontal room; four actions now include WRITE ME, LINKEDIN, GITHUB and BACK TO HUB; action spacing increased; email subject/body now identify sonoDGTL explicitly.
- Contact portrait: no forced title line breaks; title wraps naturally; four action buttons use a 2×2 grid.
- Contact landscape: reuses the desktop contact structure and applies a compact landscape-specific scale / spacing system.
- Mobile landscape sonoDGTL: overall page width increased and typography / paddings reduced to create a practical zoomed-out view.
- Footer: keeps © 2026 sonoDGTL // MATTEO BELGIOVINE and FUN IS A SERIOUS THING.

COPYRIGHT / LICENSING
- Copyright protection does not depend on the footer © notice; the notice is informational and helps identify owner/year.
- `LICENSE.md` remains the document that defines permitted reuse.
- `COPYRIGHT.md` has been added as a concise ownership / reuse notice for the repository.
- Original website code: PolyForm Noncommercial 1.0.0.
- Original creative material: CC BY-NC 4.0.
- Commercial / monetised reuse requires a separate written agreement with Matteo Belgiovine.
- Third-party material remains excluded; see `THIRD_PARTY_NOTICES.md`.

STAGING RULES
- Keep noindex / nofollow / noarchive until public 1.0.
- Every staging build uses one authoritative staging override block; replace the previous block rather than stacking another one.
- Cache-busting query strings increment with every staging build.
- /sonodgtl/ = English primary version.
- /sonodgtl/it/ = Italian alternative version.
- /lava/ remains the standalone lava route.
