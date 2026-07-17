'use client'

import useModal from "@/components/hooks/useModal";
import CalendarViewModal from "@/feature/calendar/components/CalendarViewModal";
import CalendarCreateModal from "@/feature/calendar/components/CalendarCreateModal"
import OneButtonModal from "@/components/ui/OneButtonModal";

export default function CalendarItem({ data }: { data: Diary }) {
    const updateModal = useModal();
    const modal = useModal(updateModal.openModal);
    const checkModal = useModal();
    const deleteModal = useModal();
    return (
        <>
            <button
                onClick={modal.openModal}
                className="p-5 border-l-4 border-l-[#BFFF0B] rounded-[10px] bg-[#101828] m-2 flex items-center justify-between w-full">
                <p>{data?.exercise}</p>
                <div className="bg-[#1E2939] text-[#BFFF0B] py-1 px-2 rounded-[4px]">{data?.part}</div>
            </button>
            {modal.isModal && <CalendarViewModal
                isModal={modal.isModal}
                closeModal={modal.closeModal}
                activeModal={modal.activeModal}
                openDelete={deleteModal.openModal}
                data={data}
            />}
            {updateModal.isModal && <CalendarCreateModal
                isModal={updateModal.isModal}
                closeModal={updateModal.closeModal}
                selectedSettingDate={data.date}
                openCheck={checkModal.openModal}
                data={data}
                mode='update'
            />}
            <OneButtonModal
                isModal={checkModal.isModal}
                closeModal={checkModal.closeModal}
                title="운동 일지"
                content='수정되었습니다'
            />
            <OneButtonModal
                isModal={deleteModal.isModal}
                closeModal={() => console.log('삭제')}
                title="운동 일지"
                content='삭제되었습니다'
            />
        </>
    );
}