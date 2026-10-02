import { profile } from '../data/profile.js';
import {
  renderBio,
  renderResume,
  renderAllSkills,
  renderProjectsFlat,
  renderPublications,
  renderContact,
  renderEducation,
} from '../data/render.js';

/**
 * Registers the top-level "jump straight to content" alias commands, so
 * visitors don't need to cd/cat through the virtual filesystem to see the
 * main sections.
 * @param {import('../core/commandRegistry.js').CommandRegistry} registry
 * @returns {void}
 */
export function registerAliasCommands(registry) {
  registry.register({
    name: 'whoami',
    summary: 'whoami  -  who is running this terminal',
    run({ terminal }) {
      terminal.printLine(`${profile.name} - ${profile.title}`, { className: 'accent' });
      terminal.printLine(profile.location);
      terminal.printLine('');
      terminal.printLine(profile.resumeSummary);
      terminal.printLine('');
      terminal.printLine(
        "[meta] Technically, I (an AI) wrote this description of a human. Neither of us knows how to feel about it.",
        { className: 'boot' },
      );
      terminal.printLine("Run 'about' for the longer version.", { className: 'boot' });
    },
  });

  registry.register({
    name: 'about',
    summary: 'about  -  full bio',
    run({ terminal }) {
      terminal.print(renderBio());
    },
  });

  registry.register({
    name: 'resume',
    aliases: ['experience'],
    summary: 'resume  -  full work history',
    run({ terminal }) {
      terminal.print(renderResume());
    },
  });

  registry.register({
    name: 'skills',
    summary: 'skills  -  technical skills',
    run({ terminal }) {
      terminal.print(renderAllSkills());
    },
  });

  registry.register({
    name: 'projects',
    summary: 'projects  -  named projects across every role',
    run({ terminal }) {
      terminal.print(renderProjectsFlat());
    },
  });

  registry.register({
    name: 'publications',
    aliases: ['papers'],
    summary: 'publications  -  peer-reviewed publications',
    run({ terminal }) {
      terminal.print(renderPublications());
    },
  });

  registry.register({
    name: 'education',
    summary: 'education  -  degree and school',
    run({ terminal }) {
      terminal.print(renderEducation());
    },
  });

  registry.register({
    name: 'contact',
    summary: 'contact  -  how to reach me',
    run({ terminal }) {
      terminal.print(renderContact());
    },
  });
}
