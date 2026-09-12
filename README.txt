BEERBELGIO.GITHUB.IO — V0.27 PUBLIC STAGING

REPO / LANGUAGE
- English remains the primary language.
- sonoDGTL base route is now English: /sonodgtl/
- Italian alternate moved to: /sonodgtl/it/
- .nojekyll added for direct static hosting.
- noindex / nofollow / noarchive remains enabled during staging.

MOBILE
- Site stage is now narrower than the viewport so lava remains visible around the cards.
- Portrait target: 92vw. Landscape mobile target: 84vw.
- Hero claim stays as a 2-column composition on mobile.
- Quick actions are now 2 rows of 4 items: 7 platforms + FULL LAVA.
- GitHub quick link added.
- Full Lava mobile containment keeps blobs inside the visible viewport more aggressively.
- visualViewport resize/orientation changes now resize the lava canvas.

HERO
- Claim uses two equal rectangles and JS fits each text block independently.
- FUN is an experimental live window/cutout showing the lava underneath the cream card.
- BeerBelgio identity text is right-aligned; sonoDGTL stays left-aligned.
- Identity typography enlarged slightly and internal spacing tightened.

LAVA
- Autonomous movement slowed slightly / made more viscous.
- Organic contour is now low-pass smoothed to avoid clipped / pointy / unnatural extreme shapes.
- Persistent liquid deformation remains, but with safer contour limits.

ICONS
- Main arrows and play control use local SVG assets to avoid Apple emoji rendering.
