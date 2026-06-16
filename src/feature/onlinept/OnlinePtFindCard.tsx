import { PtfindTestImg } from "@/components/ui/image";
import Link from "next/link";

export default function OnlienPtFindCard() {
    return (
        <Link href={`/onlinept/1`}>
            <div className="
                relative
                flex flex-col
                border border-[#1E2939] rounded-[14px]
                bg-[#101828]
                overflow-hidden
                cursor-pointer
                ">
                <img src={PtfindTestImg} width={320} height={160} alt="PT ZONE 인기강습 이미지" />
                <div className="flex flex-col p-4">
                    <div className="flex">
                        <p className="text-[18px] font-extrabold text-white"> 가슴 집중 PT</p>
                    </div>
                    <p className="text-[12px] font-normal text-[#99A1AF]"> 김철수 트레이너 </p>
                    <div className="flex justify-end">
                        <p className="text-[14px] font-extrabold text-[#BFFF0B]"> 50,000원 </p>
                    </div>
                </div>
            </div>
        </Link>
    );
}