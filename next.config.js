/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  experimental: {
    forceSwcTransforms: true,
  },
  // 禁用 webpack 缓存以避免内存分配错误
  webpack: (config) => {
    config.cache = false;
    return config;
  },
  devIndicators: false,
  turbopack: {},
};
module.exports = nextConfig;