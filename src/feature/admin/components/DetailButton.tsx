'use client'

import useModal from "@/components/hooks/useModal";
import { DetailButtonImg } from "@/components/ui/image";
import CheckViewModal from "./modals/CheckViewModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import Image from "next/image";

interface DetailButtonMode {
    mode: 'trainerView' | 'organizationView' | 'trainerApprove' | 'organizationApprove' | 'TRAINER_REVIEW' | 'COMMENT' | 'PT_COURSE' | 'FEEDBACK' | 'POST';
    applicationId: number
}


export default function DetailButton({ mode, applicationId }: DetailButtonMode) {


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
                <div className="relative ml-auto w-5 h-5">
                    <Image
                        src={DetailButtonImg}
                        alt="상세보기 버튼"
                        fill
                        sizes="w-4 h-4"
                    />
                </div> 상세보기
            </button>
            <CheckViewModal
                isModal={viewModal.isModal}
                closeModal={viewModal.closeModal}
                mode={mode}
                nickname='모달입니다'
                content=""
            />
            <TwoButtonModal
                isModal={approvalModal.isModal}
                closeModal={approvalModal.closeModal}
                activeModal={approvalModal.activeModal}
                title={mode === 'trainerApprove' || mode === 'trainerView' ? '트레이너 승인' : '조직 승인'}
                content={`승인하시겠습니까?`}
            />

        </>
    );
}