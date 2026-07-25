import { AdminAddButton } from "@/components/ui/image";
import Image from "next/image";
import Link from "next/link";

export default function NotifyButton() {
    return (
        <Link
            href={'/admin/systems/notify/create'}
            className="flex items-center gap-1.5 sm:gap-2 lg:gap-3 bg-[#BFFF0B] text-black text-[10px] sm:text-sm lg:text-base font-bold ml-auto px-2 sm:px-4 lg:px-6 py-2 sm:py-3 lg:py-3.5 rounded-md">
            <div className="relative w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6">
                <Image
                    src={AdminAddButton}
                    alt="추가 버튼"
                    fill
                    sizes="w-4 h-4"
                />
            </div>
            <p>공지 작성</p>
        </Link>
    );
}