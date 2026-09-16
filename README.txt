BEERBELGIO.GITHUB.IO — V0.53 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine digital hub.
Search indexing remains disabled until the public 1.0 launch.

BASELINE / FREEZE STRATEGY
- HUB responsive architecture remains the known-good V0.42 baseline restored in V0.49.
- Desktop HUB layout remains frozen.
- LAVA ENGINE remains byte-for-byte the V0.40 lava.js baseline. No lava-engine feature is reintroduced here.
- sonoDGTL remains based on the current V0.53 page, with only the refinements listed below.

V0.53 HUB CHANGES
- Portrait top runway increased from 50 px to 100 px.
- Portrait landing behaviour changed deliberately: the 100 px runway exists in the document above the Hero, but page refresh/pageshow/load scroll to the Hero itself. The Hero is therefore treated as the visual “page zero” while retaining real document space above it.
- Hero claim orientation handling simplified: the two independent claim <img> elements have been replaced by one <picture> element. Portrait selects claim-portrait.svg through a media source; landscape/desktop use claim.svg. The same DOM element is resized on rotation instead of hiding one image and showing another.
- Added explicit final portrait and landscape claim geometry guards after the normal mobile rules. Portrait remains 123%; landscape remains 98%. The goal is to prevent stale landscape margins/scale when rotating back to portrait without introducing responsive stage JavaScript.
- No other HUB card geometry, quick links, Contact layout, desktop layout, final motto behaviour, or responsive-stage sizing is changed.

V0.53 SONODGTL CHANGES
- Touch-portrait lettering increased by ~5%: 54 px -> 57 px.
- Touch-portrait space between EN / ITA / HUB controls and the lettering increased by 50%: 14 px -> 21 px.
- Touch-portrait space between the lettering and Hero reduced by 50%: nav bottom padding 36 px -> 18 px.
- Contact HUB logo reduced by 50% in every layout while preserving the centred HUB + logo flex group and the existing 3 px gap: 60 -> 30 px desktop, 54 -> 27 px portrait, 48 -> 24 px landscape.

LAVA STATUS
- lava.js is deliberately unchanged from the V0.40 baseline.
- SHA-256 expected: 2ea8275caca3e54a5020682611c89a3400207ce7b7dc7f0d52eba9a069cd9ba2
- LAVA_AUDIT_V040-V048.txt remains included for later controlled feature reintroduction.

LAVA REINTRODUCTION PLAN
- Treat V0.41 as the behavioural target / first upgrade layer over the V0.40 baseline.
- Keep all mobile canvas overscan / visualViewport experiments out of the first reintroduction passes.
- Reintroduce later interaction features as isolated groups, each with its own test build: proportional drag/release + decay first; then reduced scroll sensitivity; then +5% selected scale + stronger selected warping; then corrected 5+5 trajectory behaviour; finally any autonomous-morph fixes only if the V0.41-style baseline still needs them.
- Prefer lava-only test builds once the surrounding UI is frozen. If cache busting changes, update lava.js plus only the HTML files that reference its version query.

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
