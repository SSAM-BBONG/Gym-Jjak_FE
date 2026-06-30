import PtManageCard from "@/feature/pt/components/PtManageCard";
import { getPtzonePtManageList } from "@/service/ptzone.service";
import Link from "next/link";

export default async function PtManagePage() {
    
    const response = await getPtzonePtManageList();
    
    return (
        <div className="flex flex-col gap-1 px-60 py-10">
            <p className="text-[36px] font-black text-white"> PT 관리 </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 내 PT 및 수강생을 관리하세요 </p>

            <div className="flex gap-3 py-6">
                <button className="px-4 py-2 rounded-[10px] bg-[#BFFF0B] text-[16px] font-extrabold text-black"> 전체 </button>
                <button className="px-4 py-2 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-[#99A1AF]"> 활성화 </button>
                <button className="px-4 py-2 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-[#99A1AF]"> 비활성화  </button>
            </div>

            <div className="grid grid-cols-3 gap-4">
                {response.data.map((item) => (
                    <Link 
                    key={item.ptCourseId}
                    href={`/pt/manage/${item.ptCourseId}`}>
                    <PtManageCard 
                        key={item.ptCourseId}
                        data={item}
                    />
                    </Link>
                ))}
            </div>
        </div>
    );
}