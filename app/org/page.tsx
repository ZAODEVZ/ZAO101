import type { Metadata } from "next";
import Link from "next/link";
import OrgCopyButton from "@/components/OrgCopyButton";

export const metadata: Metadata = {
  title: "Org Chart",
  description:
    "How The ZAO fits together. The ZAO is the umbrella - an incubator and impact network. ZABAL is an incubated project, never the marquee.",
};

const ORG_PLAIN_TEXT = `THE ZAO
  umbrella - incubator + impact network, community-focused,
  ALWAYS the lead brand everywhere
  |
  +-- INCUBATED PROJECTS (ZAO-owned, cofounders)
  |     - WaveWarZ              -> sub-DAO spinout
  |     - ZAO Festivals         -> ZAOstock
  |     - ZABAL / ZABAL Games   outsider-facing builder engagement
  |                             that GROWS The ZAO; also the toolstack
  |                             the team builds with; $ZABAL = the token
  |
  +-- COMMUNITY PARTNERSHIPS (beside The ZAO, equal billing)
  |     - COC Concertz          led by Thy Revolution,
  |                             NOT owned by The ZAO
  |
  +-- COMMUNITY COLLABS (co-created, unnamed set)
        - misc community collaborations`;

export default function OrgPage() {
  return (
    <article className="page">
      <h1>The ZAO Org Chart</h1>
      <p>
        How all of it fits together, in one picture. The one-line model:{" "}
        <strong>
          The ZAO is the umbrella - an incubator and impact network. Everything
          else is either a project incubated under it, a partnership beside it,
          or a community collab.
        </strong>
      </p>

      <div className="org-top">
        <div className="org-node org-node-top">
          <div className="org-node-title">THE ZAO</div>
          <div className="org-node-sub">
            The umbrella. An incubator and impact network. Community-focused.
            The lead brand everywhere - the name you say first, every time.
          </div>
        </div>
      </div>

      <div className="org-cols">
        <div className="org-col">
          <div className="org-col-label">Incubated projects</div>
          <div className="org-col-note">ZAO-owned, built with cofounders</div>
          <div className="org-node">
            <strong>WaveWarZ</strong>
            <span>On the path to its own sub-DAO spinout.</span>
          </div>
          <div className="org-node">
            <strong>ZAO Festivals</strong>
            <span>Runs ZAOstock.</span>
          </div>
          <div className="org-node">
            <strong>ZABAL / ZABAL Games</strong>
            <span>
              Outsider-facing builder engagement that grows The ZAO - people
              come in to build. Also the toolstack the team builds with. $ZABAL
              is the community token on Base. An incubated project, never the
              marquee.
            </span>
          </div>
        </div>

        <div className="org-col">
          <div className="org-col-label">Community partnerships</div>
          <div className="org-col-note">Beside The ZAO, equal billing</div>
          <div className="org-node org-node-partner">
            <strong>COC Concertz</strong>
            <span>
              Community partnership - led by Thy Revolution, NOT owned by The
              ZAO. Present it side by side ("ZAO Festivals + COC Concertz"),
              never "The ZAO's COC."
            </span>
          </div>
        </div>

        <div className="org-col">
          <div className="org-col-label">Community collabs</div>
          <div className="org-col-note">Co-created, unnamed set</div>
          <div className="org-node">
            <span>Misc community collaborations. No need to name each.</span>
          </div>
        </div>
      </div>

      <h2>Naming rules (so The ZAO stops getting eclipsed)</h2>
      <ol>
        <li>
          <strong>Say "The ZAO" first.</strong> In any external comm - to
          partners, on decks, on pamphlets, in group names - The ZAO is the lead
          brand. ZABAL is not the headline.
        </li>
        <li>
          <strong>ZABAL is an incubated project.</strong> Use it for the
          builder engagement (ZABAL Games) and the toolstack the team builds
          with. It does not stand in for The ZAO as the umbrella, and it is
          never the marquee.
        </li>
        <li>
          <strong>$ZABAL the token is fine as-is.</strong> It is a deployed
          on-chain community token on Base. A piece inside the network, not the
          umbrella.
        </li>
        <li>
          <strong>
            Partners get "community partnership," not "project under The ZAO."
          </strong>{" "}
          COC Concertz and similar are partnerships with equal billing. Respect
          their ownership.
        </li>
        <li>
          <strong>Incubated vs partnership is the key distinction.</strong>{" "}
          Incubated = ZAO-owned with cofounders (WaveWarZ, ZAO Festivals, ZABAL
          / ZABAL Games). Partnership = beside The ZAO (COC). Do not blur them.
        </li>
      </ol>

      <h2>Plain-text version (copy + share)</h2>
      <OrgCopyButton text={ORG_PLAIN_TEXT} />
      <pre className="org-text">{ORG_PLAIN_TEXT}</pre>

      <p>
        <Link href="/">Home</Link> &middot;{" "}
        <Link href="/join">Where do I plug in?</Link>
      </p>
    </article>
  );
}
