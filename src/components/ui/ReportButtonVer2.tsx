'use client'

import useModal from "@/components/hooks/useModal";
import { CommuCommentDeclaration, CommuDetailDeclaration } from "@/components/ui/image";
import OneButtonModal from "@/components/ui/OneButtonModal";
import ReportModal from "@/components/ui/ReportModal";
import { createReportAction } from "@/feature/admin/action";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function ReportButtonVer2({ title, targetId, targetType }: {
    title: string,
    targetId: number,
    targetType: "PT_COURSE" | "TRAINER_REVIEW" | "COMMENT" | "POST" | "FEEDBACK",
}) {
    const reportModal = useModal();
    const checkModal = useModal();

    const [reportState, setReportState] = useState<{ success: boolean, message: string }>({
        success: false,
        message: ''
    });


    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<{
        detail: string,
        reason: "SPAM" | "ADVERTISEMENT" | "ABUSE" | "SEXUAL_CONTENT" | "FRAUD" | "PRIVACY_EXPOSURE" | "ETC";
    }>({
        mode: 'onSubmit',
    });


    const onSubmit = async (data: {
        detail: string,
        reason: "SPAM" | "ADVERTISEMENT" | "ABUSE" | "SEXUAL_CONTENT" | "FRAUD" | "PRIVACY_EXPOSURE" | "ETC";
    }) => {
        const formData = new FormData();
        formData.set('detail', data.detail);
        formData.set('reason', data.reason);

        try {
            const result = await createReportAction(targetId, targetType, formData);
            setReportState(result);
            if (result.success) {
                reset();
                reportModal.closeModal();
                checkModal.openModal();
            }
        } catch (error) {
            setReportState({
                success: false,
                message: `네트워크 오류입니다\n다시 시도해주세요`
            });
            reportModal.closeModal();
            checkModal.openModal();
        }
    }

    return (
        <>
            <button
                onClick={() => { reportModal.openModal(); setReportState({ success: false, message: '' }) }}
                className="relative flex items-center justify-center px-5 py-2 rounded-[10px] bg-[#1E2939] text-[14px] font-extrabold text-white hover:bg-[#BFFF0B] hover:text-[black]">
                <p> 신고하기 </p>
            </button>
            <ReportModal
                isModal={reportModal.isModal}
                closeModal={reportModal.closeModal}
                title={title}
                reportState={reportState}
                onSubmit={onSubmit}
                handleSubmit={handleSubmit}
                register={register}
                isSubmitting={isSubmitting}
            />
            <OneButtonModal
                isModal={checkModal.isModal}
                closeModal={checkModal.closeModal}
                title="신고 접수"
                content={reportState.message}
            />
        </>
    );
}