import icons from "@iconify-json/lucide/icons.json" with { type: "json" };

const TYPE_ICON_NAMES = {
  note: "pencil",
  info: "info",
  tip: "circle-check",
  hint: "circle-check",
  success: "circle-check",
  check: "circle-check",
  done: "circle-check",
  question: "circle-question-mark",
  help: "circle-question-mark",
  faq: "circle-question-mark",
  warning: "triangle-alert",
  caution: "triangle-alert",
  attention: "triangle-alert",
  failure: "circle-x",
  fail: "circle-x",
  missing: "circle-x",
  danger: "circle-x",
  error: "circle-x",
  bug: "bug",
  example: "flask-conical",
  quote: "quote",
  cite: "quote",
};

const DEFAULT_ICON_NAME = "pencil";

// Iconify icon bodies are a small, well-formed subset of SVG (g/path/circle
// with only primitive attributes), so a tiny hand-rolled parser is enough —
// pulling in a full XML/HTML parser just for this would be overkill.
function parseSvgBody(body) {
  const tagRe = /<(\/?)([a-zA-Z]+)([^>]*?)(\/?)>/g;
  const attrRe = /([a-zA-Z-]+)="([^"]*)"/g;
  const root = { children: [] };
  const stack = [root];
  let match;

  while ((match = tagRe.exec(body))) {
    const [, closing, tagName, attrString, selfClosing] = match;

    if (closing) {
      stack.pop();
      continue;
    }

    const properties = {};
    let attrMatch;
    while ((attrMatch = attrRe.exec(attrString))) {
      const [, name, value] = attrMatch;
      properties[name === "class" ? "className" : name] = value;
    }

    const element = { type: "element", tagName, properties, children: [] };
    stack[stack.length - 1].children.push(element);

    if (!selfClosing) {
      stack.push(element);
    }
  }

  return root.children;
}

export function calloutIconHast(type) {
  const iconName = TYPE_ICON_NAMES[type] ?? DEFAULT_ICON_NAME;
  const icon = icons.icons[iconName];

  return {
    type: "element",
    tagName: "svg",
    properties: {
      className: ["callout-icon"],
      width: 16,
      height: 16,
      viewBox: `0 0 ${icons.width} ${icons.height}`,
      "aria-hidden": "true",
    },
    children: parseSvgBody(icon.body),
  };
}
