'use client'

import useModal from "@/components/hooks/useModal";
import CalendarViewModal from "./CalendarViewModal";
import CalendarCreateModal from "./CalendarCreateModal";

export default function CalendarItem({ data }: { data: Diary }) {
    const updateModal = useModal();
    const modal = useModal(updateModal.openModal);
    return (
        <>
            <button
                onClick={modal.openModal}
                className="p-5 border-l-4 border-l-[#BFFF0B] rounded-[10px] bg-[#101828] m-2 flex items-center justify-between">
                <p>{data?.title}</p>
                <div className="bg-[#1E2939] text-[#BFFF0B] py-1 px-2 rounded-[4px]">{data?.category}</div>
            </button>
            <CalendarViewModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                noneActiveModal={modal.noneActiveModal}
                activeModal={modal.activeModal}
                data={data}
            />
            <CalendarCreateModal
                isModal={updateModal.isModal}
                closeModal={updateModal.closeModal}
                selectedSettingDate={data.date}
                data={data}
                mode='update'
            />
        </>
    );
}