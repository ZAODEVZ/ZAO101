import Link from "next/link";

export default function HomePage() {
  return (
    <div className="home">
      <section className="hero">
        <h1>The ZAO</h1>
        <p className="tagline">
          A decentralized impact network. Music first - artists, builders,
          listeners. Built in public on Base.
        </p>
        <div className="hero-cta">
          <Link href="/pillars" className="btn-primary">
            What it is
          </Link>
          <Link href="/join" className="btn-secondary">
            How to join
          </Link>
        </div>
      </section>

      <section className="start-here">
        <h2>Start here</h2>
        <p>
          New to The ZAO? This is the open front door - ZAO 101. No wallet
          needed. Read these in order:
        </p>
        <ol>
          <li>
            <strong>
              <Link href="/pillars">The four pillars</Link>
            </strong>{" "}
            - what The ZAO actually is.
          </li>
          <li>
            <strong>
              <Link href="/org">The org chart</Link>
            </strong>{" "}
            - how all the pieces fit together.
          </li>
          <li>
            <strong>
              <Link href="/ecosystem">The ecosystem</Link>
            </strong>{" "}
            - every live project, served from the ZAO Nexus.
          </li>
          <li>
            <strong>
              <Link href="/join">How to join</Link>
            </strong>{" "}
            - pick a door and take a first action.
          </li>
        </ol>
        <p>
          Already a member holding OG or ZOR? Go straight to{" "}
          <Link href="/201">ZAO 201</Link>, the members floor.
        </p>
      </section>

      <section className="pillars-grid">
        <h2>Four pillars</h2>
        <div className="grid">
          <Link href="/pillars#artist-org" className="tile">
            <div className="tile-tag">01</div>
            <h3>Artist Org</h3>
            <p>
              ZTalent Artist Organization - artists first. The reason The ZAO
              exists.
            </p>
          </Link>
          <Link href="/pillars#autonomous-org" className="tile">
            <div className="tile-tag">02</div>
            <h3>Autonomous Org</h3>
            <p>
              Fractals, Respect, on-chain governance. The community runs itself.
            </p>
          </Link>
          <Link href="/pillars#operating-system" className="tile">
            <div className="tile-tag">03</div>
            <h3>Operating System</h3>
            <p>
              The tools that make the org run - chat, music, events, payments.
            </p>
          </Link>
          <Link href="/pillars#open-source" className="tile">
            <div className="tile-tag">04</div>
            <h3>Open Source</h3>
            <p>
              Every part is forkable. Other communities can build on what we
              ship.
            </p>
          </Link>
        </div>
      </section>

      <section className="pillars-grid">
        <h2>Explore</h2>
        <div className="grid">
          <Link href="/org" className="tile">
            <div className="tile-tag">ORG</div>
            <h3>Org Chart</h3>
            <p>The ZAO is the umbrella. See what is incubated, partnered, and collabed.</p>
          </Link>
          <Link href="/ecosystem" className="tile">
            <div className="tile-tag">LIVE</div>
            <h3>Ecosystem Overview</h3>
            <p>Every ecosystem project, pulled live from the ZAO Nexus.</p>
          </Link>
          <Link href="/zabal-games" className="tile">
            <div className="tile-tag">BUILD</div>
            <h3>ZABAL Games</h3>
            <p>The front door for builders. Come in, build something, ship it.</p>
          </Link>
          <Link href="/201" className="tile">
            <div className="tile-tag">201</div>
            <h3>ZAO 201</h3>
            <p>The members floor. Token-gated. Hold OG or ZOR to enter.</p>
          </Link>
        </div>
      </section>
    </div>
  );
}
