'use client'

import useModal from "@/components/hooks/useModal";
import { CommuDetailDeclaration } from "@/components/ui/image";
import OneButtonModal from "@/components/ui/OneButtonModal";
import ReportModal from "@/components/ui/ReportModal";
import { createReportAction } from "@/feature/admin/action";
import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function CommuReportButton({ title, targetId }: { title: string, targetId: number }) {
    const reportModal = useModal();

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


    const onSubmit = async (data: { detail: string, reason: "SPAM" | "ADVERTISEMENT" | "ABUSE" | "SEXUAL_CONTENT" | "FRAUD" | "PRIVACY_EXPOSURE" | "ETC" }) => {
        const formData = new FormData();
        formData.set('detail', data.detail);
        formData.set('reason', data.reason);

        try {
            const result = await createReportAction(targetId, "POST", formData);
            if (result.success) {
                reset();
                reportModal.closeModal();
                toast.success(result.message)
                return;
            }
            setReportState(result);
        } catch (error) {
            toast.error('네트워크 오류입니다')
        }
    }

    return (
        <>
            <button
                onClick={() => { reportModal.openModal(); setReportState({ success: false, message: '' }) }}
                className="px-2 py-2 bg-[#1E2939] rounded-[10px]">
                <div className="relative w-3 h-3 md:w-4 md:h-4">
                    <Image
                        src={CommuDetailDeclaration}
                        alt="게시글 신고"
                        fill
                        sizes="w-8 h-8"
                        className="object-cover hover:cursor-pointer"
                    />
                </div>
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
        </>
    );
}