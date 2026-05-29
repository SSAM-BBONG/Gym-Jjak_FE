'use client'

import useModal from "@/components/hooks/useModal";
import { DetailButtonImg } from "@/components/ui/image";
import TrainerDetailModal from "./modals/TrainerDatailModal";
import OrganizationDetailModal from "./modals/OrganizationDetailModal";
import CheckViewModal from "./modals/CheckViewModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import TrainerRejectModal from "./modals/TrainerRejectModal";

interface DetailButtonMode {
    mode: 'trainerView' | 'organizationView' | 'trainerApprove' | 'organizationApprove' | 'TRAINER_REVIEW' | 'COMMENT' | 'PT_COURSE' | 'FEEDBACK' | 'POST'
}


export default function DetailButton({ mode }: DetailButtonMode) {

    //트레이너, 조직에서 승인 버튼 누름
    const handleClickApprove = (): void => {
        approvalModal.openModal();
    }

    //트레이너, 조직에서 반려 버튼 누름
    const handleClickReject = (): void => {
        rejectModal.openModal();
    }

    //정말 승인할건지 물어봄
    const handleClickCheckApprove = () => {
        console.log('승인됨')
    }

    //반려되었습니다. 모달

    //승인되었습니다. 모달

    //취소되었습니다. 모달

    const trainerModal = useModal(handleClickApprove, handleClickReject);
    const approvalModal = useModal(handleClickCheckApprove);
    const rejectModal = useModal();
    const organizationModal = useModal(handleClickApprove, handleClickReject);
    const viewModal = useModal();

    const handleClickButton = (): void => {
        if (mode === 'trainerView' || mode === 'trainerApprove') {
            trainerModal.openModal();
        } else if (mode === 'organizationView' || mode === 'organizationApprove') {
            organizationModal.openModal();
        } else if (mode === 'TRAINER_REVIEW' || mode === 'COMMENT') {
            viewModal.openModal();
        } else {
            window.open("http://localhost:3000/admin", "_blank", "noopener,noreferrer");
        }
    }

    return (
        <>
            <button
                onClick={handleClickButton}
                className="flex items-center gap-2.5 text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-2 px-3">
                <img src={DetailButtonImg} /> 상세보기
            </button>
            <TrainerDetailModal
                isModal={trainerModal.isModal}
                closeModal={trainerModal.closeModal}
                activeModal={trainerModal.activeModal}
                noneActiveModal={trainerModal.noneActiveModal}
                mode={mode}
                title='모달입니다'
            />
            <OrganizationDetailModal
                isModal={organizationModal.isModal}
                closeModal={organizationModal.closeModal}
                activeModal={organizationModal.activeModal}
                noneActiveModal={organizationModal.noneActiveModal}
                mode={mode}
                title='모달입니다'
            />
            <CheckViewModal
                isModal={viewModal.isModal}
                closeModal={viewModal.closeModal}
                mode={mode}
                title='모달입니다'
            />
            <TwoButtonModal
                isModal={approvalModal.isModal}
                closeModal={approvalModal.closeModal}
                activeModal={approvalModal.activeModal}
                title={mode === 'trainerApprove' || mode === 'trainerView' ? '트레이너 승인' : '조직 승인'}
                content={`승인하시겠습니까?`}
            />
            <TrainerRejectModal
                isModal={rejectModal.isModal}
                closeModal={rejectModal.closeModal}
                activeModal={rejectModal.activeModal}
                title='모달입니다'
            />
        </>
    );
}