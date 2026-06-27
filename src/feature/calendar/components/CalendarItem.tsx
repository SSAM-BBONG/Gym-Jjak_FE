'use client'

import useModal from "@/components/hooks/useModal";
import CalendarViewModal from "./CalendarViewModal";

export default function CalendarItem({ data }: { data: Diary }) {
    const modal = useModal();
    return (
        <>
            <div
                onClick={modal.openModal}
                className="p-5 border-l-4 border-l-[#BFFF0B] rounded-[10px] bg-[#101828] m-2 flex items-center justify-between">
                <p>{data?.content}</p>
                <div className="bg-[#1E2939] text-[#BFFF0B] py-1 px-2 rounded-[4px]">{data?.category}</div>
            </div>
            <CalendarViewModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                data={data}
            />
        </>
    );
}