// Shared artwork for generated share images (Open Graph, Twitter, Farcaster).
// Returns a plain element tree for next/og's ImageResponse - inline styles only,
// every multi-child element uses display:flex (an ImageResponse requirement).

const NAVY = "#0a1628";
const GOLD = "#f5a623";
const INK_2 = "#94a3b8";

export function ShareArt({
  width,
  height,
}: {
  width: number;
  height: number;
}) {
  return (
    <div
      style={{
        width,
        height,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 80,
        background: NAVY,
        fontFamily: "sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          fontSize: 30,
          letterSpacing: 10,
          color: GOLD,
          fontWeight: 800,
        }}
      >
        ZAO 101
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 124,
          fontWeight: 800,
          color: GOLD,
          lineHeight: 1.05,
          marginTop: 12,
        }}
      >
        The ZAO
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 44,
          color: INK_2,
          marginTop: 20,
        }}
      >
        Music first. Community second. Tech third.
      </div>
      <div
        style={{
          display: "flex",
          fontSize: 28,
          color: INK_2,
          marginTop: 24,
        }}
      >
        A decentralized impact network. Built in public.
      </div>
    </div>
  );
}
