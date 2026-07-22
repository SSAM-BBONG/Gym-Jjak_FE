import { getMyPtReservationListsAction } from "@/feature/pt/actions";
import PtRecordCard from "@/feature/pt/components/PtRecordCard";
import PtRecordsList from "@/feature/pt/components/PtRecordsList";

export default async function PtRecordsPage() {

    const result = await getMyPtReservationListsAction();

    return (
        <div className="flex flex-col gap-1 px-40 py-10">
            <p className="text-[36px] font-black text-white"> PT 기록 </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 내 PT 기록을 확인하세요 </p>

            {result.success === false ? (
                <PtRecordCard errorMessage={result.message} />
            ) : (
                <PtRecordsList ptReservations={result.data.ptReservations} />
            )}
        </div>
    );
}
