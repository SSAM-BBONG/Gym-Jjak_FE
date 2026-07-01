import { PtDetailHistory, PtDetailQualification } from "@/components/ui/image";
import Image from "next/image";

export default function DetailTrainer() {
    return (
        <div className="
            flex flex-col gap-5
            border border-[#364153] rounded-[14px]
            bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
            p-6
            ">
            <p className="text-[18px] font-extrabold text-white"> 강사 정보 </p>
            <div className="flex gap-4">
                <div
                    // style={{ backgroundImage: `url(${response.data.thumbnailUrl})` }}
                    className="bg-cover size-15 border border-[#BFFF0B] rounded-full">
                </div>

                <div className="flex flex-col flex-8 gap-2">
                    <p className="text-[18px] font-extrabold text-white"> response.data.trainerName 트레이너 </p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> response.data.trainerSpec </p>
                    <p className="text-[14px] font-normal text-[#D1D5DC]"> response.data.trainerIntroduction </p>
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        {/* <img src={PtDetailQualification} alt="PT 상세조회 자격증" /> */}
                        <div className="relative w-5 h-5">
                            <Image
                                src={PtDetailQualification}
                                alt="PT 상세조회 자격증"
                                fill
                                priority
                                sizes="w-10 h-10"
                                className="object-cover"
                            />
                        </div>

                        <p className="text-[14px] font-extrabold text-white"> 자격증 </p>
                    </div>
                    <p className="text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[12px]">•</span> 생활체육지도사 2급 </p>
                    <p className="text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[12px]">•</span>  NSCA-CPT </p>
                    <p className="text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[12px]">•</span>  ACSM 인증 트레이너 </p>
                </div>
                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        {/* <img src={PtDetailHistory} alt="PT 상세조회 대회경력" /> */}
                        <div className="relative w-5 h-5">
                            <Image
                                src={PtDetailHistory}
                                alt="PT 상세조회 대회경력"
                                fill
                                priority
                                sizes="w-10 h-10"
                                className="object-cover"
                            />
                        </div>
                        <p className="text-[14px] font-extrabold text-white"> 대회 경력 </p>
                    </div>
                    <p className="text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[12px]">•</span>  2023 피지크 대회 입상 </p>
                    <p className="text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[12px]">•</span>  보디빌딩 선수권 3위 </p>
                    <p className="text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[12px]">•</span>  2024 체육인 대회 우승 </p>
                </div>
            </div>
        </div>
    );
}