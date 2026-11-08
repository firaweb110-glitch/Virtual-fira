/**
 * Captures REAL screenshots of the live sites into public/projects/<slug>.jpg.
 * The site automatically uses these files when present.
 *
 *   npx playwright install chromium
 *   npm run screenshots              # website projects
 *   npm run screenshots -- --tours   # also try tours -> public/tours/<slug>.jpg
 *   npm run screenshots -- nuview-treatment   # only one slug
 */
import { chromium } from "playwright";
import path from "node:path";
import fs from "node:fs";
import { projects } from "../data/projects";
import { tours } from "../data/tours";

const args = process.argv.slice(2);
const withTours = args.includes("--tours");
const only = args.filter((a) => !a.startsWith("--"));

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });

  const jobs = [
    ...projects.map((p) => ({ dir: "projects", slug: p.slug, url: p.url, wait: 2500 })),
    ...(withTours ? tours.map((t) => ({ dir: "tours", slug: t.slug, url: t.url, wait: 7000 })) : []),
  ].filter((j) => !only.length || only.includes(j.slug));

  for (const job of jobs) {
    const out = path.join(process.cwd(), "public", job.dir);
    fs.mkdirSync(out, { recursive: true });
    const page = await ctx.newPage();
    try {
      await page.goto(job.url, { waitUntil: "load", timeout: 45000 });
      await page.waitForTimeout(job.wait);
      await page.screenshot({ path: path.join(out, `${job.slug}.jpg`), type: "jpeg", quality: 82 });
      console.log(`captured ${job.dir}/${job.slug}.jpg`);
    } catch (e) {
      console.log(`FAILED   ${job.dir}/${job.slug}: ${(e as Error).message}`);
    } finally {
      await page.close();
    }
  }
  await browser.close();
})();
