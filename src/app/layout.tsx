import Script from "next/script";
import "./globals.css";
import { Geist } from "next/font/google";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
    >

      <body>
        {/* 카카오맵 사용을 위한 layout에서 sdk로드하여 필요한 페이지에서 바로 카카오맵 사용할 수 있게 설절 */}
        <Script
          src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_KAKAO_MAP_KEY}&libraries=services&autoload=false`}
          strategy="afterInteractive"
        />
        {children}
      </body>
    </html>
  );
}
