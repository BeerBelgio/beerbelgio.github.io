BEERBELGIO.GITHUB.IO — V0.44 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine hub.
Search indexing remains disabled until public 1.0.

V0.44 CHANGELOG — HUB
- Build hygiene: V0.44 replaces the previous authoritative staging layer; no new historical override block was stacked underneath it.
- Hero claim asset: restored the user-supplied SVG exactly with its original 740 × 120 viewBox. The custom cropped viewBox introduced in V0.43 is gone.
- Mobile stage: portrait and touch-landscape are explicitly locked back to the approved 80vw width.
- Android / mobile rotation: added explicit touch-portrait / touch-landscape root classes, resynchronised repeatedly during resize/orientation settling. This is intended to prevent stale landscape rules after rotating back to portrait.
- Hero claim portrait: left anchored with the supplied SVG and 5px top / 5px bottom wrapper margin.
- Quick links portrait: explicit rows 54 / 54 / 66px with a real 14px row gap, so row 2 → FULL LAVA uses the same spacing logic as row 1 → row 2.
- Quick links landscape: deterministic single-row placement is reasserted through the touch-landscape class so FULL LAVA cannot inherit the portrait row.
- Contact desktop: headline enlarged to 64px; smiley no longer sits on the vertical centre line and instead uses equal 26px right/bottom margins.
- Contact portrait: smiley keeps the approved size and now uses equal 20px right/bottom margins; WRITE ME remains vertically centred in the residual lower area.
- Contact landscape: same bottom/right margin concept as desktop.
- Hub WRITE ME fallback: the email address is copied before launching mailto. If a visitor has no configured local mail application, the on-page toast tells them to paste the copied address into webmail.
- Lava scroll: hub scroll sensitivity reduced further while interaction warping remains strong.
- Lava autonomous shape: stronger independent ambient morphing and movement-energy deformation, with slower contour-phase motion so blobs feel less round / static.
- Lava drag: while held, a blob maintains at least ~50% extra deformation; release momentum remains uncapped.
- Blank-click attract/repel: 5-click repulsive / 5-click attractive cycle retained, but blank clicks now change trajectory only and no longer inject abrupt phase / morph jumps.
- Lava rotation behaviour: interaction-driven angular phase changes were removed; shape amplitudes mutate without intentionally rotating the contour.
- Mobile lava orientation settling: canvas resize now also rechecks visualViewport after rotation with debounced settling passes.
- Cache busting updated to ?v=044.

V0.44 CHANGELOG — SONODGTL
- Hero eyebrow / location meta: matching font size in desktop; portrait uses CONSULTANT only; all versions use REMOTE FRIENDLY.
- Hero claim: comma removed; two forced nowrap lines — BE HEARD / THE RIGHT WAY. and FATTI SENTIRE / NEL MODO GIUSTO.
- Portrait claim: reduced enough to preserve the intended two-line structure.
- Hero body copy: em dash replaced by a sentence break.
- Principle card: relationship between the two statements clarified with “It needs…” / “Ha bisogno di…”. Both sentences use one consistent type size; line-height increased to avoid apostrophe collisions.
- WHAT I DO: item headings made larger / heavier for clearer hierarchy.
- HOW I WORK: TRAINING remains unified; PROBLEM SOLVING added as an additional keyword.
- Contact desktop: text column widened, button column narrowed and action spacing increased.
- Contact portrait: headline remains natural text wrapping; 2×2 action grid retained.
- Contact landscape: page chrome, paddings, type and cards scaled down further for a real zoomed-out landscape composition; contact reuses the desktop-like two-column structure.
- sonoDGTL mail subject: “Project Enquiry” capitalised. The prefilled body keeps “HOW DID YOU FIND ME” but no longer states sonoDGTL for the visitor.
- Italian mail body follows the same logic.

RIGHTS / LICENSING
- Copyright exists automatically for original material; the visible © notice is informational, not the source of protection.
- Original website code: PolyForm Noncommercial 1.0.0.
- Original text / visual design / original creative material: CC BY-NC 4.0.
- Commercial or monetised reuse is not automatically licensed and requires a separate written agreement with Matteo Belgiovine.
- COPYRIGHT.md summarises ownership and attribution; LICENSE.md defines reuse permissions; THIRD_PARTY_NOTICES.md covers third-party material.

STAGING RULES
- Keep noindex / nofollow / noarchive until public 1.0.
- Every staging build uses one authoritative staging override layer.
- /sonodgtl/ = English primary version.
- /sonodgtl/it/ = Italian alternative version.
- /lava/ = standalone lava route.
