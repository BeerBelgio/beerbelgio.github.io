BEERBELGIO.GITHUB.IO — V0.50 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

BASELINE / ROLLBACK STRATEGY
- HUB responsive architecture remains the known-good V0.42 baseline restored in V0.49.
- LAVA ENGINE remains byte-for-byte the V0.40 lava.js baseline. No lava-engine feature is reintroduced in this build.
- sonoDGTL remains based on the V0.48-era page developed through V0.49, with only the refinements listed below.
- The purpose of V0.50 is to finish non-lava UI/functionality while keeping the responsive/Lava baseline isolated.

V0.50 HUB CHANGES
- Portrait location: TORINO and ITALY remain on separate lines, but the comma is hidden only in portrait. Desktop / landscape still render TORINO, ITALY.
- Hero claim: enlarged from the V0.42 baseline by about +20% on desktop and touch-landscape, +10% on portrait. SVG geometry/viewBox is untouched.
- Quick links: restored the later working spacing logic without changing the stage: portrait uses explicit 54 / 54 / 66 px rows with identical 18 px gaps; landscape uses the proven single-row flex layout; desktop retains equal distribution across all quick links + FULL LAVA.
- Contact card: restored the later two-column layout without touching the page-stage responsive system. Desktop and landscape CTA are +5 px versus the V0.42 baseline. Smiley owns its own right column and uses the card padding as its right/bottom margin; portrait keeps a 2/3 CTA+button area and 1/3 smile area. WRITE ME is vertically centred in the residual space below the CTA.
- WRITE ME fallback: normal mailto remains first; if no local mail app takes over, an in-site M PLUS Rounded fallback appears with separate TO / SUBJECT / MESSAGE fields and individual COPY buttons.

V0.50 SONODGTL CHANGES
- Main sonoDGTL lettering uses BeerBelgio orange (#D1442D) as the first controlled colour accent.
- Top sonoDGTL + EN/ITA/HUB navigation is sticky: the header remains at the top while cards scroll beneath it.
- Top HUB pill now reads HUB first and shows the main-site favicon after it.
- English location translated to TURIN; Italian remains TORINO.
- Final contact HUB control now wraps HUB + BeerBelgio mark in one centred flex group with an exact 4 px gap.
- Browser/page title remains simply “sonoDGTL”.

LAVA AUDIT
- Added LAVA_AUDIT_V040-V048.txt.
- Section A contains verbatim lava-related README bullets from V0.40 through V0.48.
- Section B summarises what changed technically and proposes a controlled reintroduction order.
- Important: lava.js itself is NOT modified in V0.50 and matches V0.40 byte-for-byte.

GITHUB ACTIONS NOTE
- The Node.js 20 deprecation warning currently comes from GitHub Pages' generated build pipeline, specifically actions/upload-pages-artifact@v3 calling actions/upload-artifact@v4.
- There is no custom .github/workflows directory in this repo, so this warning is not caused by website code or a workflow authored in the repository.
- The build still completes successfully. GitHub is forcing the old action to run on Node 24 while the Pages action catches up with newer artifact actions.

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
