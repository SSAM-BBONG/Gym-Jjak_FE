import PtManageUserCard from "@/feature/pt/components/PtManageUserCard";
import { getPtStudentsList } from "@/service/ptzone.service";
import Link from "next/link";

interface PtManageDetailPageProps {
  params: Promise<{
    id: number;
  }>;
}

export default async function PtManageDetailPage( {params}: PtManageDetailPageProps) {
    const { id } = await params;

    const response = await getPtStudentsList(id);

    return (
        <div className="flex flex-col gap-1 px-60 py-10">
            <p className="text-[36px] font-black text-white"> {response.data.title} </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 신청자 관리 및 피드백 제공 </p>

            <div className="flex flex-col gap-4 mt-6">
                
                {response.data.ptReservations.map((item) => (
                <Link 
                    href={`/pt/manage/${id}/users/${item.ptReservationId}`}
                    key={item.ptReservationId}
                > 
                    
                    <PtManageUserCard 
                        key={item.ptReservationId}
                        data={item}
                    />
                </Link>
                ))}
            </div>
        </div>
    );
}