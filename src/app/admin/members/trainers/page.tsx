import { getTrainer } from "@/service/admin.service";
import TrainerDataList from "./TrainerDataList";

interface paramsProps {
    searchParams: Promise<{
        page: string;
        keyword: string;
    }>
}

export default async function Page({ searchParams }: paramsProps) {
    const { page, keyword } = await searchParams;
    const response = await getTrainer(page, keyword);
    const trainers: Trainers[] = response.data.content;

    const totalPage: number = response.data.totalPages

    return (
        <section className="p-4 sm:p-5 md:p-6 lg:p-7.5">
            <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white mb-5 sm:mb-6 lg:mb-8">트레이너 조회</h1>
            <TrainerDataList trainers={trainers} totalPage={totalPage} page={page} />
        </section>
    );
}
