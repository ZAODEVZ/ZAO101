import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "The Four Pillars",
  description:
    "The ZAO stands on four pillars: Artist Org, Autonomous Org, Operating System, Open Source.",
};

export default function PillarsPage() {
  return (
    <article className="page">
      <h1>The Four Pillars</h1>
      <p>
        The ZAO stands on four pillars. Each one is a real part of what the
        community does every week.
      </p>

      <h2 id="artist-org">01 - Artist Org</h2>
      <p>
        ZTalent Artist Organization. The ZAO exists because artists needed a
        community that took them seriously.
      </p>
      <div className="placeholder">
        TODO: write what "artist org" means in practice - release collabs,
        shared resources, cyphers, ZAOstock.
      </div>

      <h2 id="autonomous-org">02 - Autonomous Org</h2>
      <p>
        The community governs itself. Fractal meetings every Monday 6pm EST.
        Respect tokens (OG + ZOR). On-chain when it matters, off-chain when it
        does not.
      </p>
      <div className="placeholder">
        TODO: explain fractals, OREC, how decisions actually get made. One
        concrete example.
      </div>

      <h2 id="operating-system">03 - Operating System</h2>
      <p>
        The tools that make the org run. Chat. Music player. Events. Payments.
        Agents. Every tool is owned by the community, forkable, and
        interoperable.
      </p>
      <ul>
        <li>
          <strong>ZAO OS</strong> - the community chat client and home base.
        </li>
        <li>
          <strong>ZOE</strong> - the agent that helps run the org day to day.
        </li>
        <li>
          <strong>ZABAL / ZABAL Games</strong> - an incubated project: the
          builder engagement program where new builders come in, plus the
          toolstack the team builds with. It powers the work - it is not the
          top-level brand. (See the <Link href="/org">org chart</Link>.)
        </li>
        <li>
          <strong>WaveWarZ</strong> - an incubated project, on its way to its
          own sub-DAO.
        </li>
      </ul>

      <h2 id="open-source">04 - Open Source</h2>
      <p>
        Everything is in the open. Other music communities can fork the org and
        ship their own version.
      </p>
      <div className="placeholder">
        TODO: link the GitHub orgs. Show the fork example. Explain why open
        source matters here (data ownership, artist leverage).
      </div>

      <p>
        <Link href="/">Home</Link> &middot;{" "}
        <Link href="/join">Ready to join?</Link>
      </p>
    </article>
  );
}
