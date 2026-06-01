'use client'

import useModal from "@/components/hooks/useModal";
import { AdminDeleteImg } from "@/components/ui/image";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { deleteCategoryAction } from "../action";

export default function AdminDeleteButton({ mode, id }: { mode: string, id: number }) {

    const handleDelete = async () => {
        await deleteCategoryAction(id);
    }

    const modal = useModal(handleDelete);

    return (
        <>
            <button
                onClick={modal.openModal}
                className="flex items-center gap-2.5 text-sm font-medium text-white bg-[#1E2939] border-[#364153] border rounded-lg py-2 px-3">
                <img src={AdminDeleteImg} /> 삭제하기
            </button>
            <TwoButtonModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                title={`${mode} 삭제`}
                content={`삭제하시겠습니까?`}
            />
        </>

    );
}