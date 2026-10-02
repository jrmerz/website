const GRID_SIZE = 20;
const CELL_PX = 18;
const TICK_MS = 110;

const DIRECTIONS = {
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  w: { x: 0, y: -1 },
  s: { x: 0, y: 1 },
  a: { x: -1, y: 0 },
  d: { x: 1, y: 0 },
};

/**
 * A self-contained, DOS-flavored Snake game rendered on a `<canvas>`. Owns
 * its own game loop and keyboard listener while active; call `start()` to
 * begin and `stop()` to tear everything down (e.g. when the host terminal
 * command exits).
 */
export class SnakeGame {
  /**
   * @param {object} opts
   * @param {HTMLCanvasElement} opts.canvas
   * @param {() => void} opts.onExit - Called when the player quits (Esc/q).
   */
  constructor(opts = {}) {
    const { canvas, onExit = () => {} } = opts;
    this.canvas = canvas;
    this.canvas.width = GRID_SIZE * CELL_PX;
    this.canvas.height = GRID_SIZE * CELL_PX;
    this.ctx = canvas.getContext('2d');
    this.onExit = onExit;
    this._keyHandler = (e) => this._onKeyDown(e);
    this._intervalId = null;
    this._phase = 'intro';
  }

  /** Begins the intro screen and attaches the keyboard listener. @returns {void} */
  start() {
    this._resetState();
    this._phase = 'intro';
    window.addEventListener('keydown', this._keyHandler);
    this._draw();
  }

  /** Tears down the game loop and keyboard listener. @returns {void} */
  stop() {
    if (this._intervalId) clearInterval(this._intervalId);
    window.removeEventListener('keydown', this._keyHandler);
  }

  /** Resets snake position, direction, food, and score for a fresh run. @returns {void} */
  _resetState() {
    const mid = Math.floor(GRID_SIZE / 2);
    this.snake = [
      { x: mid, y: mid },
      { x: mid - 1, y: mid },
      { x: mid - 2, y: mid },
    ];
    this.direction = { x: 1, y: 0 };
    this.nextDirection = { x: 1, y: 0 };
    this.score = 0;
    this._placeFood();
  }

  /** Picks a new food cell that isn't currently occupied by the snake. @returns {void} */
  _placeFood() {
    let cell;
    do {
      cell = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    } while (this.snake.some((s) => s.x === cell.x && s.y === cell.y));
    this.food = cell;
  }

  /**
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  _onKeyDown(e) {
    const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;

    if (key === 'Escape' || key === 'q') {
      e.preventDefault();
      this.stop();
      this.onExit();
      return;
    }

    if (this._phase === 'intro' || this._phase === 'gameover') {
      if (key === 'r' || this._phase === 'intro') {
        e.preventDefault();
        this._resetState();
        this._phase = 'playing';
        this._intervalId = setInterval(() => this._tick(), TICK_MS);
        this._draw();
      }
      return;
    }

    const dir = DIRECTIONS[key];
    if (!dir) return;
    e.preventDefault();
    const isReversal = dir.x === -this.direction.x && dir.y === -this.direction.y;
    if (!isReversal) this.nextDirection = dir;
  }

  /** Advances the simulation by one step: move, check collisions/food, redraw. @returns {void} */
  _tick() {
    this.direction = this.nextDirection;
    const head = {
      x: this.snake[0].x + this.direction.x,
      y: this.snake[0].y + this.direction.y,
    };

    const hitWall = head.x < 0 || head.y < 0 || head.x >= GRID_SIZE || head.y >= GRID_SIZE;
    const hitSelf = this.snake.some((s) => s.x === head.x && s.y === head.y);
    if (hitWall || hitSelf) {
      this._gameOver();
      return;
    }

    this.snake.unshift(head);
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 1;
      this._placeFood();
    } else {
      this.snake.pop();
    }

    this._draw();
  }

  /** Stops the loop and switches to the game-over screen. @returns {void} */
  _gameOver() {
    clearInterval(this._intervalId);
    this._intervalId = null;
    this._phase = 'gameover';
    this._draw();
  }

  /** Renders the current phase (intro / playing / gameover) to the canvas. @returns {void} */
  _draw() {
    const { ctx, canvas } = this;
    ctx.fillStyle = '#0a0e0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (this._phase === 'intro') {
      this._drawCenteredText(['SNAKE', '', 'press any key to start', 'arrows/wasd to move, esc to quit']);
      return;
    }

    ctx.fillStyle = '#ff2bd6';
    ctx.fillRect(this.food.x * CELL_PX, this.food.y * CELL_PX, CELL_PX - 1, CELL_PX - 1);

    ctx.fillStyle = '#33ff66';
    for (const seg of this.snake) {
      ctx.fillRect(seg.x * CELL_PX, seg.y * CELL_PX, CELL_PX - 1, CELL_PX - 1);
    }

    ctx.fillStyle = '#2be8ff';
    ctx.font = '14px monospace';
    ctx.fillText(`score: ${this.score}`, 4, 14);

    if (this._phase === 'gameover') {
      this._drawCenteredText(['GAME OVER', `score: ${this.score}`, 'press r to restart, esc to quit']);
    }
  }

  /**
   * Draws a vertically centered block of text over the current frame.
   * @param {string[]} lines
   * @returns {void}
   */
  _drawCenteredText(lines) {
    const { ctx, canvas } = this;
    ctx.fillStyle = 'rgba(10, 14, 10, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = '#33ff66';
    ctx.font = '16px monospace';
    ctx.textAlign = 'center';
    const startY = canvas.height / 2 - ((lines.length - 1) * 20) / 2;
    lines.forEach((line, i) => {
      ctx.fillText(line, canvas.width / 2, startY + i * 20);
    });
    ctx.textAlign = 'left';
  }
}
