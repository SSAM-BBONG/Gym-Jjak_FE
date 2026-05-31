import { getCategories } from "@/service/admin.service";
import SystemAddButton from "../SystemAddButton";
import SystemDataList from "../SystemDataList";

export default async function Page() {

    const response = await getCategories();
    const categories: category[] = response.data.data;
    return (
        <section className="p-7.5">
            <div className="flex items-center  mb-8">
                <h1 className="font-extrabold text-4xl text-white">카테고리 조회</h1>
                <SystemAddButton text="카테고리" />
            </div>

            <SystemDataList text="카테고리" />
        </section>
    );
}