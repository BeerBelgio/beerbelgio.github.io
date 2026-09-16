/* BeerBelgio Lava Engine — V0.46
   Slow autonomous base motion + external perturbations.
   Proper fragmentation / tilt / shake come in the dedicated lava session.
*/

(() => {
  const canvas = document.getElementById("lava-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: false });
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  document.documentElement.classList.toggle("ios-device", isIOS);

  const palette = [
    "#d1442d",
    "#e7d9c1",
    "#1c1713",
    "#c8ad75",
    "#b83b29"
  ];

  function familyForColor(color) {
    if (color === "#d1442d" || color === "#b83b29") return "warm";
    if (color === "#e7d9c1") return "cream";
    if (color === "#1c1713") return "ink";
    if (color === "#c8ad75") return "mustard";
    return color;
  }

  const pointer = {
    x: innerWidth * 0.5,
    y: innerHeight * 0.5,
    active: false,
    strength: 0,
    impulse: 0
  };

  let viewWidth = innerWidth;
  let viewHeight = innerHeight;
  let padX = 0;
  let padY = 0;
  let width = innerWidth;
  let height = innerHeight;
  let dpr = Math.min(devicePixelRatio || 1, 2);
  let scrollImpulseX = 0;
  let scrollImpulseY = 0;
  let scrollWarpBoost = 1;
  let lastTouchX = null;
  let lastTouchY = null;
  let lastFrame = performance.now();
  let hiddenAt = null;
  let portraitScrollRAF = 0;

  let draggedBlob = null;
  let dragPointerId = null;
  let dragLastX = 0;
  let dragLastY = 0;
  let dragLastT = 0;
  let dragVx = 0;
  let dragVy = 0;
  let dragHistory = [];
  let blankClickCount = 0;
  let blankClickMode = "repel";

  function usesPortraitDocumentCanvas() {
    // V0.39: retired. iOS portrait now uses a fixed overscanned canvas.
    return false;
  }

  function syncPortraitCanvasPosition() {
    if (usesPortraitDocumentCanvas()) {
      canvas.style.setProperty("transform", `translate3d(0, ${window.scrollY || 0}px, 0)`, "important");
    } else {
      canvas.style.removeProperty("transform");
    }
  }

  function schedulePortraitCanvasPosition() {
    if (portraitScrollRAF) return;
    portraitScrollRAF = requestAnimationFrame(() => {
      portraitScrollRAF = 0;
      syncPortraitCanvasPosition();
    });
  }

  const blobs = Array.from({ length: 10 }, (_, i) => makeBlob(i));

  function makeBlob(i) {
    const radiusBase = Math.min(width, height) * 0.19;
    const r = radiusBase * (0.925 + Math.random() * 0.15); // total spread ~15%
    const angle = Math.random() * Math.PI * 2;
    const baseSpeed = (0.0025 + Math.random() * 0.0027) * 0.98; // V0.27: a little slower / more viscous

    return {
      x: Math.random() * width,
      y: Math.random() * height,
      vx: Math.cos(angle) * baseSpeed,
      vy: Math.sin(angle) * baseSpeed,
      baseSpeed,
      baseAngle: angle,
      turnPhase: Math.random() * Math.PI * 2,
      turnSpeed: 0.000041 + Math.random() * 0.000032,
      r,
      color: palette[i % palette.length],
      family: familyForColor(palette[i % palette.length]),
      phase: Math.random() * Math.PI * 2,
      phase2: Math.random() * Math.PI * 2,
      phaseSpeedA: 0.00016 + Math.random() * 0.00013,
      phaseSpeedB: 0.00012 + Math.random() * 0.00011,
      wobble: 0.115 + Math.random() * 0.105,
      morphBase: 0.32 + Math.random() * 0.14,
      deformMag: 0.44 + Math.random() * 0.14,
      deformDir: Math.random() * Math.PI * 2,
      dragging: false,
      manualMomentumUntil: 0,
      manualBlendUntil: 0,
      manualWarpMag: 0,
      manualWarpUntil: 0,
      manualWarpBlendUntil: 0,
      scrollX: 0,
      scrollY: 0,
      scrollGain: 0.78 + Math.random() * 0.48,
      scrollFollow: 0.00115 + Math.random() * 0.0018,
      scrollAngleOffset: (Math.random() - 0.5) * 0.28,
      scrollWarpGain: 0.82 + Math.random() * 0.55,
      scrollPhaseOffset: Math.random() * Math.PI * 2,
      ambientWarpPhase: Math.random() * Math.PI * 2,
      motionWarp: 0,
      grabScale: 0,
      forceX: 0,
      forceY: 0
    };
  }

  function resize(force = false) {
    syncPortraitCanvasPosition();
    // V0.46: fixed overscanned canvas; Safari chrome changes do not recreate the bitmap unnecessarily;
    // desktop/landscape keep the fixed canvas. JS mirrors the CSS rectangle into
    // the backing bitmap. We never resize from visualViewport while Safari chrome animates.
    const oldPadX = padX;
    const oldPadY = padY;
    const oldWidth = width;
    const oldHeight = height;

    const doc = document.documentElement;
    viewWidth = Math.max(1, window.innerWidth || doc.clientWidth || 1);
    viewHeight = Math.max(1, window.innerHeight || doc.clientHeight || 1);

    const rect = canvas.getBoundingClientRect();
    padX = Math.max(0, -rect.left);
    padY = Math.max(0, -rect.top);
    width = Math.max(1, rect.width);
    height = Math.max(1, rect.height);
    dpr = Math.min(devicePixelRatio || 1, 2);

    const pixelW = Math.round(width * dpr);
    const pixelH = Math.round(height * dpr);
    const bitmapChanged = canvas.width !== pixelW || canvas.height !== pixelH;

    if (bitmapChanged) {
      canvas.width = pixelW;
      canvas.height = pixelH;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    // Preserve each blob's visible viewport position when safe-area geometry
    // changes after rotation.
    const dx = padX - oldPadX;
    const dy = padY - oldPadY;
    if (dx || dy) {
      blobs.forEach((blob) => {
        blob.x += dx;
        blob.y += dy;
      });
    }

    // If Safari fired a resize only because browser chrome animated but the
    // actual large-viewport canvas box did not change, we deliberately avoid
    // recreating/clearing the bitmap. That removes scroll flicker.
    return force || bitmapChanged || oldWidth !== width || oldHeight !== height;
  }

  function getHeaterZone() {
    const stage = document.getElementById("site-stage");
    const stageRect = stage ? stage.getBoundingClientRect() : null;

    // Core idea: a lamp at the bottom-middle, roughly half the width of the cards.
    const baseWidth = stageRect && stageRect.width > 0
      ? stageRect.width * 0.52
      : width * 0.23;

    return {
      cx: viewWidth * 0.5,
      halfW: baseWidth * 0.5,
      y: padY + viewHeight * 0.90,
      h: viewHeight * 0.24
    };
  }

  function midpoint(a, b) {
    return {
      x: (a.x + b.x) / 2,
      y: (a.y + b.y) / 2
    };
  }

  function organicPath(blob, time) {
    const points = 56;
    let radii = [];

    for (let i = 0; i < points; i++) {
      const a = (i / points) * Math.PI * 2;
      const wobbleNow = blob.wobble;
      const deformMag = blob.deformMag || 0;
      const deformDir = blob.deformDir || 0;
      const ambientMorph = blob.morphBase || 0.22;

      const pulseA = 0.72 + 0.28 * Math.sin(time * 0.00023 + blob.turnPhase);
      const pulseB = 0.68 + 0.32 * Math.sin(time * 0.00017 + blob.turnPhase * 1.37);
      const pulseC = 0.74 + 0.26 * Math.sin(time * 0.00029 + blob.turnPhase * 0.71);
      const breathing =
        1
        + wobbleNow * pulseA * Math.sin(a * 3 + blob.phase)
        + wobbleNow * 0.72 * pulseB * Math.sin(a * 5 - blob.phase2)
        + ambientMorph * 0.12 * pulseC * Math.sin(a * 2 + blob.phase2 * 0.6);

      const directional = Math.cos(a - deformDir);
      const stretch = 1
        + ambientMorph * 0.22 * Math.sin((a - deformDir) * 2 + blob.phase * 0.55)
        + ambientMorph * 0.17 * Math.sin((a - deformDir) * 3 - blob.phase2 * 0.42)
        + deformMag * 0.46 * directional
        - deformMag * 0.32 * Math.cos((a - deformDir) * 2)
        + deformMag * 0.20 * Math.sin((a - deformDir) * 3 + blob.phase2 * 0.55)
        + deformMag * 0.13 * Math.sin((a - deformDir) * 4 - blob.phase * 0.45)
        + deformMag * 0.08 * Math.sin((a - deformDir) * 5 + blob.phase * 0.33);

      const grabScale = 1 + (blob.grabScale || 0);
      radii.push(blob.r * grabScale * Math.max(0.46, Math.min(1.76, breathing * stretch)));
    }

    // Low-pass the radial contour so deformation stays liquid instead of pointy/clipped.
    for (let pass = 0; pass < 2; pass++) {
      const next = [];
      for (let i = 0; i < points; i++) {
        const a = radii[(i - 2 + points) % points];
        const b = radii[(i - 1 + points) % points];
        const c = radii[i];
        const d = radii[(i + 1) % points];
        const e = radii[(i + 2) % points];
        next[i] = (a + 2*b + 4*c + 2*d + e) / 10;
      }
      radii = next;
    }

    const coords = [];
    for (let i = 0; i < points; i++) {
      const a = (i / points) * Math.PI * 2;
      coords.push({
        x: blob.x + Math.cos(a) * radii[i],
        y: blob.y + Math.sin(a) * radii[i]
      });
    }

    ctx.beginPath();
    const firstMid = midpoint(coords[coords.length - 1], coords[0]);
    ctx.moveTo(firstMid.x, firstMid.y);
    for (let i = 0; i < coords.length; i++) {
      const p = coords[i];
      const next = coords[(i + 1) % coords.length];
      const mid = midpoint(p, next);
      ctx.quadraticCurveTo(p.x, p.y, mid.x, mid.y);
    }
    ctx.closePath();
  }

  function contain(blob) {
    // Keep every blob tied to the VISIBLE viewport, even when the backing canvas
    // is larger than the screen (iOS portrait overscan). Centres may travel
    // beyond an edge, but never far enough for every blob to disappear.
    const visibleLeft = padX;
    const visibleTop = padY;
    const visibleRight = padX + viewWidth;
    const visibleBottom = padY + viewHeight;
    const travel = blob.r * 0.78;
    const bounce = 0.82;

    const minX = visibleLeft - travel;
    const maxX = visibleRight + travel;
    const minY = visibleTop - travel;
    const maxY = visibleBottom + travel;

    if (blob.x < minX) {
      blob.x = minX;
      blob.vx = Math.abs(blob.vx) * bounce;
      blob.baseAngle = Math.atan2(blob.vy, Math.abs(blob.vx));
    } else if (blob.x > maxX) {
      blob.x = maxX;
      blob.vx = -Math.abs(blob.vx) * bounce;
      blob.baseAngle = Math.atan2(blob.vy, -Math.abs(blob.vx));
    }

    if (blob.y < minY) {
      blob.y = minY;
      blob.vy = Math.abs(blob.vy) * bounce;
      blob.baseAngle = Math.atan2(Math.abs(blob.vy), blob.vx);
    } else if (blob.y > maxY) {
      blob.y = maxY;
      blob.vy = -Math.abs(blob.vy) * bounce;
      blob.baseAngle = Math.atan2(-Math.abs(blob.vy), blob.vx);
    }
  }

  function update(blob, dt, time) {
    const motionScale = prefersReducedMotion ? 0.18 : 1;

    // V0.46: restore the continuously evolving shape phases that were
    // accidentally dropped during the drag-physics refactor. Without these,
    // deformMag could be large but the contour itself stayed almost frozen.
    blob.phase += dt * blob.phaseSpeedA * motionScale;
    blob.phase2 -= dt * blob.phaseSpeedB * motionScale;
    blob.ambientWarpPhase += dt * 0.000052 * motionScale;

    blob.forceX = 0;
    blob.forceY = 0;

    if (blob.dragging) {
      const dragSpeed = Math.hypot(dragVx, dragVy);
      const baseMorph = blob.morphBase || 0.32;
      const dragWarp = baseMorph * 1.35 + Math.min(1.55, dragSpeed * 1.20);
      // While held: only +5% size, but a much stronger and continuously evolving
      // liquid deformation. The deformation changes for the entire hold.
      blob.deformMag = Math.max(baseMorph * 2.35, baseMorph + dragWarp);
      blob.grabScale += (0.05 - (blob.grabScale || 0)) * Math.min(1, 0.028 * dt);
      blob.phase += dt * 0.00092;
      blob.phase2 -= dt * 0.00071;
      blob.ambientWarpPhase += dt * 0.00044;
      return;
    }

    blob.grabScale *= Math.pow(0.9975, dt);

    // The direction evolves very slowly, like an autonomous lava lamp.
    const desiredAngle =
      blob.baseAngle +
      Math.sin(time * blob.turnSpeed + blob.turnPhase) * 0.72;

    const desiredVx = Math.cos(desiredAngle) * blob.baseSpeed * motionScale;
    const desiredVy = Math.sin(desiredAngle) * blob.baseSpeed * motionScale;

    // After a manual drag, keep the release momentum alive for a while.
    // Then blend gradually back into autonomous motion instead of snapping back.
    let settleScale = 1;
    if (time < (blob.manualMomentumUntil || 0)) {
      settleScale = 0.035;
    } else if (time < (blob.manualBlendUntil || 0)) {
      const span = Math.max(1, blob.manualBlendUntil - blob.manualMomentumUntil);
      const t = Math.max(0, Math.min(1, (time - blob.manualMomentumUntil) / span));
      settleScale = 0.035 + 0.965 * t;
    }
    const settle = 0.00086 * dt * settleScale;
    blob.vx += (desiredVx - blob.vx) * settle;
    blob.vy += (desiredVy - blob.vy) * settle;

    // Gentle internal convection so the field lives even without interaction.
    const currentFx = Math.sin(time * 0.00022 + blob.turnPhase + blob.y * 0.0042) * 0.000041 * dt;
    const currentFy = Math.cos(time * 0.00018 + blob.turnPhase * 1.2 + blob.x * 0.0036) * 0.000036 * dt;
    blob.vx += currentFx;
    blob.vy += currentFy;
    blob.forceX += currentFx * 0.78;
    blob.forceY += currentFy * 0.78;

    // Persistent liquid memory: the shape keeps wandering instead of snapping back to round.
    blob.morphBase += Math.sin(time * 0.00011 + blob.turnPhase * 1.7) * 0.000010 * dt;
    blob.morphBase = Math.max(0.28, Math.min(0.50, blob.morphBase));

    if (pointer.strength > 0.001) {
      const dx = pointer.x - blob.x;
      const dy = pointer.y - blob.y;
      const dist = Math.hypot(dx, dy) || 1;
      const influence = Math.max(0, 1 - dist / Math.max(width, height) * 1.9);

      // Slow viscous perturbation: interaction fades if the pointer stops moving.
      const fx = (-dy / dist) * influence * 0.00016 * pointer.strength * dt;
      const fy = ( dx / dist) * influence * 0.00016 * pointer.strength * dt;
      blob.vx += fx;
      blob.vy += fy;
    }

    // Each blob has its own delayed / scaled interpretation of the global scroll.
    // This prevents the whole field from moving like one rigid layer.
    const globalScrollEnabled = !draggedBlob;
    const targetScrollX = globalScrollEnabled ? scrollImpulseX * blob.scrollGain : 0;
    const targetScrollY = globalScrollEnabled ? scrollImpulseY * blob.scrollGain : 0;
    const follow = Math.min(1, blob.scrollFollow * dt);
    blob.scrollX += (targetScrollX - blob.scrollX) * follow;
    blob.scrollY += (targetScrollY - blob.scrollY) * follow;

    let scrollNormX = Math.tanh(blob.scrollX / 5.8);
    let scrollNormY = Math.tanh(blob.scrollY / 5.8);
    const ca = Math.cos(blob.scrollAngleOffset);
    const sa = Math.sin(blob.scrollAngleOffset);
    const rotatedX = scrollNormX * ca - scrollNormY * sa;
    const rotatedY = scrollNormX * sa + scrollNormY * ca;
    scrollNormX = rotatedX;
    scrollNormY = rotatedY;

    const scrollMagnitude = Math.min(1, Math.hypot(scrollNormX, scrollNormY));
    const scrollFx = (scrollNormX * 0.00054
      + Math.sin(blob.scrollPhaseOffset + time * 0.0007) * scrollMagnitude * 0.00011) * dt;
    const scrollFy = (scrollNormY * 0.00054
      + Math.cos(blob.scrollPhaseOffset * 0.8 + time * 0.00061) * scrollMagnitude * 0.000055) * dt;
    blob.vx += scrollFx;
    blob.vy += scrollFy;

    const warpGain = 0.16 * blob.scrollWarpGain * scrollWarpBoost;
    blob.forceX += scrollFx * warpGain;
    blob.forceY += scrollFy * warpGain;

    // Anti-edge / anti-corner disturbance:
    // viscous steering first, tiny pushes second. No flipper kicks.
    const edgeZone = Math.min(width, height) * 0.21;
    const leftT = Math.max(0, 1 - blob.x / edgeZone);
    const rightT = Math.max(0, 1 - (width - blob.x) / edgeZone);
    const topT = Math.max(0, 1 - blob.y / edgeZone);

    if (leftT > 0) {
      const fx = leftT * 0.000044 * dt;
      blob.vx += fx;
      blob.forceX += fx;
      blob.baseAngle += angleDelta(blob.baseAngle, 0) * 0.00026 * dt * leftT;
    }
    if (rightT > 0) {
      const fx = -rightT * 0.000058 * dt;
      blob.vx += fx;
      blob.forceX += fx;
      blob.baseAngle += angleDelta(blob.baseAngle, Math.PI) * 0.00030 * dt * rightT;
    }
    if (topT > 0) {
      const fy = topT * 0.000038 * dt;
      blob.vy += fy;
      blob.forceY += fy;
      blob.baseAngle += angleDelta(blob.baseAngle, Math.PI / 2) * 0.00012 * dt * topT;
    }

    // Corners get extra encouragement to rejoin the flow.
    const corners = [
      [0, 0],
      [width, 0],
      [0, height],
      [width, height]
    ];

    for (const [cx, cy] of corners) {
      const dx = blob.x - cx;
      const dy = blob.y - cy;
      const dist = Math.hypot(dx, dy) || 1;
      const zone = Math.min(width, height) * 0.28;

      if (dist < zone) {
        const t = 1 - dist / zone;
        const fx = (dx / dist) * t * 0.000040 * dt;
        const fy = (dy / dist) * t * 0.000040 * dt;
        blob.vx += fx;
        blob.vy += fy;
        blob.forceX += fx;
        blob.forceY += fy;
        blob.baseAngle += angleDelta(blob.baseAngle, Math.atan2(dy, dx)) * 0.00024 * dt * t;
      }
    }

    // Gentle lamp-like buoyancy:
    // a warmer zone at the lower centre constantly encourages slow upward travel.
    const heater = getHeaterZone();
    const hx = Math.abs(blob.x - heater.cx) / Math.max(1, heater.halfW);
    const hy = (blob.y - (heater.y - heater.h)) / Math.max(1, heater.h);
    const inHeaterX = Math.max(0, 1 - hx);
    const inHeaterY = Math.max(0, Math.min(1, hy));

    if (inHeaterX > 0 && inHeaterY > 0) {
      const heaterStrength = inHeaterX * inHeaterX * inHeaterY;
      const fy = -heaterStrength * 0.000132 * dt;
      blob.vy += fy;
      blob.forceY += fy;
      blob.baseAngle += angleDelta(blob.baseAngle, -Math.PI / 2) * 0.00022 * dt * heaterStrength;
    }

    const forceMag = Math.hypot(blob.forceX, blob.forceY);

    // A dragged/released blob keeps an extra liquid deformation that decays on
    // the same timescale as its manual momentum. The shape mutates; its axis does not rotate.
    let manualWarp = 0;
    if (time < (blob.manualWarpUntil || 0)) {
      manualWarp = blob.manualWarpMag || 0;
    } else if (time < (blob.manualWarpBlendUntil || 0)) {
      const span = Math.max(1, blob.manualWarpBlendUntil - blob.manualWarpUntil);
      const t = Math.max(0, Math.min(1, (time - blob.manualWarpUntil) / span));
      manualWarp = (blob.manualWarpMag || 0) * (1 - t);
    }
    if (manualWarp > 0) {
      blob.phase += manualWarp * 0.00055 * dt;
      blob.phase2 -= manualWarp * 0.00044 * dt;
    }

    const morphFloor = blob.morphBase || 0.32;
    const speedRatio = Math.hypot(blob.vx, blob.vy) / Math.max(0.0001, blob.baseSpeed);
    const motionTarget = Math.min(0.34, Math.max(0, speedRatio - 0.65) * 0.055);
    const motionFollow = Math.min(1, 0.0016 * dt);
    blob.motionWarp += (motionTarget - (blob.motionWarp || 0)) * motionFollow;
    const ambientWarp = 0.24 + 0.30 * (0.5 + 0.5 * Math.sin(time * 0.00038 + blob.ambientWarpPhase));
    const livingFloor = morphFloor + ambientWarp + (blob.motionWarp || 0) + manualWarp;

    blob.deformMag = Math.min(
      1.28,
      Math.max(
        livingFloor,
        (blob.deformMag || livingFloor) * Math.pow(0.99925, dt) + forceMag * 148
      )
    );

    // Only excess interaction energy is damped; base drift remains alive.
    blob.vx *= Math.pow(0.99984, dt);
    blob.vy *= Math.pow(0.99984, dt);

    blob.x += blob.vx * dt;
    blob.y += blob.vy * dt;

    contain(blob);
  }

  // Non-blob clicks alternate in five-click blocks: five repulsive impulses,
  // then five attractive impulses, then back again.
  function pointImpulse(x, y, mode = "repel") {
    const polarity = mode === "attract" ? -1 : 1;
    blobs.forEach((blob) => {
      const dx = blob.x - x;
      const dy = blob.y - y;
      const dist = Math.hypot(dx, dy) || 1;
      const force = Math.max(0, 1 - dist / Math.max(width, height));

      const fx = (dx / dist) * force * 0.15 * polarity;
      const fy = (dy / dist) * force * 0.15 * polarity;
      blob.vx += fx;
      blob.vy += fy;
      // Blank clicks affect trajectory only. Shape responds later through
      // movement energy, avoiding an instantaneous rotation/morph jump.
    });
  }

  function handleBlankClick(x, y) {
    pointImpulse(x, y, blankClickMode);
    blankClickCount += 1;
    if (blankClickCount % 5 === 0) {
      blankClickMode = blankClickMode === "repel" ? "attract" : "repel";
    }
  }


  function angleDelta(from, to) {
    let d = to - from;
    while (d > Math.PI) d -= Math.PI * 2;
    while (d < -Math.PI) d += Math.PI * 2;
    return d;
  }

  // Same-colour FAMILY repulsion, based on the distance between blob surfaces.
  //
  // The soft buffer is 33% of the smaller blob radius:
  // blobs start avoiding one another BEFORE their visible surfaces overlap.
  // If they do overlap (e.g. after a click/burst), position is relaxed apart
  // without injecting a large velocity spike.
  function applySameFamilyRepulsion(dt) {
    for (let i = 0; i < blobs.length; i++) {
      for (let j = i + 1; j < blobs.length; j++) {
        const a = blobs[i];
        const b = blobs[j];

        if (a.family !== b.family) continue;

        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let dist = Math.hypot(dx, dy);

        if (dist < 0.001) {
          dx = 1;
          dy = 0;
          dist = 1;
        }

        const nx = dx / dist;
        const ny = dy / dist;

        const surfaceGap = dist - (a.r + b.r);
        const surfaceBuffer = Math.min(a.r, b.r) * 0.33;

        if (surfaceGap >= surfaceBuffer) continue;

        const proximity = Math.max(
          0,
          Math.min(1, (surfaceBuffer - surfaceGap) / surfaceBuffer)
        );

        // Redirect their autonomous drift away from one another.
        // This changes direction, not raw speed.
        const awayA = Math.atan2(-ny, -nx);
        const awayB = Math.atan2(ny, nx);
        const steering = 0.00075 * dt * proximity;

        a.baseAngle += angleDelta(a.baseAngle, awayA) * steering;
        b.baseAngle += angleDelta(b.baseAngle, awayB) * steering;

        // Remove only the portion of relative velocity that is closing the gap.
        // This prevents the "repulsion slingshot" seen in V0.17.
        const relVx = b.vx - a.vx;
        const relVy = b.vy - a.vy;
        const closing = relVx * nx + relVy * ny;

        if (closing < 0) {
          const cancel = (-closing) * 0.42 * proximity;
          a.vx -= nx * cancel * 0.5;
          a.vy -= ny * cancel * 0.5;
          b.vx += nx * cancel * 0.5;
          b.vy += ny * cancel * 0.5;
          a.forceX -= nx * cancel * 0.5;
          a.forceY -= ny * cancel * 0.5;
          b.forceX += nx * cancel * 0.5;
          b.forceY += ny * cancel * 0.5;
          a.forceX -= nx * cancel * 0.5;
          a.forceY -= ny * cancel * 0.5;
          b.forceX += nx * cancel * 0.5;
          b.forceY += ny * cancel * 0.5;
        }

        // Hard rule: same-family surfaces should not remain overlapped.
        // Positional relaxation separates them smoothly without extra speed.
        if (surfaceGap < 0) {
          const penetration = -surfaceGap;
          const correction = Math.min(1.25, penetration * 0.055);

          a.x -= nx * correction;
          a.y -= ny * correction;
          b.x += nx * correction;
          b.y += ny * correction;
          a.forceX -= nx * correction * 0.02;
          a.forceY -= ny * correction * 0.02;
          b.forceX += nx * correction * 0.02;
          b.forceY += ny * correction * 0.02;
        }
      }
    }
  }



  // Universal overlap rule:
  // every blob should keep a minimum individuality.
  //
  // Approximation: allow some overlap, but not so much that one blob disappears.
  // If overlap exceeds a coarse threshold, relax it apart.
  // Different-colour blobs get a weaker version of the rule than same-family blobs.
  function applyUniversalOverlapRule(dt) {
    for (let i = 0; i < blobs.length; i++) {
      for (let j = i + 1; j < blobs.length; j++) {
        const a = blobs[i];
        const b = blobs[j];

        let dx = b.x - a.x;
        let dy = b.y - a.y;
        let dist = Math.hypot(dx, dy);

        if (dist < 0.001) {
          dx = 1;
          dy = 0;
          dist = 1;
        }

        const nx = dx / dist;
        const ny = dy / dist;

        const minR = Math.min(a.r, b.r);
        const surfaceGap = dist - (a.r + b.r);

        // Coarse "at least ~25% still perceivable" rule.
        // Negative gap is overlap. We tolerate some, but not too much.
        const maxAllowedOverlap = minR * 0.52;
        const worstAllowedGap = -maxAllowedOverlap;

        if (surfaceGap >= worstAllowedGap) continue;

        const sameFamily = a.family === b.family;
        const penetration = worstAllowedGap - surfaceGap;
        const proximity = Math.max(0, Math.min(1, penetration / Math.max(1, minR * 0.55)));

        // Mostly positional correction, not acceleration.
        const baseCorrection = sameFamily ? 0.060 : 0.026;
        const correction = Math.min(1.30, penetration * baseCorrection);

        a.x -= nx * correction;
        a.y -= ny * correction;
        b.x += nx * correction;
        b.y += ny * correction;

        // Mild velocity damping only on the closing component.
        const relVx = b.vx - a.vx;
        const relVy = b.vy - a.vy;
        const closing = relVx * nx + relVy * ny;

        if (closing < 0) {
          const cancel = (-closing) * (sameFamily ? 0.25 : 0.12) * proximity;
          a.vx -= nx * cancel * 0.5;
          a.vy -= ny * cancel * 0.5;
          b.vx += nx * cancel * 0.5;
          b.vy += ny * cancel * 0.5;
          a.forceX -= nx * cancel * 0.5;
          a.forceY -= ny * cancel * 0.5;
          b.forceX += nx * cancel * 0.5;
          b.forceY += ny * cancel * 0.5;
        }
      }
    }
  }

  function blobAt(x, y) {
    // Later blobs are painted on top, so search from the end first.
    for (let i = blobs.length - 1; i >= 0; i--) {
      const blob = blobs[i];
      if (Math.hypot(x - blob.x, y - blob.y) <= blob.r * 1.08) return blob;
    }
    return null;
  }

  function canDragWithPointer(e) {
    if (e.target && e.target.closest && e.target.closest("a, button, input, textarea, select, .card")) return false;
    if (e.pointerType !== "touch") return true;
    // On touch, direct dragging is limited to immersive lava so normal page
    // scrolling remains effortless. Mouse/pen can drag bubbles everywhere.
    return document.body.classList.contains("lava-mode") || location.pathname.includes("/lava/");
  }

  function startBlobDrag(e) {
    const x = e.clientX + padX;
    const y = e.clientY + padY;
    const hit = blobAt(x, y);
    if (!hit || !canDragWithPointer(e)) return false;

    draggedBlob = hit;
    draggedBlob.dragging = true;
    dragPointerId = e.pointerId;
    dragLastX = x;
    dragLastY = y;
    dragLastT = performance.now();
    dragVx = 0;
    dragVy = 0;
    dragHistory = [];
    scrollImpulseX = 0;
    scrollImpulseY = 0;
    blobs.forEach((blob) => {
      blob.scrollX = 0;
      blob.scrollY = 0;
    });
    pointer.impulse = 0;
    pointer.strength = 0;

    // Bring the selected blob visually to the front without changing its identity.
    const idx = blobs.indexOf(hit);
    if (idx >= 0 && idx !== blobs.length - 1) {
      blobs.splice(idx, 1);
      blobs.push(hit);
    }
    return true;
  }

  function moveBlobDrag(e) {
    if (!draggedBlob || e.pointerId !== dragPointerId) return false;
    const x = e.clientX + padX;
    const y = e.clientY + padY;
    const now = performance.now();
    const dt = Math.max(1, now - dragLastT);
    const instantVx = (x - dragLastX) / dt;
    const instantVy = (y - dragLastY) / dt;
    dragHistory.push({ vx: instantVx, vy: instantVy, t: now });
    dragHistory = dragHistory.filter(sample => now - sample.t <= 140);
    const weightSum = dragHistory.reduce((sum, _, i) => sum + (i + 1), 0) || 1;
    dragVx = dragHistory.reduce((sum, sample, i) => sum + sample.vx * (i + 1), 0) / weightSum;
    dragVy = dragHistory.reduce((sum, sample, i) => sum + sample.vy * (i + 1), 0) / weightSum;
    draggedBlob.x = x;
    draggedBlob.y = y;
    dragLastX = x;
    dragLastY = y;
    dragLastT = now;
    return true;
  }

  function endBlobDrag(e) {
    if (!draggedBlob || (e && e.pointerId !== dragPointerId)) return false;
    const now = performance.now();
    const dragSpeed = Math.hypot(dragVx, dragVy);
    // Release momentum is genuinely proportional to the user's final gesture.
    // Slow release = slow drift; energetic release = faster drift, without an artificial speed cap.
    const releaseGain = 0.095;
    draggedBlob.vx = dragVx * releaseGain;
    draggedBlob.vy = dragVy * releaseGain;
    if (Math.hypot(draggedBlob.vx, draggedBlob.vy) > 0.0001) {
      draggedBlob.baseAngle = Math.atan2(draggedBlob.vy, draggedBlob.vx);
    }
    const gesture = Math.min(1, dragSpeed / 1.15);
    const holdMs = 1200 + gesture * 1800;
    const blendMs = 2200 + gesture * 2600;
    draggedBlob.manualMomentumUntil = now + holdMs;
    draggedBlob.manualBlendUntil = now + holdMs + blendMs;
    draggedBlob.manualWarpMag = 0.24 + gesture * 0.54;
    draggedBlob.manualWarpUntil = now + holdMs;
    draggedBlob.manualWarpBlendUntil = now + holdMs + blendMs;
    draggedBlob.dragging = false;
    contain(draggedBlob);
    draggedBlob = null;
    dragPointerId = null;
    dragHistory = [];
    return true;
  }

  function draw(time) {
    const dt = Math.min(40, time - lastFrame);
    lastFrame = time;

    ctx.fillStyle = "#973320";
    ctx.fillRect(0, 0, width, height);

    scrollImpulseX *= 0.86;
    scrollImpulseY *= 0.86;
    scrollWarpBoost += (1 - scrollWarpBoost) * 0.06;
    pointer.impulse *= 0.84;
    pointer.strength += (pointer.impulse - pointer.strength) * 0.08;

    applySameFamilyRepulsion(dt);
    applyUniversalOverlapRule(dt);

    blobs.forEach((blob) => {
      update(blob, dt, time);
      organicPath(blob, time);
      ctx.fillStyle = blob.color;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  }

  addEventListener("resize", () => {
    syncPortraitCanvasPosition();
    resize();
  }, { passive: true });
  addEventListener("orientationchange", () => {
    syncPortraitCanvasPosition();
    resize();
    setTimeout(resize, 100);
    setTimeout(resize, 260);
    setTimeout(resize, 520);
    setTimeout(resize, 900);
  }, { passive: true });

  if (window.visualViewport) {
    let viewportResizeTimer = 0;
    visualViewport.addEventListener("resize", () => {
      clearTimeout(viewportResizeTimer);
      viewportResizeTimer = setTimeout(() => resize(), 120);
    }, { passive: true });
  }

  addEventListener("pointermove", (e) => {
    pointer.x = e.clientX + padX;
    pointer.y = e.clientY + padY;
    pointer.active = true;
    if (moveBlobDrag(e)) {
      pointer.impulse = 0;
      pointer.strength = 0;
      if (e.cancelable) e.preventDefault();
      return;
    }
    pointer.impulse = 1;
  }, { passive: false });

  addEventListener("pointerleave", (e) => {
    pointer.active = false;
    pointer.impulse = 0;
    if (e.pointerType !== "touch") endBlobDrag(e);
  });

  addEventListener("pointerdown", (e) => {
    if (startBlobDrag(e)) {
      if (e.cancelable) e.preventDefault();
      return;
    }
    if (e.target && e.target.closest && e.target.closest("a, button, input, textarea, select, .card")) return;
    handleBlankClick(e.clientX + padX, e.clientY + padY);
  }, { passive: false });

  addEventListener("pointerup", (e) => { endBlobDrag(e); }, { passive: true });
  addEventListener("pointercancel", (e) => { endBlobDrag(e); }, { passive: true });

  addEventListener("wheel", (e) => {
    if (draggedBlob) return;
    const immersive = document.body.classList.contains("lava-mode") || location.pathname.includes("/lava/");
    const modeScale = immersive ? 0.30 : 0.34;
    const dx = Math.max(-28, Math.min(28, e.deltaX * 0.20 * modeScale));
    const dy = Math.max(-28, Math.min(28, e.deltaY * 0.20 * modeScale));
    scrollImpulseX = Math.max(-34, Math.min(34, scrollImpulseX + dx));
    scrollImpulseY = Math.max(-34, Math.min(34, scrollImpulseY + dy));
    scrollWarpBoost = immersive ? 1.55 : 1.95;
  }, { passive: true });

  addEventListener("touchstart", (e) => {
    const t = e.touches && e.touches[0];
    if (!t) return;
    lastTouchX = t.clientX;
    lastTouchY = t.clientY;
  }, { passive: true });

  addEventListener("touchmove", (e) => {
    const t = e.touches && e.touches[0];
    if (!t || lastTouchX == null || lastTouchY == null) return;
    if (draggedBlob) {
      lastTouchX = t.clientX;
      lastTouchY = t.clientY;
      return;
    }
    const immersive = document.body.classList.contains("lava-mode") || location.pathname.includes("/lava/");
    const modeScale = immersive ? 0.34 : 0.38;
    const dx = Math.max(-28, Math.min(28, (lastTouchX - t.clientX) * 0.31 * modeScale));
    const dy = Math.max(-28, Math.min(28, (lastTouchY - t.clientY) * 0.31 * modeScale));
    scrollImpulseX = Math.max(-34, Math.min(34, scrollImpulseX + dx));
    scrollImpulseY = Math.max(-34, Math.min(34, scrollImpulseY + dy));
    scrollWarpBoost = immersive ? 1.85 : 2.55;
    lastTouchX = t.clientX;
    lastTouchY = t.clientY;
  }, { passive: true });

  const clearTouchScroll = () => {
    lastTouchX = null;
    lastTouchY = null;
  };
  addEventListener("touchend", clearTouchScroll, { passive: true });
  addEventListener("touchcancel", clearTouchScroll, { passive: true });

  // Browsers can throttle animation in hidden tabs.
  // When the page becomes visible again, advance the slow autonomous travel
  // so it does not feel as if the lava froze while you were away.
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      hiddenAt = Date.now();
      return;
    }

    if (hiddenAt) {
      const elapsed = Math.min(Date.now() - hiddenAt, 10 * 60 * 1000);

      blobs.forEach((blob) => {
        const angle =
          blob.baseAngle +
          Math.sin(performance.now() * blob.turnSpeed + blob.turnPhase) * 0.72;

        blob.x += Math.cos(angle) * blob.baseSpeed * elapsed;
        blob.y += Math.sin(angle) * blob.baseSpeed * elapsed;
        contain(blob);
      });

      hiddenAt = null;
      lastFrame = performance.now();
    }
  });

  syncPortraitCanvasPosition();
  resize();
  requestAnimationFrame(draw);

  function sampleRect(rect) {
    if (!rect || rect.width <= 0 || rect.height <= 0) return [];

    const xs = [0.18, 0.50, 0.82];
    const ys = [0.22, 0.50, 0.78];
    const samples = [];

    for (const fy of ys) {
      for (const fx of xs) {
        const cssX = Math.max(0, Math.min(width - 1, padX + rect.left + rect.width * fx));
        const cssY = Math.max(0, Math.min(height - 1, padY + rect.top + rect.height * fy));

        const x = Math.max(0, Math.min(canvas.width - 1, Math.round(cssX * dpr)));
        const y = Math.max(0, Math.min(canvas.height - 1, Math.round(cssY * dpr)));

        const px = ctx.getImageData(x, y, 1, 1).data;
        samples.push([px[0], px[1], px[2]]);
      }
    }

    return samples;
  }

  window.BeerBelgioLava = {
    burst,
    canvas,
    sampleRect,
    getBlobs() {
      return blobs.map((blob) => ({
        x: blob.x - padX,
        y: blob.y - padY,
        r: blob.r,
        color: blob.color,
        family: blob.family,
        phase: blob.phase,
        phase2: blob.phase2,
        wobble: blob.wobble
      }));
    }
  };
})();
