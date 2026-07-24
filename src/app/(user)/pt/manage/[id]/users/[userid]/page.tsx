import CalendarQueryProvider from "@/app/(user)/calendar/CalendarQueryProvider";
import PtManageFeedBackCard from "@/feature/pt/components/PtManageFeedBackCard";
import PtManageCalendar from "@/feature/pt/components/PtManageCalendar";
import PtManageMeal from "@/feature/pt/components/PtManageMeal";
import PtManageNav from "@/feature/pt/components/PtManageNav";
import PtManageUserFeedBackTop from "@/feature/pt/components/PtManageUserFeedBackTop";
import { getFeedBackLists, getPtStudentDetail } from "@/service/ptzone.service";

interface PtManageUserFeedBackPageProps {
    params: Promise<{
        id: string
        userid: string;
    }>;
}


interface ParamsProps {
    searchParams: Promise<{
        type: string;
    }>
}


export default async function PtManageUserFeedBackPage({
    params,
    searchParams,
}: PtManageUserFeedBackPageProps & ParamsProps) {
    const { id, userid } = await params
    const { type } = await searchParams

    const response = await getPtStudentDetail(userid);
    const feedbackResponse = await getFeedBackLists(userid);

    return (
        <CalendarQueryProvider>
            <div className="flex flex-col gap-5 px-70 py-10">
                <PtManageUserFeedBackTop
                    data={response.data}
                />
                <PtManageNav href={`/pt/manage/${id}/users/${userid}`} type={type} />
                {(type === 'feedback' || !type) &&
                    <PtManageFeedBackCard
                        data={feedbackResponse.data}
                        reservationId={userid}
                        ptCourseId={id}
                    />
                }
                {type === 'calendar' &&
                    <PtManageCalendar userId={response.data.userId} />
                }
                {type === 'meal' &&
                    <PtManageMeal userId={response.data.userId} />
                }

            </div>
        </CalendarQueryProvider>
    );
}
