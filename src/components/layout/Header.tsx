import { Logo } from "../ui/image";
import NavBar from "./NavBar";
import Link from "next/link";
import HeaderAuthArea from "./HeaderAuthArea";

export default function Header() {
    return (
        <header className="fixed top-0 left-0 w-full h-17.5 bg-black flex-1 flex items-center justify-between px-30 z-9999 border-b border-b-[#1E2939]">
            <div className="flex items-center gap-3">
                <Link href="/">
                    <div className="bg-[#BFFF0B] size-10 rounded-[10px] flex items-center justify-center cursor-pointer">
                        <img src={Logo} alt="로고" />
                    </div>
                </Link>
                <Link href="/">
                    <div className="flex-col cursor-pointer">
                        <p className="text-[#BFFF0B] text-[12px]">GYMJJAK</p>
                        <p className="text-white text text-[10px]">Fitness Platform </p>
                    </div>
                </Link>
            </div>
            <NavBar />
            <HeaderAuthArea />
        </header>
    );
}
