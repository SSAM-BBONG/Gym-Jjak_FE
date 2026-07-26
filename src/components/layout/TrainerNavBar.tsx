import Link from "next/link";

export default function TrainerNavBar() {
    return (
        <nav className="flex items-center gap-7 text-white">
            <Link href="/pt" className="text-[#99A1AF] hover:text-[#BFFF0B]"> PT ZONE </Link>
            <Link href="/community?page=0" className="text-[#99A1AF] hover:text-[#BFFF0B]"> 커뮤니티 </Link>
            <Link href="/pose-analysis" className="relative text-[#99A1AF] hover:text-[#BFFF0B]">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[8px] font-black tracking-[0.12em] text-[#BFFF0B]">BETA</span>
                자세 분석
            </Link>
        </nav>
    );
}