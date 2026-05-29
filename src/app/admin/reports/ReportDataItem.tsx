import DetailButton from "@/feature/admin/components/DetailButton";
import ReportCheck from "@/feature/admin/components/ReportCheck";
import ReportStatus from "@/feature/admin/components/ReportStatus";

interface ReportMode {
    mode: 'TRAINER_REVIEW' | 'COMMENT' | 'PT_COURSE' | 'FEEDBACK' | 'POST'
}

export default function ReportDataItem({ mode }: ReportMode) {
    return (
        <div
            style={{ display: 'grid' }}
            className="!gird grid-cols-21 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-3">reportNumber</p>
            <p className="col-span-3">targetDisplayText</p>
            <p className="col-span-3">targetOwnerUsername</p>
            <div className="col-span-3"><ReportCheck /></div>
            <p className="col-span-2">reportedAt</p>
            <p className="col-span-2">reportCount건</p>
            <div className="col-span-2"><ReportStatus text='대기' /></div>
            <div className="col-span-3"><DetailButton mode={mode} /></div>
        </div>
    );
}