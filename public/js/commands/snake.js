import { SnakeGame } from '../games/snakeGame.js';

/**
 * Registers the `snake`/`play` command, which suspends normal terminal
 * input, shows the game layer, and runs a Snake session until the player
 * quits (Esc/q) or closes the tab.
 * @param {import('../core/commandRegistry.js').CommandRegistry} registry
 * @param {object} opts
 * @param {HTMLElement} opts.gameLayerEl - Container toggled visible while the game runs.
 * @param {HTMLCanvasElement} opts.gameCanvasEl - Canvas the game renders onto.
 * @returns {void}
 */
export function registerSnakeCommand(registry, opts = {}) {
  const { gameLayerEl, gameCanvasEl } = opts;

  const definition = {
    name: 'snake',
    aliases: ['play'],
    summary: 'snake  -  a small DOS-flavored diversion',
    run({ terminal }) {
      terminal.printLine('Launching SNAKE.EXE ...', { className: 'boot' });
      terminal.suspendInput();
      gameLayerEl.hidden = false;

      const game = new SnakeGame({
        canvas: gameCanvasEl,
        onExit: () => {
          gameLayerEl.hidden = true;
          terminal.resumeInput();
          terminal.printLine(`Back to the shell. Final score: ${game.score}`, { className: 'boot' });
        },
      });
      game.start();
    },
  };

  registry.register(definition);
}
