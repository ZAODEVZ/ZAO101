import type { Metadata } from "next";
import Link from "next/link";
import GroupedLinks from "@/components/GroupedLinks";
import { fetchGrouped } from "@/lib/nexus";

export const metadata: Metadata = {
  title: "Ecosystem",
  description:
    "Every live project in The ZAO ecosystem, served directly from the ZAO Nexus. The ZAO is the umbrella.",
};

// Server component. Pulls the ecosystem audience, grouped, with 1-hour ISR.
// The Nexus is the single source of truth - we never keep a local copy.
export default async function EcosystemPage() {
  const data = await fetchGrouped({ audience: "ecosystem" });

  return (
    <article className="page">
      <h1>The ZAO Ecosystem</h1>
      <p>
        <strong>The ZAO</strong> is the umbrella - a decentralized impact
        network. The list below is served live from the ZAO Nexus, the
        canonical directory for everything in the ecosystem. New here? The{" "}
        <Link href="/org">org chart</Link> shows how it all fits together, and{" "}
        <Link href="/join">How to Join</Link> shows where you plug in.
      </p>

      <GroupedLinks data={data} />

      <p>
        <Link href="/org">How it all fits together</Link> &middot;{" "}
        <Link href="/join">Where do I plug in?</Link>
      </p>
    </article>
  );
}
