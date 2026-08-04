# storyframe

another SSG framework made in astro. written by [@zaidansani](https://github.com/zaidansani)

- utilises `.mdx files` for interactive components, like graphs and questions
- built for people who want to write articles with slightly more pizzazz

## getting started from the template (assuming github pages hosting)

- go to https://github.com/zaidansani/storyframe
- click "Use this template" → "Create a new repository"
- in the branch dropdown, select `template` (very important, don't use main - that would have my articles, which defeats the point, LOL)
- name your repo and create it
- update `astro.config.mjs` with your own `site` and `base` — `site` is your GitHub Pages domain (e.g. `https://<username>.github.io`) and `base` is your repo name (e.g. `/<repo-name>`)
- update the `deploy.yml` workflow to push to main if you want automated updates whenever you push (recommended)

```
on:
    push:
        branches: [main]
    workflow_dispatch:
```

- push to `main` to trigger the included GitHub Actions deploy workflow (`.github/workflows/deploy.yml`), and set Settings → Pages → Source to "GitHub Actions"

## how to use

- write pages as `.mdx` files under `src/content/pages/` — the folder structure maps to the site's URL structure
- `src/content/pages/articles/` for articles, `src/content/pages/docs/` for documentation, `src/content/pages/samples/` for samples
- import and use interactive components (graphs, questions, etc.) directly inside your `.mdx` file
- see `src/content/pages/docs/component-reference.mdx` for the list of available components and `src/content/pages/docs/theming.mdx` for theming options (the easiest way would be to look at the [/docs](zaidan.dev/storyframe/docs)) pages which are just this but rendered.
- site-wide settings (e.g. footer) live under `src/content/site/`

## commands

| command        | action                                     |
| -------------- | ------------------------------------------ |
| `pnpm dev`     | start the local dev server                 |
| `pnpm build`   | build the site for production to `./dist/` |
| `pnpm preview` | preview the production build locally       |
