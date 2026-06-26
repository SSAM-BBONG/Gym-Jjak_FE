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
    console.log(trainers);

    const totalPage: number = response.data.totalPages

    return (
        <section className="p-7.5">
            <h1 className="font-extrabold text-4xl text-white mb-8">트레이너 조회</h1>
            <TrainerDataList trainers={trainers} totalPage={totalPage} page={page} />
        </section>
    );
}