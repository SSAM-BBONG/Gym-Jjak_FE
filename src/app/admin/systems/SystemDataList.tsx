'use client'

import SearchBar from "@/feature/admin/components/SearchBar";
import SystemDataItem from "./SystemDataItem";
import PartSidebar from "./PartSideBar";


export default function SystemDataList({ exercises, part }: { exercises: Exercise[], part: PartKo }) {
    return (
        <div>
            <SearchBar page={false}></SearchBar>
            <PartSidebar part={part} />
            <section className="bg-[#1E2939] border-[#364153] border-separate border-spacing-0 md:border mt-4 sm:mt-5 lg:mt-6 md:rounded-md w-full ">
                <div style={{ display: 'grid' }} className="grid grid-cols-8 sm:grid-cols-11 md:grid-cols-14 px-2 sm:px-3 md:px-4 lg:px-6 text-[#99A1AF] font-bold text-[10px] sm:text-[11px] md:text-xs lg:text-sm border-0 h-11 sm:h-12 lg:h-13 items-center">
                    <p className="md:col-span-4 col-span-2">운동 종류</p>
                    <p className="sm:col-span-3 col-span-2">등록일</p>
                    <p className="md:col-span-3 col-span-2 hidden sm:block">부위</p>
                    <p className="col-span-2">관리</p>
                    <p className="col-span-2"></p>
                </div>

                {exercises.map((exercise) => (
                    <SystemDataItem
                        key={exercise.exerciseId}
                        exercise={exercise}
                    />
                ))}

                {exercises?.length === 0 && (
                    <div className="px-3 sm:px-4 lg:px-6 py-8 lg:py-10 text-center text-xs sm:text-sm text-muted-foreground">
                        운동 종류가 없습니다.
                    </div>
                )}
            </section>
        </div>
    );
}
