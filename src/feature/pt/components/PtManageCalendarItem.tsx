import useModal from "@/components/hooks/useModal";
import PtManageCalendarModal from "./PtManageCalendarModal";

export default function PtManageCalendarItem({ data }: { data: Diary }) {
    const modal = useModal();

    return (
        <>
            <button
                type="button"
                onClick={modal.openModal}
                className="m-2 flex w-full items-center justify-between rounded-[10px] border-l-4 border-l-[#BFFF0B] bg-[#101828] p-5"
            >
                <p>{data.exercise}</p>
                <div className="rounded-[4px] bg-[#1E2939] py-1 px-2 text-[#BFFF0B]">
                    {data.part}
                </div>
            </button>
            {modal.isModal && (
                <PtManageCalendarModal
                    isModal={modal.isModal}
                    closeModal={modal.closeModal}
                    data={data}
                />
            )}
        </>
    );
}
