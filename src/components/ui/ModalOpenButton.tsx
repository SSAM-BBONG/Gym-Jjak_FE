'use client'

import useModal from "../hooks/useModal";
import OneButtonModal from "./OneButtonModal";
import TwoButtonModal from "./TwoButtonModal";

export default function ModalOpenButton() {

    //테스트용
    const handleConfirm1 = () => {
        console.log("확인1");
    };

    const modal = useModal();
    const modal1 = useModal(handleConfirm1);
    return (
        <>
            <button onClick={modal.openModal}>
                원버튼모달 오픈
            </button>

            <button onClick={modal1.openModal}>
                투버튼모달 오픈
            </button>

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
        </>
    );
}