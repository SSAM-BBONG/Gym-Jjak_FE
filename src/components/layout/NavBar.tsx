import Link from "next/link";

export default function NavBar() {
    return (
        <nav className="text-white flex gap-7">
        <Link href="/pt" className="text-[#99A1AF] hover:text-[#BFFF0B]"> PT ZONE </Link>
        <Link href="/homept" className="text-[#99A1AF] hover:text-[#BFFF0B]"> 홈트 ZONE </Link>
        <Link href="/community" className="text-[#99A1AF] hover:text-[#BFFF0B]"> 커뮤니티 </Link>
        <Link href="/calender" className="text-[#99A1AF] hover:text-[#BFFF0B]"> 캘린더 </Link>
        </nav>
    );
}