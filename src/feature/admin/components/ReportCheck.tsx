'use client'

import useModal from "@/components/hooks/useModal";
import CheckReportModal from "./modals/CheckReportModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { DetailButtonImg } from "@/components/ui/image";


export default function ReportCheck({ reportGroupId }: { reportGroupId: number }) {
    // const handleConfirm1 = () => {
    //     ApprovalModal.openModal();
    // };


    // const handleReject = () => {
    //     RejectModal.openModal();
    // }

    const modal = useModal();
    // const ApprovalModal = useModal(handleConfirm1);
    // const RejectModal = useModal(handleConfirm1);

    return (
        <>
            <button
                onClick={modal.openModal}
                className="flex items-center gap-2.5 text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-2 px-3">
                <img src={DetailButtonImg} /> 사유확인
            </button>
            {modal.isModal &&
                <CheckReportModal
                    isModal={modal.isModal}
                    closeModal={modal.closeModal}
                    activeModal={modal.activeModal}
                    noneActiveModal={modal.noneActiveModal}
                    reportGroupId={reportGroupId}
                />
            }

            {/* <TwoButtonModal
                isModal={ApprovalModal.isModal}
                closeModal={ApprovalModal.closeModal}
                activeModal={ApprovalModal.activeModal}
                title='신고 승인'
                content={`신고를 승인하시겠습니까?`}
            />
            <TwoButtonModal
                isModal={RejectModal.isModal}
                closeModal={RejectModal.closeModal}
                activeModal={RejectModal.activeModal}
                title='신고 승인'
                content={`신고를 반려하시겠습니까?`}
            /> */}
        </>
    );
}