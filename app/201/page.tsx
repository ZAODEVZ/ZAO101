import type { Metadata } from "next";
import Link from "next/link";
import GroupedLinks from "@/components/GroupedLinks";
import MembersGate from "@/components/MembersGate";
import { fetchGrouped } from "@/lib/nexus";

export const metadata: Metadata = {
  title: "ZAO 201 - Members Floor",
  description:
    "The token-gated members floor. The fractal, Respect, and OREC in practice; the tools; the commitment model; the lab and graduation.",
};

// Server component. Fetches the members links once (community audience,
// grouped) with 1-hour ISR, then hands them to the gate. The gate is curation:
// it only decides whether the reveal renders. No local copy of link data.
export default async function MembersPage() {
  const data = await fetchGrouped({ audience: "community" });

  return (
    <article className="page">
      <span className="tier-badge">TIER 2</span>
      <h1>ZAO 201</h1>
      <p>
        The members floor. Everything on ZAO 101 is open to anyone. ZAO 201 is
        for members - the people who hold OG or ZOR and run the org day to day.
        This is where the how-to lives.
      </p>

      <MembersGate>
        <section>
          <h2>Your first week on the floor</h2>
          <p>Just got in? Here is the path for your first week.</p>
          <ol>
            <li>
              <strong>Come to the Monday fractal.</strong> Members meet every
              Monday at 6pm EST in small groups - that is where the week's work
              and ranking happen. Show up and meet your group.
            </li>
            <li>
              <strong>Claim something to own.</strong> Pick a specific task or
              role, set your level (1h/wk, 10h/wk, or undefined), and pair up -
              every task has a main and an understudy.
            </li>
            <li>
              <strong>Log your work.</strong> Contributions go in the shared
              Telegram space; that log is what feeds Respect at the fractal.
            </li>
            <li>
              <strong>
                Make <a href="https://zaoos.com">zaoos.com</a> your home base.
              </strong>{" "}
              Chat, music, events, and the org's tooling all come together
              there. The members directory below has the rest.
            </li>
          </ol>

          <h2>The fractal, Respect, and OREC</h2>
          <p>
            The ZAO governs itself through a fractal process. Every Monday at
            6pm EST, members meet in small breakout groups, do the work of the
            week, and rank each other's contributions. That ranking is{" "}
            <strong>Respect</strong> - a measure of contribution, not a tradable
            stake. <strong>OREC</strong> (Optimistic Respect-based Executive
            Contracts) is how a small group can take action on behalf of the
            whole without waiting on everyone, with the community able to push
            back if needed. Fractal plus Respect plus OREC is the engine: it
            keeps decisions moving while keeping them earned.
          </p>

          <h2>The tools</h2>
          <p>
            The members view below is served live from the ZAO Nexus, the same
            single source of truth used everywhere on this site. The everyday
            home base is <a href="https://zaoos.com">zaoos.com</a> - the ZAO
            operating system where chat, music, events, and the org's tooling
            come together. Use the live list to find the rest.
          </p>

          <h2>The commitment model, in practice</h2>
          <p>
            On <Link href="/join">ZAO 101</Link> you set your own commitment.
            Here is how it actually runs: you own a specific task or role, you
            set your level (1h/wk, 10h/wk, or undefined), and you check in. Every
            task has <strong>two people</strong> - a main and an understudy who
            can step in if the main goes dark - so nothing stalls on one person.
            Contributions get logged in a shared Telegram space, and that log is
            what feeds Respect at the Monday fractal. Stuck? Use Zaal to unblock;
            that is part of the role, not a failure.
          </p>

          <h2>The lab and graduation</h2>
          <p>
            New work starts in the lab: an idea becomes a task, the task gets a
            main and an understudy, and it runs until it either proves itself or
            gets dropped. Projects that prove themselves graduate - the clearest
            path is an incubated project spinning out toward its own sub-DAO, the
            way WaveWarZ is. Graduation is earned the same way Respect is: by
            shipping, in public, with the work logged.
          </p>

          <h2>The members directory</h2>
        </section>

        <GroupedLinks data={data} />
      </MembersGate>

      <p>
        <Link href="/">Back to ZAO 101</Link>
      </p>
    </article>
  );
}
