import { OrganizationApplicationDetail } from "../type";
import OrganizationRegistMap from "./OrganizationRegistMap";

interface OrganizationRegistFormProps {
    // 신청 & 조회 모드
    isReadOnly: boolean;
    application?: OrganizationApplicationDetail;
}

export default function OrganizationRegistBusinessInformation( { application, isReadOnly }: OrganizationRegistFormProps) {
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
                        <OrganizationRegistMap />
                    )}
                    <p className="text-[12px] font-normal text-[#6A7282]"> 사업자등록증 상 주소와 실제 운영 중인 오프라인 매장 주소를 입력해주세요 </p>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white"> 대표자 전화번호 </label>
                    <input 
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                        type="text"
                        name="representativePhone"
                        defaultValue={application?.representativePhone}
                        disabled={isReadOnly}
                        placeholder="ex) 010-0000-0000"/>
                </div>

                <div className="flex flex-col gap-2">
                    <label className="text-[14px] font-medium text-white"> 운동시설 번호 </label>
                    <input 
                        className="px-4 py-3 bg-[#1E2939] border border-[#364153] rounded-[10px] text-[16px] font-normal text-[#FFFFFF80] outline-none" 
                        type="text"
                        name="facilityPhone"
                        defaultValue={application?.facilityPhone}
                        disabled={isReadOnly}
                        placeholder="ex) 체육시설업 신고번호 (선택)"/>
                </div>
            </div>
        </div>
    );
}