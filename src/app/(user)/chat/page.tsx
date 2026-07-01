import { chatAddOption } from "@/components/ui/image";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    robots: {
        index: false,
        follow: false,
    },
};

export default function Page() {
    return (
        <div className="flex flex-col gap-6 px-60 pt-8">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-2">
                    <p className="text-[40px] font-black text-white"> 채팅 </p>
                    <p className="text-[16px] font-normal text-[#99A1AF]"> 총 6개의 대화 </p>
                </div>
                <button className="bg-[#BFFF0B33] border border-[#BFFF0B4D] px-3 py-2 rounded-full text-[#BFFF0B]"> 읽지 않은 메시지 : 3</button>
            </div>

            <input
                type="text"
                className="px-6 py-3 bg-[#101828] border border-[#1E2939] rounded-[14px] text-[#6A7282]"
                placeholder="이름 또는 메시지로 검색"

            />

            <div className="flex gap-2">
                <button className="bg-[#BFFF0B] text-black font-bold px-4 py-2 rounded-full"> 전체 </button>
                <button className="bg-[#101828] text-[#99A1AF] font-bold px-4 py-2 rounded-full border border-[#1E2939]"> 트레이너 </button>
                <button className="bg-[#101828] text-[#99A1AF] font-bold px-4 py-2 rounded-full border border-[#1E2939]"> 수강생 </button>
            </div>

            <div className="flex flex-col gap-3 mt-5">
                <p className="text-[12px] text-[#6A7282] font-bold"> 모든 대화</p>

                <div className="flex gap-4 px-4 items-center py-5 px-2 rounded-[16px] bg-[#101828] border border-[#1E2939]">
                    <div className="border border-[#364153] rounded-full w-[55px] h-[55px]">
                        {/* <img /> */}
                    </div>
                    <div className="flex flex-1 justify-between items-center">
                        <div className="flex flex-col gap-3 justify-center">
                            <div className="flex gap-3 items-center">
                                <p className="text-[14px] font-bold text-white"> 운동초보</p>
                                <p className="border border-[#364153] bg-[#1E2939] rounded-full px-2 py-1 text-[10px] font-normal text-[#99A1AF]"> 수강생 </p>
                            </div>
                            <p className="text-[12px] font-normal text-[#99A1AF]"> 마지막 메시지</p>
                        </div>
                        <div className="flex gap-6 items-center justify-center">
                            <div className="flex flex-col gap-2 justify-center items-center">
                                <p className="text-[#6A7282] text-[11px] font-normal"> 날짜</p>
                                <p className="bg-[#BFFF0B] rounded-full p-1 text-[10px] text-black font-bold"> 12 </p>
                            </div>
                            <div className="relative w-4 h-4">
                                <Image
                                    src={chatAddOption}
                                    alt="채팅 기능 이미지"
                                    fill
                                    priority
                                    sizes="w-20 h-20"
                                    className="object-cover"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}