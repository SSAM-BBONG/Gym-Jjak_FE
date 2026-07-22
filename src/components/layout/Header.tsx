import { Logo } from "../ui/image";
import NavBar from "./NavBar";
import Link from "next/link";
import HeaderAuthArea from "./HeaderAuthArea";
import Image from "next/image";
import { decodeJWT } from "@/lib/decode";
import { getAlarmUnreadCountAction } from "@/feature/alarm/action";
import { getChatRoomUnreadCountAction } from "@/feature/chat/actions";

export default async function Header() {

    const userinf = await decodeJWT();
    const isAuthenticated = Boolean(userinf?.sub);
    const AlarmCount = isAuthenticated ? await getAlarmUnreadCountAction() : undefined;
    const chatCount = isAuthenticated ? await getChatRoomUnreadCountAction() : undefined;

    return (
        <header className="fixed top-0 left-0 w-full h-17.5 bg-black grid grid-cols-[1fr_auto_1fr] items-center px-10 z-9999 border-b border-b-[#1E2939]">
            <div className="flex items-center gap-3">
                <Link href="/">
                    <div className="size-10 rounded-[10px] flex items-center justify-center cursor-pointer">
                        <div className="relative w-10 h-10">
                            <Image
                                src={Logo}
                                alt="로고"
                                fill
                                priority
                                sizes="w-20 h-20"
                                className="object-cover"
                            />
                        </div>
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
            <HeaderAuthArea 
                userInf={userinf}
                notification={AlarmCount?.data}
                chatCount={chatCount?.data}
            />
        </header>
    );
}
