// const withContentlayer = require("next-contentlayer");

const repo = "aicheha.github.io/next-web-markdown";
const assetPrefix = `/${repo}/`;
const basePath = `/${repo}`;

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  assetPrefix: assetPrefix,
  basePath: basePath,
  output: "export",
};

module.exports = nextConfig;
