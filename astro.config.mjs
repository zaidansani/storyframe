import mdx from "@astrojs/mdx";
import icon from "astro-icon";
import { defineConfig, fontProviders } from "astro/config";

export default defineConfig({
    integrations: [mdx(), icon()],
    fonts: [
        {
            provider: fontProviders.google(),
            name: "Inter",
            cssVariable: "--font-inter",
        },
    ],
});
