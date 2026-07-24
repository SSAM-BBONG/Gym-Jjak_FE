import { PtDetailHistory, PtDetailQualification } from "@/components/ui/image";
import { PtCourseDetailData } from "../type";
import { TrainerProfileDetailData } from "@/feature/mypage/type";
import Image from "next/image";

interface PtDetailTrainerProps {
    data: TrainerProfileDetailData
}

export default function PtDetailTrainer({ data }: PtDetailTrainerProps) {
    return (
        <div className="
            flex flex-col gap-4 md:gap-5
            border border-[#364153] rounded-[14px]
            bg-[linear-gradient(176deg,_#101828_3.11%,_#1E2939_96.89%)]
            p-4 sm:p-5 lg:p-6
            ">
            <p className="text-[16px] md:text-[17px] lg:text-[18px] font-extrabold text-white"> 강사 정보 </p>
            <div className="flex gap-3 md:gap-4">
                <div
                    style={{ backgroundImage: `url(${data.profileImageUrl})` }}
                    className="bg-cover w-12 h-12 sm:w-14 sm:h-14 lg:w-15 lg:h-15 border border-[#BFFF0B] rounded-full">
                </div>

                <div className="flex flex-col flex-8 gap-2">
                    <p className="text-[16px] md:text-[17px] lg:text-[18px] font-extrabold text-white"> {data.trainerName} 트레이너 </p>
                    <p className="text-[12px] md:text-[13px] lg:text-[14px] font-normal text-[#D1D5DC]"> {data.introduction} </p>
                </div>
            </div>
            <div className="flex">
                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <img src={PtDetailQualification} alt="PT 상세조회 자격증" />
                        {/* <div className="relative w-5 h-5">
                            <Image
                                src={PtDetailQualification}
                                alt="PT 상세조회 자격증"
                                fill
                                priority
                                sizes="w-10 h-10"
                                className="object-cover"
                            />
                        </div> */}
                        <p className="text-[12px] md:text-[13px] lg:text-[14px] font-extrabold text-white"> 자격증 </p>
                    </div>
                    {data.certifications.map((item) => (
                        <p
                            key={item.trainerCertificationId}
                            className="text-[10px] md:text-[11px] lg:text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[10px] md:text-[11px] lg:text-[12px]">•</span> {item.name} </p>
                    ))}
                </div>
                <div className="flex flex-1 flex-col gap-2">
                    <div className="flex gap-2 items-center">
                        <img src={PtDetailHistory} alt="PT 상세조회 대회경력" />
                        {/* <div className="relative w-5 h-5">
                            <Image
                                src={PtDetailHistory}
                                alt="PT 상세조회 대회경력"
                                fill
                                priority
                                sizes="w-10 h-10"
                                className="object-cover"
                            />
                        </div> */}
                        <p className="text-[12px] md:text-[13px] lg:text-[14px] font-extrabold text-white"> 대회 경력 </p>
                    </div>
                    {data.awards.map((item) => (
                        <p
                            key={item.trainerAwardId}
                            className="text-[10px] md:text-[11px] lg:text-[12px] font-normal text-[#D1D5DC] flex gap-2"><span className="text-[#BFFF0B] text-[10px] md:text-[11px] lg:text-[12px]">•</span>  {item.name} </p>

                    ))}
                </div>
            </div>
        </div>
    );
}