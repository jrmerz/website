/**
 * Registers filesystem navigation commands (ls, cd, pwd, cat, clear) and the
 * `help` command that lists every public command.
 * @param {import('../core/commandRegistry.js').CommandRegistry} registry
 * @returns {void}
 */
export function registerNavCommands(registry) {
  registry.register({
    name: 'ls',
    summary: 'ls [-a] [path]  -  list directory contents',
    run({ terminal, vfs, parsed }) {
      const target = parsed.args[0];
      const result = vfs.list(target, { all: parsed.flags.has('a') });
      if (!result.ok) {
        terminal.printLine(result.error, { className: 'error' });
        return;
      }
      if (result.entries.length === 0) return;
      const rendered = result.entries
        .map((e) => (e.type === 'dir' ? `${e.name}/` : e.name))
        .join('  ');
      terminal.printLine(rendered);
    },
  });

  registry.register({
    name: 'cd',
    summary: 'cd <path>  -  change directory',
    run({ terminal, vfs, parsed }) {
      const target = parsed.args[0] || '/';
      const result = vfs.changeDirectory(target);
      if (!result.ok) terminal.printLine(result.error, { className: 'error' });
    },
  });

  registry.register({
    name: 'pwd',
    summary: 'pwd  -  print working directory',
    run({ terminal, vfs }) {
      terminal.printLine(vfs.getCurrentPath());
    },
  });

  registry.register({
    name: 'cat',
    aliases: ['more', 'less'],
    summary: 'cat <path>  -  print file contents',
    run({ terminal, vfs, parsed }) {
      if (!parsed.args[0]) {
        terminal.printLine('cat: missing file operand', { className: 'error' });
        return;
      }
      const result = vfs.readFile(parsed.args[0]);
      if (!result.ok) {
        terminal.printLine(result.error, { className: 'error' });
        return;
      }
      terminal.print(result.content);
    },
  });

  registry.register({
    name: 'clear',
    summary: 'clear  -  clear the screen',
    run({ terminal }) {
      terminal.clear();
    },
  });

  registry.register({
    name: 'help',
    summary: 'help  -  list available commands',
    run({ terminal }) {
      terminal.printLine('Navigation:', { className: 'accent' });
      terminal.printLine('  ls [-a] [path], cd <path>, pwd, cat <path>, clear');
      terminal.printLine('');
      terminal.printLine('Shortcuts (jump straight to content):', { className: 'accent' });
      for (const def of registry.listPublic()) {
        if (['ls', 'cd', 'pwd', 'cat', 'clear', 'help'].includes(def.name)) continue;
        terminal.printLine(`  ${def.summary}`);
      }
      terminal.printLine('');
      terminal.printLine("Try 'ls' to look around, or type a command above.", {
        className: 'boot',
      });
    },
  });
}
