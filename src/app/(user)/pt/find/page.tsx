import Map from "@/components/ui/Map";
import PtFindCard from "@/feature/pt/components/PtFindCard"
import { getOnboarding, getPtLists } from "@/service/ptzone.service";
import Link from "next/link";

export default async function PtFindPage() {

    const response = await getOnboarding();

    const response2 = await getPtLists();


    return (
        <div className="grid grid-cols-[0.7fr_1.3fr] h-[calc(100vh-70px)] overflow-hidden">
            <div className="flex flex-[3] flex-col gap-6 p-6 min-h-0 overflow-y-auto scrollbar-none">
                <div className="flex flex-col gap-1">
                    <p className="text-[24px] font-black text-white"> PT 목록 </p>
                    <p className="text-[14px] font-normal text-[#6A7282]"> 가까운 곳에서 마음에 드는 PT를 찾아보세요</p>
                </div>

                {response2.data.content.map((item) => (
                    <PtFindCard
                        key={item.ptCourseId}
                        response={item}
                    />
                ))}
            </div>
            <div className="flex-[7] bg-gray-500">
                <Map
                    latitude={response.data.preferredRegion.latitude}
                    longitude={response.data.preferredRegion.longitude}
                    ptList={response2.data.content}
                />
            </div>
        </div>
    );
}
