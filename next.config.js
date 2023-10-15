// const withContentlayer = require("next-contentlayer");

const repo = "next-web-markdown";
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // assetPrefix: assetPrefix,
  // basePath: "/next-web-markdown",
  output: "export",
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig;
