'use client'

import { HeaderProfile, OrganApplicationUpload, PtManageUsers, PtZonePtListsActivate, PtZonePtListsDeactivate } from "@/components/ui/image";
import { PtManageListData, PtStatusChangeRequest } from "../type";
import { changePtStatus } from "../actions";
import Image from "next/image";
import PtManageCourseActions from "./PtManageCourseActions";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

interface PtManageCardProps {
    data: PtManageListData;
    onOpen: () => void;
}

export default function PtManageCard({ data, onOpen }: PtManageCardProps) {
    const router = useRouter();
    const currentStatus = data.status === "VISIBLE" ? "HIDDEN" : "VISIBLE"
    const [errorMessage, setErrorMessage] = useState("");

    const handleStatusClick = async (e:React.MouseEvent<HTMLButtonElement>, id: number, status: "VISIBLE" | "HIDDEN") => {
        e.preventDefault();
        e.stopPropagation();
        const result = await changePtStatus(id, currentStatus);

        if (!result.success) {
            setErrorMessage(result.message);
            return;
        }

        toast.success(result.message);
        router.refresh();
    }

    return (
        <div
            role="link"
            tabIndex={0}
            onClick={onOpen}
            onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    onOpen();
                }
            }}
            className={`
        overflow-hidden
        relative
        flex flex-col
        bg-[#101828]
        border border-[#1E2939] rounded-[16px]
        ${data.status === "HIDDEN" ? "opacity-50" : ""}
        `}>
            <div className={`absolute left-3 top-3 px-3 py-1 rounded-full text-[12px] font-extrabold z-10
                    ${data.status === "VISIBLE" ? "bg-[#BFFF0B] text-black" : "bg-[#FB2C361A] text-[#FB2C36]"}`}>
                {data.status === "VISIBLE" ? "활성화" : "비활성화"}
            </div>
            <PtManageCourseActions ptCourseId={data.ptCourseId} />
            <div
                className="relative h-36 w-full sm:h-40 md:h-44 lg:h-40">
                    <Image
                        key={data.thumbnailUrl || "thumbnail-placeholder"}
                        src={data.thumbnailUrl || HeaderProfile}
                        alt="피드백 등록 완료"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                        className="object-cover"
                    />
                </div>
            <div className="flex flex-col gap-2 p-4 sm:p-5 md:gap-3 md:p-6 lg:gap-2 lg:p-5 2xl:gap-1">
                <p className="truncate text-base font-black text-white sm:text-[17px] lg:text-[18px]"> {data.title} </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> {data.trainerName} </p>
                <div className={`
                flex flex-col gap-3
                bg-[#1E293980]
                rounded-[10px]
                p-2 sm:p-3 md:p-4 lg:p-3
                mt-2 sm:mt-3 md:mt-4 lg:mt-3
                `}>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 whitespace-nowrap items-center">
                            <div className="relative w-4 h-4">
                                <Image
                                    src={PtManageUsers}
                                    alt="피드백 등록 완료"
                                    fill
                                    sizes="w-8 h-8"
                                    className="object-cover"
                                />
                            </div>
                            <p className="text-[12px] font-normal text-[#99A1AF]"> 수강생 </p>
                        </div>
                        <p className="text-[14px] font-extrabold text-[#6A7282]"> <span className="text-[#BFFF0B]">{data.activeReservationCount} </span> /{data.totalReservationCount}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={(e) => handleStatusClick(e, data.ptCourseId, data.status)}
                    className={`flex justify-center items-center gap-3 py-2.5 rounded-[14px] mt-1 sm:py-3
                            ${data.status === "VISIBLE" ? "bg-[#1E2939]" : "bg-[#BFFF0B1A]"}`}
                >
                    {data.status === "VISIBLE"
                        ?
                        (
                            <>
                                <div className="relative w-4 h-4">
                                    <Image
                                        src={PtZonePtListsDeactivate}
                                        alt="피드백 등록 완료"
                                        fill
                                        sizes="w-8 h-8"
                                        className="object-cover"
                                    />
                                </div>
                                <p className="text-[14px] text-[#D1D5DC] font-bold"> 비활성화로 전환 </p>
                            </>
                        )
                        :
                        (
                            <>
                                <div className="relative w-4 h-4">
                                    <Image
                                        src={PtZonePtListsActivate}
                                        alt="피드백 등록 완료"
                                        fill
                                        sizes="w-8 h-8"
                                        className="object-cover"
                                    />
                                </div>
                                <p className="text-[14px] text-[#BFFF0B] font-bold"> 활성화로 전환 </p>
                            </>
                        )}
                </button>
            </div>
            <OneButtonModal
                isModal={Boolean(errorMessage)}
                closeModal={() => setErrorMessage("")}
                title="PT 강습 상태 변경 실패"
                content={errorMessage}
            />
        </div>
    );
}
