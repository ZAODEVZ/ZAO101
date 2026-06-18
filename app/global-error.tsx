"use client";

import { useEffect } from "react";

// Last-resort boundary for errors thrown in the root layout itself, which the
// route-level error.tsx cannot catch. It replaces the whole document, so it
// renders its own <html>/<body> and uses inline styles (globals.css may not have
// loaded if the layout failed). Dark theme, ZAO colors, plain voice.
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0a1628",
          color: "#e2e8f0",
          fontFamily:
            '-apple-system, BlinkMacSystemFont, "Inter", "Segoe UI", sans-serif',
          lineHeight: 1.6,
          padding: "24px",
        }}
      >
        <div style={{ maxWidth: "32rem" }}>
          <h1 style={{ color: "#f5a623", marginTop: 0 }}>
            Something went wrong
          </h1>
          <p>
            That is on us, not you. Try again - if it keeps happening, come back
            in a bit.
          </p>
          <div style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => reset()}
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "14px",
                border: "1px solid #f5a623",
                background: "#f5a623",
                color: "#0a1628",
                cursor: "pointer",
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                padding: "10px 20px",
                borderRadius: "8px",
                fontWeight: 700,
                fontSize: "14px",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                color: "#e2e8f0",
                textDecoration: "none",
              }}
            >
              Back to ZAO 101
            </a>
          </div>
        </div>
      </body>
    </html>
  );
}
