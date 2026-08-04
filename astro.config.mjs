import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";
import { rehypeSectionize } from "./src/lib/rehype-sectionize.mjs";

export default defineConfig({
    site: process.env.PUBLIC_SITE_URL ?? "https://example.com",
    base: process.env.PUBLIC_BASE_PATH ?? "/",
    integrations: [mdx(), icon()],
    markdown: {
        rehypePlugins: [rehypeSectionize],
    },
    fonts: [
        // classic preset
        {
            provider: fontProviders.google(),
            name: "Inter",
            cssVariable: "--font-inter",
        },
        {
            provider: fontProviders.google(),
            name: "JetBrains Mono",
            cssVariable: "--font-jetbrains-mono",
        },
        // tech preset
        {
            provider: fontProviders.google(),
            name: "Space Mono",
            cssVariable: "--font-space-mono",
        },
        {
            provider: fontProviders.google(),
            name: "Fira Code",
            cssVariable: "--font-fira-code",
        },
        // newsletter preset
        {
            provider: fontProviders.google(),
            name: "Source Serif 4",
            cssVariable: "--font-source-serif-4",
        },
        {
            provider: fontProviders.google(),
            name: "Playfair Display",
            cssVariable: "--font-playfair-display",
        },
        {
            provider: fontProviders.google(),
            name: "IBM Plex Mono",
            cssVariable: "--font-ibm-plex-mono",
        },
    ],
});
