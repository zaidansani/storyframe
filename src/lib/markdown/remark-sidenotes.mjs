const SIDENOTE_RE = /\^\[([^\]]+)\]/g;

function splitTextNode(node, counter) {
  const { value } = node;
  SIDENOTE_RE.lastIndex = 0;

  if (!SIDENOTE_RE.test(value)) return null;
  SIDENOTE_RE.lastIndex = 0;

  const result = [];
  let lastIndex = 0;
  let match;

  while ((match = SIDENOTE_RE.exec(value))) {
    if (match.index > lastIndex) {
      result.push({ type: "text", value: value.slice(lastIndex, match.index) });
    }

    const n = counter.next();
    const id = `sidenote-${counter.id}-${n}`;
    const noteText = match[1];

    result.push({
      type: "sidenote",
      children: [],
      data: {
        hName: "span",
        hProperties: { className: ["sidenote-wrapper"] },
        hChildren: [
          {
            type: "element",
            tagName: "button",
            properties: {
              type: "button",
              className: ["sidenote-ref"],
              "aria-expanded": "false",
              "aria-controls": id,
              "data-sidenote-trigger": "",
            },
            children: [
              {
                type: "element",
                tagName: "sup",
                properties: {},
                children: [{ type: "text", value: String(n) }],
              },
            ],
          },
          {
            type: "element",
            tagName: "span",
            properties: { className: ["sidenote"], id, role: "note" },
            children: [
              {
                type: "element",
                tagName: "span",
                properties: { className: ["sidenote-number"] },
                children: [{ type: "text", value: String(n) }],
              },
              { type: "text", value: noteText },
            ],
          },
        ],
      },
    });

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < value.length) {
    result.push({ type: "text", value: value.slice(lastIndex) });
  }

  return result;
}

function walk(node, counter) {
  if (!node || !Array.isArray(node.children)) return;

  for (let i = 0; i < node.children.length; i++) {
    const child = node.children[i];

    if (child.type === "text") {
      const replacement = splitTextNode(child, counter);
      if (replacement) {
        node.children.splice(i, 1, ...replacement);
        i += replacement.length - 1;
        continue;
      }
    }

    walk(child, counter);
  }
}

export function remarkSidenotes() {
  let fileCount = 0;

  return (tree) => {
    fileCount += 1;
    let n = 0;
    const counter = {
      id: fileCount,
      next() {
        n += 1;
        return n;
      },
    };

    walk(tree, counter);
  };
}
