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
        {
            provider: fontProviders.google(),
            name: "Inter",
            cssVariable: "--font-text",
        },
        {
            provider: fontProviders.google(),
            name: "Bitcount Prop Single",
            cssVariable: "--font-main-heading",
        },
    ],
});
