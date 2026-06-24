"use client";

import { OrganApplicationDanger, OrganApplicationUpload } from "@/components/ui/image";
import OrganizationRegistMap from "./OrganizationRegistMap";
import { createOrganizationApplicationAction } from "../action";
import { useActionState } from "react";
import { OrganizationApplicationDetail } from "../type";
import Link from "next/link";
import OrganizationRegistLink from "./OrganizationRegistLink";
import OrganizationRegistBusinessInformation from "./OrganizationRegistBusinessInformation";
import OrganizationRegistId from "./OrganizationRegistId";
import OrganizationRegistBusinessFile from "./OrganizationRegistBusinessFile";
import OrganizationRegistBusinessVerification from "./OrganizationRegistBusinessVerification";

// 조직 신청 폼 타입
interface OrganizationRegistFormProps {
    // 신청 & 조회 모드
    mode?: "create" | "read";
    application?: OrganizationApplicationDetail;
}


export default function OrganizationRegistForm({mode = "create", application}: OrganizationRegistFormProps) {
    
    // 읽기전용 모드
    const isReadOnly = mode === "read";

    // 서버 액션 state
    const [state, formAction, isPending] = useActionState(createOrganizationApplicationAction,
        {
        success: false,
        message: "",
        errors: {},
        }
    );

    return (
        // 일기전용에서는 신청되지 않게 설정
        <form action={isReadOnly ? undefined : formAction}>
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
                application={application}
                isReadOnly={isReadOnly}
            />

            <OrganizationRegistBusinessFile
                application={application}
                isReadOnly={isReadOnly}            
            />

            <OrganizationRegistBusinessVerification
                application={application}
                isReadOnly={isReadOnly}   
            />

            <OrganizationRegistBusinessInformation 
                application={application}
                isReadOnly={isReadOnly}
            />

            <OrganizationRegistLink 
                application={application}
                isReadOnly={isReadOnly}
            />
            
            {/* 오류 메시지 출력 - 임시설정 추후 리펙토링 예정 */}
            {!isReadOnly && state.message && (
                <div className={state.success ? "text-[#BFFF0B]" : "text-red-400"}>
                    {state.message}
                </div>
            )}

            {/* 읽기모드에서는 안보이게 설정 */}
            {!isReadOnly && (
                <div className="flex gap-3 mb-15">
                    <button className="py-4 text-[16px] font-extrabold text-white flex-1 bg-[#1E2939] rounded-[10px]"> 취소 </button>
                    <button 
                        type="submit"
                        disabled={isPending}
                        className="py-4 text-[16px] font-extrabold text-black flex-1 bg-[#BFFF0B] rounded-[10px]"> {isPending ? "신청  중..." : "신청하기"} </button>
                </div>
            )}
        </div>
        </form>
    );
}
