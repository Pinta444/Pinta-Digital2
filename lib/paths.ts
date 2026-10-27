// Server-only: read at build time, matching basePath in next.config.ts.
const base = process.env.PAGES_BASE_PATH ?? "";

/** Plain href to another page of the static export, e.g. href("/privacy/"). */
export function href(path: string) {
  return `${base}${path}`;
}
