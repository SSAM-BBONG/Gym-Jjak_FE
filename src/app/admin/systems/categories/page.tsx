import SystemAddButton from "../SystemAddButton";
import SystemDataList from "../SystemDataList";

export default function Page() {
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