'use client'

import TrainerEssentialQulification from "./TrainerRegistEssentialQulificatoin";
import TrainerAwardHistory from "./TrainerRegistAwardHistory";
import TrainerRegistSelfIntroduction from "./TrainerRegistSelfIntroduction";
import TrainerRegistProfile from "./TrainerRegistProfile";
import { trainerApplicationAction } from "../actions";
import { useActionState } from "react";
import TrainerQulification from "./TrainerRegistEssential";
import { SubmitHandler, useForm } from "react-hook-form";
import { TrainerRegistFormValue, trainerRegistSchema } from "@/lib/trainerRegistSchema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function TrainerRegistForm() {
const {
  register,
  handleSubmit,
  setValue,
  formState: { errors, isSubmitting },
} = useForm<TrainerRegistFormValue>({
  resolver: zodResolver(trainerRegistSchema),
  defaultValues: {
    profileImageFile: null,
    qualifications: [],
    awardHistories: [],
    introduction: "",
  },
  mode: "onSubmit",
});

const onSubmit: SubmitHandler<TrainerRegistFormValue> = async (values) => {
  const formData = new FormData();

  if (values.profileImageFile) {
    formData.append("profileImageFile", values.profileImageFile);
  }

  formData.append("certificateFile", values.certificateFile);
  formData.append("qualifications", JSON.stringify(values.qualifications));
  formData.append("awardHistories", JSON.stringify(values.awardHistories));
  formData.append("introduction", values.introduction);

  const result = await trainerApplicationAction(formData);

  if (result?.success === false) {
    console.error(result.message);
  }
};
    return (
        <div className="flex flex-col px-80 pt-10">
            <p className="text-[36px] font-black text-white"> 트레이너 신청</p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 트레이너로 활동하기 위한 정보를 입력하세요</p>

            <form  onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6 mt-6">            
            <TrainerRegistProfile
            setValue={setValue}
            error={errors.profileImageFile?.message}
            />

            <TrainerEssentialQulification
            setValue={setValue}
            error={errors.certificateFile?.message}
            />

            <TrainerQulification
            setValue={setValue}
            error={errors.qualifications?.message}
            />

            <TrainerAwardHistory
            setValue={setValue}
            error={errors.awardHistories?.message}
            />

            <TrainerRegistSelfIntroduction
            register={register}
            error={errors.introduction?.message}
            />

                <div className="flex gap-4">
                    <button className="flex-1 bg-[#1E2939] text-white text-[16px] font-extrabold py-3 mb-20 rounded-[10px]"> 취소 </button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 bg-[#BFFF0B] text-black text-[16px] font-extrabold py-3 mb-20 rounded-[10px]"> 신청하기 </button>
                </div>
            </form>
        </div>
    );
}