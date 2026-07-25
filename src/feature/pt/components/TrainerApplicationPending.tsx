'use client'

import { PtTrainerRegistPending, TrainerAPplicationCancel, TrainerAPplicationEdit } from "@/components/ui/image";
import { deleteTrainerApplication } from "../actions";
import Link from "next/link";
import { TrainerApplicationDetail, TrainerApplicationStatus } from "../type";
import OneButtonModal from "@/components/ui/OneButtonModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import useModal from "@/components/hooks/useModal";
import { useState } from "react";
import { format, isValid, parseISO } from "date-fns";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface TrainerApplicationPendingProps {
    trainerApplicationData: TrainerApplicationDetail;
    editHref: string;
}

const applicationStatus: Record<TrainerApplicationStatus, { label: string; message: string }> = {
    PENDING: { label: "대기중", message: "관리자의 승인을 기다리고 있습니다. 영업일 기준 3-5일 소요될 수 있습니다." },
    APPROVED: { label: "승인됨", message: "트레이너 신청이 승인되었습니다." },
    REJECTED: { label: "반려됨", message: "트레이너 신청이 반려되었습니다." },
    CANCELED: { label: "취소됨", message: "트레이너 신청이 취소되었습니다." },
};

export const TrainerApplicationPending = ({ trainerApplicationData, editHref }: TrainerApplicationPendingProps) => {
    const router = useRouter();

    const handleDelteApplication = async () => {
        const result = await deleteTrainerApplication(trainerApplicationData.trainerApplicationId);

        if(result?.success === false) {
            setErrorMessage(result?.message);
            errorModal.openModal();
            return;
        }
        toast.success("트레이너 신청이 취소되었습니다.");
        router.push("/pt/trainer-apply");
    }

    const checkModal = useModal(handleDelteApplication);
    const errorModal = useModal();
    const [errorMessage, setErrorMessage] = useState("");
    const status = applicationStatus[trainerApplicationData.status];

    return (
        <div className="
            flex flex-col gap-4
            p-4
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border border-[#F0B1004D] rounded-xl
            md:p-6 md:rounded-2xl
            lg:p-8 lg:rounded-[16px]
            ">
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2 md:gap-3 lg:gap-3">
                    <div className="rounded-[14px] bg-[#F0B10033] p-2 md:p-3 lg:p-3">
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
                        <p className="text-[24px] font-extrabold text-white"> {status.label}</p>
                        <p className="text-[14px] font-normal text-[#99A1AF]"> 신청일: {!trainerApplicationData.updatedAt ? format(trainerApplicationData.createdAt, "yyyy-MM-dd") : format(trainerApplicationData.updatedAt, "yyyy-MM-dd")} </p>
                    </div>
                </div>
                <div className="flex items-center gap-2 md:gap-3 lg:gap-3">
                    <Link href={editHref}>
                        <div className="flex items-center gap-2 rounded-[10px] bg-[#364153] px-3 py-2 text-sm font-medium text-white md:px-4 md:text-base lg:px-4 lg:text-[16px]">
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
                    <div className="flex items-center gap-2 rounded-[10px] border border-[#FB2C364D] bg-[#82181AB2] px-3 py-2 text-sm font-medium text-[#FF6467] md:px-4 md:text-base lg:px-4 lg:text-[16px]">
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

                    </div>
                </div>
            </div>
            <p className="rounded-[10px] border border-[#F0B1004D] bg-[#733E0A33] px-3 py-3 text-sm font-normal text-[#FDC700] md:px-4 md:py-4 md:text-base lg:px-4 lg:py-4 lg:text-[16px]">
                {trainerApplicationData.rejectReason ?? status.message}
            </p>
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