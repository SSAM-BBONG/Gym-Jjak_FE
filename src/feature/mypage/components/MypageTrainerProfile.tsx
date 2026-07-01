'use client'

import { TrainerProfileImgUpload } from "@/components/ui/image";
import { MypageTrainerProfileFormValue } from "@/lib/mypageTrainerProfileEditSchema";
import { UseFormSetValue } from "react-hook-form";
import { MyTrainerProfileData } from "../type";
import { useEffect, useState } from "react";
import Image from "next/image";

interface MypageTrainerProfileProps {
    data: MyTrainerProfileData;
    mode: string;
    setValue: UseFormSetValue<MypageTrainerProfileFormValue>;
    error?: string;
}

export default function MypageTrainerProfile({ data, mode, setValue, error }: MypageTrainerProfileProps) {

    const [profileImageFile, setProfileImageFile] = useState<File | null>(null);
    const [profileImagePreview, setProfileImagePreview] = useState(
        data.profileImageUrl ?? ""
    );

    const isReadOnly = mode === "read";

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

    useEffect(() => {
        if (mode === "read") {
            setProfileImageFile(null);
            setProfileImagePreview(data.profileImageUrl ?? "");
            setValue("profileImageFile", null);
            setValue("profileImageAction", "KEEP");
        }
    }, [mode, data.profileImageUrl, setValue]);

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
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border
            border-[#36415380]
            rounded-[16px]
            ">
            <p className="text-[20px] font-extrabold text-white"> 프로필 사진 </p>
            <div className="flex gap-6 items-center">
                <div className="flex items-center justify-center size-35 border-[3px] border-[#BFFF0B] rounded-full overflow-hidden">
                    {/* <img
                        className="w-full h-full object-cover"
                        src={profileImagePreview}
                        alt="트레이너 프로필 수정 프로필 사진" /> */}
                </div>
                {!isReadOnly &&
                    <>
                        <label
                            htmlFor="trainer-profile-img-upload"
                            className="flex gap-3 px-6 py-3 bg-[#BFFF0B] rounded-[10px] hover:cursor-pointer"
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
                            <p className="text-[16px] font-extrabold text-black"> 프로필 업로드 </p>
                        </label>
                        <input
                            id="trainer-profile-img-upload"
                            type="file"
                            disabled={isReadOnly}
                            name="profileImg"
                            accept=".jpg,.jpeg,.png, image/jpeg,image/png"
                            onChange={handleProfileChange}
                            className="hidden" />
                    </>
                }
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}