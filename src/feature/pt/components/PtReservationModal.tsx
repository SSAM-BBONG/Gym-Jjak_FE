'use client'

import { Calendar } from "@/components/ui/calendar";
import { AdminDocument, CloseButton } from "@/components/ui/image";
import { ko } from "date-fns/locale"
import { useState } from "react";

interface PtReservationModalProps {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    noneActiveModal: () => void;
    title: string;
}


export default function PtReservationModal({ isModal, closeModal, activeModal, noneActiveModal, title }: PtReservationModalProps) {
    if (!isModal) return null;
    const [date, setDate] = useState<Date | undefined>(new Date())


    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={closeModal} >
            <form
                className="bg-gradient-to-br from-[#101828] to-[#000] w-3xl h-150 rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between
                overflow-y-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-xl text-[#E8EAF0]">PT 예약하기</h3>
                        <img src={CloseButton} onClick={closeModal} />
                    </div>

                    <div className="flex justify-between items-center my-4">
                        <h3 className="font-bold text-xl text-[#E8EAF0] py-2">{title}</h3>
                    </div>
                    <Calendar
                        mode="single"
                        disabled={{ before: new Date() }}
                        locale={ko}
                        selected={date}
                        onSelect={setDate}
                        className="rounded-lg border"
                    />

                    <div className="w-full bg-[#1E2939] rounded-md border-[#364153] border mt-6 p-6">
                        <h3 className="font-bold text-xl text-[#E8EAF0] py-2">시간 선택</h3>
                        <p>{date?.toLocaleDateString('ko-KR')}</p>
                    </div>

                </article>
                <article className='flex gap-3 mt-10'>
                    <button
                        type="button"
                        onClick={noneActiveModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-base bg-[#1E2939]'
                    >
                        취소
                    </button>
                    <button
                        onClick={activeModal}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                    >
                        시간 확정
                    </button>
                </article>

            </form>
        </section>
    );
}