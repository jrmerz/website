import { renderBanner } from '../effects/asciiArt.js';

/** Column the dot leader fills to, so every status word lines up in the monospace font. */
const STATUS_COLUMN = 76;

/**
 * Builds a "label....... status" boot log line, padding the dot leader so
 * the status word lands on the same column regardless of label length.
 * Omit `status` for a trailing-ellipsis line with no status word.
 * @param {string} label
 * @param {string} [status]
 * @returns {string}
 */
function statusLine(label, status = '') {
  const dots = '.'.repeat(Math.max(3, STATUS_COLUMN - label.length));
  return status ? `${label}${dots} ${status}` : `${label}${dots}`;
}

const BOOT_LINES = [
  'JRMERZ-OS v2.6 (c) 1983-2026 -- all rights reserved, most wrongs too',
  statusLine('Initializing virtual machine', 'OK'),
  statusLine('Tallying hours spent programming, reading, testing, iterating, studying', 'ongoing'),
  statusLine('Loading consciousness', 'done'),
  statusLine('Initializing AI overlord', 'done'),
  statusLine('[WARN] Productivity gains detected. Human job security','uncertain.'),
  statusLine('Brewing coffee', 'critical, in progress'),
  statusLine('Starting terminal shell'),
];

/**
 * Pauses, resolving immediately if the boot sequence has been fast-forwarded.
 * @param {number} ms
 * @param {{skipped: boolean}} state
 * @returns {Promise<void>}
 */
function wait(ms, state) {
  return new Promise((resolve) => {
    if (state.skipped) {
      resolve();
      return;
    }
    setTimeout(resolve, ms);
  });
}

/**
 * Plays the boot sequence: a fake system log, an ASCII name banner, and a
 * short orientation message, then hands focus to the live prompt. Pressing
 * any key or clicking fast-forwards the remaining delays.
 * @param {import('./terminal.js').Terminal} terminal
 * @param {object} [opts]
 * @returns {Promise<void>}
 */
export async function runBootSequence(terminal, opts = {}) {
  const state = { skipped: false };
  const skip = () => {
    state.skipped = true;
  };
  window.addEventListener('keydown', skip, { once: true });
  window.addEventListener('pointerdown', skip, { once: true });

  for (const line of BOOT_LINES) {
    terminal.printLine(line, { className: 'boot' });
    await wait(180, state);
  }

  await wait(300, state);
  terminal.print(renderBanner('JUSTIN MERZ'), { className: 'banner' });
  terminal.printLine('');
  terminal.printLine('Senior Technology Architect. Several thousand cups of coffee deep.', {
    className: 'boot',
  });
  terminal.printLine('');
  await wait(200, state);
  terminal.printLine("Type 'help' to see available commands, or just start poking around.", {
    className: 'boot',
  });
  terminal.printLine('(Hint: this is a filesystem. ls, cd, cat all work. So do a few things that are not real commands.)', {
    className: 'boot',
  });
  terminal.printLine('');

  window.removeEventListener('keydown', skip);
  window.removeEventListener('pointerdown', skip);
  terminal.focusInput();
}
