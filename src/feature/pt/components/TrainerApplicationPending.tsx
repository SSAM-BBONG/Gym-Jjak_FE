'use client'

import { PtTrainerRegistPending, TrainerAPplicationCancel, TrainerAPplicationEdit } from "@/components/ui/image";
import { getTrainerCancel } from "@/service/ptzone.service";
import { deleteTrainerApplication } from "../actions";
import Link from "next/link";
import Image from "next/image";
import { TrainerApplicationDetail } from "../type";
import OneButtonModal from "@/components/ui/OneButtonModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import useModal from "@/components/hooks/useModal";
import { useState } from "react";
import { format } from "date-fns";

interface TrainerApplicationPendingProps {
    trainerApplicationData: TrainerApplicationDetail
}

export const TrainerApplicationPending = ({ trainerApplicationData }: TrainerApplicationPendingProps) => {
    const handleDelteApplication = async () => {
        const result = await deleteTrainerApplication(trainerApplicationData.trainerApplicationId);

        if(result?.success === false) {
            setErrorMessage(result?.message);
            errorModal.openModal();
            return;
        }
    }

    const confirmModal = useModal(handleDelteApplication);
    const checkModal = useModal(confirmModal.openModal);
    const errorModal = useModal();
    const [errorMessage, setErrorMessage] = useState("");

    return (
        <div className="
            flex flex-col gap-4
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border border-[#F0B1004D] rounded-[16px]
            ">
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <div className="p-3 rounded-[14px] bg-[#F0B10033]">
                        <img src={PtTrainerRegistPending} alt="트레이너 신청 현황 대기중" />
                        {/* <div className="relative w-5 h-5">
                            <Image
                                src={PtTrainerRegistPending}
                                alt="트레이너 신청 현황 대기중"
                                fill
                                priority
                                sizes="w-10 h-10"
                                className="object-cover"
                            />
                        </div> */}
                    </div>
                    <div className="flex flex-col">
                        <p className="text-[24px] font-extrabold text-white"> 대기중</p>
                        <p className="text-[14px] font-normal text-[#99A1AF]"> 신청일: {!trainerApplicationData.updatedAt ? format(trainerApplicationData.createdAt, "yyyy-MM-dd") : format(trainerApplicationData.updatedAt, "yyyy-MM-dd")} </p>
                    </div>
                </div>
                <div className="flex gap-3 items-center">
                    <Link href="/pt/trainer-apply/edit">
                        <div className="flex gap-2 items-center text-[16px] font-medium text-white rounded-[10px] bg-[#364153] px-4 py-2">
                            <img src={TrainerAPplicationEdit} alt="트레이너 신청 수정 버튼" />
                            {/* <div className="relative w-5 h-5">
                                <Image
                                    src={TrainerAPplicationEdit}
                                    alt="트레이너 신청 수정 버튼"
                                    fill
                                    priority
                                    sizes="w-10 h-10"
                                    className="object-cover"
                                />
                            </div> */}
                            <button className="hover:cursor-pointer"> 수정 </button>
                        </div>
                    </Link>
                    <div className="flex gap-2 itemes-center rounded-[10px] bg-[#82181AB2] px-4 py-2 text-[16px] font-medium text-[#FF6467] border border-[#FB2C364D]">
                        <img src={TrainerAPplicationCancel} alt="트레이너 신청 취소 버튼" />
                        {/* <div className="relative w-5 h-5">
                            <Image
                                src={TrainerAPplicationCancel}
                                alt="트레이너 신청 취소 버튼"
                                fill
                                priority
                                sizes="w-10 h-10"
                                className="object-cover"
                            />
                        </div> */}
                        <button onClick={checkModal.openModal} className="hover:cursor-pointer"> 신청취소 </button>
                        <TwoButtonModal
                            isModal={checkModal.isModal}
                            closeModal={checkModal.closeModal} 
                            activeModal={checkModal.activeModal}
                            content="트레이너 신청을 취소하시겠습니까?"
                            title='트레이너 신청 취소' 
                        />

                        <OneButtonModal 
                            isModal={confirmModal.isModal}
                            closeModal={confirmModal.closeModal}
                            activeModal={confirmModal.activeModal} 
                            title='트레이너 신청 취소'
                            content='트레이너 신청이 취소되었습니다.' 
                        />

                    </div>
                </div>
            </div>
            <p className="border border-[#F0B1004D] bg-[#733E0A33] px-4 py-4 rounded-[10px] text-[16px] font-normal text-[#FDC700]">관리자의 승인을 기다리고 있습니다. 영업일 기준 3-5일 소요될 수 있습니다.</p>
            <OneButtonModal
                isModal={errorModal.isModal}
                closeModal={errorModal.closeModal}
                activeModal={errorModal.activeModal}
                title="트레이너 신청"
                content={errorMessage}
            />
        </div>
    );
}