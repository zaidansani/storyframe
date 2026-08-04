import type { CollectionEntry } from 'astro:content';

type Page = CollectionEntry<'pages'>;

/** Directory portion of a page id, e.g. "articles/foo" -> "articles", "foo" -> "". */
export function getPageDir(id: string): string {
  const parts = id.split('/');
  parts.pop();
  return parts.join('/');
}

/** Every directory that contains a page, directly or via a nested subfolder, excluding the root ("").  */
export function getAllFolders(pages: Page[]): string[] {
  const folders = new Set<string>();

  for (const page of pages) {
    const parts = page.id.split('/');
    parts.pop();
    for (let i = 1; i <= parts.length; i++) {
      folders.add(parts.slice(0, i).join('/'));
    }
  }

  return [...folders];
}

/** Immediate subfolders and pages of `folder` (use "" for the root). */
export function getFolderContents(pages: Page[], folder: string) {
  const prefix = folder === '' ? '' : `${folder}/`;
  const subfolders = new Set<string>();
  const directPages: Page[] = [];

  for (const page of pages) {
    if (!page.id.startsWith(prefix)) continue;
    const rest = page.id.slice(prefix.length);
    if (rest === '') continue;

    const [next, ...remainder] = rest.split('/');
    if (remainder.length === 0) {
      directPages.push(page);
    } else {
      subfolders.add(next);
    }
  }

  return { subfolders: [...subfolders], pages: directPages };
}
