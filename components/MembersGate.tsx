"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAccount, useConnect, useDisconnect } from "wagmi";
import type { Address } from "viem";
import { checkAccess } from "@/lib/gate";

// CURATION, not security. This component only decides whether to render the
// members view (passed in as children). The same data is sent to every visitor;
// there are no secrets behind the gate.
//
// wagmi handles connecting and exposing the address (injected wallet on desktop,
// Farcaster Mini App connector inside Farcaster). The balance check itself still
// runs through lib/gate.ts on Optimism, unchanged.

type GateStatus = "idle" | "checking" | "granted" | "denied" | "error";

export default function MembersGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const { address, isConnected } = useAccount();
  const { connect, connectors, isPending, error: connectError } = useConnect();
  const { disconnect } = useDisconnect();

  const [gate, setGate] = useState<GateStatus>("idle");
  const [checkError, setCheckError] = useState<string | null>(null);

  // Whenever we have a connected address, check token balances. Re-runs if the
  // address changes (wagmi surfaces account switches), so the view never shows a
  // stale result.
  useEffect(() => {
    if (!isConnected || !address) {
      setGate("idle");
      setCheckError(null);
      return;
    }

    let cancelled = false;
    setGate("checking");
    setCheckError(null);
    checkAccess(address as Address)
      .then((result) => {
        if (cancelled) return;
        setGate(result.hasAccess ? "granted" : "denied");
      })
      .catch((err: unknown) => {
        if (cancelled) return;
        setCheckError(
          err instanceof Error
            ? err.message
            : "Could not check token balances.",
        );
        setGate("error");
      });

    return () => {
      cancelled = true;
    };
  }, [isConnected, address]);

  if (gate === "granted") {
    return (
      <>
        <p className="eco-bucket-note">
          Access granted for{" "}
          <span className="gate-address">{address}</span> (OG or ZOR held).{" "}
          <button
            type="button"
            className="gate-link"
            onClick={() => disconnect()}
          >
            Disconnect
          </button>
        </p>
        {children}
      </>
    );
  }

  if (gate === "denied") {
    return (
      <div className="gate">
        <h2>No OG or ZOR found in this wallet</h2>
        <p>
          We checked{" "}
          <span className="gate-address">{address}</span> on Optimism and did
          not find an OG or ZOR balance. The members floor is for holders.
        </p>
        <p>
          <strong>How to earn Respect and get in:</strong> Respect is earned by
          showing up and owning work - join a Monday fractal, take a task with a
          main-and-understudy pair, and log your contributions. OG and ZOR are
          how that participation gets recognized on-chain. Start at{" "}
          <Link href="/join">How to Join</Link> and tell us what you want to
          own.
        </p>
        <p>
          New to all of this? Head back to the open front door:{" "}
          <Link href="/">ZAO 101</Link>.
        </p>
        <div className="copy-row">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => disconnect()}
          >
            Try another wallet
          </button>
        </div>
      </div>
    );
  }

  // Not yet granted/denied: show the connect prompt. Covers idle, checking, and
  // error. While connecting or mid-check the buttons are disabled.
  const busy = isPending || gate === "checking";
  const message = checkError ?? (connectError ? connectError.message : null);

  return (
    <div className="gate">
      <h2>Members floor - connect to enter</h2>
      <p>
        ZAO 201 is for members who hold either token on Optimism: the OG
        (ERC-20) or the ZOR (ERC-1155). Connect your wallet so we can check.
      </p>
      <div className="copy-row">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            type="button"
            className="btn-primary"
            onClick={() => connect({ connector })}
            disabled={busy}
          >
            {gate === "checking"
              ? "Checking balances..."
              : isPending
                ? "Connecting..."
                : `Connect ${connector.name}`}
          </button>
        ))}
      </div>
      {message ? <p className="gate-error">{message}</p> : null}
      <p className="gate-note">
        This gate is curation, not security - it only decides what gets shown.
        We read your balance to render the right view and store nothing. New
        here? Start with <Link href="/">ZAO 101</Link>.
      </p>
    </div>
  );
}
