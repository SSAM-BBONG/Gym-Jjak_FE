'use client'

import { UseFormRegister } from "react-hook-form";
import { OrganizationApplicationDetail } from "../type";
import { OrganizationApplicationFormValue } from "@/lib/organizationApplicationSchema";
import { ChangeEvent, useState } from "react";
import { organizationIdDuplicationCheckAction } from "../action";

interface OrganizationRegistFormProps {
    // 신청 & 조회 모드
    register: UseFormRegister<OrganizationApplicationFormValue>
    isReadOnly: boolean;
    application?: OrganizationApplicationDetail;
    error?: string
}

interface registerStateType {
    success: boolean;
    message?: string
}

export default function OrganizationRegistId( {register, application, isReadOnly, error }: OrganizationRegistFormProps) {
    
    const [organizationId, setOrganizationId] = useState("");

    const [registerState, setRegisterState] = useState<registerStateType>({
        success: false,
        message: ''
    });


    const handleOragnizationIdChange = (e:ChangeEvent<HTMLInputElement>) => {
        setOrganizationId(e.target.value);
    }

    const handleDuplicationIdCheck = async (id: string) => {
        const result = await organizationIdDuplicationCheckAction(id);
        setRegisterState(result);
    } 
    
    return (
        <div className="
            flex flex-col gap-4
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-8
            rounded-[16px]
            ">
                <p className="text-[20px] text-white font-extrabold"> 조직 아이디</p>
                <p className="text-[14px] text-[#99A1AF] font-normal "> 조직의 고유 아이디로 사용됩니다. (영문, 숫자, 하이픈만 가능) </p>
                <div className="flex gap-3">
                    <input 
                        type="text"
                        {...register("requestedLoginId")}
                        onChange={handleOragnizationIdChange}
                        defaultValue={application?.requestedLoginId}
                        disabled={isReadOnly}
                        placeholder="아이디를 입력해주세요"
                        className="flex-1 border border-[#364153] px-4 py-3 outline-none rounded-[10px] bg-[#1E2939] text-white"    
                    />
                    {/* 일기 전용 아닐때만 중복확인 뜰 수 있게 설정 */}
                    {!isReadOnly && (
                        <button 
                            type="button"
                                className={`px-7 py-3 text-[16px] rounded-[10px]
                                    ${organizationId.length===0 ? "text-white bg-[#364153] font-medium opacity-50" : "text-black bg-[#BFFF0B] font-bold"}`
                                }
                            onClick={() => handleDuplicationIdCheck(organizationId)}
                        > 
                        중복 확인
                        </button>
                    )}
                </div>
                {registerState.success 
                ?
                (<p className="text-[#BFFF0B] text-[12px] font-normal"> {registerState.message} </p>)
                :   
                (<p className="text-[#FF6467] text-[12px] font-normal"> {registerState.message} </p>)
                }
                {error && (<p className="text-[#FF6467] text-[12px] font-normal"> {error} </p>)}
            </div>
    );
}