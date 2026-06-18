import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Common questions about The ZAO.",
};

export default function FaqPage() {
  return (
    <article className="page">
      <h1>FAQ</h1>

      <h3>I want to help - where do I start?</h3>
      <p>
        Go to <Link href="/join">How to Join</Link> and follow "Your first
        action." Short version: tell us what you want to own, DM{" "}
        <a href="https://farcaster.xyz/zaal">@zaal on Farcaster</a>, and we point
        you at the right group. If you want the map of how everything fits
        together first, read the <Link href="/org">org chart</Link>.
      </p>

      <h3>Do I need a wallet or crypto to join?</h3>
      <p>
        No. Everything on ZAO 101 - the pillars, the org chart, the ecosystem,
        and how to join - is open with no wallet. You only need a wallet for the
        members floor, <Link href="/201">ZAO 201</Link>, which checks for OG or
        ZOR on Optimism. Start by showing up and owning something; OG and ZOR
        come from participation, not the other way around.
      </p>

      <h3>Is The ZAO a label?</h3>
      <p>
        Not in the traditional sense. A label signs artists and takes ownership
        of the work. The ZAO is the opposite - artists keep their work and own a
        share of the community. You get distribution, collaborators, and tools,
        without giving up your masters or your rights.
      </p>

      <h3>What's ZABAL?</h3>
      <p>
        ZABAL is an incubated project inside The ZAO - the builder engagement
        program (ZABAL Games, where outsiders come in to build) and the
        toolstack the team builds with. It is not the umbrella brand. The ZAO is
        the umbrella; ZABAL is one of the things incubated under it. There is
        also <strong>$ZABAL, the community token on Base</strong> - it carries
        incentives and governance weight inside The ZAO. The token is a piece
        inside the network, not the network itself. No financial advice. See the{" "}
        <Link href="/org">org chart</Link> for where ZABAL sits.
      </p>

      <h3>What's a fractal meeting?</h3>
      <p>
        A weekly gathering, Mondays 6pm EST. Members break into small groups and
        recognize the week's contributions; that recognition (Respect) carries
        governance weight. A full mechanics explainer is coming soon.
      </p>

      <h3>Can I fork this?</h3>
      <p>
        Yes. ZAO OS is open source (MIT) - you'd fork the whole stack: the gated
        client, the music player, the agents, and the research library. Clone
        it, point it at your community, and ship. Start at{" "}
        <a href="https://github.com/bettercallzaal">github.com/bettercallzaal</a>
        .
      </p>

      <h3>Where do I hear the music?</h3>
      <p>
        The ZAO has its own music player and radio built into the app - hear ZAO
        artists at <a href="https://zaoos.com">zaoos.com</a>. An embedded player
        example is coming.
      </p>

      <p>
        <Link href="/">Home</Link>
      </p>
    </article>
  );
}
