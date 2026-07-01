import { Complete, OrganApplicationDanger, OrganApplicationDate, OrganBusinessInf, OrganizationApplicationReject, OrganUnderReview, PtRecordComplete } from "@/components/ui/image";
import { getOrganizationApplications } from "@/service/mypage.service";
import Link from "next/link";
import { OrganizationApplicationListData } from "../type";
import Image, { StaticImageData } from "next/image";

type ApplicationStatus = "PENDING" | "ACCEPTED" | "REJECTED" | "CANCELLED";

interface OrganizationApplicationCardProps {
    data: OrganizationApplicationListData[];
}

//  목록 조회시 상태에 따른 값 타입
interface ListStatus {
    text: string;
    className: string;
    image: string;
}

const STATUS_VALUE: Record<ApplicationStatus, ListStatus> = {
    PENDING: {
        text: "대기중",
        className: "bg-[#F0B1001A] text-[#F0B100]",
        image: OrganUnderReview,
    },
    ACCEPTED: {
        text: "승인됨",
        className: "bg-[#BFFF0B33] text-[#BFFF0B]",
        image: PtRecordComplete,
    },
    REJECTED: {
        text: "거절됨",
        className: "bg-[#82181AB2] text-[#FF6467]",
        image: OrganizationApplicationReject,
    },
    CANCELLED: {
        text: "취소됨",
        className: "bg-[#2B7FFF33] text-[#51A2FF]",
        image: OrganApplicationDanger,
    },
};


export default async function OrganizationApplicationCard({ data }: OrganizationApplicationCardProps) {

    return (
        <div className="flex flex-col px-60 pt-10 gap-8">
            <div className="flex flex-col gap-2">
                <p className="text-[36px] font-black text-white"> 조직 신청 내역 </p>
                <p className="text-[14px] font-normal text-[#99A1AF]"> 나의 조직 계정 신청 목록을 확인하세요 </p>
            </div>
            <div className="flex flex-col gap-8">
                {data.map((item) => (
                    <div
                        key={item.organizationApplicationId}
                        className="
            flex flex-col gap-4
            bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
            p-6
            border border-[#36415380] rounded-[10px]
            ">
                        <div className="flex justify-between">
                            <div className="flex gap-3">
                                <p className="text-[20px] font-extrabold text-white"> {item.businessName}</p>

                                <p className={`flex gap-2 px-4 py-1 items-center rounded-full text-[12px] font-extrabold ${STATUS_VALUE[item.status].className}`}>
                                    {/* <img src={STATUS_VALUE[item.status].image} alt="조직 승인 내역 검토중" /> */}
                                    <div className="relative w-5 h-5">
                                        <Image
                                            src={STATUS_VALUE[item.status].image}
                                            alt="조직 승인 내역 검토중"
                                            fill
                                            priority
                                            sizes="w-10 h-10"
                                            className="object-cover hover:cursor-pointer"
                                        />
                                    </div>
                                    {STATUS_VALUE[item.status].text}
                                </p>

                            </div>
                            <Link
                                href={`/mypage/organization/application/${item.organizationApplicationId}`}
                            >
                                <p className="text-[#6A7282] font-black"> 〉</p>
                            </Link>
                        </div>
                        <div>
                            <p className="text-[14px] font-normal text-[#6A7282]"> 조직 ID : {item.requestedLoginId}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-6">
                            <div className="flex flex-col gap-2 bg-[#1E293980] rounded-[10px] p-4">
                                <div className="flex gap-2 items-center">
                                    {/* <img src={OrganBusinessInf} alt="조직 신청 내역 사업자 정보" /> */}
                                    <div className="relative w-5 h-5">
                                        <Image
                                            src={OrganBusinessInf}
                                            alt="조직 신청 내역 사업자 정보"
                                            fill
                                            priority
                                            sizes="w-10 h-10"
                                            className="object-cover hover:cursor-pointer"
                                        />
                                    </div>
                                    <p className="text-[12px] font-normal text-[#99A1AF]"> 사업자 정보 </p>
                                </div>
                                <p className="text-[14px] font-extrabold text-white"> {item.businessRegistrationNumber} </p>
                                <p className="text-[12px] font-normal text-[#99A1AF]"> {item.representativeName}  </p>
                            </div>

                            <div className="flex flex-col gap-2 bg-[#1E293980] rounded-[10px] p-4">
                                <div className="flex gap-2 items-center">
                                    {/* <img src={OrganApplicationDate} alt="조직 신청 내역 신청 일시" /> */}
                                    <div className="relative w-5 h-5">
                                        <Image
                                            src={OrganApplicationDate}
                                            alt="조직 신청 내역 신청 일시"
                                            fill
                                            priority
                                            sizes="w-10 h-10"
                                            className="object-cover hover:cursor-pointer"
                                        />
                                    </div>
                                    <p className="text-[12px] font-normal text-[#99A1AF]"> 신청 일시</p>
                                </div>
                                <p className="text-[14px] font-extrabold text-white"> {item.createdAt}</p>
                            </div>
                        </div>

                        {item.status === "PENDING" &&
                            <div className="flex items-baseline gap-4 bg-[#F0B1001A] border border-[#F0B1004D] p-4 rounded-[10px]">
                                {/* <img src={OrganUnderReview} alt="조직 신청 내역 검토중" /> */}
                                <div className="relative w-5 h-5">
                                    <Image
                                        src={OrganUnderReview}
                                        alt="조직 신청 내역 검토중"
                                        fill
                                        priority
                                        sizes="w-10 h-10"
                                        className="object-cover hover:cursor-pointer"
                                    />
                                </div>
                                <div>
                                    <p className="text-[14px] text-[#FDC700] font-normal"> 검토 중</p>
                                    <p className="text-[12px] text-[#D1D5DC] font-normal"> 영업일 기준 2~3일 소요되며, 결과는 이메일로 안내됩니다.</p>
                                </div>
                            </div>
                        }
                    </div>
                ))}
            </div>
            <Link href="/mypage/organization/application">
                <div className="
                    flex items-center justify-center gap-3
                    bg-[linear-gradient(135deg,rgba(16,24,40,0.90)0%,rgba(30,41,57,0.90)100%)]
                    p-6
                    border border-[#36415380] rounded-[10px]
                    mb-20
                    ">
                    <p className="text-[16px] text-white font-extrabold"> 새로운 조직 계정 신청하기 </p>
                    <p className="text-[#6A7282] font-black"> 〉</p>
                </div>
            </Link>
        </div>
    );
}
