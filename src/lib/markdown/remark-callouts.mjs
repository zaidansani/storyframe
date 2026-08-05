import { calloutIconHast } from "../content/callout-icons.mjs";

const CALLOUT_RE = /^\[!(\w+)\]([+-])?\s*(.*)$/;

function capitalize(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}

function transformCallout(node) {
    const firstParagraph = node.children[0];
    if (!firstParagraph || firstParagraph.type !== "paragraph") return;

    const firstText = firstParagraph.children[0];
    if (!firstText || firstText.type !== "text") return;

    const newlineIndex = firstText.value.indexOf("\n");
    const headerLine =
        newlineIndex === -1
            ? firstText.value
            : firstText.value.slice(0, newlineIndex);
    const rest =
        newlineIndex === -1 ? "" : firstText.value.slice(newlineIndex + 1);

    const match = headerLine.match(CALLOUT_RE);
    if (!match) return;

    const [, rawType, fold, titleText] = match;
    const type = rawType.toLowerCase();
    const title = titleText || capitalize(type);

    if (rest) {
        firstText.value = rest;
    } else {
        firstParagraph.children.shift();
        if (firstParagraph.children.length === 0) {
            node.children.shift();
        }
    }

    const titleParagraph = {
        type: "paragraph",
        data: {
            hName: "p",
            hProperties: { className: ["callout-title"] },
        },
        children: [{ type: "text", value: title }],
    };

    const iconColumn = {
        type: "paragraph",
        data: {
            hName: "div",
            hProperties: { className: ["callout-icon-col"] },
            hChildren: [calloutIconHast(type)],
        },
        children: [],
    };

    const contentColumn = {
        type: "paragraph",
        data: {
            hName: "div",
            hProperties: { className: ["callout-content"] },
        },
        children: [titleParagraph, ...node.children],
    };

    node.data = {
        hName: "div",
        hProperties: {
            className: ["callout", `callout-${type}`],
            ...(fold
                ? { "data-callout-fold": fold === "-" ? "closed" : "open" }
                : {}),
        },
    };
    node.children = [iconColumn, contentColumn];
}

function walk(node) {
    if (!node || !Array.isArray(node.children)) return;

    for (const child of node.children) {
        if (child.type === "blockquote") transformCallout(child);
        walk(child);
    }
}

export function remarkCallouts() {
    return (tree) => {
        walk(tree);
    };
}
