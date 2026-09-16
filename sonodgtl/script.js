(() => {
  const stage = document.getElementById("sd-stage");
  const shell = document.getElementById("sd-shell");
  if (!stage || !shell) return;
  const DESIGN_WIDTH = 1120;
  const BREAKPOINT = 980;

  function isFineDesktop() {
    return navigator.maxTouchPoints === 0
      && matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function updateScale() {
    if (!isFineDesktop() || innerWidth >= BREAKPOINT) {
      document.documentElement.classList.remove("sd-desktop-scaled");
      shell.style.removeProperty("transform");
      stage.style.removeProperty("height");
      return;
    }
    document.documentElement.classList.add("sd-desktop-scaled");
    const targetWidth = innerWidth * 0.80;
    const scale = targetWidth / DESIGN_WIDTH;
    shell.style.transform = `scale(${scale})`;
    requestAnimationFrame(() => {
      stage.style.height = `${Math.max(1, shell.getBoundingClientRect().height)}px`;
    });
  }

  updateScale();
  addEventListener("resize", updateScale, { passive: true });
})();
