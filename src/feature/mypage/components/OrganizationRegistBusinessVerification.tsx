import { UseFormRegister } from "react-hook-form";
import { OrganizationApplicationDetail } from "../type";
import { OrganizationApplicationFormValue } from "@/lib/organizationApplicationSchema";

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
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                        type="text"
                        {...register("businessRegistrationNumber")}
                        defaultValue={application?.businessRegistrationNumber}
                        disabled={isReadOnly}
                        maxLength={10}
                        placeholder="0000000000 (10자리)"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white"> 상호(사업장 이름) </label>
                    <input 
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                        type="text"
                        {...register("businessName")}
                        defaultValue={application?.businessName}
                        disabled={isReadOnly}
                        placeholder="ex) 엑티브펄스 PT센터"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white"> 대표자 이름 </label>
                    <input 
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                        type="text"
                        {...register("representativeName")} 
                        defaultValue={application?.representativeName}
                        disabled={isReadOnly}
                        placeholder="ex) 홍길동"/>
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white"> 개업 일자 </label>
                    <input 
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                        {...register("openingDate")} 
                        type="date"
                        defaultValue={application?.openingDate}
                        disabled={isReadOnly}
                        placeholder="ex) 20000000"/>
                </div>
            </div>
            {/* 읽기모드일때는 검증 버튼 뜨지 않게 설정 */}
            {!isReadOnly && <button 
                                type="button"
                                className="bg-[#BFFF0B] opacity-50 rounded-[10px] py-3 text-[16px] font-extrabold text-black"> 사업자 정보 검증하기 </button>}
        </div>
    );
}