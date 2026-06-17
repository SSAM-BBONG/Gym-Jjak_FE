'use client'
import useModal from "@/components/hooks/useModal";
import OnlinePtFeeBackCheckModal from "@/feature/admin/components/modals/OnlinePtFeedbackCheckModal";
import OnlinePtFeeBackRegistModal from "./OnlinePtFeedbackRegistModal";

export default function OnlinePtFeedbackCt({ type, active }: { type: '피드백' | '질문', active: boolean }) {
    const modal = useModal();
    const registModal = useModal(() => { });
    const color = active ? "text-[#BFFF0B]" : "text-[#99A1AF]"

    const clickFeedbackCt = () => {
        active ? modal.openModal() : registModal.openModal();
    }
    return (
        <div onClick={clickFeedbackCt} className="bg-[#1E293980] p-3 w-full rounded-[10px]">
            <div className="mb-2">
                <img />
                <p className={`${color} font-bold text-sm pl-2`}>PT {type}</p>
            </div>
            <p className="text-[#99A1AF] font-medium text-xs">클릭해서 {active ? '확인' : '등록'}하기</p>
            <OnlinePtFeeBackCheckModal closeModal={modal.closeModal} isModal={modal.isModal} type={type} />
            <OnlinePtFeeBackRegistModal closeModal={registModal.closeModal} isModal={registModal.isModal} type={type} activeModal={registModal.activeModal} />
        </div>
    );
}