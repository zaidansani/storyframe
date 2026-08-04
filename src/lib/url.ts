/** PUBLIC_BASE_PATH has no leading/trailing slash, e.g. "storyframe" or "" for root deploys. */
export function withBase(path: string): string {
  const base = import.meta.env.PUBLIC_BASE_PATH ?? '';
  return base ? `/${base}/${path}` : `/${path}`;
}
