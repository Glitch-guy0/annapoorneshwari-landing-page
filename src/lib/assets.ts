/**
 * Resolve a file in `public/` while respecting Vite's configured base path.
 * This keeps asset URLs correct on GitHub Pages project sites.
 */
export function asset(path: string) {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;
}
