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
import TrainerAffiliatedGym from "./TrainerAffiliatedGym";
import { toast } from "sonner";

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
  status: "PENDING",
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
    organizationIds: [],
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

    if (mode === "create") {
      formData.append("organizationIds", JSON.stringify(values.organizationIds ?? []));
    }

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

    toast.success(mode === "edit" ? "트레이너 수정이 완료되었습니다." : "트레이너 신청이 완료되었습니다.");
    router.push(mode === "edit" ? `/pt/trainer-apply/${initialData.trainerApplicationId}` : "/pt/trainer-apply");
  };

    return (
        <div className="flex flex-col px-2.5 pt-6 sm:px-2.5 md:px-40 md:pt-8 lg:px-80 lg:pt-10">
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
            <form  onSubmit={handleSubmit(onSubmit)} className="mt-4 flex flex-col gap-4 md:mt-5 md:gap-5 lg:mt-6 lg:gap-6">
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

            {mode === "create" && (
              <TrainerAffiliatedGym
                setValue={setValue}
                error={errors.organizationIds?.message}
              />
            )}

            <TrainerRegistSelfIntroduction
            register={register}
            error={errors.introduction?.message}         
            />

                <div className="flex gap-3 md:gap-4 lg:gap-4">
                    <button 
                      type="button"
                      className="mb-12 flex-1 rounded-[10px] bg-[#1E2939] py-2 text-sm font-extrabold text-white hover:cursor-pointer md:mb-16 md:py-3 md:text-base lg:mb-20 lg:py-3 lg:text-[16px]"
                      onClick={() => router.back()}
                    >
                      취소 
                    </button>
                    <button 
                      type="submit" 
                      disabled={isSubmitting} 
                      className={`mb-12 flex-1 rounded-[10px] py-2 text-sm font-extrabold text-black hover:cursor-pointer md:mb-16 md:py-3 md:text-base lg:mb-20 lg:py-3 lg:text-[16px]
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