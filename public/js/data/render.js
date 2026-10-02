import { profile } from './profile.js';
import { experience } from './experience.js';
import { education } from './education.js';
import { skillGroups } from './skills.js';
import { publications } from './publications.js';

/**
 * Formats a single role's date range, tolerating jobs with unspecified dates
 * (e.g. a contract role with no start/end on record).
 * @param {{title: string, start: string, end: string}} role
 * @returns {string} Formatted "Title, Start - End" line.
 */
function renderRole(role) {
  const range = role.start || role.end ? `${role.start} - ${role.end}` : '';
  return range ? `${role.title}, ${range}` : role.title;
}

/**
 * Renders a single project's name, link, and highlight bullets as plain text.
 * @param {import('./experience.js').Project} project
 * @returns {string}
 */
export function renderProject(project) {
  const lines = [`## ${project.name}${project.url ? `  (${project.url})` : ''}`];
  for (const h of project.highlights) lines.push(`  - ${h}`);
  return lines.join('\n');
}

/**
 * Renders a full job entry: org, role history, notes, and nested projects.
 * @param {import('./experience.js').Job} job
 * @returns {string}
 */
export function renderJob(job) {
  const lines = [];
  const header = job.division ? `${job.org} - ${job.division}` : job.org;
  lines.push(`# ${header}`);
  lines.push(job.location);
  for (const role of job.roles) lines.push(renderRole(role));
  lines.push('');
  if (job.projects) {
    for (const project of job.projects) {
      lines.push(renderProject(project));
      lines.push('');
    }
  }
  if (job.notes) {
    for (const note of job.notes) lines.push(`  * ${note}`);
  }
  return lines.join('\n').trimEnd();
}

/**
 * Renders a job's role history and freeform notes, without its nested
 * project breakdown (each project gets its own file in the VFS).
 * @param {import('./experience.js').Job} job
 * @returns {string}
 */
export function renderJobOverview(job) {
  const lines = [];
  const header = job.division ? `${job.org} - ${job.division}` : job.org;
  lines.push(`# ${header}`);
  lines.push(job.location);
  for (const role of job.roles) lines.push(renderRole(role));
  if (job.notes) {
    lines.push('');
    for (const note of job.notes) lines.push(`  * ${note}`);
  }
  if (job.projects) {
    lines.push('');
    lines.push(`(see ./${job.projects.map((p) => p.slug).join(', ./')} for project detail)`);
  }
  return lines.join('\n');
}

/**
 * Renders the full reverse-chronological resume (every job).
 * @returns {string}
 */
export function renderResume() {
  return experience.map(renderJob).join('\n\n');
}

/**
 * Renders a flattened list of every named project across all jobs, for the
 * `/projects` view and `projects` alias command.
 * @returns {string}
 */
export function renderProjectsFlat() {
  const sections = [];
  for (const job of experience) {
    if (!job.projects) continue;
    for (const project of job.projects) {
      sections.push(`${renderProject(project)}\n  (${job.org})`);
    }
  }
  return sections.join('\n\n');
}

/**
 * Renders the terminal-voiced bio/about text.
 * @returns {string}
 */
export function renderBio() {
  return [
    `${profile.name} - ${profile.title}`,
    `${profile.location}`,
    '',
    ...profile.aboutParagraphs
  ].join('\n');
}

/**
 * Renders the education record, including informal "activities" easter-egg detail.
 * @returns {string}
 */
export function renderEducation() {
  return education
    .map((e) => {
      const lines = [
        `${e.school} - ${e.location}`,
        `${e.degree}, ${e.field}`,
        `Graduated: ${e.graduated}`,
      ];
      if (e.activities) lines.push(`Activities: ${e.activities.join(', ')}`);
      return lines.join('\n');
    })
    .join('\n\n');
}

/**
 * Renders one named skill group ("Architecture & Systems", etc.) as text.
 * @param {import('./skills.js').SkillGroup} group
 * @returns {string}
 */
export function renderSkillGroup(group) {
  const lines = [`# ${group.title}`];
  for (const c of group.categories) {
    lines.push(`## ${c.category}`);
    for (const item of c.items) lines.push(`  - ${item}`);
  }
  return lines.join('\n');
}

/**
 * Renders every skill group plus LinkedIn's top-ranked skills.
 * @returns {string}
 */
export function renderAllSkills() {
  const lines = skillGroups.map(renderSkillGroup);
  lines.push(`# LinkedIn top skills\n  ${profile.topSkills.join(' - ')}`);
  return lines.join('\n\n');
}

/**
 * Renders the full publication list.
 * @returns {string}
 */
export function renderPublications() {
  return publications
    .map((p) => {
      const lines = [`${p.authors} (${p.year}). ${p.title}`, `  ${p.venue}`];
      if (p.url) lines.push(`  ${p.url}`);
      return lines.join('\n');
    })
    .join('\n\n');
}

/**
 * Renders contact/identity info.
 * @returns {string}
 */
export function renderContact() {
  const [primaryEmail, ...otherEmails] = profile.emails;
  const lines = [`email:    ${primaryEmail}`];
  for (const email of otherEmails) lines.push(`          ${email}`);
  lines.push(`github:   ${profile.github}`);
  lines.push(`linkedin: ${profile.linkedin}`);
  lines.push(`orcid:    ${profile.orcid}`);
  return lines.join('\n');
}

/**
 * Renders a single random fun fact, for the `fortune` command and similar.
 * @returns {string}
 */
export function renderRandomFunFact() {
  const i = Math.floor(Math.random() * profile.funFacts.length);
  return profile.funFacts[i];
}
