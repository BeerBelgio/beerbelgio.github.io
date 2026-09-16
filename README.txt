BEERBELGIO.GITHUB.IO — V0.45 PUBLIC STAGING

STATUS
Public staging for the BeerBelgio / Matteo Belgiovine hub.
Search indexing remains disabled until the public 1.0 launch.

V0.45 CHANGELOG
- Build hygiene: V0.45 replaces the V0.44 authoritative staging layer; staging overrides are not stacked.
- Hub responsive reset: removed the V0.44 JS touch-orientation classes that were contributing to stale Android portrait/landscape states. Touch portrait and touch landscape now use direct CSS orientation rules again.
- Hub mobile proportions: restored a fixed 80vw centred stage in BOTH portrait and landscape, with cards at 100% of that stage and no inherited desktop zoom.
- Hub hero meta: portrait explicitly uses two-line name and two-line location; landscape/desktop keep the compact one-line layout.
- Hub hero claim: original user-supplied 740x120 viewBox is kept intact; no custom crop. Portrait uses equal 25px spacing above/below; landscape claim is enlarged to 90% of the hero content width and centred.
- Hub hero identity typography: mobile BeerBelgio / sonoDGTL title, descriptor and meta sizes restored to the previously approved mobile scale.
- Hub quick links portrait: fixed 54 / 54 / 66px rows with an identical 18px row gap between icon row 1, icon row 2 and FULL LAVA.
- Hub quick links landscape: restored the single-row flex layout from the earlier working responsive versions.
- Hub contact: rebuilt with a reserved right column so smile and text cannot overlap. Portrait is a true 2/3 left content + 1/3 smile area. Desktop/landscape use the same principle. Smile visual bottom/right balance compensates for transparent padding inside the SVG.
- Hub contact headline: desktop set to 58px to remain prominent without overflowing the reserved text column.
- Hub final motto: centred on the site's vertical centreline in desktop and touch layouts.
- Hub WRITE ME fallback: mailto still opens normally when a mail handler exists. If the visitor stays on the page, an in-page panel appears with TO / SUBJECT / MESSAGE as three separate copyable fields, using the site font.
- Lava root cause found: the autonomous phase increments were accidentally lost during the drag-physics refactor. They are restored in V0.45; this was the main reason deformation amplitude changed but the contour looked frozen.
- Lava autonomous morph: phase / phase2 / ambient warp advance continuously again, with a stronger living deformation floor.
- Lava drag: while held, the selected blob stays at least ~50% more deformed and grows toward +20%; the shape continues morphing for the entire hold rather than freezing.
- Lava release: the +20% grab scale decays after release while proportional release momentum remains uncapped.
- Lava blank-click attraction/repulsion: still alternates 5 repel / 5 attract; blank clicks change trajectory only and do not inject an instantaneous morphology change.
- Lava hub scroll sensitivity: reduced again for both wheel/trackpad and touch while preserving deformation response.
- sonoDGTL typography: explicitly uses the same self-hosted M PLUS Rounded 1c family as the hub; normal body copy returns to natural letter spacing (no forced tracking).
- sonoDGTL proportions: site shell is 80vw / 10% side margins as requested; portrait and landscape keep the same proportional width while landscape reduces vertical density.
- sonoDGTL hero: name/role and location/meta share the same font size; portrait uses CONSULTANT; REMOTE FRIENDLY is used in both EN and IT. Claim breathing increased; portrait breathing increased further.
- sonoDGTL EN claim: two lines, BE HEARD / THE RIGHT WAY.
- sonoDGTL IT claim: three lines, FATTI SENTIRE / NEL MODO / GIUSTO.
- sonoDGTL hero copy: uses a full stop between the two thoughts; width/overflow rules tightened to keep copy inside the hero.
- sonoDGTL orange principle: EN now ends at “a clear message.”; IT ends at “un messaggio chiaro.”; the second sentence explicitly begins It needs / Ha bisogno to preserve the logical link.
- sonoDGTL WHAT I DO: item headings are larger/heavier relative to body copy.
- sonoDGTL HOW I WORK: keeps the unified TRAINING tag and PROBLEM SOLVING as the additional ninth tag.
- sonoDGTL navigation: top HUB control keeps the main-site favicon.
- sonoDGTL contact: final HUB action now mirrors the navigation idea using the BeerBelgio logo + HUB label; GitHub remains included. Portrait remains a 2x2 action grid; landscape uses the desktop structure at reduced density. IT landscape CTA can break into four explicit lines.
- sonoDGTL mail: subject remains “sonoDGTL — Project Enquiry”; body keeps the “How did you find me?” field without pre-filling sonoDGTL in the message body.
- Cache busting updated to ?v=045.

RIGHTS / LICENSING
- Original website code: PolyForm Noncommercial 1.0.0.
- Original text / visual design / original creative material: CC BY-NC 4.0.
- Non-commercial reuse is allowed with attribution to Matteo Belgiovine / BeerBelgio.
- Commercial or monetised reuse is NOT automatically licensed and requires a separate written agreement with Matteo Belgiovine.
- COPYRIGHT.md summarises ownership / attribution intent; LICENSE.md contains the operative licensing terms; THIRD_PARTY_NOTICES.md covers third-party material.

STAGING RULES
- Keep noindex / nofollow / noarchive until public 1.0.
- Every staging build uses one authoritative staging override block. Replace the previous block rather than stacking another version underneath it.
- /sonodgtl/ = English primary version.
- /sonodgtl/it/ = Italian alternative version.
- /lava/ remains the standalone lava route.
