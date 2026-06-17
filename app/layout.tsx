import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://zao-101.vercel.app"),
  title: {
    default: "ZAO 101 - Learn About The ZAO",
    template: "%s - ZAO 101",
  },
  description:
    "The ZAO is a decentralized impact network. Music first, community second, tech third. Built in public, open source.",
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
