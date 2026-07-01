'use client'

import useModal from "@/components/hooks/useModal";
import { DetailButtonImg } from "@/components/ui/image";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { approvalTrainerApplicationAction } from "../action";
import TrainerDetailModal from "./modals/TrainerDatailModal";
import TrainerRejectModal from "./modals/TrainerRejectModal";
import Image from "next/image";

interface DetailButtonMode {
    mode: 'trainerView' | 'trainerApprove';
    trainerId: number;
}

export default function TrainerDetailButton({ mode, trainerId }: DetailButtonMode) {


    //트레이너, 조직에서 승인 버튼 누름
    const handleClickApprove = (): void => {
        approvalModal.openModal();
    }

    //트레이너, 조직에서 반려 버튼 누름
    const handleClickReject = (): void => {
        rejectModal.openModal();
    }

    //정말 승인할건지 물어봄
    const handleApproval = async () => {
        await approvalTrainerApplicationAction(trainerId);
    }

    const approvalModal = useModal(handleApproval);
    const rejectModal = useModal();
    const trainerModal = useModal(handleClickApprove, handleClickReject);

    return (
        <>
            <button
                onClick={trainerModal.openModal}
                className="flex items-center gap-2.5 text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-2 px-3">
                <div className="relative ml-auto w-5 h-5">
                    <Image
                        src={DetailButtonImg}
                        alt="상세보기 버튼"
                        fill
                        priority
                        sizes="w-4 h-4"
                    />
                </div> 상세보기
            </button>

            <TrainerDetailModal
                isModal={trainerModal.isModal}
                closeModal={trainerModal.closeModal}
                activeModal={trainerModal.activeModal}
                noneActiveModal={trainerModal.noneActiveModal}
                mode={mode}
                trainerId={trainerId}
            />
            <TwoButtonModal
                isModal={approvalModal.isModal}
                closeModal={approvalModal.closeModal}
                activeModal={approvalModal.activeModal}
                title='트레이너 승인'
                content='승인하시겠습니까?'
            />
            <TrainerRejectModal
                isModal={rejectModal.isModal}
                closeModal={rejectModal.closeModal}
                activeModal={rejectModal.activeModal}
                trainerId={trainerId}
            />
        </>
    );
}