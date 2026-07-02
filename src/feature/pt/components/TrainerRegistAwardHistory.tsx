'use client'

import { TrainerRegistFormValue } from "@/lib/trainerRegistSchema";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { TrainerApplicationDetail } from "../type";

interface TrainerAwardHistoryProps {
  setValue: UseFormSetValue<TrainerRegistFormValue>;
  error?: string;
  initialData?: TrainerApplicationDetail;
  mode?: string
}

export default function TrainerRegistAwardHistory({
  setValue,
  error,
  initialData,
  mode
}: TrainerAwardHistoryProps) {

    const [awarHistoryInput, setAwarHistoryInput] = useState("");
    const [awardHistorys, setawardHistorys] = useState<string[]>(
      initialData?.awardHistories ?? []);

  const handleAddQualification = () => {
    const trimmedValue = awarHistoryInput.trim();
    
    if (trimmedValue === "") return;

    const nextAwardHistories = [...awardHistorys, trimmedValue];

    setawardHistorys(nextAwardHistories);
    setAwarHistoryInput("");

    setValue("awardHistories", nextAwardHistories, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  const handleRemoveQualification = (removeIndex: number) => {
    const nextAwardHistories = awardHistorys.filter(
      (_, index) => index !== removeIndex
    );

    setawardHistorys(nextAwardHistories);

    setValue("awardHistories", nextAwardHistories, {
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
            <p className="text-[20px] font-extrabold text-white"> 대회 경력 </p>
                <button 
                    type="button"
                    onClick={handleAddQualification}
                    className="bg-[#364153] px-4 py-2 rounded-[10px] text-[16px] text-white font-medium"> + &nbsp; 추가 </button>
            </div>
            <input 
                value={awarHistoryInput}
                onChange={(e) => setAwarHistoryInput(e.target.value)}
                placeholder="ex): 2023 피지크 대회 입상"
                className="bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-white placeholder:text-[#FFFFFF80]"/> 
            {awardHistorys.map((award, index) => (
              <div key={index} className="flex gap-3">
                  <p className="bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-white"> {award} </p>
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