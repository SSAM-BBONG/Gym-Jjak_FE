import type { NextConfig } from "next";
import withBundleAnalyzer from '@next/bundle-analyzer'

const nextConfig: NextConfig = {
    experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
  /* config options here */
  output: 'standalone'
};

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true
})


module.exports = nextConfig;

export default bundleAnalyzer(nextConfig);
