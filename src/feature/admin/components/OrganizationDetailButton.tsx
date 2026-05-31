'use client'

import useModal from "@/components/hooks/useModal";
import { DetailButtonImg } from "@/components/ui/image";
import OrganizationDetailModal from "./modals/OrganizationDetailModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { organizationApprovalAction, OrganizationDetailAction, organizationRejectAction } from "../action";
import OrganizationRejectModal from "./modals/OrganizationRejectModal";

interface DetailButtonMode {
    mode: 'organizationView' | 'organizationApprove';
    applicationId: number;
}

export default function OrganizationDetailButton({ mode, applicationId }: DetailButtonMode) {


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
        await organizationApprovalAction(applicationId);
    }

    //반려되었습니다. 모달

    //승인되었습니다. 모달

    //취소되었습니다. 모달



    const approvalModal = useModal(handleApproval);
    const rejectModal = useModal();
    const organizationModal = useModal(handleClickApprove, handleClickReject);

    let organizationInfo: Organization = {
        organizationApplicationId: 0,
        requestedLoginId: '',
        businessRegistrationNumber: '',
        businessName: '',
        representativeName: '',
        representativePhone: '',
        openingDate: '',
        roadAddress: '',
        jibunAddress: '',
        detailAddress: '',
        latitude: 0,
        longitude: 0,
        websiteUrl: '',
        instagramUrl: '',
        blogUrl: '',
        facilityPhone: '',
        businessLicenseFileUrl: ''
    };


    return (
        <>
            <button
                onClick={organizationModal.openModal}
                className="flex items-center gap-2.5 text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-2 px-3">
                <img src={DetailButtonImg} /> 상세보기
            </button>

            <OrganizationDetailModal
                isModal={organizationModal.isModal}
                closeModal={organizationModal.closeModal}
                activeModal={organizationModal.activeModal}
                noneActiveModal={organizationModal.noneActiveModal}
                mode={mode}
                applicationId={applicationId}
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
                applicationId={applicationId}
            />
        </>
    );
}