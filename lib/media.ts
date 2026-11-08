import fs from "node:fs";
import path from "node:path";

const exts = ["jpg", "jpeg", "webp", "png"];

/**
 * Server-only: returns the public URL of a captured image if it exists
 * (e.g. public/projects/<slug>.jpg created by `npm run screenshots`).
 * Never fabricates an image; returns undefined when the file is missing.
 */
export function localImage(dir: "projects" | "tours", slug: string): string | undefined {
  for (const ext of exts) {
    const file = path.join(process.cwd(), "public", dir, `${slug}.${ext}`);
    if (fs.existsSync(file)) return `/${dir}/${slug}.${ext}`;
  }
  return undefined;
}
