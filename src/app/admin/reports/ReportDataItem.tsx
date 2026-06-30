import DetailButton from "@/feature/admin/components/DetailButton";
import ReportCheck from "@/feature/admin/components/ReportCheck";
import ReportStatus from "@/feature/admin/components/ReportStatus";
import { getReportPtbyId } from "@/service/report.service";

interface ReportMode {
    mode: 'TRAINER_REVIEW' | 'COMMENT' | 'PT_COURSE' | 'FEEDBACK' | 'POST';
    repost: Reposts
}


export default function ReportDataItem({ mode, repost }: ReportMode) {

    return (
        <div
            style={{ display: 'grid' }}
            className="grid grid-cols-21 px-6 text-white font-normal text-sm border-t border-[#364153] h-17.5 items-center"
        >
            <p className="col-span-3">{repost.reportNumber}</p>
            <p className="col-span-3">{repost.targetDisplayText}</p>
            <p className="col-span-3">{repost.targetOwnerUsername}</p>
            <div className="col-span-3"><ReportCheck reportGroupId={repost.reportGroupId} /></div>
            <p className="col-span-2">날짜</p>
            <p className="col-span-2">{repost.effectiveReportCount}건</p>
            {repost.status === '처리완료' ? (
                <div className="col-span-5">
                    <button className="flex items-center gap-2.5 text-sm font-medium text-red-500 bg-red-500/10 border-red-500/30 border rounded-lg py-2 px-3">
                        수동 삭제
                    </button>
                </div>
            ) : (
                <>
                    <div className="col-span-2"><ReportStatus text={repost.status} /></div>
                    <div className="col-span-3"><DetailButton mode={mode} applicationId={0} /></div>
                </>
            )}
        </div>
    );
}