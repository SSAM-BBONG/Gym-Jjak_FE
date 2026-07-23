import { getMyPtSessionReservationsAction } from "@/feature/pt/actions";
import PtSessionReservationList from "@/feature/pt/components/PtSessionReservationList";

export default async function PtSessionReservationPage() {
  const result = await getMyPtSessionReservationsAction();

  return (
    <div className="flex flex-col gap-1 px-40 py-10">
      <p className="text-[36px] font-black text-white">PT 세션 예약 목록</p>
      <p className="text-[14px] font-normal text-[#99A1AF]">
        예약한 PT 세션을 확인하고, 예정된 세션은 취소할 수 있습니다.
      </p>
      <PtSessionReservationList
        sessions={result.success ? result.data.sessions : []}
        errorMessage={result.success ? undefined : result.message}
      />
    </div>
  );
}
