import type { MetadataRoute } from "next";
import { projects } from "@/data/projects";
import { tours } from "@/data/tours";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const pages = ["", "/work", "/virtual-tours", "/branding", "/about", "/contact"];
  return [
    ...pages.map((p) => ({ url: `${siteConfig.url}${p}`, lastModified: now, priority: p === "" ? 1 : 0.8 })),
    ...projects.map((p) => ({ url: `${siteConfig.url}/work/${p.slug}`, lastModified: now, priority: 0.6 })),
    ...tours.map((t) => ({ url: `${siteConfig.url}/virtual-tours/${t.slug}`, lastModified: now, priority: 0.6 })),
  ];
}
