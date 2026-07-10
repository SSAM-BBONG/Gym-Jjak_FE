'use client'

import TrainerEssentialQulification from "./TrainerRegistEssentialQulificatoin";
import TrainerAwardHistory from "./TrainerRegistAwardHistory";
import TrainerRegistSelfIntroduction from "./TrainerRegistSelfIntroduction";
import TrainerRegistProfile from "./TrainerRegistProfile";
import { trainerApplicationAction, trainerApplicationEditAction } from "../actions";
import TrainerQulification from "./TrainerRegistEssential";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { trainerRegistCreateSchema, trainerRegistEditSchema, TrainerRegistFormValue } from "@/lib/trainerRegistSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { TrainerApplicationDetail } from "../type";
import { useRouter } from "next/navigation";
import { success } from "zod";
import useModal from "@/components/hooks/useModal";
import { useState } from "react";
import OneButtonModal from "@/components/ui/OneButtonModal";

interface TrainerRegistFormProps {
  mode?: "create" | "edit";
  initialData?: TrainerApplicationDetail;
}

export default function   TrainerRegistForm( { mode = "create", initialData = {
  trainerApplicationId: 0,
  userId: 0,
  profileImageUrl: "",
  profileImageOriginalName: "",
  certificateUrl: "",
  certificateOriginalName: "",
  qualifications: [],
  awardHistories: [],
  introduction: "",
  status: "",
  rejectReason: "",
  reviewedBy: 0,
  reviewedAt: "",
  createdAt: "",
  updatedAt: ""
}}: TrainerRegistFormProps) {
  
const schema = mode === "edit"
? trainerRegistEditSchema
: trainerRegistCreateSchema;

const router = useRouter();

const errorModal = useModal();
const [errorMessage, setErrorMessage] = useState("");

const {
  register,
  handleSubmit,
  setValue,
  formState: { errors, isSubmitting },
} = useForm<TrainerRegistFormValue>({
  resolver: zodResolver(schema) as Resolver<TrainerRegistFormValue>,
  defaultValues: {
    profileImageFile: null,
    profileImageAction: "KEEP",
    certificateFile: undefined,
    qualifications: initialData?.qualifications ?? [],
    awardHistories: initialData?.awardHistories ?? [],
    introduction: initialData?.introduction ?? "",
  },
  mode: "onSubmit",
});

const onSubmit: SubmitHandler<TrainerRegistFormValue> = async (values) => {
    const formData = new FormData();

    if (values.profileImageFile) {
      formData.append("profileImageFile", values.profileImageFile);
    }

    formData.append("profileImageAction", values.profileImageAction ?? "KEEP");
    formData.append("qualifications", JSON.stringify(values.qualifications));
    formData.append("awardHistories", JSON.stringify(values.awardHistories));
    formData.append("introduction", values.introduction);

    if (mode !== "edit" && values.certificateFile) {
      formData.append("certificateFile", values.certificateFile);
    }

    const result = mode === "edit" 
      ? await trainerApplicationEditAction(initialData.trainerApplicationId, formData)
      : await trainerApplicationAction(formData)

    if(result?.success === false) {
      setErrorMessage(result?.message);
      errorModal.openModal();
      return;
    }
  };

    return (
        <div className="flex flex-col px-80 pt-10">
          {mode === 'edit' 
          ?  
            <>
            <p className="text-[36px] font-black text-white"> 트레이너 수정</p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 트레이너 정보를 수정하세요</p>
            </>
          :
            <>
            <p className="text-[36px] font-black text-white"> 트레이너 신청</p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 트레이너로 활동하기 위한 정보를 입력하세요</p>
            </>
          }
            <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-6">            
            <TrainerRegistProfile
            setValue={setValue}
            error={errors.profileImageFile?.message}
            initialData = {initialData} 
            mode={mode}
            />

            <TrainerEssentialQulification
            setValue={setValue}
            error={errors.certificateFile?.message}
            initialData = {initialData}
            mode={mode}             
            />

            <TrainerQulification
            setValue={setValue}
            error={errors.qualifications?.message}
            initialData = {initialData}  
            mode={mode}  
            />

            <TrainerAwardHistory
            setValue={setValue}
            error={errors.awardHistories?.message}
            initialData = {initialData}
            mode={mode}       
            />

            <TrainerRegistSelfIntroduction
            register={register}
            error={errors.introduction?.message}         
            />

                <div className="flex gap-4">
                    <button 
                      type="button"
                      className="flex-1 bg-[#1E2939] text-white text-[16px] font-extrabold py-3 mb-20 rounded-[10px] hover:cursor-pointer"
                      onClick={() => router.back()}
                    >
                      취소 
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className={`flex-1 text-black text-[16px] font-extrabold py-3 mb-20 rounded-[10px] hover:cursor-pointer
                      ${isSubmitting ? 'bg-[#beff0b7c]' : 'bg-[#BFFF0B]'}
                      `}
                    > 
                      {mode==="edit" ? (isSubmitting ? "수정중..." : "수정하기") : isSubmitting ? "신청중..." : "신청하기"} 
                    </button>
                </div>      
            </form>

            <OneButtonModal
              isModal={errorModal.isModal}
              closeModal={errorModal.closeModal}
              activeModal={errorModal.activeModal}
              title="트레이너 신청"
              content={errorMessage}
            />
        </div>
    );
}