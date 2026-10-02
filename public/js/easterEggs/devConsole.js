/**
 * Prints a one-time styled joke to the browser devtools console, for
 * visitors curious enough to open it.
 * @returns {void}
 */
export function printDevConsoleMessage() {
  console.log(
    '%cYou opened devtools. Respect.',
    'color:#2be8ff;font-size:16px;font-family:monospace;font-weight:bold;',
  );
  console.log(
    '%cThis entire site was pair-programmed with Claude (Anthropic).',
    'color:#33ff66;font-family:monospace;',
  );
  console.log(
    '%cIf you are reading this, you are more curious than most recruiters.',
    'color:#33ff66;font-family:monospace;',
  );
  console.log(
    '%c(His actual code is less chatty than this console message.)',
    'color:#888;font-family:monospace;font-style:italic;',
  );
}
