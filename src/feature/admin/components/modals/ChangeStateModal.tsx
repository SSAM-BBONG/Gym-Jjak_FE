import { CloseButton } from "@/components/ui/image";
import StatusSelector from "../StatusSelector";
import Image from "next/image";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { changeUserStatusAction } from "../../action";
import { toast } from "sonner";
import { useState } from "react";

interface ChangeStateModalProps {
    isModal: boolean;
    closeModal: () => void;
    status: 'ETERNAL' | 'ACTIVE' | 'DAY_7' | 'WITHDRAWN';
    name: string;
    userId: number;
}


export default function ChangeStateModal({ isModal, closeModal, status, name, userId }: ChangeStateModalProps) {


    const [resultState, setResultState] = useState({
        success: false,
        message: '',
    })

    const router = useRouter();

    const {
        register,
        handleSubmit,
        reset,
        formState: { isSubmitting },
    } = useForm<UserStatusRequest>({
        defaultValues: {
            status: status,
            reason: ''
        },
        mode: 'onSubmit',
    });

    const onSubmit = async (data: UserStatusRequest) => {
        const formData = new FormData();
        formData.set('reason', data.reason);
        formData.set('status', data.status);
        try {
            const result = await changeUserStatusAction(userId, formData);
            if (!result?.success) {
                setResultState(result);
                return;
            }

            reset();
            closeModal();
            toast.success(result.message)
            router.refresh();
        } catch (error) {
            toast.error('네트워크 오류입니다')
        }

    }

    const clickClose = () => {
        reset();
        setResultState({
            success: false,
            message: "",
        });
        closeModal();
    }

    if (!isModal) return null;

    return (
        <section
            className="z-999 bg-black/50 fixed top-0 left-0 w-screen h-screen"
            onClick={clickClose} >
            <form
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gradient-to-br from-[#101828] to-[#000] w-5/6 max-h-114 sm:w-md  rounded-2xl border border-[#1E2939] z-1000 fixed top-1/2 left-1/2 p-6 flex -translate-x-1/2 -translate-y-1/2 flex-col justify-between"
                onClick={(e) => e.stopPropagation()}>
                <article>
                    <div className="flex justify-between border-b-[#1E2939] border-b items-center pb-8 pt-2">
                        <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#E8EAF0]">회원 관리 사유 입력</h3>
                        <button type="button" onClick={closeModal} className="relative ml-auto w-5 h-5">
                            <Image
                                src={CloseButton}
                                alt="모달 닫기 버튼"
                                fill
                                sizes="w-4 h-4"
                            />
                        </button>
                    </div>
                    <div className="flex justify-between items-center my-4">
                        <h3 className="font-bold text-base md:text-lg lg:text-xl text-[#E8EAF0]">{name}</h3>
                        <select {...register('status')} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-[#BFFF0B] transition disabled:opacity-50 disabled:cursor-not-allowed">
                            <option value={'ACTIVE'}>활성</option>
                            <option value={'DAY_7'}>7일 정지</option>
                            <option value={'ETERNAL'}>영구 정지</option>
                        </select>
                    </div>
                    <textarea
                        {...register('reason')}
                        placeholder={`사유를 입력해주세요(활성으로 변경 시 선택 입력)`}
                        className="border-[#364153] border w-full h-36 md:h-47 p-3 md:p-6 bg-[#1E2939] rounded-2xl resize-none focus:border-[#BFFF0B] text-white text-sm md:text-base focus:outline-none"
                    ></textarea>
                    {!resultState.success && <p className="text-red-400 text-sm md:text-base m-1 mb-5">{resultState.message}</p>}
                </article>
                <article className='flex gap-3'>
                    <button
                        type="button"
                        onClick={clickClose}
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-white text-center font-semibold text-sm md:text-base bg-[#1E2939]'
                    >
                        취소
                    </button>
                    <button
                        disabled={isSubmitting}
                        type="submit"
                        className='w-full flex pt-2 pb-3 justify-center items-center rounded-lg text-black text-center font-semibold text-sm md:text-base bg-[#BFFF0B]'
                    >
                        저장
                    </button>
                </article>
            </form>

        </section>
    );
}
