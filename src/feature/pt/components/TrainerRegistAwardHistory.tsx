'use client'

import { TrainerRegistFormValue } from "@/lib/trainerRegistSchema";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { TrainerApplicationDetail } from "../type";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import useModal from "@/components/hooks/useModal";
import { toast } from "sonner";

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
    const [selectedAwardHistoryIndex, setSelectedAwardHistoryIndex] = useState<number | null>(null);

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
    toast.success("대회 경력이 삭제되었습니다.");
  };

  const canAddAwardHistory = awarHistoryInput.trim().length > 0;

  const checkModal = useModal(() => {
    if (selectedAwardHistoryIndex !== null) {
      handleRemoveQualification(selectedAwardHistoryIndex);
    }
  });

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
            lg:rounded-[16px]">
            <div>
              <p className="text-[20px] font-extrabold text-white"> 대회 경력 </p>
              <p className="mt-1 text-sm text-[#99A1AF]">
                대회명과 수상 내역을 입력하고 목록에 추가하세요.
              </p>
            </div>
            <div className="flex gap-2 md:gap-3 lg:gap-2">
              <input
                  value={awarHistoryInput}
                  onChange={(e) => setAwarHistoryInput(e.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      handleAddQualification();
                    }
                  }}
                  placeholder="예: 2023 피지크 대회 입상"
                  className="w-0 flex-1 rounded-[10px] border border-[#364153] bg-[#1E2939] px-4 py-3 text-white placeholder:text-[#FFFFFF80]"/>
              <button
                  type="button"
                  onClick={handleAddQualification}
                  disabled={!canAddAwardHistory}
                  className="shrink-0 rounded-[10px] bg-[#BFFF0B] px-2 py-2 text-xs font-extrabold text-black transition-colors hover:bg-[#d0ff4f] disabled:cursor-not-allowed disabled:bg-[#364153] disabled:text-[#99A1AF] md:px-4 md:py-3 md:text-[15px] lg:px-5 lg:py-3 lg:text-[15px]"
                >
                  목록에 추가
                </button>
            </div>
            {awardHistorys.length === 0 && (
              <p className="rounded-[10px] border border-dashed border-[#364153] px-4 py-3 text-sm text-[#99A1AF]">
                아직 등록한 대회 경력이 없습니다.
              </p>
            )}
            {awardHistorys.map((award, index) => (
              <div key={index} className="flex gap-2 md:gap-3 lg:gap-3">
                  <p className="bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-white"> {award} </p>
                  <button 
                      type="button"
                      onClick={() => {
                        setSelectedAwardHistoryIndex(index);
                        checkModal.openModal();
                      }}
                      className="px-4 py- bg-[#82181A4D] rounded-[10px] text-[#FF6467] font-extrabold hover:cursor-pointer"> 
                    ✕ 
                  </button>
                  <TwoButtonModal
                      isModal={checkModal.isModal}
                      closeModal={checkModal.closeModal} 
                      activeModal={checkModal.activeModal}
                      content="대회 경력을 삭제하시겠습니까?"
                      title='대회 경력 삭제' 
                  />

            </div>
            ))}  
              {error && <p className="text-sm text-red-500">{error}</p>}
        </div>
    );
}