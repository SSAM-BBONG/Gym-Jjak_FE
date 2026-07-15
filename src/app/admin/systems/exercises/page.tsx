import { getExercises } from "@/service/admin.service";
import SystemAddButton from "../SystemAddButton";
import SystemDataList from "../SystemDataList";

interface paramsProps {
    searchParams: Promise<{
        part: PartKo;
    }>
}

export default async function Page({ searchParams }: paramsProps) {
    const { part } = await searchParams;
    const response = await getExercises(part);
    const exercises: Exercise[] = response.data;

    return (
        <section className="p-4 sm:p-5 md:p-6 lg:p-7.5">
            <div className="flex items-center  mb-5 sm:mb-6 lg:mb-8">
                <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white">운동 종류 조회</h1>
                <SystemAddButton />
            </div>

            <SystemDataList exercises={exercises} part={part} />
        </section>
    );
}
