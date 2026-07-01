'use client'

import { MypageMyActivity, OrganAddInf, OrganAddInfBlog, OrganAddInfInsta, OrganAddInfWebsite, OrganizationManageEditButton } from "@/components/ui/image";
import { OrganizationManageData } from "../type";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { editOrganizationManageInformationAction } from "../action";
import { useState } from "react";
import { OrganizationManageFormValue, organizationManageSchema } from "@/lib/organizationApplicationSchema";
import Image from "next/image";

interface OrganizationManageDataProps {
    data: OrganizationManageData
}


export default function OrganizationManageForm({ data }: OrganizationManageDataProps) {
    const [mode, setMode] = useState<"read" | "edit">("read");

    const isReadOnly = mode === "read";

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<OrganizationManageFormValue>({
        resolver: zodResolver(
            organizationManageSchema
        ) as Resolver<OrganizationManageFormValue>,
        defaultValues: {
            facilityPhone: data.facilityPhone ?? "",
            instagramUrl: data.instagramUrl ?? "",
            blogUrl: data.blogUrl ?? "",
            websiteUrl: data.websiteUrl ?? "",
        },
        mode: "onSubmit",
    });

    const handleEditClick = () => {
        setMode("edit");
    };

    const handleCancelClick = () => {
        reset({
            facilityPhone: data.facilityPhone ?? "",
            instagramUrl: data.instagramUrl ?? "",
            blogUrl: data.blogUrl ?? "",
            websiteUrl: data.websiteUrl ?? "",
        });

        setMode("read");
    };

    const onSubmit: SubmitHandler<OrganizationManageFormValue> = async (values) => {
        const formData = new FormData();

        formData.append("facilityPhone", values.facilityPhone ?? "");
        formData.append("instagramUrl", values.instagramUrl ?? "");
        formData.append("blogUrl", values.blogUrl ?? "");
        formData.append("websiteUrl", values.websiteUrl ?? "");

        const result = await editOrganizationManageInformationAction(formData);

        if (!result.success) {
            return;
        }

        setMode("read");
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="
            flex flex-col gap-6
            bg-[linear-gradient(135deg,_#101828_0%,_#1E2939_100%)]
            border border-[#364153] rounded-[16px]
            p-8
            mb-16
            "
        >
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    <div className="relative w-6 h-6">
                        <Image
                            src={OrganAddInf}
                            alt="내 조직 관리 추가 정보"
                            fill
                            priority
                            sizes="w-12 h-12"
                            className="object-cover hover:cursor-pointer"
                        />
                    </div>
                    <p className="text-[24px] font-black text-white"> 추가 정보(수정 가능) </p>
                </div>
                {isReadOnly
                    ?
                    (
                        <button
                            onClick={handleEditClick}
                            className="flex items-center  gap-3 bg-[#BFFF0B] rounded-[14px] px-5 py-3 text-[16px] text-black font-extrabold"
                        >
                            <div className="relative w-6 h-6">
                                <Image
                                    src={OrganizationManageEditButton}
                                    alt="내 조직 관리 - 수정하기 버튼"
                                    fill
                                    priority
                                    sizes="w-12 h-12"
                                    className="object-cover hover:cursor-pointer"
                                />
                            </div>
                            <p>수정하기</p>
                        </button>
                    ) :
                    <div className="flex gap-3">
                        <button
                            type="button"
                            onClick={handleCancelClick}
                            disabled={isSubmitting}
                            className="bg-[#1E2939] border border-[#364153] rounded-[14px] px-5 py-3 text-[16px] text-white font-extrabold"
                        >
                            취소
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="bg-[#BFFF0B] rounded-[14px] px-5 py-3 text-[16px] text-black font-extrabold"
                        >
                            {isSubmitting ? "수정 중..." : "수정하기"}
                        </button>
                    </div>
                }
            </div>

            <div className="flex flex-col gap-2">
                <p className="text-[14px] font-medium text-[#99A1AF]"> 운동 시설 전화번호</p>
                <input
                    type="text"
                    disabled={isReadOnly}
                    defaultValue={data.facilityPhone}
                    className="
                            bg-[#1E293980] border border-[#364153] rounded-[10px]
                            px-4 py-3 text-[16px] text-white font-normal
                            disabled:cursor-not-allowed disabled:text-[#D1D5DC]
                        "
                    {...register("facilityPhone")}
                />
            </div>

            <div className="flex flex-col gap-4 ">
                <p className="text-[14px] font-medium text-[#99A1AF]"> 웹사이트 링크</p>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="relative w-4 h-4">
                            <Image
                                src={OrganAddInfInsta}
                                alt="내 조직 관리 인스타"
                                fill
                                priority
                                sizes="w-8 h-8"
                                className="object-cover hover:cursor-pointer"
                            />
                        </div>
                        <p className="text-[12px] font-medium text-[#6A7282]"> 인스타그램 </p>
                    </div>
                    <input
                        type="text"
                        className={`
                                bg-[#1E293980]
                                border border-[#364153] rounded-[10px] 
                                px-4 py-3 
                                text-[16px] ${isReadOnly ? "text-[#BFFF0B]" : "text-white"} font-normal`}
                        defaultValue={data.instagramUrl}
                        disabled={isReadOnly}
                        {...register("instagramUrl")}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="relative w-4 h-4">
                            <Image
                                src={OrganAddInfBlog}
                                alt="내 조직 관리 블로그"
                                fill
                                priority
                                sizes="w-8 h-8"
                                className="object-cover hover:cursor-pointer"
                            />
                        </div>
                        <p className="text-[12px] font-medium text-[#6A7282]"> 블로그 </p>
                    </div>
                    <input
                        type="text"
                        className={`
                                bg-[#1E293980]
                                border border-[#364153] rounded-[10px]
                                px-4 py-3 
                                text-[16px] ${isReadOnly ? "text-[#BFFF0B]" : "text-white"} font-normal`}
                        defaultValue={data.blogUrl}
                        disabled={isReadOnly}
                        {...register("blogUrl")}
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <div className="relative w-4 h-4">
                            <Image
                                src={OrganAddInfWebsite}
                                alt="내 조직 관리 웹사이트"
                                fill
                                priority
                                sizes="w-8 h-8"
                                className="object-cover hover:cursor-pointer"
                            />
                        </div>
                        <p className="text-[12px] font-medium text-[#6A7282]"> 웹사이트 </p>
                    </div>
                    <input
                        type="text"
                        className={`
                                bg-[#1E293980]
                                border border-[#364153] rounded-[10px] 
                                px-4 py-3 
                                text-[16px] ${isReadOnly ? "text-[#BFFF0B]" : "text-white"} font-normal`}
                        defaultValue={data.websiteUrl}
                        disabled={isReadOnly}
                        {...register("websiteUrl")}
                    />
                </div>
            </div>
        </form>
    );
}