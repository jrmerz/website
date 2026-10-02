import { Terminal } from './core/terminal.js';
import { CommandRegistry } from './core/commandRegistry.js';
import { VirtualFileSystem } from './core/filesystem.js';
import { runBootSequence } from './core/boot.js';
import { buildVfsTree } from './data/vfsTree.js';
import { registerNavCommands } from './commands/nav.js';
import { registerAliasCommands } from './commands/aliases.js';
import { registerFunCommands, createPhraseFallbackHandler } from './commands/fun.js';
import { registerSnakeCommand } from './commands/snake.js';
import { initMenuBar } from './ui/menuBar.js';
import { initCrtEffects } from './effects/crtEffect.js';
import { installKonamiListener } from './effects/konami.js';
import { printDevConsoleMessage } from './easterEggs/devConsole.js';

/**
 * Bootstraps the whole terminal application: builds the virtual filesystem,
 * registers every command, wires the DOM, and kicks off the boot sequence.
 * @returns {void}
 */
function main() {
  const vfs = new VirtualFileSystem({ root: buildVfsTree() });
  const registry = new CommandRegistry();

  registerNavCommands(registry);
  registerAliasCommands(registry);
  registerFunCommands(registry);
  registerSnakeCommand(registry, {
    gameLayerEl: document.getElementById('game-layer'),
    gameCanvasEl: document.getElementById('game-canvas'),
  });

  const terminal = new Terminal({
    screenEl: document.getElementById('screen'),
    inputEl: document.getElementById('cmd-input'),
    promptEl: document.getElementById('prompt-label'),
    vfs,
    registry,
    fallbackHandler: createPhraseFallbackHandler(),
  });

  initMenuBar({ menubarEl: document.getElementById('menubar'), terminal });
  initCrtEffects();
  installKonamiListener();
  printDevConsoleMessage();

  runBootSequence(terminal);
}

main();
