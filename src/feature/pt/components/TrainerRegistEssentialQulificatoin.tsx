'use client'

import { TrainerEssentialQulificationIcon, TrainerProfileEssential, TrainerProfileImgUpload } from "@/components/ui/image";
import { TrainerRegistFormValue } from "@/lib/trainerRegistSchema";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface TrainerEssentialQulificationProps {
  setValue: UseFormSetValue<TrainerRegistFormValue>;
  error?: string;
}

export default function TrainerRegistEssentialQulification({
  setValue,
  error,
}: TrainerEssentialQulificationProps) { 

    const [qulification, setQualification] = useState("");
    const [qulificationFile, setQualificationFile] = useState<File | null>(null);

    // 자격증 관리
  const handleQualificationChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    setQualificationFile(file);
    setQualification(file.name);

    setValue("certificateFile", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleRemoveQualification = () => {
    setQualificationFile(null);
    setQualification("");

    setValue("certificateFile", undefined as unknown as File, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

    return (
        <div className="
            flex flex-col gap-4
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border
            border-[#36415380]
            rounded-[16px]
            ">
                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-3">
                        <p className="text-[20px] font-extrabold text-white"> 필수 자격증 </p>
                        <p className="text-[12px] text-[#6A7282] font-medium"> 국가 공인 자격증만 가능합니다. </p>
                    </div>
                    <button 
                        type="button"
                        className="
                        flex gap-3 
                        px-4 py-2
                        bg-[#BFFF0B] rounded-[10px]
                        hover:cursor-pointer
                        ">
                        <img src={TrainerProfileImgUpload} alt="필수 자격증 업로드 버튼"/>
                        <label htmlFor="trainer-profile-essential-upload-button" className="text-[14px] font-bold text-black whitespace-nowrap"> 파일 업로드 </label> 
                        <input 
                            id="trainer-profile-essential-upload-button" 
                            type="file" 
                            accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" 
                            onChange={handleQualificationChange}
                            className="hidden"/>
                    </button>
                </div>
                {qulificationFile === null ? (
                <>
                <label 
                    htmlFor="trainer-profile-essential-upload"
                    className="flex flex-col py-8 gap-3 items-center justify-center rounded-[14px] border border-[#364153] hover:cursor-pointer mt-3">
                    <img src={TrainerProfileEssential} alt="필수 자격증 업로드 칸"/>
                    <p className="text-[14px] text-[#99A1AF] font-medium"> 자격증 파일을 업로드하세요 </p>
                    <p className="text-[12px] text-[#4A5565] font-medium"> PDF, JPG, PNG 파일 지원 </p>
                </label>
                <input 
                    id="trainer-profile-essential-upload" 
                    type="file" 
                    name="essentialQulification"
                    accept=".jpg,.jpeg,.png,.pdf,image/jpeg,image/png,application/pdf" 
                    onChange={handleQualificationChange}
                    className="hidden"/>
                </>
                )
                    :
                <div className="flex gap-3 justify-between">
                    <div className="flex flex-1 gap-2 px-3 py-2 border border-[#364153] bg-[#1E293980] items-center rounded-[10px]"> 
                        <img src={TrainerEssentialQulificationIcon} alt="자격증 업로드시 나오는 아이콘"/>
                        <p className="text-[#99A1AF] text-[12px] font-medium"> {qulification} </p>
                    </div>
                        <button 
                            onClick={handleRemoveQualification}
                            type="button"
                            className="px-4 py-3 bg-[#82181A4D] rounded-[10px] text-[#FF6467] font-extrabold"> 
                            ✕ 
                        </button>
                </div>
                }
                {error && <p className="text-sm text-red-500">{error}</p>}
            </div>
        );
}