import PtCourseSessionReservationList from "@/feature/pt/components/PtCourseSessionReservationList";
import {
  getMyPtCourseSessionReservationsAction,
  getMyPtReservationDetailAction,
} from "@/feature/pt/actions";

interface PtCourseSessionReservationPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function PtCourseSessionReservationPage({
  params,
}: PtCourseSessionReservationPageProps) {
  const { id } = await params;
  const detailResult = await getMyPtReservationDetailAction(id);

  if (detailResult.success === false) {
    return (
      <div className="flex flex-col gap-3 px-4 py-6 sm:px-8 sm:py-8 md:px-16 md:py-10 lg:px-40">
        <p className="text-[28px] font-black text-white">내 PT 세션 목록</p>
        <p className="text-[14px] text-[#FF6467]">{detailResult.message}</p>
      </div>
    );
  }

  const sessionResult = await getMyPtCourseSessionReservationsAction(
    detailResult.data.ptCourseId
  );

  return (
    <div className="flex flex-col gap-5 px-4 py-6 sm:px-8 sm:py-8 md:px-16 md:py-10 lg:px-40">
      <div>
        <p className="text-[28px] font-black text-white sm:text-[36px]">내 PT 세션 목록</p>
        <p className="mt-1 text-[14px] text-[#99A1AF]">
          {detailResult.data.title}의 예약 세션을 확인하고 관리하세요.
        </p>
      </div>
      <PtCourseSessionReservationList
        sessions={sessionResult.success ? sessionResult.data.sessions : []}
        errorMessage={sessionResult.success ? undefined : sessionResult.message}
      />
    </div>
  );
}
