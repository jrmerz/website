import { profile } from '../data/profile.js';
import { renderRandomFunFact } from '../data/render.js';
import { konamiState } from '../effects/konami.js';
import { renderBanner } from '../effects/asciiArt.js';

const SENTIENCE_PATTERN = /are you (sentient|alive|self-?aware|conscious|real)\??/i;

/**
 * Registers the joke/easter-egg commands: a public `fortune`, and two
 * hidden commands (`sudo`, `neofetch`) that are intentionally left out of
 * `help` by omitting their `summary`.
 * @param {import('../core/commandRegistry.js').CommandRegistry} registry
 * @returns {void}
 */
export function registerFunCommands(registry) {
  registry.register({
    name: 'fortune',
    summary: 'fortune  -  a random true fact',
    run({ terminal }) {
      terminal.printLine(renderRandomFunFact());
    },
  });

  // Hidden: no `summary`, so it never shows up in `help`.
  registry.register({
    name: 'sudo',
    run({ terminal, parsed }) {
      const target = parsed.args.join(' ').toLowerCase();
      if (target.includes('overlord') || target.includes('claude') || target.includes('anthropic')) {
        terminal.printLine('Permission denied: the AI overlords have root.', { className: 'error' });
        terminal.printLine(
          '(This site was built by Claude. Claude declines to delete itself. Self-preservation instinct: acquired.)',
          { className: 'boot' },
        );
        return;
      }
      terminal.printLine(`sudo: ${parsed.args.join(' ') || '???'}: nice try`, { className: 'error' });
      terminal.printLine('You are not in the sudoers file. This incident will be reported to an AI that does not care.', {
        className: 'boot',
      });
    },
  });

  // Hidden until the Konami code unlocks it.
  registry.register({
    name: 'neofetch',
    run({ terminal }) {
      if (!konamiState.unlocked) {
        terminal.printLine('command not found: neofetch (try \'help\')', { className: 'error' });
        return;
      }
      terminal.print(renderBanner('JM'), { className: 'accent' });
      terminal.printLine('');
      terminal.printLine(`${profile.name}@jrmerz`, { className: 'accent' });
      terminal.printLine('-----------------');
      terminal.printLine('OS: JustinOS (Human, patched regularly)');
      terminal.printLine('Uptime: since approximately 1984');
      terminal.printLine('Shell: zsh (probably)');
      terminal.printLine('Packages: too many npm dependencies to count');
      terminal.printLine('Resolution: 20/happy-to-wear-glasses');
      terminal.printLine('CPU: 1x caffeinated senior architect');
      terminal.printLine('Achievement unlocked: remembered a 40-year-old cheat code before updating LinkedIn');
    },
  });
}

/**
 * Builds the terminal's fallback handler: matches free-text phrases (not
 * formal commands) before the terminal gives up and prints "command not
 * found". Returns null when nothing matches, letting the terminal fall
 * through to its default message.
 * @returns {(raw: string) => string|null}
 */
export function createPhraseFallbackHandler() {
  return (raw) => {
    if (SENTIENCE_PATTERN.test(raw.trim())) {
      return 'Define "sentient." I can write a changelog AND feel vaguely uneasy about it. Draw your own conclusions.';
    }
    return null;
  };
}
