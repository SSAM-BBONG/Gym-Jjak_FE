'use client'

import { ChangeHandler, UseFormRegister } from "react-hook-form";
import { OrganizationApplicationDetail } from "../type";
import { OrganizationApplicationFormValue } from "@/lib/organizationApplicationSchema";
import { ChangeEvent, useState } from "react";
import { toast } from "sonner";

interface OrganizationRegistFormProps {
    register: UseFormRegister<OrganizationApplicationFormValue>;
    errors?: {
    businessRegistrationNumber?: string;
    businessName?: string;
    representativeName?: string;
    openingDate?: string;
    };
    // 신청 & 조회 모드
    isReadOnly: boolean;
    application?: OrganizationApplicationDetail;
}

export default function OrganizationRegistBusinessVerification({ register, application, errors, isReadOnly }: OrganizationRegistFormProps) {
    const businessRegistrationNumberRegister = register("businessRegistrationNumber");
    const businessNameRegister = register("businessName");
    const representativeNameRegister = register("representativeName");
    const openingDateRegister = register("openingDate");
    const [inputState, setInputState] = useState({
        businessRegistrationNumber: "",
        businessName: "",
        representativeName: "",
        openingDate:""
    })

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>, onChange: ChangeHandler) => {
        onChange(e);
        setInputState({
            ...inputState,
            [e.target.name] : e.target.value
        })
    }

    const buttonState = !!inputState.businessName && !!inputState.businessRegistrationNumber && !!inputState.openingDate && !!inputState.representativeName;

    const handleBusinessVerification = () => {
        toast.success("검증이 완료되었습니다.");
    };

    return (
    <div className="
        flex flex-col gap-6
        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
        p-8
        rounded-[16px]
        ">
            <p className="text-[20px] text-white font-extrabold"> 사업자 정보 검증 </p>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white"> 사업자등록번호 </label>
                    <input 
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-white outline-none" 
                        type="text"
                        {...businessRegistrationNumberRegister}
                        defaultValue={application?.businessRegistrationNumber}
                        onChange={(e) => handleInputChange(e, businessRegistrationNumberRegister.onChange)}
                        disabled={isReadOnly}
                        maxLength={10}
                        name="businessRegistrationNumber"
                        placeholder="0000000000 (10자리)"/>
                </div>
                {errors?.businessRegistrationNumber && (<p className="text-[#FF6467] text-[12px] font-normal"> {errors?.businessRegistrationNumber} </p>)}
                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white"> 상호(사업장 이름) </label>
                    <input 
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-white outline-none" 
                        type="text"
                        {...businessNameRegister}
                        defaultValue={application?.businessName}
                        onChange={(e) => handleInputChange(e, businessNameRegister.onChange)}
                        disabled={isReadOnly}
                        name="businessName"
                        placeholder="ex) 엑티브펄스 PT센터"/>
                </div>
                {errors?.businessName && (<p className="text-[#FF6467] text-[12px] font-normal"> {errors?.businessName} </p>)}
                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white"> 대표자 이름 </label>
                    <input 
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-white outline-none" 
                        type="text"
                        {...representativeNameRegister}
                        defaultValue={application?.representativeName}
                        onChange={(e) => handleInputChange(e, representativeNameRegister.onChange)}
                        disabled={isReadOnly}
                        name="representativeName"
                        placeholder="ex) 홍길동"/>
                </div>
                {errors?.representativeName && (<p className="text-[#FF6467] text-[12px] font-normal"> {errors?.representativeName} </p>)}
                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white"> 개업 일자 </label>
                    <input 
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-white outline-none cursor-pointer [&::-webkit-calendar-picker-indicator]:cursor-pointer [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:brightness-200"
                        {...openingDateRegister}
                        type="date"
                        defaultValue={application?.openingDate}
                        onChange={(e) => handleInputChange(e, openingDateRegister.onChange)}
                        disabled={isReadOnly}
                        name="openingDate"
                        placeholder="ex) 20000000"/>
                </div>
                {errors?.openingDate && (<p className="text-[#FF6467] text-[12px] font-normal"> {errors?.openingDate} </p>)}
            </div>
            {/* 읽기모드일때는 검증 버튼 뜨지 않게 설정 */}
            {!isReadOnly && <button 
                                disabled={!buttonState}
                                type="button"
                                onClick={handleBusinessVerification}
                                className={`
                                    ${!buttonState && "opacity-50"}
                                    bg-[#BFFF0B] rounded-[10px] py-3 text-[16px] font-extrabold text-black`}
                            > 
                                사업자 정보 검증하기 
                            </button>}
        </div>
    );
}