import { OrganApplicationUpload } from "@/components/ui/image";
import { OrganizationApplicationDetail } from "../type";
import Link from "next/link";

interface OrganizationRegistFormProps {
    // 신청 & 조회 모드
    isReadOnly: boolean;
    application?: OrganizationApplicationDetail;
}


export default function OrganizationRegistBusinessFile({ application, isReadOnly }: OrganizationRegistFormProps) {
    return (
        <div className="
            flex flex-col gap-4
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-8
            rounded-[16px]
            ">
                <p className="text-[20px] text-white font-extrabold"> 사업자등록증</p>
                <input id="organ-application" name="file" type="file" accept=".pdf,.jpg,.jpeg,.png" required={!isReadOnly} disabled={isReadOnly} className="hidden"/>
                <label htmlFor="organ-application" className="
                flex flex-col gap-3 items-center 
                bg-[#1E2939] border border-[#364153] rounded-[10px]
                p-8"> 
                    <img src={OrganApplicationUpload} alt="조직 계정 신청 사업자 등록증"/>
                    <p className="text-[14px] font-extrabold text-white"> 사업자 등록증 업로드</p>
                    <p className="text-[12px] font-medium text-[#6A7282]"> PDF, JPG, PNG 파일 (최대 10MB) </p>
                </label>
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
            </div>
    );
}