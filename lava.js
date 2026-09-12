/* BeerBelgio Lava Engine — V0.4
   Slow autonomous base motion + external perturbations.
   Proper fragmentation / tilt / shake come in the dedicated lava session.
*/

(() => {
  const canvas = document.getElementById("lava-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d", { alpha: false });
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  let width = innerWidth;
  let height = innerHeight;
  let dpr = Math.min(devicePixelRatio || 1, 2);
  let wheelImpulse = 0;
  let lastFrame = performance.now();
  let hiddenAt = null;

  const blobs = Array.from({ length: 10 }, (_, i) => makeBlob(i));

  function makeBlob(i) {
    const radiusBase = Math.min(width, height) * 0.19;
    const r = radiusBase * (0.925 + Math.random() * 0.15); // total spread ~15%
    const angle = Math.random() * Math.PI * 2;
    const baseSpeed = (0.0025 + Math.random() * 0.0027) * 1.15; // V0.27: a little slower / more viscous

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
      forceX: 0,
      forceY: 0
    };
  }

  function resize() {
    const vv = window.visualViewport;
    const coarse = matchMedia("(pointer: coarse)").matches;
    width = coarse && vv ? vv.width : innerWidth;
    height = coarse && vv ? vv.height : innerHeight;
    dpr = Math.min(devicePixelRatio || 1, 2);

    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }


  function getHeaterZone() {
    const stage = document.getElementById("site-stage");
    const stageRect = stage ? stage.getBoundingClientRect() : null;

    // Core idea: a lamp at the bottom-middle, roughly half the width of the cards.
    const baseWidth = stageRect && stageRect.width > 0
      ? stageRect.width * 0.52
      : width * 0.23;

    return {
      cx: width * 0.5,
      halfW: baseWidth * 0.5,
      y: height * 0.90,
      h: height * 0.24
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
    const coarse = matchMedia("(pointer: coarse)").matches;
    const standaloneLava = location.pathname.includes("/lava/");
    const immersiveMobile = coarse && (document.body.classList.contains("lava-mode") || standaloneLava);
    const edge = immersiveMobile
      ? blob.r * (1.12 + Math.min(0.28, (blob.deformMag || 0) * 0.25))
      : blob.r * 0.35;
    const bounce = 0.82;

    const minX = immersiveMobile ? edge : -edge;
    const maxX = immersiveMobile ? width - edge : width + edge;
    const minY = immersiveMobile ? edge : -edge;
    const maxY = immersiveMobile ? height - edge : height + edge;

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
    const currentFx = Math.sin(time * 0.00022 + blob.turnPhase + blob.y * 0.0042) * 0.000052 * dt;
    const currentFy = Math.cos(time * 0.00018 + blob.turnPhase * 1.2 + blob.x * 0.0036) * 0.000045 * dt;
    blob.vx += currentFx;
    blob.vy += currentFy;
    blob.forceX += currentFx * 0.78;
    blob.forceY += currentFy * 0.78;

    // Persistent liquid memory: the shape keeps wandering instead of snapping back to round.
    blob.morphBase += Math.sin(time * 0.00011 + blob.turnPhase * 1.7) * 0.000010 * dt;
    blob.morphBase = Math.max(0.18, Math.min(0.34, blob.morphBase));
    blob.deformDir += Math.sin(time * 0.00016 + blob.phase2 * 0.8) * 0.00012 * dt;

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
    const wheelNorm = Math.tanh(wheelImpulse / 5.8);
    const scrollFx = Math.sin(blob.turnPhase + time * 0.0007) * wheelNorm * 0.00022 * dt;
    const scrollFy = wheelNorm * 0.00054 * dt;
    blob.vx += scrollFx;
    blob.vy += scrollFy;
    blob.phase += wheelNorm * 0.00036 * dt;
    blob.phase2 -= wheelNorm * 0.00030 * dt;

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
      blob.deformDir = Math.atan2(blob.forceY, blob.forceX);
    }
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

  function draw(time) {
    const dt = Math.min(40, time - lastFrame);
    lastFrame = time;

    ctx.fillStyle = "#973320";
    ctx.fillRect(0, 0, width, height);

    wheelImpulse *= 0.86;
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

  addEventListener("resize", resize);
  addEventListener("orientationchange", resize);
  if (window.visualViewport) visualViewport.addEventListener("resize", resize, { passive: true });

  addEventListener("pointermove", (e) => {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.active = true;
    pointer.impulse = 1;
  }, { passive: true });

  addEventListener("pointerleave", () => {
    pointer.active = false;
    pointer.impulse = 0;
  });

  addEventListener("pointerdown", (e) => {
    burst(e.clientX, e.clientY);
  }, { passive: true });

  addEventListener("wheel", (e) => {
    const delta = Math.max(-34, Math.min(34, e.deltaY * 0.24));
    wheelImpulse = Math.max(-40, Math.min(40, wheelImpulse + delta));
  }, { passive: true });

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

  resize();
  requestAnimationFrame(draw);

  function sampleRect(rect) {
    if (!rect || rect.width <= 0 || rect.height <= 0) return [];

    const xs = [0.18, 0.50, 0.82];
    const ys = [0.22, 0.50, 0.78];
    const samples = [];

    for (const fy of ys) {
      for (const fx of xs) {
        const cssX = Math.max(0, Math.min(width - 1, rect.left + rect.width * fx));
        const cssY = Math.max(0, Math.min(height - 1, rect.top + rect.height * fy));

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
        x: blob.x,
        y: blob.y,
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
