/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    forceSwcTransforms: true,
  },
};
module.exports = nextConfig;