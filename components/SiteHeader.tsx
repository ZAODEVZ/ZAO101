import Link from "next/link";

const NAV = [
  { href: "/pillars", label: "Pillars" },
  { href: "/org", label: "Org" },
  { href: "/ecosystem", label: "Ecosystem" },
  { href: "/zabal-games", label: "ZABAL Games" },
  { href: "/join", label: "Join" },
  { href: "/faq", label: "FAQ" },
  { href: "/201", label: "ZAO 201" },
];

export default function SiteHeader() {
  return (
    <header className="topnav">
      <Link href="/" className="brand">
        ZAO 101
      </Link>
      <nav aria-label="Primary">
        {NAV.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
        <a href="https://thezao.com" className="external">
          thezao.com
        </a>
      </nav>
    </header>
  );
}
