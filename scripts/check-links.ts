/**
 * Checks every project and tour URL and reports HTTP status plus whether the
 * provider sends headers that block iframe embedding.
 * Run: npm run check:links
 */
import { projects } from "../data/projects";
import { tours } from "../data/tours";

async function probe(label: string, url: string, embed: boolean) {
  try {
    const res = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(20000), headers: { "User-Agent": "Mozilla/5.0 VirtualFiraLinkCheck" } });
    const xfo = res.headers.get("x-frame-options");
    const csp = res.headers.get("content-security-policy") ?? "";
    const frameAncestors = /frame-ancestors[^;]*/i.exec(csp)?.[0];
    const blocks = Boolean(xfo && /deny|sameorigin/i.test(xfo)) || Boolean(frameAncestors && /'none'|'self'/.test(frameAncestors));
    const note = embed ? (blocks ? "  [BLOCKS EMBEDDING - use external launch]" : "  [embeddable]") : "";
    console.log(`${res.ok ? "OK  " : "FAIL"} ${res.status}  ${label}  ${url}${note}`);
    return res.ok;
  } catch (e) {
    console.log(`FAIL ---  ${label}  ${url}  (${(e as Error).message})`);
    return false;
  }
}

(async () => {
  const results: boolean[] = [];
  console.log(`\nWebsite projects (${projects.length})`);
  for (const p of projects) results.push(await probe(p.title, p.url, false));
  console.log(`\nVirtual tours (${tours.length})`);
  for (const t of tours) results.push(await probe(t.title, t.url, true));
  const failed = results.filter((r) => !r).length;
  console.log(`\n${results.length - failed}/${results.length} reachable.`);
  process.exit(failed ? 1 : 0);
})();
