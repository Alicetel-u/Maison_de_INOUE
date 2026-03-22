import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/Maison_de_INOUE",
  assetPrefix: "/Maison_de_INOUE",
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
