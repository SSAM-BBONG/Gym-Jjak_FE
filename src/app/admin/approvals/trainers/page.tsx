import { getTrainerApplications } from "@/service/admin.service";
import TrainerADataList from "../../../organization/gym/approval/TrainerADataList";

interface paramsProps {
    searchParams: Promise<{
        page: string;
        keyword: string | null;
        status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED" | null
    }>
}

export default async function Page({ searchParams }: paramsProps) {
    const { page, keyword, status } = await searchParams;
    const response = await getTrainerApplications(page, status, keyword);
    const trainers: TrainerApplications[] = response.data.content;
    const totalPage: number = response.data.totalPages

    return (
        <section className="p-4 sm:p-5 md:p-6 lg:p-7.5">
            <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white mb-5 sm:mb-6 lg:mb-8">트레이너 승인</h1>
            <TrainerADataList trainers={trainers} totalPage={totalPage} page={page} keyword={keyword} status={status} />
        </section>
    );
}
