import OnlienPtFindCard from "@/feature/onlinept/OnlinePtFindCard";
import PtDashboard from "../pt/PtDashboard";
import OnlinePtCardCt from "./OnlinePtCartCt";

export default function Page() {
    return (
        <div className="flex flex-col gap-10 px-40">
            <div className="pt-10">
                <p className="text-[40px] font-black text-white"> 온라인 PT ZONE </p>
                <p className="text-[16px] font-normal text-[#99A1AF]"> 전문 트레이너와 함께하는 온라인 맞춤 PT </p>
            </div>
            <OnlinePtCardCt />
            <PtDashboard mode="온라인 PT" />

            <div className="flex flex-col gap-3 pb-15">
                <p className="text-[24px] font-black text-white"> 인기 강습 </p>
                <div className="grid grid-cols-4 gap-4">
                    <OnlienPtFindCard />
                    <OnlienPtFindCard />
                    <OnlienPtFindCard />
                    <OnlienPtFindCard />
                </div>
            </div>
        </div>
    );
}