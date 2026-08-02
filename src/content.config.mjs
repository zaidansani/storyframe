import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const pages = defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/pages" }),
    schema: z.object({
        title: z.string(),
        description: z.string().optional(),
        read_duration: z.number().optional(),
    }),
});

const site = defineCollection({
    loader: glob({ pattern: "*.yaml", base: "./src/content/site" }),
    schema: z.object({
        text: z.string(),
    }),
});

export const collections = {
    pages,
    site,
};
