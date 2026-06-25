'use client'

import { OrganApplicationUpload, TrainerEssentialQulificationIcon } from "@/components/ui/image";
import { OrganizationApplicationDetail } from "../type";
import Link from "next/link";
import { useEffect, useState } from "react";
import { OrganizationApplicationFormValue } from "@/lib/organizationApplicationSchema";
import { UseFormResetField, UseFormSetValue } from "react-hook-form";

interface OrganizationRegistFormProps {
  setValue: UseFormSetValue<OrganizationApplicationFormValue>;
  resetField: UseFormResetField<OrganizationApplicationFormValue>;
  error?: string;
  // 신청 & 조회 모드
  isReadOnly: boolean;
  application?: OrganizationApplicationDetail;
}




export default function OrganizationRegistBusinessFile({ setValue, resetField, application, isReadOnly, error }: OrganizationRegistFormProps) {
    
    const [businessFile, setBusinessFile] = useState<File | null>(null);    
    const [businessFilePreview, setBusinessFilePreview] = useState("");

    const handleBusinessFileChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        const file = e.target.files?.[0];

        if (!file) return;

        setBusinessFile(file);
        setBusinessFilePreview(file.name);

        setValue("businessLicenseFile", file, {
            shouldValidate: true,
            shouldDirty: true,
        });
    }

    const handleProfileDelete = () => {
        setBusinessFile(null);
        setBusinessFilePreview("");
        resetField("businessLicenseFile");
    }

    useEffect(() => {
        return () => {
            if (businessFilePreview) {
            URL.revokeObjectURL(businessFilePreview);
            }
        };
    }, [businessFilePreview]);

    return (
        <div className="
            flex flex-col gap-4
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-8
            rounded-[16px]
            ">
                <p className="text-[20px] text-white font-extrabold"> 사업자등록증</p>
                <p className="text-[14px] text-[#99A1AF] font-normal"> 사업자등록증은 실제 사업자 확인을 위해 검증됩니다.</p>
                {!businessFilePreview 
                ? 
                (
                <>
                <input 
                    id="organ-application" 
                    onChange={handleBusinessFileChange} 
                    type="file" 
                    accept=".pdf,.jpg,.jpeg,.png, .webp" 
                    disabled={isReadOnly}
                    className="hidden"/>
                <label htmlFor="organ-application" className="
                flex flex-col gap-3 items-center 
                bg-[#1E2939] border border-[#364153] rounded-[10px]
                p-8"> 
                    <img src={OrganApplicationUpload} alt="조직 계정 신청 사업자 등록증"/>
                    <p className="text-[14px] font-extrabold text-white"> 사업자 등록증 업로드</p>
                    <p className="text-[12px] font-medium text-[#6A7282]"> PDF, JPG, PNG 파일 (최대 10MB) </p>
                </label>
                </>
                )
                :
                <div className="flex gap-3 justify-between">
                    <div className="flex flex-1 gap-2 px-3 py-2 border border-[#364153] bg-[#1E293980] items-center rounded-[10px]"> 
                        <img src={TrainerEssentialQulificationIcon} alt="자격증 업로드시 나오는 아이콘"/>
                        <p className="text-[#99A1AF] text-[12px] font-medium"> {businessFilePreview} </p>     
                    </div>
                        <button 
                            onClick={handleProfileDelete}
                            type="button"
                            className="px-4 py-3 bg-[#82181A4D] rounded-[10px] text-[#FF6467] font-extrabold"> 
                            ✕ 
                        </button>
                </div>
                }
                {/* 상세조회일때는 사업자등록증 파일 볼 수 있게 설정 */}
                {isReadOnly && application?.businessLicenseFileUrl && (
                    <Link
                        href={application.businessLicenseFileUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[14px] font-medium text-[#BFFF0B]"
                    >
                        사업자등록증 파일 보기
                    </Link>
                )}
                {error && (<p className="text-[#FF6467] text-[12px] font-normal"> {error} </p>)}
            </div>
    );
}