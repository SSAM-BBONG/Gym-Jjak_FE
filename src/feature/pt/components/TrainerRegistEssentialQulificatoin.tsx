'use client'

import { TrainerEssentialQulificationIcon, TrainerProfileEssential, TrainerProfileImgUpload } from "@/components/ui/image";
import { TrainerRegistFormValue } from "@/lib/trainerRegistSchema";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { TrainerApplicationDetail } from "../type";
import Image from "next/image";
import useModal from "@/components/hooks/useModal";
import OneButtonModal from "@/components/ui/OneButtonModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";

interface TrainerEssentialQulificationProps {
    setValue: UseFormSetValue<TrainerRegistFormValue>;
    error?: string;
    initialData?: TrainerApplicationDetail;
    mode?: string;
}

export default function TrainerRegistEssentialQulification({
    setValue,
    error,
    initialData,
    mode = "edit"
}: TrainerEssentialQulificationProps) {

    const [qualificationFile, setQualificationFile] = useState<File | null>(null);
    const [qualificationFileName, setQualificationFileName] = useState(
        initialData?.certificateOriginalName ?? ""
    );

    // 자격증 관리
    const handleQualificationChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setQualificationFile(file);
        setQualificationFileName(file.name);

        setValue("certificateFile", file, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const handleRemoveQualification = () => {
        setQualificationFile(null);
        setQualificationFileName("");

        setValue("certificateFile", undefined, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const confirmModal = useModal(handleRemoveQualification);
    const checkModal = useModal(confirmModal.openModal);

    return (
        <div className={`
            flex flex-col gap-4
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            ${mode === "edit" && "opacity-50"}
            border
            border-[#36415380]
            rounded-[16px]
            `}>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-3">
                    <div className="flex gap-5 items-center">
                        <p className="text-[20px] font-extrabold text-white"> 필수 자격증 </p>
                        {mode === "edit" &&
                            <p className="
                                flex items-center justify-center
                                text-[12px] font-normal text-[#99A1AF]
                                border rounded-full 
                                px-3 py-1"> 수정 불가</p>
                        }
                    </div>
                    {mode === "edit"
                        ?
                        <p className="text-[12px] text-[#6A7282] font-medium"> 필수 자격증은 수정할 수 없습니다. </p>
                        :
                        <p className="text-[12px] text-[#6A7282] font-medium"> 국가 공인 자격증만 가능합니다. </p>
                    }
                </div>
                <button
                    type="button"
                    disabled={mode === "edit"}
                    className={`
                        flex gap-3 items-center
                        px-4 py-2
                        bg-[#BFFF0B] rounded-[10px]
                        self-baseline
                        ${mode !== "edit" && "hover:cursor-pointer"}
                        `}>
                    <div className="relative w-4 h-4">
                        <Image
                            src={TrainerProfileImgUpload}
                            alt="필수 자격증 업로드 버튼"
                            fill
                            priority
                            sizes="w-8 h-8"
                            className="object-cover"
                        />
                    </div>
                    <label htmlFor="trainer-profile-essential-upload-button" className="text-[14px] font-bold text-black whitespace-nowrap hover:cursor-pointer"> 파일 업로드 </label>
                    <input
                        disabled={mode === "edit"}
                        id="trainer-profile-essential-upload-button"
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                        onChange={handleQualificationChange}
                        className="hidden" />
                </button>
            </div>
            {!qualificationFileName ? (
                <>
                    <label
                        htmlFor="trainer-profile-essential-upload"
                        className="flex flex-col py-8 gap-3 items-center justify-center rounded-[14px] border border-[#364153] hover:cursor-pointer mt-3">
                        <div className="relative w-8 h-8">
                            <Image
                                src={TrainerProfileEssential}
                                alt="필수 자격증 업로드 칸"
                                fill
                                priority
                                sizes="w-16 h-16"
                                className="object-cover"
                            />
                        </div>
                        <p className="text-[14px] text-[#99A1AF] font-medium"> 자격증 파일을 업로드하세요 </p>
                        <p className="text-[12px] text-[#4A5565] font-medium"> PDF, JPG, PNG 파일 지원 </p>
                    </label>
                    <input
                        id="trainer-profile-essential-upload"
                        type="file"
                        name="essentialQulification"
                        accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf"
                        onChange={handleQualificationChange}
                        className="hidden" />
                </>
            )
                :
                <div className="flex gap-3 justify-between">
                    <div className="flex flex-1 gap-2 px-3 py-2 border border-[#364153] bg-[#1E293980] items-center rounded-[10px]">
                        <div className="relative w-4 h-4">
                            <Image
                                src={TrainerEssentialQulificationIcon}
                                alt="자격증 업로드시 나오는 아이콘"
                                fill
                                priority
                                sizes="w-8 h-8"
                                className="object-cover"
                            />
                        </div>
                        {mode === "edit"
                            ?
                            <p className="text-[#99A1AF] text-[12px] font-medium"> {initialData?.certificateOriginalName} </p>
                            :
                            <p className="text-[#99A1AF] text-[12px] font-medium"> {qualificationFileName} </p>
                        }
                    </div>
                    <button
                        onClick={checkModal.openModal}
                        type="button"
                        className="px-4 py-3 bg-[#82181A4D] rounded-[10px] text-[#FF6467] font-extrabold hover:cursor-pointer">
                        ✕
                    </button>

                    <TwoButtonModal
                        isModal={checkModal.isModal}
                        closeModal={checkModal.closeModal}
                        activeModal={checkModal.activeModal}
                        content="필수 자격증을 삭제하시겠습니까?"
                        title='필수 자격증 삭제' 
                    />

                    <OneButtonModal 
                        isModal={confirmModal.isModal}
                        closeModal={confirmModal.closeModal}
                        activeModal={confirmModal.activeModal} 
                        title='필수 자격증 삭제'
                        content='필수 자격증이 삭제되었습니다.' 
                    />
                </div>
            }
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}