const HEADER_RE = /^(#{1,2})\s+(.*)$/;
const BULLET_RE = /^(\s*)[-*]\s+(.*)$/;
const BOLD_RE = /\*\*(.+?)\*\*/g;

/**
 * Renders inline `**bold**` spans within a line of text as DOM nodes,
 * leaving everything else as plain text nodes.
 * @param {string} text
 * @returns {DocumentFragment}
 */
function renderInline(text) {
  const fragment = document.createDocumentFragment();
  let lastIndex = 0;
  for (const match of text.matchAll(BOLD_RE)) {
    const [full, inner] = match;
    if (match.index > lastIndex) {
      fragment.appendChild(document.createTextNode(text.slice(lastIndex, match.index)));
    }
    const strong = document.createElement('strong');
    strong.textContent = inner;
    fragment.appendChild(strong);
    lastIndex = match.index + full.length;
  }
  if (lastIndex < text.length) {
    fragment.appendChild(document.createTextNode(text.slice(lastIndex)));
  }
  return fragment;
}

/**
 * Builds a bullet line's DOM: a fixed-width marker plus a separate wrapping
 * text span, so that CSS flex can give wrapped continuation lines a hanging
 * indent instead of running back out to the far left edge.
 * @param {string} rest - The bullet's text, after the `-`/`*` marker.
 * @returns {DocumentFragment}
 */
function renderBullet(rest) {
  const fragment = document.createDocumentFragment();
  const marker = document.createElement('span');
  marker.className = 'bullet-marker';
  marker.textContent = '▸';
  const textSpan = document.createElement('span');
  textSpan.className = 'bullet-text';
  textSpan.appendChild(renderInline(rest));
  fragment.appendChild(marker);
  fragment.appendChild(textSpan);
  return fragment;
}

/**
 * Parses one line of the small subset of markdown used in this site's
 * content (`#`/`##` headers, `-`/`*` bullets, inline `**bold**`) into a CSS
 * class to apply to the line wrapper, a DOM fragment of its content, and an
 * optional indent width (in characters) to carry over as left padding.
 * Lines that match nothing are returned as plain text with no extra class.
 * @param {string} text
 * @returns {{className: string, fragment: DocumentFragment, indent: number}}
 */
export function parseMarkdownLine(text) {
  const headerMatch = text.match(HEADER_RE);
  if (headerMatch) {
    const className = headerMatch[1].length === 1 ? 'md-h1' : 'md-h2';
    return { className, fragment: renderInline(headerMatch[2]), indent: 0 };
  }

  const bulletMatch = text.match(BULLET_RE);
  if (bulletMatch) {
    const [, indent, rest] = bulletMatch;
    return { className: 'md-bullet', fragment: renderBullet(rest), indent: indent.length };
  }

  return { className: '', fragment: renderInline(text), indent: 0 };
}
