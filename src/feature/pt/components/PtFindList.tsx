import { PtCourseListData } from "../type";
import PtFindCard from "./PtFindCard";

interface PtFindListProps {
  response: PtCourseListData[];
}

export default function PtFindList( {response}: PtFindListProps) {
    return (
        <div className="flex flex-3 flex-col gap-6 p-6 overflow-y-auto scrollbar-none">
            <div className="flex flex-col gap-1">
                <p className="text-[24px] font-black text-white"> PT 목록 </p>
                <p className="text-[14px] font-normal text-[#6A7282]"> 가까운 곳에서 마음에 드는 PT를 찾아보세요</p>
            </div>

        {response.map((item) => (
            <PtFindCard
                key={item.ptCourseId}
                response={item}
            />
        ))}

        {response.length === 0 && (
            <div className="flex items-center justify-center py-12 text-[`#6A7282`]">
                <p className="text-[16px] font-medium">
                    해당 헬스장의 PT 프로그램이 없습니다.
                </p>
            </div>
        )}
        </div>
    );
}