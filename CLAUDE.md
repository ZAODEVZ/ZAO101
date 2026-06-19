# ZAO 101 — Agent Guide

A teaching site for people new to The ZAO, plus a token-gated members floor
(ZAO 201). Every page exists so a newcomer can understand what The ZAO is, why
it exists, and how to engage with it.

## Stack

- **Next.js 15** (App Router) + **React 19** + **TypeScript**.
- **viem** for on-chain reads (the 201 gate). **No other runtime dependencies.**
- Deployed on **Vercel**. Live at [101.thezao.com](https://101.thezao.com).
- All link data comes live from the ZAO Nexus API (`nexus.thezao.com/api`) in
  server components with 1-hour ISR. The repo keeps **no local copy** of links.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build (also type-checks)
```

## Hard Rules

1. **Never write secrets, API keys, private keys, or credentials to any file.**
2. **No new dependencies without explicit operator approval.** The runtime tree
   is intentionally tiny (Next, React, viem). A dependency add is a real
   decision - surface the bundle/advisory cost and get a yes first.
3. **Don't modify `vercel.json`, `.github/`, or `package.json` without explicit
   operator approval.**
4. **One concern per PR.** Don't bundle unrelated changes.
5. **Verify before merge.** `npm run build` must be green; type-check clean.

(Note: `.quadwork-allowlist` is a legacy artifact from the original plain-HTML
version of this site and no longer reflects the codebase.)

## Voice + Content Rules

The ZAO's positioning (from Zaal's own words, not marketing):

- **Music first, community second, tech third.** Always lead with the music.
- **Honest about scale.** 100+ members. Not "thousands." Small, tight, real.
- **Built in public.** Every step is documented. No secret moves.
- **Artist-led.** Artists before builders. Builders before speculators.
- **Four pillars:** Artist Org (ZTalent Artist Organization) / Autonomous Org /
  Operating System / Open Source. Reference them; don't turn them into fluff.

When writing content:
- Plain language. No crypto jargon unless explained.
- Say "The ZAO" (with "The"). Never "Zao" or "ZAO" alone for the org.
- Say "Farcaster" not "Warpcast".
- Use hyphens, not em-dashes. No emojis anywhere (content, code, comments).
- Short sentences. One idea per line when possible.
- Real numbers beat vague claims. "100+ members" not "a large community".
- **Do not invent facts.** Only state what the site already establishes.

## Style Rules

- Dark theme only — navy `#0a1628` background, gold `#f5a623` accent.
- Mobile first. Every page must render correctly at 375px width.
- Respect `prefers-reduced-motion`; keyboard focus must stay visible.

## Pages (App Router)

- `/` — Home: hero, "Start here" reading path, pillar + explore tiles
- `/pillars` — the four pillars
- `/org` — org chart with one-click plain-text copy
- `/ecosystem` — live ecosystem directory with client-side search, category and
  tag filters, shareable filter URLs (`EcosystemBrowser`)
- `/zabal-games` — the builder-engagement door
- `/join` — how to engage (3 doors) + step-by-step first action
- `/faq` — common questions
- `/201` — token-gated members floor

## Key modules

- `lib/nexus.ts` — Nexus API client. Server fetch, 1h ISR, 8s timeout, returns
  `null` on failure so callers render a graceful fallback.
- `lib/gate.ts` — 201 access check. Reads OG (ERC-20) / ZOR (ERC-1155) balances
  on Optimism via viem. **Curation, not security** - only decides what UI
  renders. Grants on any confirmed positive balance; denies only when both reads
  succeed at zero; throws (so the UI can retry) on an indeterminate RPC result.
- `lib/site.ts` — canonical site URL resolution.
- `components/MembersGate.tsx` — client gate for `/201` (injected wallet; live
  account-change handling, silent reconnect, disconnect).
- `components/GroupedLinks.tsx` — read-only grouped link renderer (used by `/201`).
- `components/EcosystemBrowser.tsx` — client search/filter renderer (used by
  `/ecosystem`). Keep `GroupedLinks` working when changing either.

## Reference

- Main project: [thezao.com](https://thezao.com)
- Zaal on Farcaster: [@zaal](https://farcaster.xyz/zaal)
- This repo: [github.com/ZAODEVZ/ZAO101](https://github.com/ZAODEVZ/ZAO101)
