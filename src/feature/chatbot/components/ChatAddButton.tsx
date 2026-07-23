import { AdminAddButton } from "@/components/ui/image";
import Image from "next/image";
import Link from "next/link";

export default function ChatAddButton() {
    return (
        <Link
            href={'/chatbot'}
            className="bg-[#BFFF0B] w-7 h-7 md:w-8 md:h-8 rounded-[14px] flex items-center justify-center">
            <div className="relative w-4 h-4">
                <Image
                    src={AdminAddButton}
                    alt="새 채팅 버튼"
                    fill
                    sizes="w-8 h-8"
                />
            </div>

        </Link>
    );
}