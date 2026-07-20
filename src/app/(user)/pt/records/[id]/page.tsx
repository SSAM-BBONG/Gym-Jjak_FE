import PfFeebBackCard from "@/feature/pt/components/PtFeebBackCard";
import PtRecordDetailButton from "@/feature/pt/components/PtRecordDetailButton";
import { getMyPtReservationDetailAction } from "@/feature/pt/actions";

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
            <div className="flex flex-col gap-5 px-70 py-10">
                <PfFeebBackCard
                    data={[]}
                    reservationId={id}
                    errorMessage={result.message}
                />
            </div>
        );
    }

    const data = result.data;

    return (
        <div className="flex flex-col gap-5 px-70 py-10">
            <div className="
            overflow-hidden
            flex
            bg-[#101828]
            border border-[#1E2939] rounded-[16px]
                ">
                <div
                    style={{ backgroundImage: `url(${data.thumbnailUrl})` }}
                    className="flex-3 bg-no-repeat bg-cover">
                </div>
                <div className="flex flex-col gap-2 flex-7 p-6">
                    <p className="text-[24px] font-black text-white"> {data.title}</p>
                    <p className="text-[14px] font-normal text-[#99A1AF]"> {data.trainerName}</p>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                        <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-[#1E293980]">
                            <p className="text-[12px] font-normal text-[#6A7282]"> 진척도 </p>
                            <p className="text-[14px] font-extrabold text-[#BFFF0B]"> {data.progressCount}/{data.totalSessionCount}회 </p>
                        </div>
                        <div className="flex flex-col gap-1 p-3 rounded-[10px] bg-[#1E293980]">
                            <p className="text-[12px] font-normal text-[#6A7282]"> 상태 </p>
                            <p className="text-[14px] font-extrabold text-white"> {data.status} </p>
                        </div>
                    </div>
                    <div className="flex h-2 bg-[#364153] rounded-full mt-2">
                        <p className="w-[30%] bg-[#BFFF0B] rounded-full"></p>
                    </div>
                </div>
            </div>

            <PtRecordDetailButton
                ptCourseId={data.ptCourseId}
                reservationId={id}
                title={data.title}
            />

            <div className="
            grid grid-cols-1 gap-2
            bg-[#101828]
            border border-[#1E2939] rounded-[14px]
            p-2
            ">
                <p className="py-3 text-[16px] font-extrabold text-black bg-[#BFFF0B] rounded-[10px] text-center"> 트레이너 피드백 </p>
            </div>

            <PfFeebBackCard
                data={data.curriculums}
                reservationId={id}
            />

        </div>
    );
}
