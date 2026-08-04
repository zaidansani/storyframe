import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";
import { rehypeSectionize } from "./src/lib/rehype-sectionize.mjs";

export default defineConfig({
    integrations: [mdx(), icon()],
    markdown: {
        rehypePlugins: [rehypeSectionize],
    },
    fonts: [
        // default preset
        {
            provider: fontProviders.google(),
            name: "Inter",
            cssVariable: "--font-inter",
        },
        {
            provider: fontProviders.google(),
            name: "Bitcount Prop Single",
            cssVariable: "--font-bitcount",
        },
        {
            provider: fontProviders.google(),
            name: "JetBrains Mono",
            cssVariable: "--font-jetbrains-mono",
        },
        // sepia preset
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
        // ocean preset
        {
            provider: fontProviders.google(),
            name: "Manrope",
            cssVariable: "--font-manrope",
        },
        {
            provider: fontProviders.google(),
            name: "Space Grotesk",
            cssVariable: "--font-space-grotesk",
        },
        {
            provider: fontProviders.google(),
            name: "Fira Code",
            cssVariable: "--font-fira-code",
        },
        // forest preset
        {
            provider: fontProviders.google(),
            name: "Work Sans",
            cssVariable: "--font-work-sans",
        },
        {
            provider: fontProviders.google(),
            name: "Fraunces",
            cssVariable: "--font-fraunces",
        },
        {
            provider: fontProviders.google(),
            name: "Space Mono",
            cssVariable: "--font-space-mono",
        },
    ],
});
