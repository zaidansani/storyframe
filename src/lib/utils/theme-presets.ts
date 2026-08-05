// Single source of truth for theme presets: both colors and fonts.
// theme.css never hardcodes preset data — it only consumes the resulting
// --color-* / --font-text / --font-main-heading variables. Fonts must also
// be registered with astro:assets' <Font> component (see astro.config.mjs)
// under the same cssVariable names used here.

export const THEME_PRESET: "classic" | "tech" | "newsletter" | "zai" = "zai";

const SANS_FALLBACK =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif';
const SERIF_FALLBACK = 'Georgia, "Times New Roman", serif';
const MONO_FALLBACK =
    "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

type Palette = {
    bg: string;
    text: string;
    textMuted: string;
    accent: string;
    border: string;
    surface: string;
};

// Must match the cssVariable names registered in astro.config.mjs, since
// astro:assets' <Font> component types its cssVariable prop against them.
type FontCssVar =
    | "--font-inter"
    | "--font-jetbrains-mono"
    | "--font-source-serif-4"
    | "--font-playfair-display"
    | "--font-ibm-plex-mono"
    | "--font-fira-code"
    | "--font-space-mono";

type Preset = {
    light: Palette;
    dark: Palette;
    bodyVar: FontCssVar;
    bodyFallback: string;
    headingVar: FontCssVar;
    codeVar: FontCssVar;
};

const PRESETS: Record<"classic" | "tech" | "newsletter" | "zai", Preset> = {
    // Default: clean, neutral, gets out of the way.
    classic: {
        light: {
            bg: "#ffffff",
            text: "#1a1a1a",
            textMuted: "#5f5f5f",
            accent: "#2563eb",
            border: "#e5e5e5",
            surface: "#f7f7f7",
        },
        dark: {
            bg: "#14161a",
            text: "#e8e8e8",
            textMuted: "#a0a0a0",
            accent: "#60a5fa",
            border: "#2a2d33",
            surface: "#1c1f24",
        },
        bodyVar: "--font-inter",
        bodyFallback: SANS_FALLBACK,
        headingVar: "--font-inter",
        codeVar: "--font-jetbrains-mono",
    },
    // Opinionated dev/tech look: monospace everywhere, high-contrast neon accent.
    tech: {
        light: {
            bg: "#f5f5f0",
            text: "#0a0a0a",
            textMuted: "#5a5f52",
            accent: "#d4ff3f",
            border: "#0a0a0a",
            surface: "#e8e8de",
        },
        dark: {
            bg: "#0a0b08",
            text: "#e8ffb0",
            textMuted: "#8a9270",
            accent: "#d4ff3f",
            border: "#3a4020",
            surface: "#14150f",
        },
        bodyVar: "--font-jetbrains-mono",
        bodyFallback: MONO_FALLBACK,
        headingVar: "--font-space-mono",
        codeVar: "--font-fira-code",
    },
    // Newsletter: warm, classy serif editorial feel.
    newsletter: {
        light: {
            bg: "#f7f1e3",
            text: "#3a2f22",
            textMuted: "#7a6c58",
            accent: "#b45309",
            border: "#e3d5b8",
            surface: "#efe4cc",
        },
        dark: {
            bg: "#1f1a13",
            text: "#ecdfc4",
            textMuted: "#b0a184",
            accent: "#f0a34e",
            border: "#3a3122",
            surface: "#2a2318",
        },
        bodyVar: "--font-source-serif-4",
        bodyFallback: SERIF_FALLBACK,
        headingVar: "--font-playfair-display",
        codeVar: "--font-ibm-plex-mono",
    },
    zai: {
        light: {
            bg: "#FCEEF4",
            text: "#3a2f22",
            textMuted: "#242456",
            accent: "#3D3B8E",
            border: "#C5C5E7",
            surface: "#E2E2F3",
        },
        dark: {
            bg: "#18183A",
            text: "#ecdfc4",
            textMuted: "#F9DCE9",
            accent: "#E072A4",
            border: "#42429E",
            surface: "#242456",
        },
        bodyVar: "--font-ibm-plex-mono",
        bodyFallback: SERIF_FALLBACK,
        headingVar: "--font-playfair-display",
        codeVar: "--font-ibm-plex-mono",
    },
};

const preset = PRESETS[THEME_PRESET] ?? PRESETS.classic;

export const activeFonts = {
    body: preset.bodyVar,
    heading: preset.headingVar,
    code: preset.codeVar,
};

function colorVars(p: Palette): string {
    return (
        `--color-bg: ${p.bg}; --color-text: ${p.text}; --color-text-muted: ${p.textMuted}; ` +
        `--color-accent: ${p.accent}; --color-border: ${p.border}; --color-surface: ${p.surface};`
    );
}

const fontVars =
    `--font-text: var(${preset.bodyVar}), ${preset.bodyFallback}; ` +
    `--font-main-heading: var(${preset.headingVar}), var(--font-text); ` +
    `--font-code: var(${preset.codeVar}), ${MONO_FALLBACK};`;

// Rendered into a <style set:html={themeCSS}> tag in the document head.
// Covers OS-level dark mode plus the manual data-theme="light"|"dark" toggle.
export const themeCSS = `
:root { ${colorVars(preset.light)} ${fontVars} }
@media (prefers-color-scheme: dark) {
  :root { ${colorVars(preset.dark)} }
}
:root[data-theme="light"] { ${colorVars(preset.light)} }
:root[data-theme="dark"] { ${colorVars(preset.dark)} }
`;
