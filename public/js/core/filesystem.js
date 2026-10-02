/**
 * @typedef {object} FileNode
 * @property {'file'} type
 * @property {string} name
 * @property {() => string} render - Lazily produces the file's text contents.
 * @property {boolean} [hidden] - Hidden from a plain `ls` (shown with `ls -a`).
 */

/**
 * @typedef {object} DirNode
 * @property {'dir'} type
 * @property {string} name
 * @property {Object.<string, FileNode|DirNode>} children
 * @property {boolean} [hidden]
 */

/**
 * A simple in-memory virtual filesystem supporting unix-flavored navigation
 * (ls/cd/cat/pwd) over a tree of plain objects. Paths use `/` separators,
 * `.` and `..` segments, and both absolute and relative forms.
 */
export class VirtualFileSystem {
  /**
   * @param {object} opts
   * @param {DirNode} opts.root - The root directory node.
   */
  constructor(opts = {}) {
    const { root } = opts;
    this.root = root;
    /** @type {string[]} Segments of the current working directory, from root. */
    this.cwd = [];
  }

  /**
   * Splits a path string into normalized segments relative to the given base.
   * @param {string} inputPath
   * @param {string[]} base - Segments to resolve relative paths against.
   * @returns {string[]} Resolved absolute segments (may be invalid; not yet checked against the tree).
   */
  _resolveSegments(inputPath, base) {
    const start = inputPath.startsWith('/') ? [] : [...base];
    const parts = inputPath.split('/').filter((p) => p !== '' && p !== '.');
    for (const part of parts) {
      if (part === '..') {
        start.pop();
      } else {
        start.push(part);
      }
    }
    return start;
  }

  /**
   * Walks the tree to find the node at the given absolute segments.
   * @param {string[]} segments
   * @returns {FileNode|DirNode|null} The node, or null if the path doesn't exist.
   */
  _findNode(segments) {
    let node = this.root;
    for (const seg of segments) {
      if (node.type !== 'dir' || !node.children[seg]) return null;
      node = node.children[seg];
    }
    return node;
  }

  /**
   * Resolves a path string (absolute or relative to cwd) to a node.
   * @param {string} inputPath
   * @param {object} [opts]
   * @returns {FileNode|DirNode|null}
   */
  resolvePath(inputPath, opts = {}) {
    const segments = this._resolveSegments(inputPath, this.cwd);
    return this._findNode(segments);
  }

  /**
   * Lists the contents of a directory (defaults to cwd).
   * @param {string} [inputPath]
   * @param {object} [opts]
   * @param {boolean} [opts.all] - Include hidden entries.
   * @returns {{ok: true, entries: Array<{name: string, type: string}>}|{ok: false, error: string}}
   */
  list(inputPath, opts = {}) {
    const { all = false } = opts;
    const node = inputPath ? this.resolvePath(inputPath) : this._findNode(this.cwd);
    if (!node) return { ok: false, error: `ls: ${inputPath}: No such file or directory` };
    if (node.type !== 'dir') return { ok: false, error: `ls: ${inputPath}: Not a directory` };
    const entries = Object.values(node.children)
      .filter((child) => all || !child.hidden)
      .map((child) => ({ name: child.name, type: child.type }));
    return { ok: true, entries };
  }

  /**
   * Changes the current working directory.
   * @param {string} inputPath
   * @returns {{ok: true}|{ok: false, error: string}}
   */
  changeDirectory(inputPath) {
    const segments = this._resolveSegments(inputPath, this.cwd);
    const node = this._findNode(segments);
    if (!node) return { ok: false, error: `cd: ${inputPath}: No such file or directory` };
    if (node.type !== 'dir') return { ok: false, error: `cd: ${inputPath}: Not a directory` };
    this.cwd = segments;
    return { ok: true };
  }

  /**
   * Reads (renders) a file's contents.
   * @param {string} inputPath
   * @returns {{ok: true, content: string}|{ok: false, error: string}}
   */
  readFile(inputPath) {
    const node = this.resolvePath(inputPath);
    if (!node) return { ok: false, error: `cat: ${inputPath}: No such file or directory` };
    if (node.type !== 'file') return { ok: false, error: `cat: ${inputPath}: Is a directory` };
    return { ok: true, content: node.render() };
  }

  /**
   * Returns the current working directory as a `/`-prefixed path string.
   * @returns {string}
   */
  getCurrentPath() {
    return '/' + this.cwd.join('/');
  }
}
