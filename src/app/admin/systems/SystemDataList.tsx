'use client'

import SearchBar from "@/feature/admin/components/SearchBar";
import SystemDataItem from "./SystemDataItem";

export default function SystemDataList({ text, datas }: { text: '카테고리' | '태그', datas: Category[] | Tag[] }) {
    return (
        <div>
            <SearchBar></SearchBar>
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 border mt-6 rounded-md w-full ">
                <div style={{ display: 'grid' }} className="grid grid-cols-14 px-6 text-[#99A1AF] font-bold text-sm border-0 h-13 items-center">
                    <p className="col-span-4">{text}명</p>
                    <p className="col-span-3">등록일</p>
                    <p className="col-span-3">사용개수</p>
                    <p className="col-span-2">관리</p>
                    <p className="col-span-2"></p>
                </div>
                {
                    datas.map(data => {
                        return <SystemDataItem text={text} data={data} key={data.name} />
                    })
                }
                {datas?.length === 0 && (
                    <div className="px-6 py-10 text-center text-sm text-muted-foreground">
                        {text}가 없습니다.
                    </div>
                )}
            </section>
        </div>
    );
}