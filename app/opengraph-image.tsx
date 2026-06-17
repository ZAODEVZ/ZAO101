import { ImageResponse } from "next/og";
import { ShareArt } from "@/components/ShareArt";

// Branded 1200x630 image served as the site-wide Open Graph card.
export const alt = "The ZAO - ZAO 101. Music first. Built in public.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(ShareArt(size), size);
}
