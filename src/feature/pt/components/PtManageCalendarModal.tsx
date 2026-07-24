import { CloseButton } from "@/components/ui/image";
import CalendarSetRead from "@/feature/calendar/components/CalendarSetRead";
import Image from "next/image";

interface PtManageCalendarModalProps {
    isModal: boolean;
    closeModal: () => void;
    data: Diary;
}

export default function PtManageCalendarModal({
    isModal,
    closeModal,
    data,
}: PtManageCalendarModalProps) {
    if (!isModal) return null;

    return (
        <section
            className="fixed top-0 left-0 z-999 h-screen w-screen bg-black/50"
            onClick={closeModal}
        >
            <article
                className="
                fixed top-1/2 left-1/2 z-1000
                flex max-h-120 w-4/5 -translate-x-1/2 -translate-y-1/2 flex-col justify-between
                overflow-y-auto rounded-2xl border border-[#1E2939]
                bg-gradient-to-br from-[#101828] to-[#000] p-6
                [scrollbar-width:none] [-ms-overflow-style:none]
                sm:h-100 sm:w-md md:h-120 md:w-lg lg:w-lg
                [&::-webkit-scrollbar]:hidden
                "
                onClick={(event) => event.stopPropagation()}
            >
                <div>
                    <div className="flex items-center justify-between border-b border-b-[#1E2939] pb-6 md:pt-2 md:pb-8">
                        <h3 className="text-base font-bold text-[#E8EAF0] md:text-lg">
                            운동 일지
                        </h3>
                        <button
                            type="button"
                            onClick={closeModal}
                            className="relative ml-auto h-5 w-5"
                        >
                            <Image
                                src={CloseButton}
                                alt='모달 닫기 버튼'
                                fill
                                sizes="w-4 h-4"
                            />
                        </button>
                    </div>

                    <div className="my-4 flex items-center justify-between">
                        <h3 className="py-2 text-base font-bold text-[#E8EAF0] md:text-xl">
                            {data.exercise}
                        </h3>
                        <div className="rounded-[4px] bg-[#1E2939] py-1 px-2 text-[#BFFF0B]">
                            {data.part}
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <label className="text-base font-bold text-white md:text-xl">
                            운동 세트
                        </label>
                    </div>
                    {data.sets.map((set) => (
                        <CalendarSetRead sets={set} key={set.setId} />
                    ))}
                </div>
            </article>
        </section>
    );
}
