'use client'

import { MyTrainerProfileData } from "../type";
import MypageTrainerProfile from "./MypageTrainerProfile";
import MypageTrainerEssentialQUlification from "./MypageTrainerEssendtialQulification";
import MypageTrainerProfileSelfIntroduction from "./MypageTrainerProfileSelfIntroduction";
import MypageTrainerProfileAwardHistory from "./MypageTrainerProfileAwardHistory";
import MypageTrainerQulification from "./MypageTrainerQulification";
import { useState } from "react";
import { editMyTrainerProfileInformationAction } from "../actions";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { MypageTrainerProfileFormValue, mypageTrainerProfileSchema } from "@/lib/mypageTrainerProfileEditSchema";
import { zodResolver } from "@hookform/resolvers/zod";

interface MypageTrainerProfileFormProps {
    data: MyTrainerProfileData
}

export default function MypageTrainerProfileForm({ data }: MypageTrainerProfileFormProps) {
    const [mode, setMode] = useState("read");
    const isReadOnly = mode === "read";

    const {
        register,
        handleSubmit,
        setValue,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<MypageTrainerProfileFormValue>({
        resolver: zodResolver(
            mypageTrainerProfileSchema
        ) as Resolver<MypageTrainerProfileFormValue>,
        defaultValues: {
            profileImageFile: null,
            profileImageAction: "KEEP",
            additionalCertifications: data.certifications
                .filter((item) => item.certificationType !== "ESSENTIAL")
                .map((item) => item.name),
            awardHistories: data.awards.map((item) => item.name),
            introduction: data.introduction ?? "",
        },
        mode: "onSubmit",
    });

    const handleEditClick = () => {
        setMode("edit");
    };

    const handleCancelClick = () => {
        reset({
            profileImageFile: null,
            profileImageAction: "KEEP",
            additionalCertifications: data.certifications
                .filter((item) => item.certificationType !== "ESSENTIAL")
                .map((item) => item.name),
            awardHistories: data.awards.map((item) => item.name),
            introduction: data.introduction ?? "",
        });

        setMode("read");
    };

    const onSubmit: SubmitHandler<MypageTrainerProfileFormValue> = async (
        values
    ) => {
        const formData = new FormData();

        if (values.profileImageFile) {
            formData.append("profileImageFile", values.profileImageFile);
        }

        formData.append("profileImageAction", values.profileImageAction);
        formData.append("additionalCertifications", JSON.stringify(values.additionalCertifications));
        formData.append("awardHistories", JSON.stringify(values.awardHistories));
        formData.append("introduction", values.introduction);

        const result = await editMyTrainerProfileInformationAction(formData);

        if (!result.success) {
            return;
        }

        setMode("read");
    };


    return (
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col px-40 pt-10">
            <div className="flex justify-between items-center">
                <div className="flex flex-col gap-3">
                    <p className="text-[36px] font-black text-white"> 트레이너 프로필 수정</p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> 트레이너 정보를 수정하세요</p>
                </div>

                {isReadOnly
                    ?
                    (
                        <button
                            className="bg-[#BFFF0B] text-black text-[16px] px-4 py-2 rounded-[10px] font-bold"
                            type="button"
                            onClick={handleEditClick}
                        >
                            수정하기
                        </button>
                    )
                    :
                    (
                        <div className="flex gap-3">
                            <button
                                className="bg-[#1E2939] text-white text-[16px] px-4 py-2 rounded-[10px] font-bold"
                                type="button"
                                onClick={handleCancelClick}
                                disabled={isSubmitting}>
                                취소
                            </button>
                            <button
                                className="bg-[#BFFF0B] text-black text-[16px] px-4 py-2 rounded-[10px] font-bold"
                                type="submit"
                                disabled={isSubmitting}>
                                {isSubmitting ? "수정 중..." : "수정하기"}
                            </button>
                        </div>
                    )}
            </div>

            <div className="flex flex-col gap-6 mt-6">

                <MypageTrainerProfile
                    data={data}
                    mode={mode}
                    setValue={setValue}
                    error={errors.profileImageFile?.message}
                />

                <MypageTrainerEssentialQUlification
                    data={data}
                    isReadOnly={true}
                />

                <MypageTrainerQulification
                    data={data}
                    mode={mode}
                    setValue={setValue}
                    error={errors.additionalCertifications?.message}
                />

                <MypageTrainerProfileAwardHistory
                    data={data}
                    mode={mode}
                    setValue={setValue}
                    error={errors.awardHistories?.message}
                />

                <MypageTrainerProfileSelfIntroduction
                    data={data}
                    mode={mode}
                    register={register}
                    error={errors.introduction?.message}
                />
                <button
                    type="submit"
                    disabled={isReadOnly}
                    className="bg-[#BFFF0B] text-black text-[16px] font-extrabold py-3 mb-20 rounded-[10px]"> 수정하기 </button>
            </div>
        </form>
    );
}