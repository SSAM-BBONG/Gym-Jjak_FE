import OnlienPtFindCard from "@/feature/onlinept/OnlinePtFindCard";

export default function Page() {
    return (
        <div className="flex flex-col gap-10 px-40">
            <div className="pt-10">
                <p className="text-[40px] font-black text-white"> 온라인 PT ZONE </p>
                <p className="text-[16px] font-normal text-[#99A1AF]"> 전문 트레이너와 함께하는 온라인 맞춤 PT </p>
            </div>
            <div className="grid grid-cols-4 gap-4">
                <OnlienPtFindCard />
                <OnlienPtFindCard />
                <OnlienPtFindCard />
                <OnlienPtFindCard />
                <OnlienPtFindCard />
            </div>
        </div>
    );
}