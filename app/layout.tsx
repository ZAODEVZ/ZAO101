import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { SITE_URL } from "@/lib/site";
import "./globals.css";

const TITLE = "ZAO 101 - Learn About The ZAO";
const DESCRIPTION =
  "The ZAO is a decentralized impact network. Music first, community second, tech third. Built in public, open source.";

// Farcaster Mini App embed, so the link renders as a rich card with an
// "Open" button in a cast instead of a plain URL. Both the current
// (fc:miniapp / launch_miniapp) and legacy (fc:frame / launch_frame) keys are
// emitted for client compatibility.
const miniappEmbed = {
  version: "1",
  imageUrl: `${SITE_URL}/share.png`,
  button: {
    title: "Open ZAO 101",
    action: {
      type: "launch_miniapp",
      name: "ZAO 101",
      url: SITE_URL,
      splashImageUrl: `${SITE_URL}/apple-icon`,
      splashBackgroundColor: "#0a1628",
    },
  },
};
const frameEmbed = {
  ...miniappEmbed,
  button: {
    ...miniappEmbed.button,
    action: { ...miniappEmbed.button.action, type: "launch_frame" },
  },
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: "%s - ZAO 101",
  },
  description: DESCRIPTION,
  openGraph: {
    type: "website",
    siteName: "ZAO 101",
    url: SITE_URL,
    title: TITLE,
    description: DESCRIPTION,
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
  other: {
    "fc:miniapp": JSON.stringify(miniappEmbed),
    "fc:frame": JSON.stringify(frameEmbed),
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
