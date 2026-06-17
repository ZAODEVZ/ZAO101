import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "ZABAL Games",
  description:
    "ZABAL Games is the outsider-facing builder program that brings new builders into The ZAO. Come in, build something, ship it.",
};

export default function ZabalGamesPage() {
  return (
    <article className="page">
      <h1>ZABAL Games</h1>
      <p>
        The front door for builders. ZABAL Games is an open builder program
        where people from outside the community come in, build something, learn
        from mentors, and become part of the ecosystem through the work. Think
        the energy of a hackathon or a dev bootcamp - a micro-ETH-Global for The
        ZAO.
      </p>
      <p>
        You do not need to be a ZAO member to join. You come in, you build, and
        the work is what brings you in.
      </p>

      <div className="start-here">
        <h2>How this fits The ZAO</h2>
        <p>
          <strong>The ZAO is the umbrella brand.</strong> ZABAL Games is an
          incubated project that brings new builders INTO The ZAO - it grows and
          reinforces The ZAO, it does not replace or eclipse it.
        </p>
        <p>"ZABAL" gets used two ways - keep them separate:</p>
        <ul>
          <li>
            <strong>ZABAL Games</strong> - the public builder program. That's
            this page.
          </li>
          <li>
            <strong>The ZABAL toolstack</strong> - the internal tooling the team
            builds with. Not a public brand. See where both sit on the{" "}
            <Link href="/org">org chart</Link>.
          </li>
        </ul>
      </div>

      <h2>The three tracks</h2>
      <p>Pick the one that fits how you build.</p>
      <ul>
        <li>
          <strong>Artist</strong> - musicians building with emerging tech.
        </li>
        <li>
          <strong>Builder</strong> - devs and vibe-coders shipping tools and
          apps.
        </li>
        <li>
          <strong>Creator</strong> - the media and content side.
        </li>
      </ul>

      <h2>The arc</h2>
      <p>The program runs as a season:</p>
      <ul>
        <li>
          <strong>June - Bootcamp.</strong> Workshops and mentors. Learn the
          stack, meet the people.
        </li>
        <li>
          <strong>July - Build-a-thon.</strong> Open build. Ship something real.
        </li>
        <li>
          <strong>August - Finals.</strong> Judging and showcase.
        </li>
      </ul>
      <p className="eco-bucket-note">TODO: confirm exact dates.</p>

      <h2>The hub</h2>
      <p>
        All of Zaal's projects live on one URL with documentation and build
        status - so anyone can point their coding agent at it and build on top.
      </p>
      <p className="eco-link">
        <a href="https://theballgames.com">theballgames.com</a>{" "}
        <em>(TODO: confirm this is the live/canonical URL)</em>
      </p>

      <h2>Build with us</h2>
      <p>Want in? Two steps:</p>
      <ol>
        <li>
          Go to <Link href="/join">How to Join</Link> and follow "Your first
          action."
        </li>
        <li>
          DM <a href="https://farcaster.xyz/zaal">@zaal on Farcaster</a> and
          tell us what you want to build.
        </li>
      </ol>
      <p>
        Mentors and workshops run through The ZAO's tooling. We keep it simple -
        join, and we point you at the right people.
      </p>
      <p>
        Honest note: this is real building, not a giveaway. There are no token
        promises and no financial returns implied - you come for the work, the
        people, and what you ship.
      </p>

      <p>
        <Link href="/org">How it all fits together</Link> &middot;{" "}
        <Link href="/join">Where do I plug in?</Link>
      </p>
    </article>
  );
}
