'use client'

import useModal from "@/components/hooks/useModal";
import { DetailButtonImg } from "@/components/ui/image";
import OrganizationDetailModal from "./modals/OrganizationDetailModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { organizationApprovalAction } from "../action";
import OrganizationRejectModal from "./modals/OrganizationRejectModal";
import Image from "next/image";

interface DetailButtonMode {
    mode: 'organizationView' | 'organizationApprove';
    organizationId: number;
}

export default function OrganizationDetailButton({ mode, organizationId }: DetailButtonMode) {


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
        await organizationApprovalAction(organizationId);
    }

    const approvalModal = useModal(handleApproval);
    const rejectModal = useModal();
    const organizationModal = useModal(handleClickApprove, handleClickReject);

    return (
        <>
            <button
                onClick={organizationModal.openModal}
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

            <OrganizationDetailModal
                isModal={organizationModal.isModal}
                closeModal={organizationModal.closeModal}
                activeModal={organizationModal.activeModal}
                noneActiveModal={organizationModal.noneActiveModal}
                mode={mode}
                organizationId={organizationId}
            />
            <TwoButtonModal
                isModal={approvalModal.isModal}
                closeModal={approvalModal.closeModal}
                activeModal={approvalModal.activeModal}
                title='조직 승인'
                content='승인하시겠습니까?'
            />
            <OrganizationRejectModal
                isModal={rejectModal.isModal}
                closeModal={rejectModal.closeModal}
                activeModal={rejectModal.activeModal}
                organizationId={organizationId}
            />
        </>
    );
}