/**
 * @typedef {object} ParsedCommand
 * @property {string} command - Lowercased command name (empty string for blank input).
 * @property {string[]} args - Positional arguments (flags excluded).
 * @property {Set<string>} flags - Short flags collected without their leading dash, e.g. "a" for "-a".
 * @property {string} raw - The original, untrimmed input line.
 */

/**
 * Tokenizes a raw terminal input line into a command name, positional
 * arguments, and short flags. Supports simple double-quoted segments so
 * arguments with spaces can be passed; no piping/redirection is supported.
 * @param {string} raw
 * @param {object} [opts]
 * @returns {ParsedCommand}
 */
export function parseCommandLine(raw, opts = {}) {
  const tokens = [];
  const regex = /"([^"]*)"|(\S+)/g;
  let match;
  while ((match = regex.exec(raw)) !== null) {
    tokens.push(match[1] !== undefined ? match[1] : match[2]);
  }

  const [commandToken, ...rest] = tokens;
  const args = [];
  const flags = new Set();

  for (const token of rest) {
    if (token.startsWith('-') && token.length > 1 && token !== '--') {
      for (const ch of token.slice(1)) flags.add(ch);
    } else {
      args.push(token);
    }
  }

  return {
    command: (commandToken || '').toLowerCase(),
    args,
    flags,
    raw,
  };
}
