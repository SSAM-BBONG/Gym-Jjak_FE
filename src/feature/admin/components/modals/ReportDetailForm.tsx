import ReportReason from "../ReportReason";
import ReportDetailStatus from "../ReportDetailStatus";
import { ReportApprovalAction, ReportPtDetailAction, ReportRejectAction } from "../../action";
import { useState } from "react";

interface ReportDetailFormProps {
    // activeModal: () => void;
    // noneActiveModal: () => void;
    report: ReportsDetail;
    reportGroupId: number;
}


export default function ReportDetailForm({ report, reportGroupId }: ReportDetailFormProps) {

    const [reportState, setReportState] = useState<ReportsDetail>(report);

    const handleApprovalReport = async () => {
        const res = await ReportApprovalAction(reportGroupId, report.reportId);
        setReportState(res);
    }

    const handleRejectReport = async () => {
        const res = await ReportRejectAction(reportGroupId, report.reportId);
        setReportState(res);
    }

    return (
        <form>
            <div className="flex justify-between items-center my-4">
                <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#E8EAF0] py-2">{reportState.reporterUsername}</h3>
                <div className="flex gap-2"><ReportReason text={reportState.reason} /><ReportDetailStatus text={reportState.status} /></div>
            </div>

            <div
                className="border-[#364153] border w-full h-36 md:h-47 p-3 md:p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none"
            >
                {reportState.detail}
            </div>
            <p className="text-end p-2 text-[10px] md:text-sm">{reportState.reportedAt}</p>
            {reportState.status === '대기' &&
                <article className='flex gap-3'>
                    <button
                        type="button"
                        onClick={handleRejectReport}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-sm md:text-base bg-[#1E2939]'
                    >
                        반려
                    </button>
                    <button
                        type="button"
                        onClick={handleApprovalReport}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-sm md:text-base bg-[#BFFF0B]'
                    >
                        승인
                    </button>
                </article>}

        </form>
    );
}
