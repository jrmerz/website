import { experience } from './experience.js';
import { skillGroups } from './skills.js';
import {
  renderBio,
  renderJobOverview,
  renderProject,
  renderEducation,
  renderSkillGroup,
  renderPublications,
  renderContact,
} from './render.js';
import { profile } from './profile.js';

/**
 * Builds a file node.
 * @param {string} name
 * @param {() => string} render
 * @param {object} [opts]
 * @param {boolean} [opts.hidden]
 * @returns {import('../core/filesystem.js').FileNode}
 */
function file(name, render, opts = {}) {
  return { type: 'file', name, render, hidden: Boolean(opts.hidden) };
}

/**
 * Builds a directory node.
 * @param {string} name
 * @param {Object.<string, import('../core/filesystem.js').FileNode|import('../core/filesystem.js').DirNode>} children
 * @param {object} [opts]
 * @param {boolean} [opts.hidden]
 * @returns {import('../core/filesystem.js').DirNode}
 */
function dir(name, children, opts = {}) {
  return { type: 'dir', name, children, hidden: Boolean(opts.hidden) };
}

function findJob(slug) {
  const job = experience.find((j) => j.slug === slug);
  if (!job) throw new Error(`vfsTree: unknown job slug "${slug}"`);
  return job;
}

/**
 * Builds the directory of a job that has its own sub-folder (overview + one
 * file per named project).
 * @param {string} dirName
 * @param {string} jobSlug
 * @returns {import('../core/filesystem.js').DirNode}
 */
function buildJobDir(dirName, jobSlug) {
  const job = findJob(jobSlug);
  const children = { 'overview.txt': file('overview.txt', () => renderJobOverview(job)) };
  for (const project of job.projects || []) {
    children[`${project.slug}.txt`] = file(`${project.slug}.txt`, () => renderProject(project));
  }
  return dir(dirName, children);
}

/**
 * Builds a single flat file for a job with no sub-projects (just role/notes).
 * @param {string} fileName
 * @param {string} jobSlug
 * @returns {import('../core/filesystem.js').FileNode}
 */
function buildJobFile(fileName, jobSlug) {
  const job = findJob(jobSlug);
  return file(fileName, () => renderJobOverview(job));
}

/**
 * Builds a flat file combining two concurrent jobs (used for the 2005
 * Google Summer of Code / Feedlounge entries).
 * @param {string} fileName
 * @param {string[]} jobSlugs
 * @returns {import('../core/filesystem.js').FileNode}
 */
function buildCombinedJobFile(fileName, jobSlugs) {
  const jobs = jobSlugs.map(findJob);
  return file(fileName, () => jobs.map(renderJobOverview).join('\n\n'));
}

/** Flattened `/projects` directory: one file per named project across all jobs. */
function buildProjectsDir() {
  const children = {};
  for (const job of experience) {
    for (const project of job.projects || []) {
      children[`${project.slug}.txt`] = file(`${project.slug}.txt`, () => renderProject(project));
    }
  }
  return dir('projects', children);
}

/** Builds the `/skills` directory, one file per skill group. */
function buildSkillsDir() {
  const children = {};
  for (const group of skillGroups) {
    children[`${group.slug}.txt`] = file(`${group.slug}.txt`, () => renderSkillGroup(group));
  }
  return dir('skills', children);
}

/**
 * Builds the full virtual filesystem tree backing the terminal's `ls`/`cd`/
 * `cat`/`pwd` navigation.
 * @returns {import('../core/filesystem.js').DirNode} The root directory node.
 */
export function buildVfsTree() {
  return dir('', {
    about: dir('about', { 'bio.txt': file('bio.txt', renderBio) }),
    experience: dir('experience', {
      'ucd-library': buildJobDir('ucd-library', 'ucd-library'),
      'new-forests': buildJobDir('new-forests', 'new-forests'),
      'ucd-watershed-cstars': buildJobDir('ucd-watershed-cstars', 'ucd-watershed-cstars-contracts'),
      'stone-cobra.txt': buildJobFile('stone-cobra.txt', 'stone-cobra-2012'),
      'cstars-2006-2012.txt': buildJobFile('cstars-2006-2012.txt', 'cstars-2006'),
      'gsoc-feedlounge-2005.txt': buildCombinedJobFile('gsoc-feedlounge-2005.txt', [
        'gsoc-2005',
        'feedlounge-2005',
      ]),
    }),
    education: dir('education', { 'ucdavis.txt': file('ucdavis.txt', renderEducation) }),
    skills: buildSkillsDir(),
    projects: buildProjectsDir(),
    publications: dir('publications', { 'list.txt': file('list.txt', renderPublications) }),
    contact: dir('contact', { 'info.txt': file('info.txt', renderContact) }),
    '.secrets': dir(
      '.secrets',
      {
        'orcid.txt': file(
          'orcid.txt',
          () =>
            `ORCID iD: ${profile.orcid}\nScopus Author ID: ${profile.scopusId}\n\nCongratulations, you found the hidden directory. There is no prize. There is only metadata.`,
        ),
      },
      { hidden: true },
    ),
  });
}
