import ActiveStatus from "@/feature/admin/components/ActiveStatus";
import DetailButton from "@/feature/admin/components/DetailButton";
import StatusButton from "@/feature/admin/components/StatusButton";

export default function TrainerDataItem() {
    return (
        <div
            style={{ display: 'grid' }}
            className="!gird grid-cols-15 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-3">하이</p>
            <p className="col-span-2">하이</p>
            <p className="col-span-2">하이</p>
            <div className="col-span-2"><ActiveStatus text='활성' /></div>
            <p className="col-span-2 text-red-500">누적신고</p>
            <div className="col-span-2"><StatusButton /></div>
            <div className="col-span-2"><DetailButton mode='trainerView' /></div>
        </div>
    );
}