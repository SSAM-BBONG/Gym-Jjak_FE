import { CloseButton } from "@/components/ui/image";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCalendarAction } from "../action";
import Image from "next/image";
import CalendarSetRead from "./CalendarSetRead";
import useModal from "@/components/hooks/useModal";
import TwoButtonModal from "@/components/ui/TwoButtonModal";

interface CalendarViewModalProps {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    openDelete: () => void;
    data: Diary;
}


export default function CalendarViewModal({ isModal, closeModal, activeModal, openDelete, data }: CalendarViewModalProps) {

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
            openDelete();
        },
    });

    const checkModal = useModal(createMutation.mutate);


    if (!isModal) return null;
    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-4/5 max-h-120 sm:w-md sm:h-100 md:w-lg md:h-120 lg:w-lg rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between 
                overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-6 md:pb-8 md:pt-2">
                        <h3 className="font-bold  text-base md:text-lg text-[#E8EAF0]">일지 상세</h3>
                        <button type='button' onClick={closeModal} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                sizes="w-4 h-4"
                            />
                        </button>                    </div>
                    <div className="flex justify-between items-center my-4">
                        <h3 className="font-bold text-base md:text-xl text-[#E8EAF0] py-2">{data?.exercise}</h3>
                        <div className="bg-[#1E2939] text-[#BFFF0B] py-1 px-2 rounded-[4px]">{data?.part}</div>
                    </div>


                    <div className="flex gap-2">
                        <label className="font-bold text-base md:text-xl text-white ">운동 세트</label>
                    </div>
                    {data.sets.map((set) => {
                        return <CalendarSetRead sets={set} key={set.setId} />
                    })}


                </article>
                <article className='flex gap-3 mt-3'>
                    <button
                        type="button"
                        onClick={() => checkModal.openModal()}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold  text-s md:text-base bg-[#1E2939]'
                    >
                        삭제하기
                    </button>
                    <button
                        onClick={activeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold  text-s md:text-base bg-[#BFFF0B]'
                    >
                        수정하기
                    </button>
                </article>
                <TwoButtonModal
                    isModal={checkModal.isModal}
                    closeModal={checkModal.closeModal}
                    activeModal={checkModal.activeModal}
                    title='운동 일지'
                    content="삭제하시겠습니까?"
                />
            </form>
        </section>
    );
}