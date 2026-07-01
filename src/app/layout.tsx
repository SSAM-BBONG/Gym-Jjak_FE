import Script from "next/script";
import "./globals.css";
import { Geist } from "next/font/google";
import { Metadata } from "next";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  verification: {
    google: 'nZEMBE-gaUgMx2Yx8lmVxPp50HvKZqcQU69mtiOLGA8',
  },

  metadataBase: new URL('https://13.124.200.97.sslip.io'),

  applicationName: "GYMJJAK",

  title: {
    default: "GYMJJAK - 나에게 맞는 PT 파트너",
    template: "%s | GYMJJAK",
  },

  description:
    "트레이너와 회원을 연결하고 PT 검색, 예약, 운동 기록과 피드백 관리를 제공하는 피트니스 플랫폼입니다.",

  keywords: [
    "짐짝",
    "GYMJJAK",
    "PT",
    "헬스",
    "트레이닝",
    "퍼스널 트레이닝",
    "트레이너 찾기",
    "PT 예약",
    "운동 기록",
    "온라인 PT",
  ],

  authors: [{ name: "SSAMBBONG", url: 'https://13.124.200.97.sslip.io' }],
  creator: "SSAMBBONG",
  publisher: "SSAMBBONG",

  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: "/",
    siteName: "GYMJJAK",
    title: "GYMJJAK - 나에게 맞는 PT 파트너",
    description:
      "트레이너 검색부터 PT 예약, 운동 기록과 피드백까지 한곳에서 관리하세요.",
    images: [
      {
        url: '/images/open-graph-img.png',
        width: 1200,
        height: 630,
        alt: "GYMJJAK 서비스 소개",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "GYMJJAK - 나에게 맞는 PT 파트너",
    description:
      "트레이너 검색부터 PT 예약, 운동 기록과 피드백까지 한곳에서 관리하세요.",
    images: ['/images/open-graph-img.png'],
    creator: 'SSAMBBONG'

  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
    >

      <body>
        {/* 카카오맵 사용을 위한 layout에서 sdk로드하여 필요한 페이지에서 바로 카카오맵 사용할 수 있게 설절 */}
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&libraries=services&autoload=false`}
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
