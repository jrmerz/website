/**
 * Finds every candidate that starts with the given partial text, plus the
 * longest common prefix across those candidates (useful for extending the
 * user's input as far as it can go before it becomes ambiguous).
 * @param {string[]} candidates
 * @param {string} partial
 * @returns {{matches: string[], commonPrefix: string}}
 */
export function resolveCompletion(candidates, partial) {
  const matches = candidates.filter((c) => c.startsWith(partial));
  let commonPrefix = partial;
  if (matches.length > 1) {
    commonPrefix = matches.reduce((acc, name) => {
      let i = 0;
      while (i < acc.length && i < name.length && acc[i] === name[i]) i++;
      return acc.slice(0, i);
    });
  }
  return { matches, commonPrefix };
}

/**
 * Splits a raw input line into everything before the final whitespace-
 * delimited token and that final token itself - the token tab-completion
 * operates on.
 * @param {string} value
 * @returns {{prefix: string, token: string, isFirstToken: boolean}}
 */
export function splitLastToken(value) {
  const lastSpaceIdx = value.lastIndexOf(' ');
  return {
    prefix: value.slice(0, lastSpaceIdx + 1),
    token: value.slice(lastSpaceIdx + 1),
    isFirstToken: lastSpaceIdx === -1,
  };
}

/**
 * Splits a path-like token into its directory portion (everything up to and
 * including the final `/`) and the partial segment being completed.
 * @param {string} token
 * @returns {{dirPart: string, partial: string}}
 */
export function splitPathToken(token) {
  const lastSlashIdx = token.lastIndexOf('/');
  return {
    dirPart: lastSlashIdx >= 0 ? token.slice(0, lastSlashIdx + 1) : '',
    partial: lastSlashIdx >= 0 ? token.slice(lastSlashIdx + 1) : token,
  };
}
