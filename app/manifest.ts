import type { MetadataRoute } from "next";

// Web app manifest so ZAO 101 is installable on phones (most members are on
// mobile) and the installed app uses the ZAO colors. Next links this
// automatically via the metadata file convention, so no layout change is needed.
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ZAO 101 - Learn About The ZAO",
    short_name: "ZAO 101",
    description:
      "The ZAO is a decentralized impact network. Music first, community second, tech third.",
    start_url: "/",
    display: "standalone",
    background_color: "#0a1628",
    theme_color: "#0a1628",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon", type: "image/png", sizes: "180x180" },
    ],
  };
}
