import Link from "next/link";

export default function TrainerNavBar() {
    return (
        <nav className="text-white flex gap-7">
            <Link href="/pt" className="text-[#99A1AF] hover:text-[#BFFF0B]"> PT ZONE </Link>
            <Link href="/community?page=0" className="text-[#99A1AF] hover:text-[#BFFF0B]"> 커뮤니티 </Link>
        </nav>
    );
}