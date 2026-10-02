const SEQUENCE = [
  'ArrowUp',
  'ArrowUp',
  'ArrowDown',
  'ArrowDown',
  'ArrowLeft',
  'ArrowRight',
  'ArrowLeft',
  'ArrowRight',
  'b',
  'a',
];

/**
 * Shared mutable state tracking whether the Konami code has been entered
 * this session. Read by commands (e.g. `neofetch`) that only unlock after
 * the code is triggered.
 */
export const konamiState = { unlocked: false };

/**
 * Listens globally for the classic Konami code (up up down down left right
 * left right B A) and dispatches a `konami` CustomEvent on the window when
 * it's entered. Marks `konamiState.unlocked = true` as a side effect.
 * @returns {void}
 */
export function installKonamiListener() {
  let buffer = [];
  window.addEventListener('keydown', (e) => {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
    buffer.push(key);
    if (buffer.length > SEQUENCE.length) buffer.shift();
    if (buffer.length === SEQUENCE.length && buffer.every((k, i) => k === SEQUENCE[i])) {
      konamiState.unlocked = true;
      window.dispatchEvent(new CustomEvent('konami'));
      buffer = [];
    }
  });
}
