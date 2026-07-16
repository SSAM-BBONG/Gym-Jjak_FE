import { MypageMyActivity } from "@/components/ui/image";
import { OrganizationManageData } from "../type";
import Image from "next/image";

interface OrganizationManageDataProps {
    data: OrganizationManageData
}

export default function OrganizationManageDefaultInformation({ data }: OrganizationManageDataProps) {
    return (
        <div className="
            flex flex-col gap-6
            bg-[#101828]
            border border-[#364153] rounded-[16px]
            p-8
            "
        >
            <div className="flex gap-3 items-center">
                <div className="relative w-6 h-6">
                    <Image
                        src={MypageMyActivity}
                        alt="내 조직 관리 기본정보"
                        fill
                        sizes="w-12 h-12"
                        className="object-cover hover:cursor-pointer"
                    />
                </div>
                <p className="text-[24px] font-black text-white"> 기본 정보(수정 불가)</p>
            </div>
            <div className="flex gap-6">
                <div className="flex flex-col flex-1 gap-2">
                    <p className="text-[14px] font-medium text-[#99A1AF]"> 아이디 </p>
                    <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> {data.requestedLoginId} </div>
                </div>

                <div className="flex flex-col flex-1 gap-2">
                    <p className="text-[14px] font-medium text-[#99A1AF]"> 사업자 등록번호 </p>
                    <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> {data.businessRegistrationNumber} </div>
                </div>
            </div>
            <div className="flex gap-6">
                <div className="flex flex-col flex-1 gap-2">
                    <p className="text-[14px] font-medium text-[#99A1AF]"> 상호 </p>
                    <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> {data.businessName} </div>
                </div>

                <div className="flex flex-col flex-1 gap-2">
                    <p className="text-[14px] font-medium text-[#99A1AF]"> 대표자 이름 </p>
                    <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> {data.representativeName} </div>
                </div>
            </div>

            <div className="flex gap-6">
                <div className="flex flex-col flex-1 gap-2">
                    <p className="text-[14px] font-medium text-[#99A1AF]"> 대표자 전화번호 </p>
                    <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> {data.representativePhone} </div>
                </div>

                <div className="flex flex-col flex-1 gap-2">
                    <p className="text-[14px] font-medium text-[#99A1AF]"> 개업일자</p>
                    <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> {data.openingDate} </div>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-[14px] font-medium text-[#99A1AF]"> 사업장 주소 </p>
                <div className="bg-[#1E293980] border border-[#364153] rounded-[10px] px-4 py-3 text-[16px] text-white font-normal"> {data.roadAddress} </div>
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-[14px] font-medium text-[#99A1AF]"> 사업자 등록증 </p>
                <div className="p-4 border border-[#364153] bg-[#1E293980] rounded-[10px] flex items-center justify-between">
                    <div className="flex gap-4 items-center justify-start">
                        <div className="relative w-6 h-6">
                            <Image
                                src={MypageMyActivity}
                                alt="조직 계정 신청 사업자 등록증"
                                fill
                                className="object-cover hover:cursor-pointer"
                            />
                        </div>
                        <div className="flex flex-col">
                            <p className="text-[16px] font-extrabold text-white"> {data.businessLicenseOriginalName}</p>
                            <p className="text-[14px] font-normal text-[#99A1AF]"> 파일 크기 1.2MB</p>
                        </div>
                    </div>
                    <button className="px-4 py-2 text-[14px] font-extrabold text-black bg-[#BFFF0B] rounded-[10px]"> 다운로드</button>
                </div>
            </div>
        </div>
    );
}