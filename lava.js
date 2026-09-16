/* BeerBelgio Lava Engine — V0.39
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
      wobble: 0.055 + Math.random() * 0.06,
      morphBase: 0.20 + Math.random() * 0.07,
      deformMag: 0.24 + Math.random() * 0.05,
      deformDir: angle,
      deformTargetDir: angle,
      dragging: false,
      forceX: 0,
      forceY: 0
    };
  }

  function resize(force = false) {
    syncPortraitCanvasPosition();
    // V0.37: portrait iPhone can use an absolute document-layer canvas;
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

      const breathing =
        1
        + wobbleNow * Math.sin(a * 3 + blob.phase + time * 0.00018)
        + wobbleNow * 0.62 * Math.sin(a * 5 - blob.phase2 + time * 0.00012)
        + ambientMorph * 0.08 * Math.sin(a * 2 + blob.phase2 * 0.6);

      const directional = Math.cos(a - deformDir);
      const stretch = 1
        + ambientMorph * 0.18 * Math.sin((a - deformDir) * 2 + blob.phase * 0.55)
        + ambientMorph * 0.12 * Math.sin((a - deformDir) * 3 - blob.phase2 * 0.42)
        + deformMag * 0.34 * directional
        - deformMag * 0.20 * Math.cos((a - deformDir) * 2)
        + deformMag * 0.12 * Math.sin((a - deformDir) * 3 + blob.phase2 * 0.55)
        + deformMag * 0.07 * Math.sin((a - deformDir) * 4 - blob.phase * 0.45);

      radii.push(blob.r * Math.max(0.62, Math.min(1.46, breathing * stretch)));
    }

    // Low-pass the radial contour so deformation stays liquid instead of pointy/clipped.
    for (let pass = 0; pass < 3; pass++) {
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

    blob.phase += dt * 0.000070 * motionScale;
    blob.phase2 -= dt * 0.000052 * motionScale;
    blob.forceX = 0;
    blob.forceY = 0;

    if (blob.dragging) {
      blob.deformTargetDir = Math.atan2(dragVy || blob.vy, dragVx || blob.vx);
      blob.deformDir += angleDelta(blob.deformDir, blob.deformTargetDir) * Math.min(0.22, 0.006 * dt);
      blob.deformMag = Math.max(blob.morphBase || 0.22, Math.min(0.52, 0.27 + Math.hypot(dragVx, dragVy) * 4));
      return;
    }

    // The direction evolves very slowly, like an autonomous lava lamp.
    const desiredAngle =
      blob.baseAngle +
      Math.sin(time * blob.turnSpeed + blob.turnPhase) * 0.72;

    const desiredVx = Math.cos(desiredAngle) * blob.baseSpeed * motionScale;
    const desiredVy = Math.sin(desiredAngle) * blob.baseSpeed * motionScale;

    // After interactions the blob slowly settles back into its own autonomous drift.
    const settle = 0.00086 * dt;
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
    blob.morphBase = Math.max(0.18, Math.min(0.34, blob.morphBase));
    blob.deformTargetDir += Math.sin(time * 0.00016 + blob.phase2 * 0.8) * 0.000075 * dt;

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

    // Scroll should be perceptible without permanently accelerating the blobs.
    // It temporarily nudges their position and organic phase, then decays.
    const scrollNormX = Math.tanh(scrollImpulseX / 5.8);
    const scrollNormY = Math.tanh(scrollImpulseY / 5.8);
    const scrollMagnitude = Math.min(1, Math.hypot(scrollNormX, scrollNormY));
    const scrollFx = (scrollNormX * 0.00054
      + Math.sin(blob.turnPhase + time * 0.0007) * scrollMagnitude * 0.00010) * dt;
    const scrollFy = scrollNormY * 0.00054 * dt;
    blob.vx += scrollFx;
    blob.vy += scrollFy;
    // Feed a controlled fraction of scroll energy into the deformation system.
    // This gives touch scrolling the same liquid warping visible with a wheel/trackpad.
    blob.forceX += scrollFx * 0.085;
    blob.forceY += scrollFy * 0.085;
    blob.phase += (scrollNormY + scrollNormX * 0.45) * 0.00030 * dt;
    blob.phase2 -= (scrollNormY - scrollNormX * 0.35) * 0.00026 * dt;

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
      blob.phase += heaterStrength * 0.00007 * dt;
    }

    const forceMag = Math.hypot(blob.forceX, blob.forceY);
    if (forceMag > 1e-6) {
      blob.deformTargetDir = Math.atan2(blob.forceY, blob.forceX);
    }
    // Never snap the deformation direction. The old direct atan2 assignment could
    // visually rotate a whole blob in one frame when the dominant force changed.
    const turnBlend = Math.min(0.16, 0.0038 * dt);
    blob.deformDir += angleDelta(blob.deformDir, blob.deformTargetDir) * turnBlend;
    const morphFloor = blob.morphBase || 0.22;
    blob.deformMag = Math.min(
      0.62,
      Math.max(
        morphFloor,
        (blob.deformMag || morphFloor) * Math.pow(0.997, dt) + forceMag * 62
      )
    );

    // Only excess interaction energy is damped; base drift remains alive.
    blob.vx *= Math.pow(0.99984, dt);
    blob.vy *= Math.pow(0.99984, dt);

    blob.x += blob.vx * dt;
    blob.y += blob.vy * dt;

    contain(blob);
  }

  // Still an impulse only. True fragmentation/re-forming comes later.
  function burst(x, y) {
    blobs.forEach((blob) => {
      const dx = blob.x - x;
      const dy = blob.y - y;
      const dist = Math.hypot(dx, dy) || 1;
      const force = Math.max(0, 1 - dist / Math.max(width, height));

      const fx = (dx / dist) * force * 0.15;
      const fy = (dy / dist) * force * 0.15;
      blob.vx += fx;
      blob.vy += fy;
      blob.forceX += fx;
      blob.forceY += fy;
      blob.phase += force * 0.8;
      blob.phase2 -= force * 0.5;
    });
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
    dragVx = (x - dragLastX) / dt;
    dragVy = (y - dragLastY) / dt;
    draggedBlob.x = x;
    draggedBlob.y = y;
    draggedBlob.deformTargetDir = Math.atan2(dragVy || 0.0001, dragVx || 0.0001);
    dragLastX = x;
    dragLastY = y;
    dragLastT = now;
    return true;
  }

  function endBlobDrag(e) {
    if (!draggedBlob || (e && e.pointerId !== dragPointerId)) return false;
    const maxRelease = 0.045;
    const scale = 0.055;
    draggedBlob.vx = Math.max(-maxRelease, Math.min(maxRelease, dragVx * scale));
    draggedBlob.vy = Math.max(-maxRelease, Math.min(maxRelease, dragVy * scale));
    draggedBlob.baseAngle = Math.atan2(draggedBlob.vy || 0.0001, draggedBlob.vx || 0.0001);
    draggedBlob.dragging = false;
    contain(draggedBlob);
    draggedBlob = null;
    dragPointerId = null;
    return true;
  }

  function draw(time) {
    const dt = Math.min(40, time - lastFrame);
    lastFrame = time;

    ctx.fillStyle = "#973320";
    ctx.fillRect(0, 0, width, height);

    scrollImpulseX *= 0.86;
    scrollImpulseY *= 0.86;
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
    setTimeout(resize, 120);
    setTimeout(resize, 420);
  }, { passive: true });

  addEventListener("pointermove", (e) => {
    pointer.x = e.clientX + padX;
    pointer.y = e.clientY + padY;
    pointer.active = true;
    pointer.impulse = 1;
    if (moveBlobDrag(e) && e.cancelable) e.preventDefault();
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
    burst(e.clientX + padX, e.clientY + padY);
  }, { passive: false });

  addEventListener("pointerup", (e) => { endBlobDrag(e); }, { passive: true });
  addEventListener("pointercancel", (e) => { endBlobDrag(e); }, { passive: true });

  addEventListener("wheel", (e) => {
    const dx = Math.max(-34, Math.min(34, e.deltaX * 0.24));
    const dy = Math.max(-34, Math.min(34, e.deltaY * 0.24));
    scrollImpulseX = Math.max(-40, Math.min(40, scrollImpulseX + dx));
    scrollImpulseY = Math.max(-40, Math.min(40, scrollImpulseY + dy));
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
    const dx = Math.max(-34, Math.min(34, (lastTouchX - t.clientX) * 0.34));
    const dy = Math.max(-34, Math.min(34, (lastTouchY - t.clientY) * 0.34));
    scrollImpulseX = Math.max(-40, Math.min(40, scrollImpulseX + dx));
    scrollImpulseY = Math.max(-40, Math.min(40, scrollImpulseY + dy));
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
