'use client'

import useModal from "@/components/hooks/useModal";
import PtReservationModal from "./PtReservationModal";

interface PtDetailReservationButtonProps {
    title: string;
}

export default function PtDetailButton({ title }: PtDetailReservationButtonProps) {

    const modal = useModal();

    return (
        <div className="grid grid-cols-3 gap-3">

            <button
                type="button"
                onClick={modal.openModal}
                className="
                py-4 
                rounded-[14px] 
                bg-[#1E2939] text-[16px] font-extrabold text-white
                hover:text-black hover:bg-[#BFFF0B]
                "
            >
                예약하기
            </button>

            <PtReservationModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                noneActiveModal={modal.noneActiveModal}
                title={title}
            />
            <button className="
            py-4 
            rounded-[14px] 
            bg-[#1E2939] text-[16px] font-extrabold text-white
            hover:text-black hover:bg-[#BFFF0B]
            "> 채팅하기 </button>
            <button className="
            py-4 
            rounded-[14px] 
            bg-[#1E2939] text-[16px] font-extrabold text-white
            hover:text-black hover:bg-[#BFFF0B]
            ">  전화하기 </button>
        </div>
    );
}