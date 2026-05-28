'use client'

import useModal from "@/components/hooks/useModal";
import PtReviewModal from "./PtReviewModal";

export default function PtRecordDetailButton() {
    const activefunc =() =>{
        console.log('1');
    }   

    const modal = useModal(activefunc);

    return (
        <div className="grid grid-cols-4 gap-4">
                <button 
                    className="py-3 rounded-[10px] bg-[#BFFF0B] text-[16px] font-extrabold text-black"
                    onClick={modal.openModal}
                    > 수강평 작성 </button>
                <PtReviewModal 
                    isModal={modal.isModal}
                    closeModal={modal.closeModal}
                    activeModal={modal.activeModal}
                />
                <button className="py-3 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-white"> 채팅 </button>
                <button className="py-3 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-white"> 신고 </button>
                <button className="py-3 rounded-[10px] bg-[#1E2939] text-[16px] font-extrabold text-white"> 취소 </button>
        </div>
    );
}