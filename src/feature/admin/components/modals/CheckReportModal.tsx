import { CloseButton } from "@/components/ui/image";
import ReportStatus from "../ReportStatus";
import ReportReason from "../ReportReason";
import { useEffect, useState } from "react";
import { ReportPtDetailAction } from "../../action";
import ReportDetailForm from "./ReportDetailForm";

interface CheckReportModalProps {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    noneActiveModal: () => void;
    reportGroupId: number;
}

const empthReportInstance = {
    reportId: 0,
    reporterUsername: '',
    reason: '',
    detail: '',
    reportedAt: '',
    status: ''
}


export default function CheckReportModal({ isModal, closeModal, activeModal, noneActiveModal, reportGroupId }: CheckReportModalProps) {


    const [reportInfo, setReportInfo] = useState<ReportsDetail[]>([]);
    let first = true;
    useEffect(() => {

        const fetchReport = async () => {
            const res = await ReportPtDetailAction(reportGroupId)
            console.log(res.data.reports);
            setReportInfo(res.data.reports ?? empthReportInstance);
        }

        if (isModal) {

            if (!first) {
                return;
            }
            fetchReport();

            first = false;
        }


    }, [isModal])

    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <div
                className="bg-gradient-to-br from-[#101828] to-[#000] w-md h-150 rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col 
                                overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"

                onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                    <h3 className="font-bold text-xl text-[#E8EAF0]">신고 사유 확인</h3>
                    <img src={CloseButton} onClick={closeModal} />
                </div>

                {
                    reportInfo?.map((report) => {
                        return <ReportDetailForm key={report.reportId} report={report} reportGroupId={reportGroupId} />
                    })
                }


            </div>
        </section>
    );
}