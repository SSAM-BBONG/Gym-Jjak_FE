import ActiveStatus from "@/feature/admin/components/ActiveStatus";
import StatusButton from "@/feature/admin/components/StatusButton";

export default function BlackListDataItem() {
    return (
        <div
            style={{ display: 'grid' }}
            className="!gird grid-cols-13 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-3">하이</p>
            <p className="col-span-2">하이</p>
            <p className="col-span-2">하이</p>
            <div className="col-span-2"><ActiveStatus text='7일 정지' /></div>
            <p className="col-span-2 text-red-500">누적신고</p>
            <div className="col-span-2"><StatusButton /></div>
        </div>
    );
}