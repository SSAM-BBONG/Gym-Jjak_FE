import { getCategories } from "@/service/admin.service";
import SystemAddButton from "../SystemAddButton";
import SystemDataList from "../SystemDataList";

export default async function Page() {

    const response = await getCategories();
    const categories: Category[] = response.data;
    return (
        <section className="p-4 sm:p-5 md:p-6 lg:p-7.5">
            <div className="flex items-center  mb-5 sm:mb-6 lg:mb-8">
                <h1 className="font-extrabold text-2xl sm:text-3xl lg:text-4xl text-white">카테고리 조회</h1>
                <SystemAddButton text="카테고리" />
            </div>

            <SystemDataList text="카테고리" datas={categories} />
        </section>
    );
}
