# Changelog

All notable changes to ZAO 101 + 201. Dates are in UTC.

## 2026-06 — Hardening, accessibility, onboarding, and the ecosystem directory

### Platform and security
- Upgraded **Next.js 14.2.35 -> 15.5.19** and **React 18 -> 19**, clearing 9
  open framework security advisories. Added a `postcss ^8.5.10` override and
  marked the share-image route `force-static`.
- **Gate correctness:** the 201 gate no longer falsely denies a holder when the
  Optimism RPC is unreachable. It grants on any confirmed positive balance,
  denies only when both reads succeed at zero, and otherwise surfaces a retry.
- **Nexus client:** added an 8s fetch timeout so a hung upstream cannot stall a
  server render; failures fall back gracefully.

### Reliability and UX
- Hardened the injected-wallet gate: silent reconnect on load, live
  `accountsChanged` handling, and a disconnect control.
- Added on-brand **404 (`not-found`)**, route **error**, and **global-error**
  boundaries (previously the unstyled Next defaults).

### Accessibility and PWA
- Skip-to-content link, a visible global focus ring, and a labelled primary nav.
- `prefers-reduced-motion` support.
- Web app manifest (installable) and a `theme-color` for mobile browser chrome.
- Sitemap crawl hints (`changeFrequency`/`priority`); dropped misleading
  per-build `lastmod`.

### Onboarding content
- `/join` "Your first action" rewritten as a clear 3-step path.
- `/201` gained a "Your first week on the floor" step-by-step.
- `/faq` answers the common "do I need a wallet or crypto to join?" question.
- Removed a duplicated season-phases paragraph on `/zabal-games`.

### Ecosystem directory (`/ecosystem`)
- New `EcosystemBrowser`: client-side **search** (title/description/tags) and
  **category filtering** over the live Nexus data. `GroupedLinks` (used by
  `/201`) left unchanged.
- **Tag filtering** (top tags, multi-select OR) plus a **Clear filters** control.
- **Shareable filter URLs** (`q`/`cat`/`tags`) restored on load, with a **Copy
  link** button.
- **Per-category counts** on the filter chips and a **`/`-to-focus-search**
  keyboard shortcut.

All of the above shipped as small, build-verified, single-concern pull requests.

### In progress (not merged)
- **Wallet Option A** (Farcaster Mini App connector + injected via wagmi) is
  open for review and on-device testing. It adds dependencies and ~99 kB to the
  `/201` route, and pulls 13 moderate transitive advisories through the Farcaster
  SDK - pending a decision before merge.
