import PfFeebBackCard from "@/feature/pt/components/PtFeebBackCard";
import PtRecordDetailButton from "@/feature/pt/components/PtRecordDetailButton";
import { getMyPtReservationDetailAction } from "@/feature/pt/actions";
import Image from "next/image";
import { HeaderProfile } from "@/components/ui/image";
import { Progress } from "@/components/ui/progress";

const PT_RECORD_STATUS_LABEL: Record<string, string> = {
    COMPLETED: "완료됨",
    RESERVED: "예약됨",
    IN_PROGRESS: "수강중",
    CANCELLED: "취소됨",
};

interface PtRecordDetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function PtRecordDetailPage({ params }: PtRecordDetailPageProps) {

    const { id } = await params
    const result = await getMyPtReservationDetailAction(id);

    if (result.success === false) {
        return (
            <div className="flex flex-col gap-4 px-3 py-5 sm:gap-5 sm:px-6 sm:py-8 md:px-16 md:py-10 lg:gap-5 lg:px-70 lg:py-6">
                <PfFeebBackCard
                    data={[]}
                    reservationId={id}
                    errorMessage={result.message}
                />
            </div>
        );
    }

    const data = result.data;

    const current = data.progressCount
    const total = data.totalSessionCount
    const progreesPercent = total > 0 ? Math.min(100, (Math.round((current/total) * 100))) : 0;

    return (
        <div className="flex flex-col gap-4 px-3 py-5 sm:gap-5 sm:px-6 sm:py-8 md:px-16 md:py-10 lg:gap-5 lg:px-70 lg:py-6">
            <div className="
            overflow-hidden
            flex flex-col lg:flex-row
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
                ">
                <div className="relative h-44 w-full sm:h-52 md:h-60 lg:h-auto lg:w-[20%]">
                    <Image 
                        src={data.thumbnailUrl || HeaderProfile}
                        fill
                        alt="PT 기록 프로필 사진"
                    />
                </div>
                <div className="flex flex-col gap-2 flex-7 p-4 sm:p-5 lg:p-6">
                    <p className="text-[24px] font-black text-white"> {data.title}</p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> {data.trainerName}</p>
                    <div className="grid grid-cols-1 gap-3 mt-2 md:grid-cols-2 md:gap-4">
                        <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-[#1E293980] sm:p-4 lg:p-3">
                            <p className="text-[12px] font-normal text-[#6A7282]"> 진척도 <span className="text-[#BFFF0B]">({progreesPercent}%)</span> </p>
                            <p className="text-[14px] font-extrabold text-[#BFFF0B]"> {data.progressCount}/{data.totalSessionCount}회 </p>
                        </div>
                        <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-[#1E293980] sm:p-4 lg:p-3">
                            <p className="text-[12px] font-normal text-[#6A7282]"> 상태 </p>
                            <p className="text-[14px] font-extrabold text-white">
                                {PT_RECORD_STATUS_LABEL[data.status] ?? data.status}
                            </p>
                        </div>
                    </div>
                    <Progress value={progreesPercent} className="h-2" />
                </div>
            </div>

            <PtRecordDetailButton
                data={data}
                reservationId={id}
            />

            <div className="px-1">
                <p className="text-[16px] font-extrabold text-white">트레이너 피드백</p>
                <p className="mt-1 text-[14px] font-normal text-[#99A1AF]">
                    수업별 트레이너 피드백을 확인할 수 있어요.
                </p>
            </div>

            <div className="
            hidden grid-cols-1 gap-2
            bg-[#101828]
            border border-[#1E2939] rounded-[14px]
            p-2
            ">  
                <div className="flex flex-col gap-2 sm:flex-row sm:gap-5">
                    <p className="py-3 text-[16px] font-extrabold text-black bg-[#BFFF0B] rounded-[10px] text-center flex-1"> 트레이너 피드백 </p>
                    <p className="py-3 text-[16px] font-extrabold text-[#99a1af] rounded-[10px] text-center flex-1"> 식단 관리 </p>
                </div>
            </div>

            <PfFeebBackCard
                data={data.curriculums}
                reservationId={id}
            />

        </div>
    );
}
