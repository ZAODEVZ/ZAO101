# ZAO 101 + ZAO 201

Learn about The ZAO. A decentralized impact network. Music first, community
second, tech third.

Two tiers in one Next.js 14 (App Router) site:

- **ZAO 101** - the open, public front door. No wallet. Start Here, the org
  chart, a live ecosystem overview, ZABAL Games, and how to join.
- **ZAO 201** - the token-gated members floor. Connect a wallet holding OG or
  ZOR on Optimism to reveal the members view and the how-to layer.

## Single source of truth

All link data comes from the ZAO Nexus public read-only API at
`nexus.thezao.com/api`. This repo keeps **no local copy** of link data - the
ecosystem overview and the members directory are fetched live in server
components with 1-hour revalidation.

## The 201 gate

Connecting a wallet reads either token balance on Optimism (chainId 10) via
viem and a public Optimism RPC:

- OG (ERC-20) `0x34cE89baA7E4a4B00E17F7E4C0cb97105C216957` - `balanceOf(addr) > 0`
- ZOR (ERC-1155) `0x9885CCeEf7E8371Bf8d6f2413723D25917E7445c` - `balanceOf(addr, 0) > 0`

Holding either grants access. This gate is **curation, not security** - it only
decides what UI renders. There are no secrets behind it.

## Pages

- `/` - ZAO 101 home (Start Here + sections)
- `/pillars` - the four pillars
- `/org` - the org chart with one-click copy of the plain-text version
- `/ecosystem` - live ecosystem overview (`audience=ecosystem&group=true`)
- `/zabal-games` - the builder-engagement door
- `/join` - how to engage
- `/faq` - common questions
- `/201` - the token-gated members floor

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

## Links

- [thezao.com](https://thezao.com)
- [@zaal on Farcaster](https://farcaster.xyz/zaal)
- [GitHub](https://github.com/bettercallzaal/zao-101)

## License

MIT
