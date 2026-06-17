"use client";

import { useState } from "react";

// One-click copy of the plain-text org chart, with a "copied" confirmation.
// No dependency - uses the Clipboard API with a textarea fallback.

export default function OrgCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
      } else {
        const ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <div className="copy-row">
      <button type="button" className="btn-primary" onClick={copy}>
        Copy plain-text chart
      </button>
      {copied ? (
        <span className="copy-status" role="status" aria-live="polite">
          Copied
        </span>
      ) : null}
    </div>
  );
}
