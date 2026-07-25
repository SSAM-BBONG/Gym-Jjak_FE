'use client'

import { TrainerProfileImgDefault, TrainerProfileImgUpload } from "@/components/ui/image";
import { TrainerRegistFormValue } from "@/lib/trainerRegistSchema";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { TrainerApplicationDetail } from "../type";
import Image from "next/image";
import useModal from "@/components/hooks/useModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { toast } from "sonner";

interface TrainerRegistProfileProps {
    setValue: UseFormSetValue<TrainerRegistFormValue>;
    error?: string;
    initialData?: TrainerApplicationDetail;
    mode?: string;
}

export default function TrainerRegistProfile({
    setValue,
    error,
    initialData,
    mode
}: TrainerRegistProfileProps) {
    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [profileImagePreview, setProfileImagePreview] = useState(
        initialData?.profileImageUrl ?? "");

    const handleProfileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setProfileImageFile(file);
        setProfileImagePreview(URL.createObjectURL(file));

        setValue("profileImageFile", file, {
            shouldValidate: true,
            shouldDirty: true,
        });

        setValue("profileImageAction", "REPLACE", {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const handleProfileDelete = () => {
        setProfileImageFile(null);
        setProfileImagePreview("");

        setValue("profileImageFile", null, {
            shouldValidate: true,
            shouldDirty: true,
        });

        setValue("profileImageAction", "DELETE", {
            shouldValidate: true,
            shouldDirty: true,
        });

        toast.success("프로필 사진이 삭제되었습니다.");
    };

    const checkModal = useModal(handleProfileDelete);

    useEffect(() => {
        return () => {
            if (profileImagePreview) {
                URL.revokeObjectURL(profileImagePreview);
            }
        };
    }, [profileImagePreview]);

    return (
        <div className="
            flex flex-col gap-4
            p-4
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border
            border-[#36415380]
            rounded-xl
            md:p-6
            md:rounded-2xl
            lg:p-8
            lg:rounded-[16px]
            ">
            <p className="text-[20px] font-extrabold text-white"> 프로필 사진 </p>
            {mode === "edit" && <p className="text-[12px] text-[#6A7282] font-medium"> 프로필 업로드를 통해 프로필 사진을 변경할 수 있습니다. </p>}
            <div className="flex items-center gap-4 md:gap-5 lg:gap-6">
                <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border-[3px] border-[#BFFF0B] bg-[#1E2939] overflow-hidden md:h-28 md:w-28 lg:h-35 lg:w-35">
                        <div className={profileImagePreview ? "relative w-full h-full" : "relative w-12 h-12"}>
                            <Image
                                src={profileImagePreview || TrainerProfileImgDefault}
                                alt="트레이너 프로필 수정 프로필 사진"
                                fill
                                priority
                                sizes="w-8 h-8"
                                className={`${profileImagePreview && "w-full h-full"} object-cover`}
                            />
                        </div>
                    </div>
                    {profileImagePreview &&
                        <button
                            type="button"
                            onClick={checkModal.openModal}
                            className="
                                absolute
                                top-0
                                right-0
                                w-8
                                h-8
                                rounded-full
                                text-[#FF6467]
                                font-extrabold
                                hover:cursor-pointer
                                ">
                            ✕
                        </button>
                    }
                    <TwoButtonModal
                        isModal={checkModal.isModal}
                        closeModal={checkModal.closeModal}
                        activeModal={checkModal.activeModal} 
                        title='프로필 삭제' 
                        content="프로필 사진을 삭제하시겠습니까?"
                    />
                </div>
                <label
                    htmlFor="trainer-profile-img-upload"
                    className="flex items-center gap-2 rounded-[10px] bg-[#BFFF0B] px-3 py-2 hover:cursor-pointer md:gap-3 md:px-5 md:py-3 lg:gap-3 lg:px-6 lg:py-3"
                >
                    <div className="relative w-4 h-4">
                        <Image
                            src={TrainerProfileImgUpload}
                            alt="트레이너 프로필 업로드 버튼"
                            fill
                            priority
                            sizes="w-8 h-8"
                            className="object-cover"
                        />
                    </div>
                    <p className="text-[16px] font-bold text-black"> 프로필 업로드 </p>
                </label>
                <input
                    id="trainer-profile-img-upload"
                    accept=".jpg,.jpeg,.png, image/jpeg,image/png"
                    type="file"
                    name="profileImg"
                    onChange={(handleProfileChange)}
                    className="hidden" />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}
