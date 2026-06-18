import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  description: "This page does not exist. Head back to ZAO 101.",
};

// Custom 404 so a missing page stays on-brand (dark theme, ZAO voice) instead
// of falling back to the unstyled default. Renders inside the root layout, so
// the site header and footer are already present.
export default function NotFound() {
  return (
    <article className="page">
      <h1>Page not found</h1>
      <p>
        This page does not exist, or it moved. No problem - the front door is
        always open.
      </p>
      <div className="hero-cta">
        <Link href="/" className="btn-primary">
          Back to ZAO 101
        </Link>
        <Link href="/join" className="btn-secondary">
          How to join
        </Link>
      </div>
    </article>
  );
}
