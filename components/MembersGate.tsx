"use client";

import { useState } from "react";
import Link from "next/link";
import type { Address } from "viem";
import { checkAccess } from "@/lib/gate";

// CURATION, not security. This component only decides whether to render the
// members view (passed in as children). The same data is sent to every visitor;
// there are no secrets behind the gate.

type Status =
  | "disconnected"
  | "connecting"
  | "checking"
  | "granted"
  | "denied"
  | "error";

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
}

function getProvider(): EthereumProvider | null {
  if (typeof window === "undefined") return null;
  const eth = (window as unknown as { ethereum?: EthereumProvider }).ethereum;
  return eth ?? null;
}

export default function MembersGate({
  children,
}: {
  children: React.ReactNode;
}) {
  const [status, setStatus] = useState<Status>("disconnected");
  const [address, setAddress] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function connect() {
    setError(null);
    const provider = getProvider();
    if (!provider) {
      setError(
        "No wallet found. Install an injected wallet (e.g. MetaMask, Rabby, Coinbase Wallet) and try again."
      );
      setStatus("error");
      return;
    }

    try {
      setStatus("connecting");
      const accounts = (await provider.request({
        method: "eth_requestAccounts",
      })) as string[];
      const addr = accounts?.[0] as Address | undefined;
      if (!addr) {
        setError("No account returned by the wallet.");
        setStatus("error");
        return;
      }
      setAddress(addr);

      setStatus("checking");
      const result = await checkAccess(addr);
      setStatus(result.hasAccess ? "granted" : "denied");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not connect to the wallet.";
      setError(message);
      setStatus("error");
    }
  }

  if (status === "granted") {
    return (
      <>
        <p className="eco-bucket-note">
          Access granted for{" "}
          <span className="gate-address">{address}</span> (OG or ZOR held).
        </p>
        {children}
      </>
    );
  }

  if (status === "denied") {
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
            onClick={connect}
          >
            Try another wallet
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="gate">
      <h2>Members floor - connect to enter</h2>
      <p>
        ZAO 201 is for members who hold either token on Optimism: the OG
        (ERC-20) or the ZOR (ERC-1155). Connect your wallet so we can check.
      </p>
      <div className="copy-row">
        <button
          type="button"
          className="btn-primary"
          onClick={connect}
          disabled={status === "connecting" || status === "checking"}
        >
          {status === "connecting"
            ? "Connecting..."
            : status === "checking"
              ? "Checking balances..."
              : "Connect wallet"}
        </button>
      </div>
      {error ? <p className="gate-error">{error}</p> : null}
      <p className="gate-note">
        This gate is curation, not security - it only decides what gets shown.
        We read your balance to render the right view and store nothing. New
        here? Start with <Link href="/">ZAO 101</Link>.
      </p>
    </div>
  );
}
