export function rehypeSectionize() {
  return (tree) => {
    const children = tree.children;
    const result = [];
    let current = null;

    for (const node of children) {
      if (node.type === "element" && node.tagName === "h1") {
        current = {
          type: "element",
          tagName: "section",
          properties: { className: ["article-section"] },
          children: [node],
        };
        result.push(current);
      } else if (current) {
        current.children.push(node);
      } else {
        result.push(node);
      }
    }

    tree.children = result;
  };
}
