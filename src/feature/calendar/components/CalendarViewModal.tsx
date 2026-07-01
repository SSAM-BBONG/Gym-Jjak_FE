import { CloseButton } from "@/components/ui/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCalendarAction } from "../action";
import Image from "next/image";

interface CalendarViewModalProps {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    data: Diary;
}


export default function CalendarViewModal({ isModal, closeModal, activeModal, data }: CalendarViewModalProps) {

    const queryClient = useQueryClient();

    const createMutation = useMutation({
        mutationFn: (() =>
            deleteCalendarAction(data.workoutDiaryId)
        ),
        onSuccess: () => {
            void queryClient.invalidateQueries({
                queryKey: ["calendar-month"],
            });

            void queryClient.invalidateQueries({
                queryKey: ["calendar-date", data.date],
            });

            closeModal();
        },
    });

    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-3xl min-h-130 rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">일지 상세</h3>
                        <button onClick={closeModal} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                priority
                                sizes="w-4 h-4"
                            />
                        </button>                    </div>
                    <div className="flex justify-between items-center my-4">
                        <h3 className="font-bold text-xl text-[#E8EAF0] py-2">{data?.title}</h3>
                        <div className="w-10">{data?.category}</div>
                    </div>
                    <div
                        className="border-[#364153] border w-full h-65 p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white focus:outline-none"
                    >{data?.content}</div>
                </article>
                <article className='flex gap-3'>
                    <button
                        type="button"
                        onClick={() => createMutation.mutate()}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939]'
                    >
                        삭제하기
                    </button>
                    <button
                        onClick={activeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                    >
                        수정하기
                    </button>
                </article>
            </form>
        </section>
    );
}