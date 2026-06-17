// Canonical site URL, resolved at runtime so we never hardcode a domain that
// isn't live yet. Order of preference:
//   1. NEXT_PUBLIC_SITE_URL  - explicit override if ever needed
//   2. Vercel's production domain - the custom domain once attached, else the
//      *.vercel.app host. Auto-updates when 101.thezao.com is wired up.
//   3. 101.thezao.com - last-resort default (e.g. local builds)
function resolveSiteUrl(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  return "https://101.thezao.com";
}

export const SITE_URL = resolveSiteUrl();
