'use client'

import SearchBar from "@/feature/admin/components/SearchBar";
import SystemDataItem from "./SystemDataItem";

export default function SystemDataList({ text }: { text: string }) {
    return (
        <div>
            <SearchBar></SearchBar>
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 border mt-6 rounded-md w-full ">
                <div style={{ display: 'grid' }} className="!gird grid-cols-14 px-6 text-[#99A1AF] font-bold text-sm border-0 h-13 items-center">
                    <p className="col-span-4">{text}명</p>
                    <p className="col-span-3">등록일</p>
                    <p className="col-span-3">사용개수</p>
                    <p className="col-span-2">관리</p>
                    <p className="col-span-2"></p>
                </div>

                <SystemDataItem text={text} />
                <SystemDataItem text={text} />
                <SystemDataItem text={text} />
                <SystemDataItem text={text} />
                <SystemDataItem text={text} />
            </section>
        </div>
    );
}