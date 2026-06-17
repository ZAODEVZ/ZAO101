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

      <h3>Is The ZAO a label?</h3>
      <div className="placeholder">
        TODO: honest answer. Not a label in the traditional sense. What it is
        instead.
      </div>

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
      <div className="placeholder">
        TODO: Monday 6pm EST. Small breakout groups. Respect allocation. Why
        it's different from a voice call.
      </div>

      <h3>Can I fork this?</h3>
      <div className="placeholder">
        TODO: yes, link the repos, explain what you'd be forking (the ZAO OS
        codebase vs the community itself).
      </div>

      <h3>Where do I hear the music?</h3>
      <div className="placeholder">
        TODO: point at the music player, specific artists. Embed an example if
        possible.
      </div>

      <p>
        <Link href="/">Home</Link>
      </p>
    </article>
  );
}
