import { parseCommandLine } from './parser.js';
import { resolveCompletion, splitLastToken, splitPathToken } from './completion.js';

const MAX_HISTORY = 100;

/**
 * Owns the terminal's DOM: the scrollback output region and the input line.
 * Handles command history recall, dispatches submitted lines to a
 * CommandRegistry, and exposes a suspend/resume mechanism so full-screen
 * sub-programs (like the Snake game) can take over the keyboard.
 */
export class Terminal {
  /**
   * @param {object} opts
   * @param {HTMLElement} opts.screenEl - Container that scrollback lines are appended to.
   * @param {HTMLInputElement} opts.inputEl - The visible command-line input field.
   * @param {HTMLElement} opts.promptEl - Element showing the current prompt label (e.g. path).
   * @param {import('./filesystem.js').VirtualFileSystem} opts.vfs
   * @param {import('./commandRegistry.js').CommandRegistry} opts.registry
   * @param {(raw: string) => (string|null)} [opts.fallbackHandler] - Called when no registered
   *   command matches; may return a response string (e.g. a joke-phrase match) or null to fall
   *   through to the standard "command not found" message.
   */
  constructor(opts = {}) {
    const { screenEl, inputEl, promptEl, vfs, registry, fallbackHandler = () => null } = opts;
    this.screenEl = screenEl;
    this.inputEl = inputEl;
    this.promptEl = promptEl;
    this.vfs = vfs;
    this.registry = registry;
    this.fallbackHandler = fallbackHandler;

    /** @type {string[]} */
    this.history = [];
    this.historyIndex = -1;
    this.suspended = false;

    this.inputEl.addEventListener('keydown', (e) => this._onKeyDown(e));
    this.updatePromptLabel();
  }

  /**
   * Refreshes the visible prompt label to reflect the VFS's current directory.
   * @returns {void}
   */
  updatePromptLabel() {
    if (this.promptEl) {
      const path = this.vfs.getCurrentPath() === '/' ? '~' : `~${this.vfs.getCurrentPath()}`;
      this.promptEl.textContent = `guest@jrmerz:${path}$`;
    }
  }

  /**
   * Appends a line of text to the scrollback.
   * @param {string} [text]
   * @param {object} [opts]
   * @param {string} [opts.className] - CSS class for styling (e.g. "error", "accent").
   * @returns {void}
   */
  printLine(text = '', opts = {}) {
    const line = document.createElement('div');
    line.className = `line${opts.className ? ` ${opts.className}` : ''}`;
    line.textContent = text;
    this.screenEl.appendChild(line);
    this.scrollToBottom();
  }

  /**
   * Prints a multi-line block of text, one scrollback line per input line.
   * @param {string} text
   * @param {object} [opts]
   * @returns {void}
   */
  print(text, opts = {}) {
    for (const line of text.split('\n')) this.printLine(line, opts);
  }

  /** Clears all scrollback content. @returns {void} */
  clear() {
    this.screenEl.innerHTML = '';
  }

  /** Scrolls the screen container to its latest content. @returns {void} */
  scrollToBottom() {
    this.screenEl.scrollTop = this.screenEl.scrollHeight;
  }

  /** Focuses the input field, if the terminal isn't currently suspended. @returns {void} */
  focusInput() {
    if (!this.suspended) this.inputEl.focus();
  }

  /**
   * Suspends normal terminal input handling so an external program (e.g. a
   * game) can take over the keyboard. The input field is hidden and blurred.
   * @returns {void}
   */
  suspendInput() {
    this.suspended = true;
    this.inputEl.blur();
    this.inputEl.disabled = true;
  }

  /**
   * Resumes normal terminal input handling after a call to suspendInput().
   * @returns {void}
   */
  resumeInput() {
    this.suspended = false;
    this.inputEl.disabled = false;
    this.focusInput();
  }

  /**
   * @param {KeyboardEvent} e
   * @returns {void}
   */
  _onKeyDown(e) {
    if (this.suspended) return;

    if (e.key === 'Enter') {
      const raw = this.inputEl.value;
      this.inputEl.value = '';
      this._submit(raw);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      this._recallHistory(-1);
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      this._recallHistory(1);
      return;
    }

    if (e.key === 'Tab') {
      e.preventDefault();
      this._handleTabComplete();
      return;
    }
  }

  /**
   * Handles Tab-completion for the input line: completes a command name when
   * typing the first word, or a filesystem path (relative to the VFS's
   * current directory) for any later word. A single match is completed in
   * full; multiple matches extend the input to their longest common prefix,
   * or are listed in the scrollback if nothing further can be inferred.
   * @returns {void}
   */
  _handleTabComplete() {
    const { prefix, token, isFirstToken } = splitLastToken(this.inputEl.value);

    if (isFirstToken) {
      const names = this.registry.listPublic().map((def) => def.name);
      this._applyCompletion({ matches: resolveCompletion(names, token), prefix, dirPart: '', partial: token });
      return;
    }

    const { dirPart, partial } = splitPathToken(token);
    const result = this.vfs.list(dirPart || undefined, { all: partial.startsWith('.') });
    if (!result.ok) return;

    const names = result.entries.map((e) => e.name);
    const { matches, commonPrefix } = resolveCompletion(names, partial);
    if (matches.length === 1) {
      const entry = result.entries.find((e) => e.name === matches[0]);
      const suffix = entry.type === 'dir' ? '/' : ' ';
      this.inputEl.value = prefix + dirPart + matches[0] + suffix;
      this._moveCaretToEnd();
      return;
    }
    const displayNames = result.entries
      .filter((e) => matches.includes(e.name))
      .map((e) => (e.type === 'dir' ? `${e.name}/` : e.name));
    this._applyCompletion({ matches: { matches, commonPrefix }, prefix, dirPart, partial, displayNames });
  }

  /**
   * Shared tail end of completion: extends the input to a longer common
   * prefix when possible, or lists the candidates when the match is already
   * as specific as it can get.
   * @param {object} opts
   * @param {{matches: string[], commonPrefix: string}} opts.matches
   * @param {string} opts.prefix - Input text before the token being completed.
   * @param {string} opts.dirPart - Path prefix to re-prepend (empty for command names).
   * @param {string} opts.partial - The partial text that was being completed.
   * @param {string[]} [opts.displayNames] - Candidate names formatted for display (e.g. with a
   *   trailing `/` for directories); defaults to the raw match names.
   * @returns {void}
   */
  _applyCompletion(opts) {
    const { matches, prefix, dirPart, partial, displayNames } = opts;
    if (matches.matches.length === 0) return;

    if (matches.matches.length === 1) {
      this.inputEl.value = prefix + dirPart + matches.matches[0] + ' ';
      this._moveCaretToEnd();
      return;
    }

    if (matches.commonPrefix.length > partial.length) {
      this.inputEl.value = prefix + dirPart + matches.commonPrefix;
      this._moveCaretToEnd();
      return;
    }

    this.printLine((displayNames || matches.matches).join('  '), { className: 'boot' });
    this.scrollToBottom();
  }

  /** Moves the input caret to the end of its current value. @returns {void} */
  _moveCaretToEnd() {
    const len = this.inputEl.value.length;
    this.inputEl.setSelectionRange(len, len);
  }

  /**
   * @param {number} delta -1 for older, +1 for newer.
   * @returns {void}
   */
  _recallHistory(delta) {
    if (this.history.length === 0) return;
    const next = this.historyIndex + delta;
    this.historyIndex = Math.max(0, Math.min(this.history.length, next));
    this.inputEl.value = this.history[this.historyIndex] ?? '';
  }

  /**
   * Publicly runs a command line exactly as if it had been typed and
   * submitted - echoes it, dispatches it, and updates history. Used by the
   * clickable menu bar so it shares one code path with keyboard input.
   * @param {string} raw
   * @returns {Promise<void>}
   */
  async runCommand(raw) {
    await this._submit(raw);
  }

  /**
   * Handles a submitted command line: echoes it, dispatches it, and resets
   * history navigation.
   * @param {string} raw
   * @returns {Promise<void>}
   */
  async _submit(raw) {
    const path = this.vfs.getCurrentPath() === '/' ? '~' : `~${this.vfs.getCurrentPath()}`;
    this.printLine(`guest@jrmerz:${path}$ ${raw}`, { className: 'echo' });

    if (raw.trim() !== '') {
      this.history.push(raw);
      if (this.history.length > MAX_HISTORY) this.history.shift();
    }
    this.historyIndex = this.history.length;

    await this.dispatch(raw);
    this.updatePromptLabel();
    this.scrollToBottom();
  }

  /**
   * Parses and runs a raw command line against the registry, falling back to
   * the phrase matcher and finally a "command not found" message.
   * @param {string} raw
   * @returns {Promise<void>}
   */
  async dispatch(raw) {
    const parsed = parseCommandLine(raw);
    if (parsed.command === '') return;

    const def = this.registry.get(parsed.command);
    if (def) {
      await def.run({ terminal: this, vfs: this.vfs, parsed });
      return;
    }

    const fallback = this.fallbackHandler(raw);
    if (fallback !== null && fallback !== undefined) {
      this.print(fallback);
      return;
    }

    this.printLine(`command not found: ${parsed.command} (try 'help')`, { className: 'error' });
  }
}
