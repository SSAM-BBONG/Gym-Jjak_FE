import { AdminDeleteImg } from "@/components/ui/image";
import DetailButton from "@/feature/admin/components/DetailButton";
import ReportCheck from "@/feature/admin/components/ReportCheck";
import ReportDetailButton from "@/feature/admin/components/ReportDetailButton";
import ReportStatus from "@/feature/admin/components/ReportStatus";
import { getReportPtbyId } from "@/service/report.service";
import Image from "next/image";

interface ReportMode {
    mode: 'TRAINER_REVIEW' | 'COMMENT' | 'PT_COURSE' | 'FEEDBACK' | 'POST';
    report: Reports
}


export default function ReportDataItem({ mode, report }: ReportMode) {

    return (
        <div
            style={{ display: 'grid' }}
            className="grid grid-cols-9 md:grid-cols-21 px-1 sm:px-2 md:px-4 lg:px-6 text-white font-normal text-[10px] md:text-xs lg:text-sm border-t border-[#364153] h-14 sm:h-16 lg:h-17.5 items-center"
        >
            <p className="col-span-3 hidden md:block">{report.reportNumber}</p>
            <p className="col-span-3">{report.targetDisplayText}</p>
            <p className="col-span-3 hidden md:block">{report.targetOwnerUsername}</p>
            <div className="col-span-3"><ReportCheck reportGroupId={report.reportGroupId} /></div>
            <p className="col-span-2 hidden md:block">날짜</p>
            <p className="col-span-2 hidden md:block">{report.effectiveReportCount}건</p>
            {report.status === '처리완료' ? (
                <>
                    <div className="col-span-2 hidden md:block"><ReportStatus text={report.status} /></div>
                    <div className="col-span-3">
                        <button className="flex items-center gap-1 sm:gap-1.5 lg:gap-2.5 text-[10px] sm:text-xs lg:text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-1.5 sm:py-2 px-2 lg:px-3">
                            <div className="relative ml-auto w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5">
                                <Image
                                    src={AdminDeleteImg}
                                    alt="삭제하기 버튼"
                                    fill
                                    sizes="w-4 h-4"
                                />
                            </div>수동 삭제
                        </button>
                    </div>
                </>
            ) : (
                <>
                    <div className="col-span-2 hidden md:block"><ReportStatus text={report.status} /></div>
                    <div className="col-span-3"><ReportDetailButton mode={mode} reportId={report.targetId} /></div>
                </>
            )}
        </div>
    );
}
