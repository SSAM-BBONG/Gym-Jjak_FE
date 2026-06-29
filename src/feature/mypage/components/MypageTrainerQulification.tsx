'use client'

import { MypageTrainerProfileFormValue } from "@/lib/mypageTrainerProfileEditSchema";
import { UseFormSetValue } from "react-hook-form";
import { MyTrainerProfileData } from "../type";
import { useEffect, useState } from "react";

interface MypageTrainerQulificationProps {
  data: MyTrainerProfileData;
  setValue: UseFormSetValue<MypageTrainerProfileFormValue>;
  error?: string;
  mode?: string
}

export default function MypageTrainerQulification( { data, setValue, error, mode = "read"}: MypageTrainerQulificationProps) {
    // 필수자격증, 자격증이 나뉘어 오지 않아 타입이 필수인 자격증 필터링
    const initialQualifications = data.certifications
        .filter((item) => item.certificationType !== "ESSENTIAL")
        .map((item) => item.name);

    const [qualificationInput, setQualificationInput] = useState("");
    const [qualifications, setQualifications] = useState<string[]>(
        initialQualifications
    );

    const isReadOnly = mode === "read"

      const handleAddQualification = () => {
    const trimmedValue = qualificationInput.trim();

    if (trimmedValue === "") return;

    const nextQualifications = [...qualifications, trimmedValue];

    setQualifications(nextQualifications);
    setQualificationInput("");

    setValue("additionalCertifications", nextQualifications, {
    shouldValidate: true,
    shouldDirty: true,
        });
    };

    const handleRemoveQualification = (removeIndex: number) => {
        const nextQualifications = qualifications.filter(
        (_, index) => index !== removeIndex
        );

        setQualifications(nextQualifications);

        setValue("additionalCertifications", nextQualifications, {
        shouldValidate: true,
        shouldDirty: true,
        });
    };

    useEffect(() => {
        if (mode === "read") {
        setQualificationInput("");
        setQualifications(initialQualifications);
        setValue("additionalCertifications", initialQualifications);
        }
    }, [mode, data.certifications, setValue]);
    
    return (
        <div className="
            flex flex-col gap-4
            p-8
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            border
            border-[#36415380]
            rounded-[16px]">
                <div className="flex justify-between items-center">
                    <p className="text-[20px] font-extrabold text-white"> 자격증 </p>
                    {!isReadOnly &&
                        <button 
                            type="button"
                            onClick={handleAddQualification}
                            className="bg-[#364153] px-4 py-2 rounded-[10px] text-[16px] text-white font-medium"> + &nbsp; 추가 </button>
                    }
                </div>


                {!isReadOnly && (
                    <input
                        value={qualificationInput}
                        onChange={(e) => setQualificationInput(e.target.value)}
                        placeholder="ex): 건강운동관리사"
                        name="qualification"
                        className="bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-white placeholder:text-[#FFFFFF80]"
                    />
                )}

                {qualifications.map((item, index) => (
                    <div key={index} className="flex gap-3">
                    <p className="bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-white">
                        {item}
                    </p>

                    {!isReadOnly && (
                        <button
                        type="button"
                        onClick={() => handleRemoveQualification(index)}
                        className="px-4 py-3 bg-[#82181A4D] rounded-[10px] text-[#FF6467] font-extrabold"
                        >
                        ✕
                        </button>
                    )}

                    {error && <p className="text-sm text-red-500">{error}</p>}
                    </div>
                ))}
            </div>
    );
}