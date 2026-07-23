import ReportCheck from "@/feature/admin/components/ReportCheck";
import ReportDetailButton from "@/feature/admin/components/ReportDetailButton";
import ReportGroupDeleteButton from "@/feature/admin/components/ReportGroupDeleteButton";
import ReportStatus from "@/feature/admin/components/ReportStatus";
import { format } from "date-fns";

interface ReportMode {
    mode: 'TRAINER_REVIEW' | 'COMMENT' | 'PT_COURSE' | 'FEEDBACK' | 'POST' | 'CHAT';
    report: Reports
}


export default function ReportDataItem({ mode, report }: ReportMode) {

    return (
        <div
            style={{ display: 'grid' }}
            className="grid grid-cols-11 md:grid-cols-23 px-1 sm:px-2 md:px-4 lg:px-6 text-white font-normal text-[10px] md:text-xs lg:text-sm border-t border-[#364153] h-14 sm:h-16 lg:h-17.5 items-center"
        >
            <p className="col-span-3 hidden md:block">{report.reportNumber}</p>
            <p className="col-span-3">{report.targetDisplayText}</p>
            <p className="col-span-3 hidden md:block">{report.targetOwnerUsername}</p>
            <p className="col-span-2 hidden md:block">{format(report.reportedAt, 'yyyy-MM-dd')}</p>
            <p className="col-span-2 hidden md:block">{report.effectiveReportCount}건</p>
            <div className="col-span-2 hidden md:block"><ReportStatus text={report.status} /></div>
            {(mode !== 'TRAINER_REVIEW' && mode !== 'FEEDBACK') && (
                <div className="col-span-3"><ReportCheck reportGroupId={report.reportGroupId} /></div>
            )}
            <div className="col-span-5 flex justify-between">
                <ReportDetailButton mode={mode} reportId={report.targetId} reportGroupId={report.reportGroupId} />
                <ReportGroupDeleteButton reportGroupId={report.reportGroupId} />
            </div>
        </div>
    );
}
