import { getMyPtReservationListsAction } from "@/feature/pt/actions";
import PtRecordCard from "@/feature/pt/components/PtRecordCard";
import PtRecordsList from "@/feature/pt/components/PtRecordsList";
import Link from "next/link";

export default async function PtRecordsPage() {
  const result = await getMyPtReservationListsAction();

  return (
    <div className="flex flex-col gap-1 px-40 py-10">
      <div className="flex items-center justify-between">
        <p className="text-[36px] font-black text-white">PT 기록</p>
        <Link
          href="/pt/records/reservation"
          className="rounded-[10px] bg-[#1E2939] px-5 py-2 text-[14px] font-extrabold text-white hover:bg-[#BFFF0B] hover:text-black"
        >
          세션 예약 목록
        </Link>
      </div>
      <p className="text-[14px] font-normal text-[#99A1AF]">
        나의 PT 기록을 확인하세요.
      </p>

      {result.success === false ? (
        <PtRecordCard errorMessage={result.message} />
      ) : (
        <PtRecordsList ptReservations={result.data.ptReservations} />
      )}
    </div>
  );
}
