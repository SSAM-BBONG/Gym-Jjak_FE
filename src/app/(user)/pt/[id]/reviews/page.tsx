import { PtDetailQualification, PtfindTestImg } from "@/components/ui/image";
import TrainerReviewCard from "@/feature/pt/components/TrainerReviewCard";
import Image from "next/image";

export default async function TrainerReviewPage() {

    return (
        <div className="flex flex-col gap-6 px-60 py-10">
            <div className="
            flex gap-6
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
             border border-[#36415380] rounded-[16px]
             p-8">
                <div
                    style={{ backgroundImage: `url(${PtfindTestImg})` }}
                    className="size-20 border border-[#BFFF0B] rounded-full bg-cover"></div>
                <div className="flex flex-col gap-2">
                    <p className="text-[30px] font-black text-white"> 김철수 트레이너</p>
                    <p className="text-[16px] font-normal text-[#99A1AF]"> 경력 10년 </p>
                    <div className="flex gap-2 items-center">
                        <div className="relative w-4 h-4">
                            <Image
                                src={PtDetailQualification}
                                alt="트레이너평 상세조회 자격증"
                                fill
                                priority
                                sizes="w-8 h-8"
                                className="object-cover"
                            />
                        </div>
                        <p className="px-3 py-1 rounded-full bg-[#1E2939] text-[12px] font-normal text-[#D1D5DC] whitespace-nowrap"> 생활체육지도사 2급 </p>
                        <p className="px-3 py-1 rounded-full bg-[#1E2939] text-[12px] font-normal text-[#D1D5DC] whitespace-nowrap"> NSCA-CPT </p>
                        <p className="px-3 py-1 rounded-full bg-[#1E2939] text-[12px] font-normal text-[#D1D5DC] whitespace-nowrap"> ACSM 인증 트레이너 </p>
                    </div>
                </div>
            </div>

            <div className="
            flex flex-col gap-5
            bg-[#101828]
            border border-[#36415380] rounded-[16px]
            p-8">
                <p className="text-[20px] font-extrabold text-white"> 강사 평가</p>
                <div className="flex items-start">
                    <div className="flex flex-1 flex-col gap-1">
                        <p className="justify-self-start text-[55px] font-black text-[#BFFF0B]">
                            4.8<span className="text-[24px] font-normal text-[#99A1AF]">/5</span>
                        </p>
                        <p className="text-[24px] text-[#BFFF0B]"> ★★★★★ </p>
                        <p className="text-[16px] font-normal text-[#99A1AF]"> 총 8개의 리뷰 </p>
                    </div>
                    <div className="flex flex-1 flex-col gap-2">
                        <div className="flex justify-between items-center">
                            <p className="flex-1 text-[14px] font-normal text-[#99A1AF]"> 5★ </p>
                            <div className="flex-3 h-2 rounded-full bg-[#1E2939] ">
                                <p className="w-[30%] h-2 rounded-full bg-[#BFFF0B]"> </p>
                            </div>
                            <p className="flex-1 text-right text-[14px] font-normal text-[#99A1AF]"> 5</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="flex-1 text-[14px] font-normal text-[#99A1AF]"> 4★ </p>
                            <div className="flex-3 h-2 rounded-full bg-[#1E2939] ">
                                <p className="w-[30%] h-2 rounded-full bg-[#BFFF0B]"> </p>
                            </div>
                            <p className="flex-1 text-right text-[14px] font-normal text-[#99A1AF]"> 5</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="flex-1 text-[14px] font-normal text-[#99A1AF]"> 3★ </p>
                            <div className="flex-3 h-2 rounded-full bg-[#1E2939] ">
                                <p className="w-[30%] h-2 rounded-full bg-[#BFFF0B]"> </p>
                            </div>
                            <p className="flex-1 text-right text-[14px] font-normal text-[#99A1AF]"> 5</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="flex-1 text-[14px] font-normal text-[#99A1AF]"> 2★ </p>
                            <div className="flex-3 h-2 rounded-full bg-[#1E2939] ">
                                <p className="w-[30%] h-2 rounded-full bg-[#BFFF0B]"> </p>
                            </div>
                            <p className="flex-1 text-right text-[14px] font-normal text-[#99A1AF]"> 5</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <p className="flex-1 text-[14px] font-normal text-[#99A1AF]"> 1★ </p>
                            <div className="flex-3 h-2 rounded-full bg-[#1E2939] ">
                                <p className="w-[30%] h-2 rounded-full bg-[#BFFF0B]"> </p>
                            </div>
                            <p className="flex-1 text-right text-[14px] font-normal text-[#99A1AF]"> 5</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col gap-6">
                <div className="flex justify-between items-center">
                    <p className="text-[18px] font-extrabold text-white"> 리뷰 목록 </p>
                    <div className="flex gap-2">
                        <button className="px-4 py-2 rounded-[10px] bg-[#BFFF0B] text-[14px] font-extrabold text-black"> 최신순 </button>
                        <button className="px-4 py-2 rounded-[10px] bg-[#1E2939] text-[14px] font-medium text-[#99A1AF]">  별점높은순 </button>
                    </div>
                </div>

                <TrainerReviewCard />
                <TrainerReviewCard />
                <TrainerReviewCard />
            </div>
        </div>
    );
}