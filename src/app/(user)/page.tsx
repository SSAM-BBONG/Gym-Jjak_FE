import UserFooter from "@/components/layout/UserFooter";
import { MainImg } from "@/components/ui/image";
import Image from "next/image";
import Link from "next/link";

const quickLinks = [
  {
    href: "/meal",
    eyebrow: "MEAL TRACKER",
    title: "오늘 먹은 식단을\n기록해 보세요",
    description: "식사 기록을 모아 하루의 식단 흐름을 한눈에 관리할 수 있어요.",
    action: "식단 관리하기",
    accent: "from-orange-300 to-amber-400",
    number: "01",
  },
  {
    href: "/calendar",
    eyebrow: "WORKOUT CALENDAR",
    title: "운동 계획을\n캘린더에 쌓아가세요",
    description: "PT 일정과 나만의 운동 기록을 날짜별로 편하게 확인하세요.",
    action: "운동 캘린더 열기",
    accent: "from-sky-300 to-cyan-400",
    number: "02",
  },
  {
    href: "/community",
    eyebrow: "COMMUNITY",
    title: "함께 운동하는\n사람들과 연결하세요",
    description: "운동 이야기와 유용한 팁을 나누며 꾸준함을 만들어 보세요.",
    action: "커뮤니티 둘러보기",
    accent: "from-violet-300 to-fuchsia-400",
    number: "03",
  },
];

export default function Page() {
  return (
    <main className="overflow-hidden bg-[#0B0F19] text-white">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-8 lg:px-12 lg:py-20">
        <section className="relative isolate overflow-hidden rounded-[32px] border border-white/10 bg-[#121a2b] px-6 pb-14 pt-10 sm:px-10 lg:min-h-[480px] lg:px-14 lg:pb-20 lg:pt-16">
          <div className="absolute -right-32 -top-32 -z-10 size-96 rounded-full bg-[#bfff0b]/10 blur-3xl" />
          <div className="absolute -bottom-48 left-1/3 -z-10 size-96 rounded-full bg-sky-400/10 blur-3xl" />

          <div className="relative z-10 max-w-xl">
            <p className="mb-5 inline-flex rounded-full border border-[#bfff0b]/30 bg-[#bfff0b]/10 px-3 py-1.5 text-xs font-bold tracking-[0.14em] text-[#cfff4a]">
              YOUR HEALTH, YOUR ROUTINE
            </p>
            <h1 className="text-4xl font-black leading-[1.18] tracking-tight sm:text-5xl lg:text-6xl">
              운동의 시작부터
              <br />
              <span className="text-[#bfff0b]">꾸준한 기록</span>까지
            </h1>
            <p className="mt-6 max-w-md text-base leading-7 text-slate-300 sm:text-lg">
              나에게 맞는 PT 센터를 찾고, 운동과 식단을 기록하며 건강한 루틴을 만들어 보세요.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Link
                href="/pt/find"
                className="rounded-xl bg-[#bfff0b] px-5 py-3.5 text-sm font-extrabold text-[#0b0f19] transition hover:bg-[#d4ff65] focus:outline-none focus:ring-2 focus:ring-[#bfff0b] focus:ring-offset-2 focus:ring-offset-[#121a2b]"
              >
                내 주변 PT 센터 찾기
              </Link>
              <Link
                href="/calendar"
                className="rounded-xl border border-white/15 bg-white/5 px-5 py-3.5 text-sm font-extrabold text-white transition hover:border-white/30 hover:bg-white/10 focus:outline-none focus:ring-2 focus:ring-white/70 focus:ring-offset-2 focus:ring-offset-[#121a2b]"
              >
                운동 캘린더 보기
              </Link>
            </div>
          </div>

          <div className="relative mt-10 h-56 sm:h-72 lg:absolute lg:inset-y-0 lg:right-0 lg:mt-0 lg:h-auto lg:w-[52%]">
            <Image
              src={MainImg}
              alt="운동을 표현한 메인 일러스트"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 620px"
              className="object-contain object-center lg:-translate-x-6 lg:scale-90 lg:object-right"
            />
          </div>
        </section>

        <section className="relative mt-8 overflow-hidden rounded-[28px] border border-[#bfff0b]/50 bg-[linear-gradient(110deg,#1c3422_0%,#13231b_45%,#121a2b_100%)] px-7 py-8 shadow-[0_0_45px_rgba(191,255,11,0.12)] sm:px-10 sm:py-9">
          <div className="absolute -right-10 -top-16 size-52 rounded-full bg-[#bfff0b]/15 blur-3xl" />
          <div className="relative flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="inline-flex rounded-full bg-[#bfff0b] px-3 py-1 text-xs font-black tracking-[0.12em] text-[#0b0f19]">FREE AI PT MATCHING</p>
              <h2 className="mt-3 text-2xl font-black tracking-tight sm:text-3xl">AI한테 나에게 꼭 맞는 PT를 추천받아보세요!</h2>
              <p className="mt-2 text-sm leading-6 text-slate-300">운동 부위와 거리, 통증 여부만 알려주면 추천 이유까지 확인할 수 있어요.</p>
            </div>
            <Link href="/pt/recommend" className="shrink-0 rounded-xl bg-[#bfff0b] px-5 py-3.5 text-center text-sm font-extrabold text-[#0b0f19] transition hover:bg-[#d4ff65] focus:outline-none focus:ring-2 focus:ring-white">
              무료 추천 시작하기 →
            </Link>
          </div>
        </section>

        <section className="mt-16">
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="text-sm font-bold text-[#bfff0b]">GYMJJAK SERVICES</p>
              <h2 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">오늘의 건강 루틴을 시작하세요</h2>
            </div>
            <p className="max-w-sm text-sm leading-6 text-slate-400 sm:max-w-xl">필요한 기능을 골라 운동 계획과 식단 기록을 자연스럽게 이어갈 수 있어요.</p>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <Link
              href="/pt/find"
              className="group relative overflow-hidden rounded-[28px] border border-[#bfff0b]/30 bg-[linear-gradient(135deg,#17213a_0%,#121a2b_65%,#192b20_100%)] p-7 transition hover:-translate-y-1 hover:border-[#bfff0b]/70 sm:p-9 lg:row-span-2"
            >
              <span className="text-sm font-bold tracking-[0.14em] text-[#cfff4a]">PT MATCHING</span>
              <h3 className="mt-5 text-3xl font-black leading-tight sm:text-4xl">검증된 트레이너와<br />가까운 PT 센터를 찾아보세요</h3>
              <p className="mt-5 max-w-md text-sm leading-6 text-slate-300 sm:text-base">내 위치와 목표에 맞춰 PT 센터와 트레이너 정보를 살펴보고, 나에게 맞는 운동 파트너를 선택할 수 있어요.</p>
              <span className="mt-9 inline-flex rounded-xl bg-[#bfff0b] px-4 py-3 text-sm font-extrabold text-[#0b0f19] transition group-hover:bg-[#d4ff65]">PT 센터 찾기 →</span>
              <span className="absolute bottom-6 right-16 text-[170px] font-black leading-none text-[#bfff0b]/10">PT</span>
            </Link>

            {quickLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="group relative overflow-hidden rounded-[28px] border border-white/10 bg-[#121a2b] p-7 transition hover:-translate-y-1 hover:border-white/25 hover:bg-[#17213a] sm:p-8"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className={`flex size-11 items-center justify-center rounded-2xl bg-gradient-to-br ${item.accent} text-sm font-black text-[#0b0f19]`}>
                    {item.number}
                  </span>
                  <span className="text-sm font-bold tracking-[0.12em] text-slate-500">{item.eyebrow}</span>
                </div>
                <h3 className="mt-7 whitespace-pre-line text-2xl font-black leading-tight">{item.title}</h3>
                <p className="mt-3 max-w-lg text-sm leading-6 text-slate-400">{item.description}</p>
                <span className="mt-6 inline-flex text-sm font-extrabold text-white transition group-hover:text-[#bfff0b]">{item.action} <span className="ml-2">→</span></span>
              </Link>
            ))}
          </div>
        </section>

        <section className="mt-16 rounded-[28px] border border-white/10 bg-[#121a2b] p-7 sm:p-10">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-bold text-[#bfff0b]">START SMALL, STAY CONSISTENT</p>
              <h2 className="mt-2 text-2xl font-black">오늘의 식단 한 끼부터 기록해 볼까요?</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">식단을 남기고, 나만의 건강한 습관을 쌓아가세요.</p>
            </div>
            <Link href="/meal" className="shrink-0 rounded-xl border border-[#bfff0b]/50 px-5 py-3.5 text-center text-sm font-extrabold text-[#cfff4a] transition hover:bg-[#bfff0b] hover:text-[#0b0f19]">
              식단 기록 시작하기
            </Link>
          </div>
        </section>
      </div>
      <UserFooter />
    </main>
  );
}
