import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo-name>; the deploy workflow sets this.
// Cloudflare serves from the domain root, so it stays empty there.
const basePath = process.env.PAGES_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
