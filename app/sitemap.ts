import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

// Per-route crawl hints. We deliberately omit lastModified: without a real
// per-page content date, stamping the build time would tell crawlers every page
// changed on every deploy, which is misleading and erodes the signal.
const ROUTES: Array<{
  path: string;
  changeFrequency: "daily" | "weekly" | "monthly";
  priority: number;
}> = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/ecosystem", changeFrequency: "daily", priority: 0.9 },
  { path: "/201", changeFrequency: "daily", priority: 0.8 },
  { path: "/pillars", changeFrequency: "monthly", priority: 0.7 },
  { path: "/join", changeFrequency: "monthly", priority: 0.7 },
  { path: "/org", changeFrequency: "monthly", priority: 0.6 },
  { path: "/zabal-games", changeFrequency: "monthly", priority: 0.6 },
  { path: "/faq", changeFrequency: "monthly", priority: 0.5 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return ROUTES.map(({ path, changeFrequency, priority }) => ({
    url: `${SITE_URL}${path === "/" ? "" : path}`,
    changeFrequency,
    priority,
  }));
}
