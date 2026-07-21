import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="text-white flex gap-7">
            <Link href="/pt" className="text-[#99A1AF] hover:text-[#BFFF0B]"> PT ZONE </Link>
            <Link href="/meal" className="text-[#99A1AF] hover:text-[#BFFF0B]"> 식단 </Link>
            <Link href="/community?page=0" className="text-[#99A1AF] hover:text-[#BFFF0B]"> 커뮤니티 </Link>
            <Link href="/calendar" className="text-[#99A1AF] hover:text-[#BFFF0B]" prefetch={false}> 캘린더 </Link>
        </nav>
    );
}