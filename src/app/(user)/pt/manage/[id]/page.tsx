import PtManageUserCard from "@/feature/pt/components/PtManageUserCard";

export default function PtManageDetailPage() {
    return (
        <div className="flex flex-col gap-1 px-60 py-10">
            <p className="text-[36px] font-black text-white"> 체계적인 가슴 집중 PT </p>
            <p className="text-[14px] font-normal text-[#99A1AF]"> 신청자 관리 및 피드백 제공 </p>

            <div className="flex flex-col gap-4 mt-6">
                <PtManageUserCard />
                <PtManageUserCard />
                <PtManageUserCard />
            </div>
        </div>
    );
}