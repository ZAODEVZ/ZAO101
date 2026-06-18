"use client";

import { useEffect } from "react";
import Link from "next/link";

// Route-level error boundary. Must be a Client Component. Keeps an unexpected
// failure on-brand and gives the reader a way out instead of a blank or
// unstyled default screen. Renders inside the root layout (header and footer
// stay present).
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Surface the error in the console for debugging; we store nothing.
    console.error(error);
  }, [error]);

  return (
    <article className="page">
      <h1>Something went wrong</h1>
      <p>
        That is on us, not you. Try again - if it keeps happening, the open
        front door still works.
      </p>
      <div className="hero-cta">
        <button type="button" className="btn-primary" onClick={() => reset()}>
          Try again
        </button>
        <Link href="/" className="btn-secondary">
          Back to ZAO 101
        </Link>
      </div>
    </article>
  );
}
