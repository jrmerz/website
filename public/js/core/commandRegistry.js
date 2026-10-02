/**
 * @typedef {object} CommandContext
 * @property {import('./terminal.js').Terminal} terminal
 * @property {import('./filesystem.js').VirtualFileSystem} vfs
 * @property {import('../core/parser.js').ParsedCommand} parsed
 */

/**
 * @typedef {object} CommandDefinition
 * @property {string} name - Primary command name.
 * @property {string[]} [aliases] - Additional names that run the same command.
 * @property {string} [summary] - One-line description shown by `help`. Omit to hide from `help`.
 * @property {(ctx: CommandContext) => void|Promise<void>} run
 */

/**
 * Holds the set of registered terminal commands and dispatches parsed input
 * to the matching handler.
 */
export class CommandRegistry {
  constructor() {
    /** @type {Map<string, CommandDefinition>} */
    this.commands = new Map();
  }

  /**
   * Registers a command (and any aliases) in the registry.
   * @param {CommandDefinition} definition
   * @returns {void}
   */
  register(definition) {
    this.commands.set(definition.name, definition);
    for (const alias of definition.aliases || []) {
      this.commands.set(alias, definition);
    }
  }

  /**
   * Looks up a command by name or alias.
   * @param {string} name
   * @returns {CommandDefinition|undefined}
   */
  get(name) {
    return this.commands.get(name);
  }

  /**
   * Returns the unique, publicly documented commands (those with a summary),
   * for use by `help`.
   * @returns {CommandDefinition[]}
   */
  listPublic() {
    const seen = new Set();
    const result = [];
    for (const def of this.commands.values()) {
      if (!def.summary || seen.has(def.name)) continue;
      seen.add(def.name);
      result.push(def);
    }
    return result.sort((a, b) => a.name.localeCompare(b.name));
  }
}
