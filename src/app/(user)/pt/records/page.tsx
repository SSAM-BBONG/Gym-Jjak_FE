import { getMyPtReservationListsAction } from "@/feature/pt/actions";
import PtRecordCard from "@/feature/pt/components/PtRecordCard";
import PtRecordsList from "@/feature/pt/components/PtRecordsList";
import Link from "next/link";

export default async function PtRecordsPage() {
  const result = await getMyPtReservationListsAction();

  return (
    <div className="flex flex-col gap-1 px-4 py-6 sm:px-8 sm:py-8 md:px-16 md:py-10 lg:px-40">
      <div className="flex items-center justify-between gap-3">
        <p className="text-[36px] font-black text-white">PT 기록</p>
        <Link
          href="/pt/records/reservation"
          className="rounded-[10px] bg-[#1E2939] px-3 py-2 text-[12px] font-extrabold text-white sm:px-4 sm:text-[14px] lg:px-5 hover:bg-[#BFFF0B] hover:text-black"
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
