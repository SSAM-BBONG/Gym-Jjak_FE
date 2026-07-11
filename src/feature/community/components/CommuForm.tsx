'use client'

import useModal from "@/components/hooks/useModal";
import { format } from "date-fns";
import { useState } from "react";
import { communityAction } from "../action";
import OneButtonModal from "@/components/ui/OneButtonModal";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

export default function CommuForm() {
    const route = useRouter();
    const today = new Date();

    const [commuState, setCommuState] = useState<{ success: boolean, message: string }>({
        success: false,
        message: ''
    });

    const modal = useModal(() => { commuState.success && route.push('/community?page=0') });

    const {
        register,
        handleSubmit,
        formState: { isSubmitting },
    } = useForm<{ title: string, content: string }>({
        mode: 'onSubmit',
    });

    const onSubmit = async (data: { title: string, content: string }) => {
        try {
            const formData = new FormData();
            formData.set("title", data.title);
            formData.set("content", data.content);

            const result = await communityAction(formData)
            setCommuState(result);
            modal.openModal();
        } catch (error) {
            setCommuState({
                success: false,
                message: '네트워크 연결이 원활하지 않습니다.'
            });
            modal.openModal();

        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="h-screen">
            <div className="flex flex-col gap-3 
        md:bg-[linear-gradient(135deg,_rgba(16,24,40,0.90)_0%,_rgba(30,41,57,0.90)_100%)]
        md:border-[#36415380] md:border-[1px]
        md:rounded-[16px]
        sm:mx-10
        md:mx-25
        lg:mx-40
        mt-5
        md:mt-10
        p-8
        h-17/20
        ">
                <h2
                    className="
                flex items-center justify-center
                self-baseline
                rounded-[4px] px-3 py-1 
                text-[#D1D5DC] bg-[#364153]
                text-[12px]
                font-extrabold"
                >
                    자유게시판
                </h2>
                <input
                    aria-label="제목"
                    placeholder="제목을 입력해주세요"
                    {...register('title')}
                    className="text-[22px] md:text-[30px] font-black text-white focus:outline-none" />

                <div className="flex justify-between mt-5 md:my-5 items-center">
                    <div className="flex flex-col md:flex-row gap-3">
                        <p className="text-[10px] md:text-[12px] lg:text-[14px] text-[#99A1AF] font-normal">
                            {format(today, 'yyyy-MM-dd HH:mm:ss')}
                        </p>
                    </div>
                </div>
                <hr className="border-[#1E2939]" />

                <textarea
                    aria-label="내용"
                    placeholder="내용을 입력해주세요"
                    {...register('content')}
                    className="rounded-[10px] h-47 focus:outline-none resize-none text-[13px] md:text-[16px] font-normal text-[#D1D5DC] p-2" />
                <button
                    disabled={isSubmitting}
                    className="
                bg-[#BFFF0B] rounded-[5px] md:rounded-[10px] text-[12px] md:text-[16px] text-black  flex items-center justify-center font-semibold md:font-extrabold px-5 py-2 hover:cursor-pointer  w-full  md:w-40  mt-auto  ml-auto"
                >작성완료</button>
            </div>
            <OneButtonModal
                isModal={modal.isModal}
                closeModal={modal.activeModal}
                activeModal={modal.activeModal}
                title="커뮤니티"
                content={commuState.message}
            />
        </form>
    );
}
