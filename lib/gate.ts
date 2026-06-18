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

// Returns access status for an address. Each balance check is isolated so one
// failing call (e.g. a flaky RPC) does not block the other token's result.
export async function checkAccess(address: Address): Promise<GateResult> {
  const [ogBal, zorBal] = await Promise.all([
    publicClient
      .readContract({
        address: OG_ADDRESS,
        abi: erc20Abi,
        functionName: "balanceOf",
        args: [address],
      })
      .catch(() => 0n),
    publicClient
      .readContract({
        address: ZOR_ADDRESS,
        abi: ERC1155_BALANCE_ABI,
        functionName: "balanceOf",
        args: [address, 0n],
      })
      .catch(() => 0n),
  ]);

  const holdsOg = ogBal > 0n;
  const holdsZor = zorBal > 0n;
  return { holdsOg, holdsZor, hasAccess: holdsOg || holdsZor };
}
