import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "How to Join",
  description:
    "How to engage with The ZAO. Tell us what you want to own, set your own commitment, pick a door.",
};

export default function JoinPage() {
  return (
    <article className="page">
      <h1>How to Join</h1>
      <p>
        Welcome. The ZAO is a small, real community - 100+ members, music first.
        There is a path in, and a clear place to start. You do not need a wallet
        for any of this. You need to show up and own something.
      </p>

      <div className="start-here">
        <h2>Your first action</h2>
        <p>Three steps. No wallet, no application.</p>
        <ol>
          <li>
            <strong>Decide what you want to own.</strong> Not "how can I help" -
            what specific thing do you want to be responsible for? A song, a
            tool, an event, a page like this one.
          </li>
          <li>
            <strong>Say it plainly.</strong> DM{" "}
            <a href="https://farcaster.xyz/zaal">@zaal on Farcaster</a>. That is
            the front door. We point you at the right group from there.
          </li>
          <li>
            <strong>Show up.</strong> The community meets every Monday at 6pm EST
            in small fractal groups - that is where the work gets done and your
            contribution gets recognized. Come to one and find your footing.
          </li>
        </ol>
      </div>

      <h2>How committing works</h2>
      <p>
        There is no application and no fixed quota. You set your own commitment
        and then you hit it.
      </p>
      <ul>
        <li>
          <strong>You set the level.</strong> One hour a week, ten hours a week,
          or undefined - you decide. The point is that you pick it, not us.
        </li>
        <li>
          <strong>You own a specific task or role.</strong> Commitment is
          attached to a real thing you are responsible for, not a vague vibe.
        </li>
        <li>
          <strong>You check in.</strong> You report progress, and you use Zaal
          to unblock when you are stuck. Getting unblocked is part of the job,
          not a failure.
        </li>
        <li>
          <strong>Every task has two people.</strong> A main and an understudy.
          The understudy can step in if the main goes dark, so nothing stalls on
          one person. Redundancy is built in on purpose.
        </li>
        <li>
          <strong>Contributions get logged.</strong> Work is recorded in a
          shared Telegram space, so the history of who did what is visible to
          the community.
        </li>
      </ul>

      <h2>The three doors</h2>
      <p>Pick the one that fits. Each is a different kind of commitment.</p>
      <ol>
        <li>
          <strong>Artists.</strong> Release through The ZAO, show up in
          fractals, collaborate. The community exists for you first. This is the
          deepest commitment and the most support.
        </li>
        <li>
          <strong>Builders.</strong> Ship something that helps - a tool, a fix,
          an event. Earn Respect for the work you do. Builder engagement runs
          through ZABAL Games, but you are joining The ZAO.
        </li>
        <li>
          <strong>Supporters and listeners.</strong> Back the community as a
          fan. You can hold <strong>$ZABAL, the community token on Base</strong>{" "}
          - one way to support, and it carries governance weight. It is a token
          inside The ZAO, not the umbrella. No financial advice; hold only what
          you choose to.
        </li>
      </ol>

      <h2>Ready to go deeper?</h2>
      <p>
        Once you hold OG or ZOR, the members floor opens up:{" "}
        <Link href="/201">ZAO 201</Link> - the fractal and Respect in practice,
        the tools, and how the commitment model actually runs day to day.
      </p>

      <p>
        <Link href="/">Home</Link> &middot;{" "}
        <Link href="/faq">Questions?</Link>
      </p>
    </article>
  );
}
