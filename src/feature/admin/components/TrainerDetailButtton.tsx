'use client'

import useModal from "@/components/hooks/useModal";
import { DetailButtonImg } from "@/components/ui/image";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { approvalTrainerApplicationAction } from "../action";
import TrainerDetailModal from "./modals/TrainerDatailModal";
import TrainerRejectModal from "./modals/TrainerRejectModal";
import Image from "next/image";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface DetailButtonMode {
    mode: 'trainerView' | 'trainerApprove';
    trainerId: number;
}

export default function TrainerDetailButton({ mode, trainerId }: DetailButtonMode) {
    const router = useRouter();


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
        try {
            const response = await approvalTrainerApplicationAction(trainerId);

            if (!response.success) {
                toast.error(response.message);
                return;
            }

            toast.success(response.message);
            router.push("/admin/approvals/organizations?page=1");
        } catch (error) {
            toast.error("네트워크 오류입니다. 다시 시도해주세요.");
        }
    }

    const approvalModal = useModal(handleApproval);
    const rejectModal = useModal();
    const trainerModal = useModal(handleClickApprove, handleClickReject);

    return (
        <>
            <button
                onClick={trainerModal.openModal}
                className="flex items-center gap-1 sm:gap-1.5 lg:gap-2.5 text-[10px] sm:text-xs lg:text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-1.5 sm:py-2 px-2 lg:px-3">
                <div className="relative ml-auto w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5">
                    <Image
                        src={DetailButtonImg}
                        alt="상세보기 버튼"
                        fill
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
