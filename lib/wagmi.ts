// wagmi config for the 201 gate. wagmi is used ONLY to connect and read the
// connected address - the token balance check still runs through the dedicated
// viem client in lib/gate.ts. Two connectors: the Farcaster Mini App connector
// (one-tap connect for members inside Farcaster, where most of them are) and
// the generic injected connector (desktop extensions like MetaMask/Rabby).
//
// Option A: no WalletConnect / Reown, so no projectId and no dashboard setup.
import { createConfig, http } from "wagmi";
import { optimism } from "wagmi/chains";
import { injected } from "wagmi/connectors";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";

export const wagmiConfig = createConfig({
  chains: [optimism],
  connectors: [farcasterMiniApp(), injected()],
  // wagmi requires a transport per chain even though the gate's balance reads
  // use lib/gate.ts; this serves wagmi's own internal calls.
  transports: {
    [optimism.id]: http(),
  },
  ssr: true,
});

declare module "wagmi" {
  interface Register {
    config: typeof wagmiConfig;
  }
}
