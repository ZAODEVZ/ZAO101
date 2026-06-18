import { ImageResponse } from "next/og";
import { ShareArt } from "@/components/ShareArt";

// Dedicated 3:2 image for the Farcaster Mini App embed (its recommended
// aspect ratio). Served at a stable path: /share.png
export const runtime = "nodejs";
// Next 15 makes Route Handlers dynamic by default. This image takes no request
// input, so render it once at build time and serve it statically.
export const dynamic = "force-static";

export function GET() {
  const size = { width: 1200, height: 800 };
  return new ImageResponse(ShareArt(size), size);
}
