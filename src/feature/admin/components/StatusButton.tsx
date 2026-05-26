'use client'

import { AdminManagementImg } from "@/components/ui/image";
import ChangeStateModal from "./modals/ChangeStateModal";
import useModal from "@/components/hooks/useModal";

export default function StatusButton() {
    const handleSaveButton = () => {

    }

    const modal = useModal(handleSaveButton);

    return (
        <>
            <button
                onClick={modal.openModal}
                className="flex items-center gap-2.5 text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-2 px-3">
                <img src={AdminManagementImg} /> 상태 변경
            </button>
            <ChangeStateModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                title='모달입니다'
            />
        </>
    );
}