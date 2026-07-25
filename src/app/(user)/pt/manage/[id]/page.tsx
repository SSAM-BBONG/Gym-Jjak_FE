import PtManageReservationList from "@/feature/pt/components/PtManageReservationList";
import { getPtStudentsList } from "@/service/ptzone.service";

interface PtManageDetailPageProps {
    params: Promise<{
        id: number;
    }>;
}

export default async function PtManageDetailPage({ params }: PtManageDetailPageProps) {
    const { id } = await params;

    const response = await getPtStudentsList(id);

    return (
        <div className="flex flex-col gap-1 px-3 py-5 sm:px-6 md:px-12 md:py-8 lg:px-60 lg:py-10">
            <PtManageReservationList
                id={id}
                title={response.data.title}
                ptReservations={response.data.ptReservations}
            />
        </div>
    );
}
