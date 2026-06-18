// ZAO 201 access gate. CURATION, not security: it only decides what UI renders.
// There are no secrets behind it - the link data is identical for everyone.
//
// We read balances on Optimism (chainId 10) through a public RPC via viem,
// independent of whatever chain the connected wallet is currently on. Holding
// EITHER token grants access.

import { createPublicClient, erc20Abi, fallback, http, type Address } from "viem";
import { optimism } from "viem/chains";

// OG: ERC-20 - access if balanceOf(addr) > 0
export const OG_ADDRESS: Address =
  "0x34cE89baA7E4a4B00E17F7E4C0cb97105C216957";
// ZOR: ERC-1155 - access if balanceOf(addr, 0) > 0
export const ZOR_ADDRESS: Address =
  "0x9885CCeEf7E8371Bf8d6f2413723D25917E7445c";

const ERC1155_BALANCE_ABI = [
  {
    name: "balanceOf",
    type: "function",
    stateMutability: "view",
    inputs: [
      { name: "account", type: "address" },
      { name: "id", type: "uint256" },
    ],
    outputs: [{ name: "", type: "uint256" }],
  },
] as const;

// Optimism RPC endpoints. The gate makes only two read calls, but public nodes
// rate-limit, so we spread requests across several free public endpoints with a
// fallback transport: viem auto-fails-over to the next node and re-ranks them by
// latency and stability every few seconds. This means the gate works with no
// configuration. NEXT_PUBLIC_OPTIMISM_RPC_URL, if set, is tried first - point it
// at a dedicated provider only if the public nodes prove insufficient. The var
// must be NEXT_PUBLIC_ as this client runs in the browser.
const RPC_URLS = [
  process.env.NEXT_PUBLIC_OPTIMISM_RPC_URL,
  "https://mainnet.optimism.io",
  "https://optimism-rpc.publicnode.com",
  "https://optimism.llamarpc.com",
  "https://optimism.drpc.org",
].filter((url): url is string => Boolean(url));

const publicClient = createPublicClient({
  chain: optimism,
  transport: fallback(
    RPC_URLS.map((url) => http(url)),
    { rank: true },
  ),
});

export interface GateResult {
  hasAccess: boolean;
  holdsOg: boolean;
  holdsZor: boolean;
}

// Returns access status for an address. The two reads are independent, and we
// treat a read that fails differently from one that returns zero: collapsing an
// RPC error into "0 balance" would falsely deny a real holder whenever the
// public nodes are flaky. So we throw on an indeterminate result and let the
// caller surface a retry instead of rendering a wrong "denied".
export async function checkAccess(address: Address): Promise<GateResult> {
  const [ogRes, zorRes] = await Promise.allSettled([
    publicClient.readContract({
      address: OG_ADDRESS,
      abi: erc20Abi,
      functionName: "balanceOf",
      args: [address],
    }),
    publicClient.readContract({
      address: ZOR_ADDRESS,
      abi: ERC1155_BALANCE_ABI,
      functionName: "balanceOf",
      args: [address, 0n],
    }),
  ]);

  const holdsOg = ogRes.status === "fulfilled" && ogRes.value > 0n;
  const holdsZor = zorRes.status === "fulfilled" && zorRes.value > 0n;

  // A confirmed positive balance is authoritative - grant even if the other
  // read failed, since access needs only one of the two tokens.
  if (holdsOg || holdsZor) {
    return { holdsOg, holdsZor, hasAccess: true };
  }

  // No positive balance seen. If either read failed we cannot prove the wallet
  // holds nothing, so we refuse to render a false denial and ask for a retry.
  if (ogRes.status === "rejected" || zorRes.status === "rejected") {
    throw new Error(
      "Could not reach Optimism to check your balances. Please try again.",
    );
  }

  // Both reads succeeded and both were zero: a confident denial.
  return { holdsOg: false, holdsZor: false, hasAccess: false };
}
