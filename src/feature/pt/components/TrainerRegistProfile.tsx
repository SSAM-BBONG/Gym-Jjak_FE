'use client'

import { TrainerProfileImgDefault, TrainerProfileImgUpload } from "@/components/ui/image";
import { TrainerRegistFormValue } from "@/lib/trainerRegistSchema";
import { useEffect, useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { TrainerApplicationDetail } from "../type";

interface TrainerRegistProfileProps {
  setValue: UseFormSetValue<TrainerRegistFormValue>;
  initialData?: TrainerApplicationDetail;
  error?: string;
}

export default function TrainerRegistProfile({
  setValue,
  error,
  initialData
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
  };

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
                    <div className="flex items-center justify-center size-35 border-[3px] border-[#BFFF0B] rounded-full bg-[#1E2939] overflow-hidden">
                        <img
                        className="w-full h-full object-cover"
                        src={profileImagePreview || TrainerProfileImgDefault}
                        alt="트레이너 프로필 수정 프로필 사진"
                        />
                    </div>
                    <label 
                        htmlFor="trainer-profile-img-upload"
                        className="flex gap-3 px-6 py-3 bg-[#BFFF0B] rounded-[10px] hover:cursor-pointer"
                    > 
                        <img src={TrainerProfileImgUpload} alt="트레이너 프로필 업로드 버튼"/>
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