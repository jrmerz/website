/**
 * Wires up the clickable menu bar: the mobile hamburger toggle, tap-to-expand
 * dropdowns on touch/mobile, and dispatching each `[data-command]` button's
 * command through the terminal exactly as if it had been typed.
 * @param {object} opts
 * @param {HTMLElement} opts.menubarEl
 * @param {import('../core/terminal.js').Terminal} opts.terminal
 * @returns {void}
 */
export function initMenuBar(opts = {}) {
  const { menubarEl, terminal } = opts;

  const toggle = menubarEl.querySelector('#menubar-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      menubarEl.classList.toggle('open');
    });
  }

  for (const item of menubarEl.querySelectorAll('.menubar-item')) {
    const trigger = item.querySelector('.menubar-trigger');
    if (!trigger) continue;
    trigger.addEventListener('click', (e) => {
      if (window.matchMedia('(max-width: 700px)').matches) {
        e.preventDefault();
        const wasExpanded = item.classList.contains('expanded');
        for (const other of menubarEl.querySelectorAll('.menubar-item')) {
          other.classList.remove('expanded');
        }
        if (!wasExpanded) item.classList.add('expanded');
      }
    });
  }

  for (const button of menubarEl.querySelectorAll('[data-command]')) {
    button.addEventListener('click', () => {
      const command = button.dataset.command;
      terminal.runCommand(command);
      menubarEl.classList.remove('open');
      terminal.focusInput();
    });
  }
}
