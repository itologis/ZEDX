// Inline code in prose is marked with [[double brackets]]. The content may
// itself contain balanced single brackets — items[0], int[], [1, 2, 3] — so a
// plain regex cannot find the end of the marker. This scanner tracks bracket
// depth and only accepts ]] at depth zero as the closing pair.
export function parseInlineCode(input) {
  const text = String(input ?? "");
  const parts = [];
  let buffer = "";
  let unclosed = 0;
  let index = 0;

  while (index < text.length) {
    if (text.startsWith("[[", index)) {
      let scan = index + 2;
      let depth = 0;
      let closedAt = -1;

      while (scan < text.length) {
        const char = text[scan];

        if (char === "[") {
          depth += 1;
        } else if (char === "]") {
          if (depth > 0) {
            depth -= 1;
          } else if (text[scan + 1] === "]") {
            closedAt = scan;
            break;
          }
        }

        scan += 1;
      }

      if (closedAt !== -1) {
        if (buffer) {
          parts.push({ code: false, text: buffer });
          buffer = "";
        }
        parts.push({ code: true, text: text.slice(index + 2, closedAt) });
        index = closedAt + 2;
        continue;
      }

      unclosed += 1;
    }

    buffer += text[index];
    index += 1;
  }

  if (buffer) parts.push({ code: false, text: buffer });

  return { parts, unclosed };
}

export default parseInlineCode;
