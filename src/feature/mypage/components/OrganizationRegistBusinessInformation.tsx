import { UseFormRegister, UseFormSetValue } from "react-hook-form";
import { OrganizationApplicationDetail } from "../type";
import OrganizationRegistMap from "./OrganizationRegistMap";
import { OrganizationApplicationFormValue } from "@/lib/organizationApplicationSchema";

interface OrganizationRegistFormProps {
    register: UseFormRegister<OrganizationApplicationFormValue>
    setValue: UseFormSetValue<OrganizationApplicationFormValue>
    errors?: {
        roadAddress?: string;
        representativePhone?: string;
        facilityPhone?: string;
        detailAddress?: string;
    };
    // 신청 & 조회 모드
    isReadOnly: boolean;
    application?: OrganizationApplicationDetail;
}

export default function OrganizationRegistBusinessInformation( {register, setValue, errors, application, isReadOnly }: OrganizationRegistFormProps) {
    return (
        <div className="
        flex flex-col gap-6
        bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
        p-8
        rounded-[16px]
        ">
            <p className="text-[20px] text-white font-extrabold">  사업장 정보 </p>
            <div className="flex flex-col gap-6"> 
                <div className="flex flex-col gap-2">
                    
                    {/* 읽기모드일때는 주소입력 막기 */}
                    {isReadOnly ? (
                        <>
                            <input
                                value={application?.roadAddress ?? ""}
                                readOnly
                                disabled
                                className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none"
                                type="text"
                            />
                            {application?.detailAddress && (
                                <input
                                    value={application.detailAddress}
                                    readOnly
                                    disabled
                                    className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none"
                                    type="text"
                                />
                            )}
                        </>
                    ) : (
                        <OrganizationRegistMap setValue={setValue}/>
                    )}
                    <p className="text-[12px] font-normal text-[#6A7282]"> 사업자등록증 상 주소와 실제 운영 중인 오프라인 매장 주소를 입력해주세요 </p>
                    {errors?.roadAddress && (<p className="text-[#FF6467] text-[12px] font-normal"> {errors?.roadAddress} </p>)}
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white"> 상세주소(선택) </label>
                        <input
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-white outline-none"
                        type="text"
                        disabled={isReadOnly}
                        placeholder="상세 주소 입력"
                        {...register("detailAddress")}
                        />
                </div>
                {errors?.detailAddress && (<p className="text-[#FF6467] text-[12px] font-normal"> {errors?.detailAddress} </p>)}

                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white"> 대표자 전화번호 </label>
                    <input 
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-white outline-none" 
                        type="type"
                        {...register("representativePhone")}
                        defaultValue={application?.representativePhone}
                        disabled={isReadOnly}
                        placeholder="ex) 010-0000-0000"/>
                </div>
                {errors?.representativePhone && (<p className="text-[#FF6467] text-[12px] font-normal"> {errors?.representativePhone} </p>)}

                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white"> 운동시설 번호(선택) </label>
                    <input 
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-white outline-none" 
                        type="text"
                        {...register("facilityPhone")}
                        defaultValue={application?.facilityPhone}
                        disabled={isReadOnly}
                        placeholder="ex) 02-1234-5678"/>
                    <p className="text-[12px] font-normal text-[#6A7282]">
                        헬스장, 피트니스센터 등 체육시설업 신고를 완료한 경우 신고증명서 또는 신고필증에 기재된 번호를 입력해주세요.
                    </p>
                </div>
                {errors?.facilityPhone && (<p className="text-[#FF6467] text-[12px] font-normal"> {errors?.facilityPhone} </p>)}
            </div>
        </div>
    );
}