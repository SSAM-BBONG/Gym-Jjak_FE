import { MyTokenPayload } from "@/lib/decode";
import Image from "next/image";
import Link from "next/link";
import { Logo } from "../ui/image";
import OrganizationHeaderAuthArea from "./OrganizationHeaderAuthArea";

interface OrganizationHeaderProps {
  userInf?: MyTokenPayload;
}

export default function OrganizationHeader({ userInf }: OrganizationHeaderProps) {
  return (
    <header className="fixed top-0 left-0 z-9999 flex h-17.5 w-full items-center justify-between border-b border-b-[#1E2939] bg-black px-5 sm:px-10">
      <Link href="/organization/dashboard/gym" className="flex items-center gap-3">
        <div className="flex size-10 items-center justify-center rounded-[10px]">
          <div className="relative h-10 w-10">
            <Image src={Logo} alt="GYMJJAK 로고" fill priority sizes="40px" className="object-cover" />
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <p className="text-[12px] text-[#BFFF0B]">GYMJJAK</p>
            <p className="text-[10px] text-white">Fitness Platform</p>
          </div>
          <span className="hidden rounded-full border border-[#BFFF0B]/30 bg-[#BFFF0B]/10 px-2.5 py-1 text-xs font-semibold text-[#BFFF0B] sm:inline">
            조직 계정
          </span>
        </div>
      </Link>

      <div className="flex items-center gap-4 sm:gap-6">
        <nav aria-label="조직 계정 메뉴">
          <Link
            href="/community?page=0"
            className="rounded-lg border border-[#364153] px-3 py-2 text-sm font-semibold text-[#D1D5DC] transition hover:border-[#BFFF0B] hover:text-[#BFFF0B]"
          >
            커뮤니티
          </Link>
        </nav>
        <div className="h-6 border-l border-[#364153]" />
        <OrganizationHeaderAuthArea userInf={userInf} />
      </div>
    </header>
  );
}
