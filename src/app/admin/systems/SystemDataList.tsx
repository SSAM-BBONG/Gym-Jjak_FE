'use client'

import SearchBar from "@/feature/admin/components/SearchBar";
import SystemDataItem from "./SystemDataItem";

type SystemDataListProps =
    | {
        text: "카테고리";
        datas: Category[];
    }
    | {
        text: "태그";
        datas: Tag[];
    };


export default function SystemDataList({ text, datas }: SystemDataListProps) {
    return (
        <div>
            <SearchBar></SearchBar>
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 md:border mt-4 sm:mt-5 lg:mt-6 md:rounded-md w-full ">
                <div style={{ display: 'grid' }} className="grid grid-cols-8 sm:grid-cols-11 md:grid-cols-14 px-2 sm:px-3 md:px-4 lg:px-6 text-[#99A1AF] font-bold text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-0 h-11 sm:h-12 lg:h-13 items-center">
                    <p className="md:col-span-4 col-span-2">{text}명</p>
                    <p className="sm:col-span-3 col-span-2">등록일</p>
                    <p className="md:col-span-3 col-span-2 hidden sm:block">사용개수</p>
                    <p className="col-span-2">관리</p>
                    <p className="col-span-2"></p>
                </div>
                {/* 타입을 판별 유니온으로 바꿨기 때문에 나눠서 해줘야함 */}
                {/* text가 판별자 역할을 해서 카테고리 => Category 이런식 */}
                {text === "카테고리"
                    ? datas.map((category) => (
                        <SystemDataItem
                            key={category.categoryId}
                            text="카테고리"
                            data={category}
                        />
                    ))
                    : datas.map((tag) => (
                        <SystemDataItem
                            key={tag.tagId}
                            text="태그"
                            data={tag}
                        />
                    ))}
                {datas?.length === 0 && (
                    <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
                        {text}가 없습니다.
                    </div>
                )}
            </section>
        </div>
    );
}
