const appRepo = process.env.NEXT_PUBLIC_APP_REPO;
const assetPrefix = appRepo ? `/${appRepo}/` : "";
const basePath = appRepo ? `/${appRepo}` : "";

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: assetPrefix,
  basePath: basePath,
  output: process.env.NODE_ENV === "development" ? undefined : "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
