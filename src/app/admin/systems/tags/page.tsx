import { getTags } from "@/service/admin.service";
import SystemAddButton from "../SystemAddButton";
import SystemDataList from "../SystemDataList";

export default async function Page() {
    const response = await getTags();
    const tag: Tag[] = response.data;

    return (
        <section className="p-7.5">
            <div className="flex items-center  mb-8">
                <h1 className="font-extrabold text-4xl text-white">태그 조회</h1>
                <SystemAddButton text="태그" />
            </div>

            <SystemDataList text="태그" datas={tag} />
        </section>
    );
}