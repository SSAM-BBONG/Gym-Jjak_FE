import PtManageFeedBackCard from "@/feature/pt/components/PtManageFeedBackCard";
import PtManageUserFeedBackTop from "@/feature/pt/components/PtManageUserFeedBackTop";
import { getFeedBackLists, getPtStudentDetail } from "@/service/ptzone.service";

interface PtManageUserFeedBackPageProps {
    params: Promise<{
        id: string
        userid: string;
    }>;
}

export default async function PtManageUserFeedBackPage({ params }: PtManageUserFeedBackPageProps) {
    const { id, userid } = await params

    const response = await getPtStudentDetail(userid);
    const feedbackResponse = await getFeedBackLists(userid);
    
    return (
        <div className="flex flex-col gap-5 px-70 py-10">
            <PtManageUserFeedBackTop
                data={response.data}
            />
            <div className="
            grid grid-cols-3 gap-2
            bg-[#101828]
            border border-[#1E2939] rounded-[14px]
            p-2
            ">
                <p className="py-3 text-[16px] font-extrabold text-black bg-[#BFFF0B] rounded-[10px] text-center"> 피드백 관리 </p>
                <p className="py-3 text-[16px] font-extrabold text-[#99A1AF] rounded-[10px] text-center"> 운동일지 </p>
                <p className="py-3 text-[16px] font-extrabold text-[#99A1AF] rounded-[10px] text-center"> 식단 관리 </p>
            </div>

            <PtManageFeedBackCard
                data={feedbackResponse.data}
                reservationId={userid}
                ptCourseId={id}
            />

        </div>
    );
}