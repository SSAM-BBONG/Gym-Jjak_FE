import { chat } from "@/components/ui/image";
import Image from "next/image";

export default function NoneChat() {
    return (
        <div className="m-auto flex flex-col items-center text-center">
            <div className="relative mb-7 h-20 w-20 rounded-full border-[4px] border-[#3A455B]">
                <div className="absolute bottom-[-6px] right-[-9px] flex h-7 w-7 items-center justify-center rounded-full bg-[#BFFF0B]">
                    <Image src={chat} alt="채팅" width={15} height={15} />
                </div>
            </div>

            <h1 className="text-xl font-bold text-white">
                이름
            </h1>
            <p className="mt-2 text-sm text-[#99A1AF]">
                아직 주고받은 메시지가 없어요.
            </p>
            <p className="mt-2 text-xs text-[#6A7282]">
                먼저 말을 걸어보세요!
            </p>
        </div>
    );
}