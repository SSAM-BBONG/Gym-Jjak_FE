
'use client'

import { TrainerRegistFormValue } from "@/lib/trainerRegistSchema";
import { useState } from "react";
import { UseFormSetValue } from "react-hook-form";
import { TrainerApplicationDetail } from "../type";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import useModal from "@/components/hooks/useModal";
import { toast } from "sonner";

interface TrainerQulificationProps {
  setValue: UseFormSetValue<TrainerRegistFormValue>;
  error?: string;
  initialData?: TrainerApplicationDetail;
  mode?: string;
}

export default function TrainerQulification({
  setValue,
  error,
  initialData,
  mode
}: TrainerQulificationProps) {
    
  const [qualificationInput, setQualificationInput] = useState("");
  const [qualifications, setQualifications] = useState<string[]>(
    initialData?.qualifications ?? []);
  const [selectedQualificationIndex, setSelectedQualificationIndex] = useState<number | null>(null);

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
    toast.success("자격증이 삭제되었습니다.");
  };

  const canAddQualification = qualificationInput.trim().length > 0;

  const checkModal = useModal(() => {
    if (selectedQualificationIndex !== null) {
      handleRemoveQualification(selectedQualificationIndex);
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
                  <p className="text-[20px] font-extrabold text-white"> 자격증 </p>
                  <p className="mt-1 text-sm text-[#99A1AF]">
                    자격증명을 입력하고 목록에 추가하세요.
                  </p>
                </div>

        <div className="flex gap-2 md:gap-3 lg:gap-2">
          <input
              value={qualificationInput}
              onChange={(e) => setQualificationInput(e.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  handleAddQualification();
                }
              }}
              placeholder="예: 건강운동관리사"
              name="qulification"
              className="w-0 flex-1 rounded-[10px] border border-[#364153] bg-[#1E2939] px-4 py-3 text-white placeholder:text-[#FFFFFF80]"
            />
          <button
              type="button"
              onClick={handleAddQualification}
              disabled={!canAddQualification}
              className="shrink-0 rounded-[10px] bg-[#BFFF0B] px-2 py-2 text-xs font-extrabold text-black transition-colors hover:bg-[#d0ff4f] disabled:cursor-not-allowed disabled:bg-[#364153] disabled:text-[#99A1AF] md:px-4 md:py-3 md:text-[15px] lg:px-5 lg:py-3 lg:text-[15px]"
            >
              목록에 추가
            </button>
        </div>
          {qualifications.length === 0 && (
            <p className="rounded-[10px] border border-dashed border-[#364153] px-4 py-3 text-sm text-[#99A1AF]">
              아직 등록한 자격증이 없습니다.
            </p>
          )}
          {qualifications.map((qualification, index) => (
            <div key={index} className="flex gap-2 md:gap-3 lg:gap-3">
                <p className="bg-[#1E2939] px-4 py-3 border border-[#364153] flex-1 rounded-[10px] text-white"> {qualification} </p>
                <button 
                    type="button"
                    onClick={() => {
                      setSelectedQualificationIndex(index);
                      checkModal.openModal();
                    }}
                    className="px-4 py- bg-[#82181A4D] rounded-[10px] text-[#FF6467] font-extrabold hover:cursor-pointer"> 
                  ✕ 
                </button>
                <TwoButtonModal
                    isModal={checkModal.isModal}
                    closeModal={checkModal.closeModal} 
                    activeModal={checkModal.activeModal}
                    content="자격증을 삭제하시겠습니까?"
                    title='자격증 삭제' 
                />

            </div>
            ))}
            {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
    );
}