'use client'

import ChangeStateModal from "@/feature/admin/components/modals/ChangeStateModal";
import useModal from "../hooks/useModal";
import OneButtonModal from "./OneButtonModal";
import TwoButtonModal from "./TwoButtonModal";
import TrainerRejectModal from "@/feature/admin/components/modals/TrainerRejectModal";
import TrainerDetailModal from "@/feature/admin/components/modals/TrainerDatailModal";
import OrganizationDetailModal from "@/feature/admin/components/modals/OrganizationDetailModal";
import CheckReportModal from "@/feature/admin/components/modals/CheckReportModal";
import CheckViewModal from "@/feature/admin/components/modals/CheckViewModal";
import PtReservationModal from "@/feature/pt/components/PtReservationModal";
import { decodeJWT } from "@/lib/decode";

export default function ModalOpenButton() {

    //테스트용
    const handleConfirm1 = () => {
        console.log("확인1");
    };

    const modal = useModal();
    const modal1 = useModal(handleConfirm1);
    const modal2 = useModal(handleConfirm1);
    const modal3 = useModal(handleConfirm1);
    const modal4 = useModal(handleConfirm1);
    const modal5 = useModal(handleConfirm1);
    const modal6 = useModal(handleConfirm1);
    const modal7 = useModal(handleConfirm1);
    const modal8 = useModal(handleConfirm1);

    const deco = async () => {
        const user = await decodeJWT();
        console.log(user?.role);
    }
    return (
        <div className="text-white">

            {/* <AdminPagination mode={'COMMENT'} /> */}
            <button onClick={modal.openModal}>
                원버튼모달 오픈
            </button>
            |
            <button onClick={modal1.openModal}>
                투버튼모달 오픈
            </button>
            |
            <button onClick={modal2.openModal}>
                회원 상태 변경 모달
            </button>
            |
            <button onClick={modal3.openModal}>
                트레이너 반려 모달
            </button>
            |
            <button onClick={modal4.openModal}>
                트레이너 정보 모달
            </button>
            |
            <button onClick={modal5.openModal}>
                조ㅗ직
            </button>
            |
            <button onClick={modal6.openModal}>
                댓글
            </button>
            |
            <button onClick={modal7.openModal}>
                신고
            </button>
            |
            <button onClick={modal8.openModal}>
                캘린더
            </button>
            |
            <button onClick={deco}>디코더</button>

            <OneButtonModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                title='모달입니다'
                content={`안녕하세요\n안녕히계세요`} />
            <TwoButtonModal
                isModal={modal1.isModal}
                closeModal={modal1.closeModal}
                activeModal={modal1.activeModal}
                title='모달입니다'
                content={`안녕하세요\n안녕히계세요`}
            />
            {/* <ChangeStateModal
                isModal={modal2.isModal}
                closeModal={modal2.closeModal}
                activeModal={modal2.activeModal}
                title='모달입니다'
            />
            <TrainerRejectModal
                isModal={modal3.isModal}
                closeModal={modal3.closeModal}
                activeModal={modal3.activeModal}
                title='모달입니다'
            />
            <TrainerDetailModal
                isModal={modal4.isModal}
                closeModal={modal4.closeModal}
                activeModal={modal4.activeModal}
                noneActiveModal={modal4.noneActiveModal}
                mode="trainerView"
                title='모달입니다'
            /> */}
            {/* <OrganizationDetailModal
                isModal={modal5.isModal}
                closeModal={modal5.closeModal}
                activeModal={modal5.activeModal}
                noneActiveModal={modal5.noneActiveModal}
                mode='organizationApprove'
                title='모달입니다'
            /> */}
            {/* <CheckViewModal
                isModal={modal6.isModal}
                closeModal={modal6.closeModal}
                mode='comment'
                title='모달입니다'
            /> */}
            {/* <CheckReportModal
                isModal={modal7.isModal}
                closeModal={modal7.closeModal}
                activeModal={modal7.activeModal}
                noneActiveModal={modal7.noneActiveModal}
                title='모달입니다'
            /> */}
            <PtReservationModal
                isModal={modal8.isModal}
                closeModal={modal8.closeModal}
                activeModal={modal8.activeModal}
                noneActiveModal={modal8.noneActiveModal}
                title='모달입니다'
            />
        </div>
    );
}