// Single source of truth for all ZAO link data: the Nexus public read-only API.
// We never store a local copy of links. Every page that shows links fetches here.
// Verified contract (live 2026-06-17): keys are mainCategory and subTitle.

export type Audience = "community" | "ecosystem" | "both";

export interface NexusLink {
  title: string;
  url: string;
  category: string;
  subcategory: string;
  description: string;
  tags: string[];
  audience: Audience;
}

export interface NexusSubcategory {
  subTitle: string;
  links: NexusLink[];
}

export interface NexusCategory {
  mainCategory: string;
  subcategories: NexusSubcategory[];
}

export interface GroupedResponse {
  source: string;
  total: number;
  count: number;
  generatedAt: string;
  categories: NexusCategory[];
}

export interface FlatResponse {
  source: string;
  total: number;
  count: number;
  generatedAt: string;
  links: NexusLink[];
}

const BASE = "https://nexus.thezao.com/api/links";

// Server-side fetch with 1-hour ISR cache, per the contract.
// Returns null on any failure so callers can render a graceful fallback
// instead of crashing the page (the Nexus is canonical but may be down).

interface QueryParams {
  audience?: Audience;
  featured?: boolean;
}

function buildUrl(params: QueryParams, grouped: boolean): string {
  const sp = new URLSearchParams();
  if (params.audience) sp.set("audience", params.audience);
  if (params.featured) sp.set("featured", "true");
  if (grouped) sp.set("group", "true");
  const qs = sp.toString();
  return qs ? `${BASE}?${qs}` : BASE;
}

export async function fetchGrouped(
  params: QueryParams = {}
): Promise<GroupedResponse | null> {
  try {
    const res = await fetch(buildUrl(params, true), {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as GroupedResponse;
    if (!data || !Array.isArray(data.categories)) return null;
    return data;
  } catch {
    return null;
  }
}

export async function fetchFlat(
  params: QueryParams = {}
): Promise<FlatResponse | null> {
  try {
    const res = await fetch(buildUrl(params, false), {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as FlatResponse;
    if (!data || !Array.isArray(data.links)) return null;
    return data;
  } catch {
    return null;
  }
}

// Public, human-facing URL of the canonical source. Used in fallbacks so a
// reader can always reach the real data even if our fetch failed.
export const NEXUS_PUBLIC_URL = "https://nexus.thezao.com";
