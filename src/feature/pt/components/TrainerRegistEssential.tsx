
'use client'

import { TrainerRegistFormValue } from "@/lib/trainerRegistSchema";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";

interface TrainerQulificationProps {
  setValue: UseFormSetValue<TrainerRegistFormValue>;
  error?: string;
}

export default function TrainerQulification({
  setValue,
  error,
}: TrainerQulificationProps) {
    
  const [qualificationInput, setQualificationInput] = useState("");
  const [qualifications, setQualifications] = useState<string[]>([]);

 const handleAddQualification = () => {
    const trimmedValue = qualificationInput.trim();

    if (trimmedValue === "") return;

    const nextQualifications = [...qualifications, trimmedValue];

    setQualifications(nextQualifications);
    setQualificationInput("");

    setValue("qualifications", nextQualifications, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleRemoveQualification = (removeIndex: number) => {
    const nextQualifications = qualifications.filter(
      (_, index) => index !== removeIndex
    );

    setQualifications(nextQualifications);

    setValue("qualifications", nextQualifications, {
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
            rounded-[16px]">
                <div className="flex justify-between items-center">
                <p className="text-[20px] font-extrabold text-white"> 자격증 </p>
                    <button 
                        type="button"
                        onClick={handleAddQualification}
                        className="bg-[#364153] px-4 py-2 rounded-[10px] text-[16px] text-white font-medium"
                    > 
                    + &nbsp; 추가 
                    </button>
                </div>

        <input
            value={qualificationInput}
            onChange={(e) => setQualificationInput(e.target.value)}
            placeholder="ex): 건강운동관리사"
            name="qulification"
            className="bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-white placeholder:text-[#FFFFFF80]"
          />

      {qualifications.map((qualification, index) => (
        <div key={index} className="flex gap-3">
            <p className="bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-white"> {qualification} </p>
            <button 
                type="button"
                onClick={() => handleRemoveQualification(index)}
                className="px-4 py- bg-[#82181A4D] rounded-[10px] text-[#FF6467] font-extrabold"> ✕ </button>
        </div>
      ))}   
            {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
    );
}