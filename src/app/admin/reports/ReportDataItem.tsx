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
            className="grid grid-cols-9 md:grid-cols-21 px-1 sm:px-2 md:px-4 lg:px-6 text-white font-normal text-[10px] md:text-xs lg:text-sm border-t border-[#364153] h-14 sm:h-16 lg:h-17.5 items-center"
        >
            <p className="col-span-3 hidden md:block">{repost.reportNumber}</p>
            <p className="col-span-3">{repost.targetDisplayText}</p>
            <p className="col-span-3 hidden md:block">{repost.targetOwnerUsername}</p>
            <div className="col-span-3"><ReportCheck reportGroupId={repost.reportGroupId} /></div>
            <p className="col-span-2 hidden md:block">날짜</p>
            <p className="col-span-2 hidden md:block">{repost.effectiveReportCount}건</p>
            {repost.status === '처리완료' ? (
                <div className="col-span-3 md:col-span-5">
                    <button className="flex items-center gap-1 sm:gap-1.5 lg:gap-2.5 text-[10px] sm:text-xs lg:text-sm font-medium text-red-500 bg-red-500/10 border-red-500/30 border rounded-lg py-1.5 sm:py-2 px-2 lg:px-3">
                        수동 삭제
                    </button>
                </div>
            ) : (
                <>
                    <div className="col-span-2 hidden md:block"><ReportStatus text={repost.status} /></div>
                    <div className="col-span-3"><DetailButton mode={mode} applicationId={0} /></div>
                </>
            )}
        </div>
    );
}
