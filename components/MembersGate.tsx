"use client";

import { useCallback, useEffect, useState } from "react";
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

type AccountsHandler = (accounts: string[]) => void;

interface EthereumProvider {
  request: (args: { method: string; params?: unknown[] }) => Promise<unknown>;
  // Optional EIP-1193 event API. Injected wallets expose these so a dapp can
  // react when the user switches or disconnects accounts in the wallet UI.
  on?: (event: string, handler: AccountsHandler) => void;
  removeListener?: (event: string, handler: AccountsHandler) => void;
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

  // Run the balance check for an address and move to granted/denied. Shared by
  // the initial connect, a silent reconnect, and the accountsChanged handler so
  // the gate always reflects the wallet's currently selected account. We only
  // read a balance on Optimism (via the gate's own RPC), so the wallet's active
  // chain does not matter and chainChanged needs no handling here.
  const check = useCallback(async (addr: Address) => {
    setError(null);
    setAddress(addr);
    setStatus("checking");
    try {
      const result = await checkAccess(addr);
      setStatus(result.hasAccess ? "granted" : "denied");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not check token balances.";
      setError(message);
      setStatus("error");
    }
  }, []);

  // On mount, silently restore a prior connection without prompting. eth_accounts
  // returns the already-authorized accounts (empty if the user never connected
  // or has since disconnected), so a page refresh keeps members on the floor.
  useEffect(() => {
    const provider = getProvider();
    if (!provider) return;

    let cancelled = false;

    provider
      .request({ method: "eth_accounts" })
      .then((result) => {
        const addr = (result as string[] | undefined)?.[0] as
          | Address
          | undefined;
        if (!cancelled && addr) check(addr);
      })
      .catch(() => {
        // No silent reconnect available; the user can still connect manually.
      });

    // React to the user switching or disconnecting accounts in their wallet so
    // the rendered view never shows a stale address.
    const onAccountsChanged: AccountsHandler = (accounts) => {
      const addr = accounts?.[0] as Address | undefined;
      if (addr) {
        check(addr);
      } else {
        setAddress(null);
        setError(null);
        setStatus("disconnected");
      }
    };

    provider.on?.("accountsChanged", onAccountsChanged);
    return () => {
      cancelled = true;
      provider.removeListener?.("accountsChanged", onAccountsChanged);
    };
  }, [check]);

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
      await check(addr);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not connect to the wallet.";
      setError(message);
      setStatus("error");
    }
  }

  // Forget the connection on our side and return to the connect prompt. Injected
  // wallets manage their own permissions, so this clears the local view rather
  // than revoking access in the wallet itself.
  function disconnect() {
    setAddress(null);
    setError(null);
    setStatus("disconnected");
  }

  if (status === "granted") {
    return (
      <>
        <p className="eco-bucket-note">
          Access granted for{" "}
          <span className="gate-address">{address}</span> (OG or ZOR held).{" "}
          <button type="button" className="gate-link" onClick={disconnect}>
            Disconnect
          </button>
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
