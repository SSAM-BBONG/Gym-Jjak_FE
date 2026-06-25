import { UseFormRegister } from "react-hook-form";
import { OrganizationApplicationDetail } from "../type";
import { OrganizationApplicationFormValue } from "@/lib/organizationApplicationSchema";

interface OrganizationRegistFormProps {
    // 신청 & 조회 모드
    register: UseFormRegister<OrganizationApplicationFormValue>
    isReadOnly: boolean;
    application?: OrganizationApplicationDetail;
}


export default function OrganizationRegistId( {register, application, isReadOnly }: OrganizationRegistFormProps) {
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
                        name="requestedLoginId" 
                        defaultValue={application?.requestedLoginId}
                        disabled={isReadOnly}
                        placeholder="ex)organization-id"
                        className="flex-1 border border-[#364153] px-4 py-3 outline-none rounded-[10px] bg-[#1E2939] text-[#FFFFFF80]"    
                    />
                    {/* 일기 전용 아닐때만 중복확인 뜰 수 있게 설정 */}
                    {!isReadOnly && (
                        <button className="px-7 py-3 text-[16px] font-medium text-white bg-[#364153] opacity-50 rounded-[10px]"> 중복 확인 </button>
                    )}
                </div>
            </div>
    );
}