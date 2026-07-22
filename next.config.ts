import type { NextConfig } from "next";
import bundleAnalyzer from '@next/bundle-analyzer';

// 환경 변수 ANALYZE가 'true'일 때만 플러그인 활성화
const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true, // 빌드 완료 시 자동으로 브라우저 탭 열기
});

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_PORTONE_STORE_ID: process.env.VITE_PORTONE_STORE_ID,
    NEXT_PUBLIC_PORTONE_CHANNEL_KEY: process.env.VITE_PORTONE_CHANNEL_KEY,
  },
    experimental: {
    serverActions: {
      bodySizeLimit: "20mb",
    },
  },
images: {
  remotePatterns: [
    {
      protocol: "https",
      hostname: "gymjjak-prod.s3.ap-northeast-2.amazonaws.com",
      pathname: "/uploads/**",
    },
  ],
},
  /* config options here */
  output: 'standalone'
};
export default withBundleAnalyzer(nextConfig);
