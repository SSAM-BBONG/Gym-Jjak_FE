'use client'

import useModal from "@/components/hooks/useModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";
import { deleteInbodyAction } from "@/feature/mypage/actions";
import { useState } from "react";

interface state {
    success: boolean;
    message: string;
}

export default function InbodyDeleteButton({ inbodyId }: { inbodyId: number }) {
    const [result, setResult] = useState<state>({ success: false, message: '' });
    const modal = useModal(deleteInbody);

    async function deleteInbody() {
        const response = await deleteInbodyAction(inbodyId);
        setResult(response);
    }

    return (
        <>
            <div className="flex gap-2 justify-end">
                <button onClick={modal.openModal}>
                    <p className="text-[#6A7282] text-end text-sm font-normal">
                        기록 삭제 →
                    </p>
                </button>
            </div>
            <TwoButtonModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                title="인바디"
                content='해당 기록을 삭제하시겠습니까?'
            />
        </>
    );
}