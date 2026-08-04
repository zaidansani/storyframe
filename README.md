# storyframe

another SSG framework made in astro. written by [@zaidansani](https://github.com/zaidansani)

- utilises `.mdx files` for interactive components, like graphs and questions
- built for people who want to write articles with slightly more pizzazz

## getting started

- fork this repo at https://github.com/zaidansani/storyframe (forking, rather than using a template, keeps a link to `upstream` so you can pull in future framework updates)
- replace the example content under `src/content/pages/articles` with your own — you probably don't want my articles. you can leave the `docs` and `samples` for your own reference, it won't be visible in the main landing page!
- `astro.config.mjs` reads `site`/`base` from the `PUBLIC_SITE_URL`/`PUBLIC_BASE_PATH` env vars (falling back to placeholders for local `pnpm dev`) — the deploy workflow below sets these for you automatically, no manual editing needed

## to host on github pages

- set Settings → Pages → Source to "GitHub Actions"
- add the required deployment file i.e `.github/workflows/deploy.yml`

```
name: Deploy to GitHub Pages

on:
    push:
        branches: [main]
    workflow_dispatch:

permissions:
    contents: read
    pages: write
    id-token: write

concurrency:
    group: "pages"
    cancel-in-progress: false

jobs:
    build:
        runs-on: ubuntu-latest
        env:
            PUBLIC_SITE_URL: https://${{ github.repository_owner }}.github.io
            PUBLIC_BASE_PATH: /${{ github.event.repository.name }}
        steps:
            - name: Checkout
              uses: actions/checkout@v4
            - name: Install, build, and upload your site
              uses: withastro/action@v3
              with:
                  node-version: 22.13

    deploy:
        needs: build
        runs-on: ubuntu-latest
        environment:
            name: github-pages
            url: ${{ steps.deployment.outputs.page_url }}
        steps:
            - name: Deploy to GitHub Pages
              id: deployment
              uses: actions/deploy-pages@v4

```

- push to `main` to trigger the deploy workflow — `site`/`base` are derived automatically from your repo name and owner, no config edits needed

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
