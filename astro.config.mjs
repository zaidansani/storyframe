import { rehypeSectionize } from "@/lib/markdown/rehype-sectionize.mjs";
import { remarkCallouts } from "@/lib/markdown/remark-callouts.mjs";
import { remarkSidenotes } from "@/lib/markdown/remark-sidenotes.mjs";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";

const basePath = process.env.PUBLIC_BASE_PATH ?? "";

export default defineConfig({
    site: process.env.PUBLIC_SITE_URL ?? "https://example.com",
    base: basePath ? `/${basePath}` : "/",
    integrations: [mdx(), icon()],
    markdown: {
        remarkPlugins: [remarkCallouts, remarkSidenotes],
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
