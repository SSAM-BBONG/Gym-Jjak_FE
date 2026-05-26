'use client'

import useModal from "@/components/hooks/useModal";
import CheckReportModal from "./modals/CheckReportModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";

interface ActiveStatusProps {
    text: '욕설' | '광고' | '음란물' | '사기' | '허위 정보'
}

const colorVariants = {
    '욕설': 'text-red-500 bg-red-500/10 border-red-500/30',
    '광고': 'text-pink-500 bg-pink-500/10 border-pink-500/30',
    '음란물': 'text-yellow-500 bg-yellow-500/10 border-yellow-500/30',
    '사기': 'text-violet-500 bg-violet-500/10 border-violet-500/30',
    '허위 정보': 'text-orange-500 bg-orange-500/10 border-orange-500/30'
};

export default function ReportReason({ text }: ActiveStatusProps) {
    const handleConfirm1 = () => {
        ApprovalModal.openModal();
    };

    const handleReject = () => {
        RejectModal.openModal();
    }

    const modal = useModal(handleConfirm1, handleReject);
    const ApprovalModal = useModal(handleConfirm1);
    const RejectModal = useModal(handleConfirm1);

    return (
        <>
            <div
                onClick={modal.openModal}
                className={`py-1 px-3 font-medium text-xs rounded-lg border inline ${colorVariants[text]}`}>
                {text}

            </div>
            <CheckReportModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                noneActiveModal={modal.noneActiveModal}
                title='모달입니다'
            />
            <TwoButtonModal
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
            />
        </>

    );
}