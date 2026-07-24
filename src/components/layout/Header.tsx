import { Logo } from "../ui/image";
import NavBar from "./NavBar";
import Link from "next/link";
import HeaderAuthArea from "./HeaderAuthArea";
import Image from "next/image";
import { decodeJWT } from "@/lib/decode";
import { getAlarmUnreadCountAction } from "@/feature/alarm/action";
import { getChatRoomUnreadCountAction } from "@/feature/chat/actions";
import OrganizationHeader from "./OrganizationHeader";
import MobileNavMenu from "./MobileNavMenu";

export default async function Header() {

    const userinf = await decodeJWT();
    const isAuthenticated = Boolean(userinf?.sub);
    const isOrganization = userinf?.role === "ORGANIZATION";

    if (isOrganization) {
        return <OrganizationHeader userInf={userinf} />;
    }

    const AlarmCount = isAuthenticated ? await getAlarmUnreadCountAction() : undefined;
    const chatCount = isAuthenticated ? await getChatRoomUnreadCountAction() : undefined;

    return (
        <header className="fixed top-0 left-0 z-9999 flex h-17.5 w-full items-center justify-between border-b border-b-[#1E2939] bg-black px-4 sm:px-10">
            <div className="flex shrink-0 items-center gap-3">
                <MobileNavMenu />
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
                <Link href="/" className="hidden lg:block">
                    <div className="flex-col cursor-pointer">
                        <p className="text-[#BFFF0B] text-[12px]">GYMJJAK</p>
                        <p className="text-white text text-[10px]">Fitness Platform </p>
                    </div>
                </Link>
            </div>
            <div className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
                <NavBar />
            </div>
            <HeaderAuthArea
                userInf={userinf}
                notification={AlarmCount?.data}
                chatCount={chatCount?.data}
            />
        </header>
    );
}
