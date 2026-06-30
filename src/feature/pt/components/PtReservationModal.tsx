'use client'

import { Calendar } from "@/components/ui/calendar";
import { CloseButton } from "@/components/ui/image";
import { ko } from "date-fns/locale"
import { useEffect, useState } from "react";
import { PtResrvationAvailableTimeSlot } from "../type";
import { createPtReservationAction, getPtAvailableDatesAction, getPtAvailableTimesAction } from "../actions";
import { format } from "date-fns";

interface PtReservationModalProps {
    isModal: boolean;
    closeModal: () => void;
    activeModal: () => void;
    noneActiveModal: () => void;
    title: string;
    ptCourseId: number;
}


export default function PtReservationModal({ isModal, closeModal, activeModal, noneActiveModal, title, ptCourseId }: PtReservationModalProps) {
    const [date, setDate] = useState<Date | undefined>(new Date())
    const [availableDates, setAvailableDates] = useState<string[]>([]);
    const [timeSlots, setTimeSlots] = useState<PtResrvationAvailableTimeSlot[]>([]);
    const [selectedTimeSlot, setSelectedTimeSlot] =  useState<PtResrvationAvailableTimeSlot | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {

        const fetchDates = async () => {
            const response = await getPtAvailableDatesAction(ptCourseId);
            setAvailableDates(response.data.availableDates);
        };

        fetchDates();
    }, [isModal, ptCourseId]);

        const handleSelectDate = async (selectedDate?: Date) => {
        if (!selectedDate) return;

        const formattedDate = format(selectedDate, "yyyy-MM-dd");

        if (!availableDates.includes(formattedDate)) return;

        setDate(selectedDate);
        setSelectedTimeSlot(null);
        setErrorMessage("");

        const response = await getPtAvailableTimesAction(ptCourseId, formattedDate);
        setTimeSlots(response.data.timeSlots.filter((slot) => slot.available));
    };

        const toDateTime = (selectedDate: Date, time: string) => {
        const formattedDate = format(selectedDate, "yyyy-MM-dd");
        const normalizedTime = time.length === 5 ? `${time}:00` : time;

        return `${formattedDate}T${normalizedTime}`;
    };

        const handleCreateReservation = async () => {
        if (!date || !selectedTimeSlot) {
            setErrorMessage("예약 날짜와 시간을 선택해주세요.");
            return;
        }

        try {
            setIsSubmitting(true);
            setErrorMessage("");

            await createPtReservationAction(ptCourseId, {
            reservedStartAt: toDateTime(date, selectedTimeSlot.startTime),
            reservedEndAt: toDateTime(date, selectedTimeSlot.endTime),
            });

            activeModal();
        } catch (error) {
            setErrorMessage(
            error instanceof Error ? error.message : "예약에 실패하였습니다."
            );
        } finally {
            setIsSubmitting(false);
        }
        };

    if (!isModal) return;
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
                        locale={ko}
                        selected={date}
                        onSelect={handleSelectDate}
                        disabled={(day) => {
                            const formattedDate = format(day, "yyyy-MM-dd");
                            return !availableDates.includes(formattedDate);
                        }}
                        className="rounded-lg border text-white"
                        />
                    

                    <div className="w-full bg-[#1E2939] rounded-md border-[#364153] border mt-6 p-6">
                    <h3 className="font-bold text-xl text-[#E8EAF0] py-2">시간 선택</h3>

                    <div className="grid grid-cols-3 gap-3 mt-3">
                        {timeSlots.map((slot) => {
                        const value = `${slot.startTime}-${slot.endTime}`;
                        const isSelected =
                            selectedTimeSlot?.startTime === slot.startTime &&
                            selectedTimeSlot?.endTime === slot.endTime;

                        return (
                            <button
                            key={value}
                            type="button"
                            onClick={() => setSelectedTimeSlot(slot)}
                            className={`rounded-lg py-3 font-semibold ${
                                isSelected
                                ? "bg-[#BFFF0B] text-black"
                                : "bg-[#0B0F19] text-white border border-[#364153]"
                            }`}
                            >
                            {slot.startTime} - {slot.endTime}
                            </button>
                        );
                        })}
                        </div>
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
                        onClick={handleCreateReservation}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-base bg-[#BFFF0B]'
                    >
                        {isSubmitting ? "예약 중..." : "예약 하기"}
                    </button>
                </article>

            </form>
        </section>
    );
}