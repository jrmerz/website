const OVERDRIVE_DURATION_MS = 15000;

/**
 * Wires up the CRT visual effects: disables flicker animation for visitors
 * who prefer reduced motion, and listens for the `konami` event to flip the
 * page into a time-limited "neon overdrive" palette.
 * @returns {void}
 */
export function initCrtEffects() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.add('reduced-motion');
  }

  window.addEventListener('konami', () => {
    document.documentElement.setAttribute('data-theme', 'overdrive');
    setTimeout(() => {
      document.documentElement.removeAttribute('data-theme');
    }, OVERDRIVE_DURATION_MS);
  });
}
