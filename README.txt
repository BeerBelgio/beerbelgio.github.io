BEERBELGIO.GITHUB.IO — V0.51 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

BASELINE / ROLLBACK STRATEGY
- HUB responsive architecture remains the known-good V0.42 baseline restored in V0.49.
- LAVA ENGINE remains byte-for-byte the V0.40 lava.js baseline. No lava-engine feature is reintroduced in this build.
- sonoDGTL remains based on the V0.48-era page developed through V0.49/V0.50, with only the refinements listed below.
- V0.51 continues the non-lava UI pass while keeping responsive/Lava work isolated.

V0.51 HUB CHANGES
- Portrait Hero claim: added a portrait-only SVG asset derived from the same claim paths. The graphic itself is unchanged; only the portrait SVG viewBox is horizontally re-centred around the actual artwork so the claim can be visually centred without changing desktop/landscape geometry.
- Portrait geolocation: TORINO / ITALY now uses an explicit right-aligned flex column with max-content children, removing the excess visual space to the right of TORINO.
- Landscape geolocation: explicitly restored to the desktop one-line form “TORINO, ITALY”.
- Landscape Hero claim: vertical margins halved versus V0.50.
- Portrait quick links: changed from one 3-row parent grid to a two-row 4×2 platform grid plus FULL LAVA below it. The internal platform-row gap and the platform-to-FULL-LAVA gap are both exactly 18 px.
- Contact WRITE ME: visually shifted downward by 3 px while retaining the same card/grid geometry, compensating for the font line-box so the button reads centred in the residual space under the CTA.
- No page-stage, responsive architecture, lava canvas or lava-engine code is changed.

V0.51 SONODGTL CHANGES
- Removed sticky behaviour from the top sonoDGTL navigation. The naming/navigation block now scrolls normally with the page again.
- Main lettering split into two colours: “sono” uses ink/black; “DGTL” uses BeerBelgio orange (#D1442D).
- English location restored to the full “TURIN, ITALY”; Italian remains TORINO.
- Top HUB pill retains the HUB + favicon order.
- Contact HUB control: HUB + BeerBelgio mark is now positioned as one absolute centred group inside the button. The existing 4 px text/logo gap is preserved.
- Browser/page title remains simply “sonoDGTL”.

LAVA STATUS
- lava.js is deliberately unchanged.
- SHA-256 remains identical to the V0.40 baseline: 2ea8275caca3e54a5020682611c89a3400207ce7b7dc7f0d52eba9a069cd9ba2.
- LAVA_AUDIT_V040-V048.txt remains included for later controlled feature reintroduction.

GITHUB ACTIONS NOTE
- The Node.js 20 warning comes from GitHub Pages' generated artifact-upload pipeline, not from website code.
- Current builds complete successfully; no custom workflow is introduced merely to suppress that upstream warning.

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
