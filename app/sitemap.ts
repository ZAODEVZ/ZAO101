import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
  "/",
  "/pillars",
  "/org",
  "/ecosystem",
  "/zabal-games",
  "/join",
  "/faq",
  "/201",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return ROUTES.map((route) => ({
    url: `${SITE_URL}${route === "/" ? "" : route}`,
    lastModified,
  }));
}
