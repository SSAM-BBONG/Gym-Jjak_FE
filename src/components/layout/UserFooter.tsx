import Image from "next/image";
import Link from "next/link";
import { FooterBlog, FooterInsta, FooterYoutube, Logo } from "../ui/image";

const serviceLinks = [
  { href: "/pt/find", label: "PT 센터 찾기" },
  { href: "/meal", label: "식단 관리" },
  { href: "/calendar", label: "운동 캘린더" },
  { href: "/community", label: "커뮤니티" },
];

const supportLinks = [
  { href: "/mypage", label: "마이페이지" },
  { href: "/pt/records", label: "PT 이용 내역" },
  { href: "/alarm", label: "알림" },
];

export default function UserFooter() {
  return (
    <footer className="border-t border-white/10 bg-[#080c14] text-slate-300">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12 lg:py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bfff0b]">
              <Image src={Logo} alt="GYMJJAK 로고" width={42} height={42} className="rounded-xl" />
              <span>
                <span className="block text-sm font-black tracking-[0.12em] text-[#cfff4a]">GYMJJAK</span>
                <span className="mt-0.5 block text-xs text-slate-500">FITNESS PLATFORM</span>
              </span>
            </Link>
            <p className="mt-5 max-w-sm text-sm leading-6 text-slate-400">
              PT 센터 찾기부터 운동 일정과 식단 기록까지,
              <br className="hidden sm:block" /> 건강한 일상을 위한 루틴을 함께합니다.
            </p>
            <div className="mt-6 flex items-center gap-2.5" aria-label="GYMJJAK 소셜 채널">
              {[FooterBlog, FooterInsta, FooterYoutube].map((icon, index) => (
                <span key={icon} className="flex size-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
                  <Image
                    src={icon}
                    alt={["블로그", "인스타그램", "유튜브"][index]}
                    width={16}
                    height={16}
                  />
                </span>
              ))}
            </div>
          </div>

          <nav aria-label="서비스 메뉴">
            <p className="text-sm font-extrabold text-white">서비스</p>
            <ul className="mt-5 space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition hover:text-[#cfff4a] focus:outline-none focus:text-[#cfff4a]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="내 활동 메뉴">
            <p className="text-sm font-extrabold text-white">내 활동</p>
            <ul className="mt-5 space-y-3">
              {supportLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm text-slate-400 transition hover:text-[#cfff4a] focus:outline-none focus:text-[#cfff4a]">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-11 flex flex-col gap-4 border-t border-white/10 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 GYMJJAK. All rights reserved.</p>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <span>이용약관</span>
            <span>개인정보처리방침</span>
            <span>위치기반서비스 이용약관</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
