import ActiveStatus from "@/feature/admin/components/ActiveStatus";
import DetailButton from "@/feature/admin/components/DetailButton";

export default function TrainerADataItem() {
    return (
        <div
            style={{ display: 'grid' }}
            className="!gird grid-cols-11 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-3">하이</p>
            <p className="col-span-2">하이</p>
            <p className="col-span-2">하이</p>
            <div className="col-span-2"><ActiveStatus text='활성' /></div>
            <div className="col-span-2"><DetailButton mode='trainerApprove' /></div>
        </div>
    );
}