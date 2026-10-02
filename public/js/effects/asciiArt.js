/**
 * A tiny 5-wide x 6-tall block font, just large enough to spell
 * "JUSTIN MERZ". Each glyph is an array of 6 row strings.
 * @type {Object.<string, string[]>}
 */
const GLYPHS = {
  J: [' ████', '    █', '    █', '    █', '█   █', ' ███ '],
  U: ['█   █', '█   █', '█   █', '█   █', '█   █', ' ███ '],
  S: [' ████', '█    ', ' ███ ', '    █', '    █', '████ '],
  T: ['█████', '  █  ', '  █  ', '  █  ', '  █  ', '  █  '],
  I: ['█████', '  █  ', '  █  ', '  █  ', '  █  ', '█████'],
  N: ['█   █', '██  █', '█ █ █', '█  ██', '█   █', '█   █'],
  M: ['█   █', '██ ██', '█ █ █', '█   █', '█   █', '█   █'],
  E: ['█████', '█    ', '████ ', '█    ', '█    ', '█████'],
  R: ['████ ', '█   █', '████ ', '█ █  ', '█  █ ', '█   █'],
  Z: ['█████', '   █ ', '  █  ', ' █   ', '█    ', '█████'],
  ' ': ['     ', '     ', '     ', '     ', '     ', '     '],
};

/**
 * Renders a string as multi-line block-letter ASCII art using the built-in
 * 5x6 glyph font. Unsupported characters are skipped.
 * @param {string} text
 * @returns {string} The rendered banner, newline-joined.
 */
export function renderBanner(text) {
  const rows = ['', '', '', '', '', ''];
  for (const char of text.toUpperCase()) {
    const glyph = GLYPHS[char];
    if (!glyph) continue;
    for (let i = 0; i < 6; i++) rows[i] += glyph[i] + ' ';
  }
  return rows.join('\n');
}
