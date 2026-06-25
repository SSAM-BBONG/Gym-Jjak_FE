"use client";

import { OrganApplicationDanger } from "@/components/ui/image";
import { createOrganizationApplicationAction } from "../action";
import { OrganizationApplicationDetail } from "../type";
import OrganizationRegistLink from "./OrganizationRegistLink";
import OrganizationRegistBusinessInformation from "./OrganizationRegistBusinessInformation";
import OrganizationRegistId from "./OrganizationRegistId";
import OrganizationRegistBusinessFile from "./OrganizationRegistBusinessFile";
import OrganizationRegistBusinessVerification from "./OrganizationRegistBusinessVerification";
import { Resolver, SubmitHandler, useForm } from "react-hook-form";
import { OrganizationApplicationFormValue, organizationApplicationSchema } from "@/lib/organizationApplicationSchema";
import { zodResolver } from "@hookform/resolvers/zod";

// 조직 신청 폼 타입
interface OrganizationRegistFormProps {
    // 신청 & 조회 모드
    mode?: "create" | "read";
    application?: OrganizationApplicationDetail;
}


export default function OrganizationRegistForm({mode = "create", application}: OrganizationRegistFormProps) {
    
    // 읽기전용 모드
    const isReadOnly = mode === "read";

    const {
        register,
        handleSubmit,
        setValue,
        resetField,
        formState: { errors, isSubmitting },
    } = useForm<OrganizationApplicationFormValue>({
        resolver: zodResolver(
        organizationApplicationSchema
        ) as Resolver<OrganizationApplicationFormValue>,
        defaultValues: {
        requestedLoginId: application?.requestedLoginId ?? "",
        businessRegistrationNumber: application?.businessRegistrationNumber ?? "",
        businessName: application?.businessName ?? "",
        representativeName: application?.representativeName ?? "",
        representativePhone: application?.representativePhone ?? "",
        openingDate: application?.openingDate ?? "",
        roadAddress: application?.roadAddress ?? "",
        jibunAddress: application?.jibunAddress ?? "",
        detailAddress: application?.detailAddress ?? "",
        latitude: application?.latitude ? String(application.latitude) : "",
        longitude: application?.longitude ? String(application.longitude) : "",
        websiteUrl: application?.websiteUrl ?? "",
        instagramUrl: application?.instagramUrl ?? "",
        blogUrl: application?.blogUrl ?? "",
        facilityPhone: application?.facilityPhone ?? "",
        },
        mode: "onSubmit",
    });


    const onSubmit: SubmitHandler<OrganizationApplicationFormValue> = async (
        values
    ) => {
        const formData = new FormData();

        formData.append("businessLicenseFile", values.businessLicenseFile);
        formData.append("requestedLoginId", values.requestedLoginId);
        formData.append(
        "businessRegistrationNumber",
        values.businessRegistrationNumber
        );
        formData.append("businessName", values.businessName);
        formData.append("representativeName", values.representativeName);
        formData.append("representativePhone", values.representativePhone);
        formData.append("openingDate", values.openingDate);
        formData.append("roadAddress", values.roadAddress);
        formData.append("jibunAddress", values.jibunAddress ?? "");
        formData.append("detailAddress", values.detailAddress ?? "");
        formData.append("latitude", values.latitude ?? "");
        formData.append("longitude", values.longitude ?? "");
        formData.append("websiteUrl", values.websiteUrl ?? "");
        formData.append("instagramUrl", values.instagramUrl ?? "");
        formData.append("blogUrl", values.blogUrl ?? "");
        formData.append("facilityPhone", values.facilityPhone ?? "");

        await createOrganizationApplicationAction(formData);
    };
  
    return (
        // 읽기전용에서는 신청되지 않게 설정
        <form onSubmit={isReadOnly ? undefined : handleSubmit(onSubmit)}>
        <div className="flex flex-col px-60 pt-10 gap-8">
            <div className="flex flex-col gap-2">
                <p className="text-[36px] font-black text-white"> 조직 계정 신청 </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 운동시설 정보를 입력하여 조직 계정을 신청하세요 </p>
            </div>
            <div className="
            border border-[#2B7FFF4D] rounded-[16px]
            bg-[linear-gradient(135deg,rgba(28,57,142,0.20)0%,rgba(25,60,184,0.10)100%)]
            p-6">
                <div className="flex gap-3 items-start">
                    <img src={OrganApplicationDanger} alt="조직 계정 신청 절차"/>
                    <div className="flex flex-col">
                        <p className="text-[18px] font-extrabold text-[#51A2FF] self-start"> 신청 절차 안내</p>
                        <p className="text-[14px] font-normal text-[#D1D5DC]"> 1. 아래 정보를 입력하고 신청 </p>
                        <p className="text-[14px] font-normal text-[#D1D5DC]"> 2. 관리자가 제출된 정보 검증 (영업일 기준 2-3일) </p>
                        <p className="text-[14px] font-normal text-[#D1D5DC]"> 3. 승인 시 신청자 이메일로 조직 계정 정보 발송 </p>
                    </div>
                </div>
            </div>

            <OrganizationRegistId
                register={register} 
                application={application}
                isReadOnly={isReadOnly}
            />

            <OrganizationRegistBusinessFile
                setValue={setValue}
                resetField={resetField}
                error={errors.businessLicenseFile?.message}
                application={application}
                isReadOnly={isReadOnly}           
            />

            <OrganizationRegistBusinessVerification
                register={register}
                errors={{
                    businessRegistrationNumber: errors.businessRegistrationNumber?.message,
                    businessName: errors.businessName?.message,
                    representativeName: errors.representativeName?.message,
                    openingDate: errors.openingDate?.message,
                }}
                isReadOnly={isReadOnly}
                application={application}
            />

            <OrganizationRegistBusinessInformation 
                register={register}
                setValue={setValue}
                errors={{
                    roadAddress: errors.roadAddress?.message,
                    representativePhone: errors.representativePhone?.message,
                    facilityPhone: errors.facilityPhone?.message,
                    detailAddress: errors.detailAddress?.message,
                }}
                application={application}
                isReadOnly={isReadOnly}
            />

            <OrganizationRegistLink 
                register={register}
                errors={{
                    instagramUrl: errors.instagramUrl?.message,
                    blogUrl: errors.blogUrl?.message,
                    websiteUrl: errors.websiteUrl?.message,
                }}
                isReadOnly={isReadOnly}
                application={application}
            />
            
            {/* 읽기모드에서는 안보이게 설정 */}
            {!isReadOnly && (
                <div className="flex gap-3 mb-15">
                    <button className="py-4 text-[16px] font-extrabold text-white flex-1 bg-[#1E2939] rounded-[10px]"> 취소 </button>
                    <button 
                        type="submit"
                        disabled={isSubmitting}
                        className="py-4 text-[16px] font-extrabold text-black flex-1 bg-[#BFFF0B] rounded-[10px]"> {isSubmitting ? "신청  중..." : "신청하기"} </button>
                </div>
            )}
        </div>
        </form>
    );
}
